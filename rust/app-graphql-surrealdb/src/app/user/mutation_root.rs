use anyhow::Context as ContextAnyhow;
use lib_common::{
    authentication::{
        TypedSession, {generate_password_hash, validate_password, PasswordHashPHC, PasswordPlain},
    },
    error_handling::ApiHttpStatus,
};
use log::error;

use super::{
    error::{self, UserNotFoundError},
    Role, SignInCredentials, SignOutMessage, User,
};
use async_graphql::*;
use chrono::Utc;

use validator::{Validate, ValidationError, ValidationErrors};

#[derive(Union)]
enum UserCreateResult {
    User(User),
    UserRegisterInvalidInputError(error::UserRegisterInvalidInputError),
    UserNotFoundError(error::UserNotFoundError),
    ServerError(error::ServerError),
    // UserBaseError(UserBaseError)
}

type UserSignUpResult = UserCreateResult;

#[derive(Union)]
enum UserSignInResult {
    User(User),
    UserSignInInvalidInputError(error::UserSignInInvalidInputError), // UserBaseError(UserBaseError)
    UserNotFoundError(error::UserNotFoundError),
    ServerError(error::ServerError),
}

#[derive(Union)]
enum UserSignOutResult {
    SignOutMessage(SignOutMessage),
    UserSessionExpiredError(error::UserSessionExpiredError),
    ServerError(error::ServerError),
}

#[macro_export]
macro_rules! session_from_ctx {
    ($ctx:expr) => {
        match TypedSession::from_ctx($ctx) {
            Ok(session) => session,
            Err(_) => {
                return error::ServerError {
                    message: "Failed to retrieve session".to_string(),
                    solution: "Wait patiently".to_string(),
                }
                .into()
            }
        }
    };
}

#[macro_export]
macro_rules! get_current_user_id_unchecked {
    ($session:expr) => {
        match $session.get_current_user_id() {
            Ok(user_id) => user_id,
            Err(_) => {
                return error::UserSessionExpiredError {
                    message: "Bad thing".to_string(),
                    solution: "".to_string(),
                }
                .into()
            }
        }
    };
}

macro_rules! get_current_user_id_from_ctx {
    ($ctx:expr) => {
        get_current_user_id_unchecked!(session_from_ctx!($ctx))
    };
}

#[derive(Default)]
pub struct UserMutationRoot;

#[Object]
impl UserMutationRoot {
    async fn create_user(
        &self,
        ctx: &async_graphql::Context<'_>,
        #[graphql(desc = "user data")] user_input: User,
    ) -> Result<User> {
        // ) -> Result<UserCreateResult> {
        use surreal_rs::{embedded, embedded::Db, Surreal};
        let result = user_input.validate();
        let db = ctx.data_unchecked::<Surreal<Db>>();

        let uuid = surrealdb::sql::Uuid::new();

        let user: User = db
            .create(("user", uuid.to_string()))
            .content(user_input)
            .await?;

        // let user: User = db.create(("user", uuid::Uuid::new_v4().to_string())).content(user_input).await?;

        //     assert!(errs.contains_key("number"));
        // if let ValidationErrorsKind::Field(ref err) = errs["number"] {
        //     assert_eq!(err.len(), 1);
        //     assert_eq!(err[0].code, "credit_card");
        // } else {
        //     panic!("Expected field validation errors");
        // }

        // https://github.com/Keats/validator/blob/master/validator_derive_tests/tests/complex.rs
        // let pp = result.unwrap_err().field_errors();
        // let err = pp["errorName"];
        // pp["errorName"][0].message

        // let db = get_db_from_ctx(ctx)?;
        Ok(user)
    }

    async fn sign_in(
        &self,
        ctx: &async_graphql::Context<'_>,
        #[graphql(desc = "sign in credentials")] sign_in_credentials: SignInCredentials,
    ) -> UserSignInResult {
        use surreal_rs::{embedded, embedded::Db, Surreal};
        let db = ctx.data_unchecked::<Surreal<Db>>();
        let session = session_from_ctx!(ctx);
        let maybe_user_id = session.get_current_user_id::<uuid::Uuid>().ok();

        // Return user if found from session
        let x: UserSignInResult = match maybe_user_id {
            Some(ref user_id) => {
                let user = User::find_by_id(db, user_id).await;
                session.renew();
                log::info!("Successfully authenticated and renew session for user: {user_id}");
                user.into()
            }
            // If not found from session, handle fresh signin flow
            None => {
                let Some(user) = User::find_by_username(db, sign_in_credentials.username).await else {
                    return error::UserNotFoundError {
                        message: "This username does not exist".to_string(),
                        solution: "Register the username or remember yours and sign in with it"
                            .to_string(),
                    }.into()
                };

                let Some(password_hash) = &user.password.clone() else {
                    // TODO: FIX update
                    return error::ServerError {
                        message: "Invalid Credentials".to_string(),
                        solution: "Password does not exist for normal signed in user 🤔"
                            .to_string(),
                    }.into();
                };

                let plain_password = PasswordPlain::new(sign_in_credentials.password);
                let hashed_password = PasswordHashPHC::new(password_hash);

                let Ok(x) = validate_password(plain_password, hashed_password).await else {
                    return error::UserNotFoundError {
                        message: "Invalid password".to_string(),
                        solution: "Please, check and enter it properly"
                        .to_string(),
                    }.into()
                };

                session.insert_user_id(&user.id);
                // session.renew();
                user.into()
            }
        };
        x
    }

    // async fn sign_out(&self, ctx: &async_graphql::Context<'_>) -> Result<SignOutMessage> {
    async fn sign_out(&self, ctx: &async_graphql::Context<'_>) -> UserSignOutResult {
        let session = session_from_ctx!(ctx);
        let user_id = get_current_user_id_unchecked!(session);

        session.purge();

        SignOutMessage {
            message: "Successfully signed out".into(),
            user_id,
        }
        .into()
    }

    /// Creates a new user but doesn't log in the user
    /// Currently like this because of future developments
    async fn sign_up(
        &self,
        ctx: &async_graphql::Context<'_>,
        #[graphql(desc = "Sign Up credentials")] user: User,
    ) -> UserSignUpResult {
        use surreal_rs::{embedded, embedded::Db, Surreal};
        let result = user.validate();
        let db = ctx.data_unchecked::<Surreal<Db>>();
        let session = session_from_ctx!(ctx);
        // let user_id = get_current_user_id_unchecked!(session);

        let uuid = surrealdb::sql::Uuid::new();
        // user.password = createpa
        // let session = TypedSession::from_ctx(ctx)?;
        let Ok(password_hash) = generate_password_hash(user.password.unwrap())
            .await else {
                return error::ServerError{
                    message: "yyyyyy".to_string(),
                    solution: "xxxx".to_string(),
                }.into();
            };

        let mut user = User::builder()
            .created_at(Utc::now())
            .username(user.username)
            .first_name(user.first_name)
            .last_name(user.last_name)
            .email(user.email)
            .age(user.age)
            .social_media(user.social_media)
            .roles(vec![Role::User])
            .accounts(vec![])
            .password(Some(password_hash.into()))
            .build();

        dbg!(&user);

        // let kk = db
        //     .query("CREATE user SET username = $username, socialMedia = $socialMedia, password = $password, createdAt = $createdAt, updatedAt = $updatedAt, deletedAt = $deletedAt, emailVerified = $emailVerified")
        //     .bind("username", user.username)
        //     .bind("socialMedia", user.social_media)
        //     .bind("password", user.password)
        //     .bind("emailVerified", true)
        //     .bind("createdAt", Utc::now().timestamp())
        //     .bind("deletedAt", Utc::now().timestamp())
        //     .bind("updatedAt", Utc::now().timestamp()).await.unwrap();

        // let user: User = kk.get(0, 0).unwrap();

        let user: User = db
            .create(("user", uuid.to_string()))
            .content(user)
            .await
            .unwrap();

        dbg!("after user");
        dbg!(&user);

        session.insert_user_id(&user.id);
        user.into()
        // todo!()
    }
}
