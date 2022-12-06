use super::error;
use super::guards::{AuthGuard, RoleGuard};
use super::model_oauth;
use crate::app::post::Post;
use crate::session_from_ctx;
use async_graphql::connection::{
    query, Connection, DefaultConnectionName, DefaultEdgeName, Edge, EmptyFields,
};
use async_graphql::*;
use chrono::{serde::ts_nanoseconds_option, DateTime, Utc};
use futures_util::TryStreamExt;
use lib_common::oauth::account;
use lib_common::{authentication::TypedSession, error_handling::ApiHttpStatus};
use lib_my_macros::FieldsGetter;
use serde::{Deserialize, Serialize};
use surrealdb::Datastore;
use surrealdb_rs::embedded::Db;
use surrealdb_rs::Surreal;
use typed_builder::TypedBuilder;
use validator::Validate;

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct UuidSurrealdb(pub String);
// pub struct UuidSurrealdb(pub surrealdb::sql::Uuid);

// scalar!(Uuid);

scalar!(
    UuidSurrealdb,
    "UuidSurrealdb",
    "A UUID type provided by the SurrealDB database"
);

#[derive(
    SimpleObject,
    InputObject,
    Serialize,
    Deserialize,
    TypedBuilder,
    Validate,
    Debug,
    FieldsGetter,
    Default,
)]
#[serde(rename_all = "camelCase")]
#[graphql(complex)]
#[graphql(input_name = "UserInput")]
pub struct User {
    // #[serde(skip_serializing_if = "Option::is_none")]
    #[builder(default)]
    #[graphql(skip_input)]
    pub id: UuidSurrealdb,
    // pub id: String,
    // pub id: surrealdb::sql::Uuid,
    // pub id: Option<uuid::Uuid>,

    // #[serde(with = "uuid_as_binary")]
    // uuid: Uuid,

    // Created_at should only be set once when creating the field, it should be ignored at other times
    // make it possible do just do created_at(value) instead of created_at(Some(value)) at the call site
    // Skip only from input but available for output. Can be useful for sorting on the client side
    #[serde(with = "ts_nanoseconds_option")] // not really necessary
    #[builder(default, setter(strip_option))]
    #[graphql(skip_input)]
    pub created_at: Option<DateTime<Utc>>,

    #[serde(with = "ts_nanoseconds_option")]
    #[builder(default=Some(Utc::now()), setter(strip_option))]
    #[graphql(skip)] // skip from noth input and output. Mainly for business logic stuff
    pub updated_at: Option<DateTime<Utc>>,

    #[serde(with = "ts_nanoseconds_option")]
    #[builder(default, setter(strip_option))]
    #[graphql(skip)] // skip from both input and output. Mainly for business logic stuff
    pub deleted_at: Option<DateTime<Utc>>,

    #[validate(length(min = 1), /*custom = "validate_unique_username"*/)]
    pub username: String,

    // I intentionally not strip option here because I want
    // it to be explicit that user is not specifying password e.g when using Oauth login
    #[validate(length(min = 1))]
    #[graphql(skip_output)]
    pub password: Option<String>,

    #[validate(length(min = 1))]
    #[builder(default)]
    pub first_name: Option<String>,

    #[validate(length(min = 1))]
    #[builder(default)]
    pub last_name: Option<String>,

    #[validate(length(min = 1))]
    #[builder(default, setter(strip_option))]
    pub city: Option<String>,

    #[validate(email)]
    #[builder(default)]
    pub email: Option<String>,

    #[graphql(skip_input)]
    #[builder(default)]
    pub email_verified: bool,

    #[validate(range(min = 18, max = 160))]
    pub age: Option<u8>,

    #[serde(default)]
    #[builder(default)]
    pub social_media: Vec<String>,

    #[graphql(skip_input)]
    pub roles: Vec<Role>,

    #[graphql(skip_input)]
    pub accounts: Vec<model_oauth::AccountOauth>,
    // #[graphql(skip_input)]
    // pub posts: Vec<Post>
}

#[derive(SimpleObject)]
struct PostResponse {
    data: Vec<Post>,
}

#[derive(Union)]
enum PostsResult {
    Post(PostResponse),
    UserNotFoundError(error::UserNotFoundError),
}


#[derive(Serialize, Deserialize, Clone)]
struct Cursor(uuid::Uuid);
// Define a struct for the post data
#[derive(SimpleObject, Clone, Debug)]
struct PostData {
    id: String,
    title: String,
    content: String,
}

// Define a struct for the post edge data
#[derive(SimpleObject, Clone, Debug)]
struct PostEdgeData {
    // cursor: Cursor,
    cursor: String,
    node: Post,
    // node: PostData,
}

// Define a struct for the page info data
#[derive(SimpleObject, Clone, Debug)]
struct PageInfoData {
    has_next_page: bool,
    has_previous_page: bool,
}

#[derive(SimpleObject, Clone, Debug)]
struct ConnectionAdditionalFields {
    totalCount: u64,
}

#[derive(Enum, Debug, PartialEq, Eq, Clone, Copy)]
enum Relation {
    Brother,
    Sister,
    Niece,
    Daughter,
    Son,
}

#[derive(SimpleObject, Clone, Debug)]
struct EdgeAdditionalFields {
    relationship_to_next_node: Relation,
}

// let pp = connection::OpaqueCursor

#[derive(Union)]
enum PostsConnectionResult {
    // Post(PostResponse),
    PostConnection(
        Connection<
            connection::OpaqueCursor<String>,
            Post,
            ConnectionAdditionalFields,
            EdgeAdditionalFields,
            DefaultConnectionName,
            DefaultEdgeName,
        >,
    ),
    UserNotFoundError(error::UserNotFoundError),
}
#[ComplexObject]
impl User {
    // #[graphql(guard = "RoleGuard::new(Role::User).or(AuthGuard)")]
    async fn posts_connection(
        &self,
        ctx: &Context<'_>,
        after: Option<String>,
        before: Option<String>,
        first: Option<i32>,
        last: Option<i32>,
        // characters: &[&'a StarWarsChar],
        // map_to: F,
    ) -> PostsConnectionResult {
        let post = Post {
            poster_id: uuid::Uuid::new_v4(),
            id: Some(uuid::Uuid::new_v4()),
            title: "".to_string(),
            content: "".to_string(),
        };
        let connection_additional_fields = ConnectionAdditionalFields { totalCount: 43 };

        let edge_additional_fields = EdgeAdditionalFields {
            relationship_to_next_node: Relation::Brother,
        };

        // ctx.look_ahead().field("xx").field("yy").field("zz");
        // Edge::new(1, post).node.poster_id;
        let q = query(
            after,
            before,
            first,
            last,
            |after, before, first, last| async move {
                let mut connection =
                    Connection::with_additional_fields(true, true, connection_additional_fields);

                connection.edges.extend([Edge::with_additional_fields(
                    connection::OpaqueCursor("1".to_string()),
                    post,
                    edge_additional_fields, // EmptyFields,
                )]);
                Ok::<_, async_graphql::Error>(connection)
            },
        )
        .await;
        if let Ok(con) = q {
            con.into()
        } else {
            error::UserNotFoundError {
                message: "nod here buddy".into(),
                solution: "Go find him".into(),
            }
            .into()
        }
    }
}

#[derive(InputObject, TypedBuilder)]
pub struct SignInCredentials {
    pub username: String,
    pub password: String,
}

#[derive(Enum, Copy, Clone, Eq, PartialEq, Serialize, Deserialize, Debug)]
pub enum Role {
    Admin,
    User,
}

#[derive(OneofObject)]
pub enum UserBy {
    UserId(uuid::Uuid),
    Username(String),
    Address(Address),
    // #[validate(email)]
    Email(String),
}
#[derive(InputObject, Validate)]
pub struct Address {
    street: String,
    house_number: String,
    city: String,
    zip: String,
}

#[derive(Union)]
pub enum UserGetResult {
    User(User),
    // UserRegisterInvalidInputError(error::UserRegisterInvalidInputError),
    UserNotFoundError(error::UserNotFoundError),
    ServerError(error::ServerError),
    UserSessionExpiredError(error::UserSessionExpiredError), // UserBaseError(UserBaseError)
}

impl User {
    pub async fn get_current_user(ctx: &Context<'_>) -> UserGetResult {
        let session = session_from_ctx!(ctx);
        // let user_id = get_current_user_id_unchecked!(session);
        let user_id = TypedSession::from_ctx(ctx)
            .unwrap()
            .get_current_user_id::<uuid::Uuid>()
            .unwrap();

        let user: User = ctx
            .data_unchecked::<Surreal<Db>>()
            .select(("user", user_id.to_string()))
            .await
            .unwrap();

        // Self::find_by_id(db, &user_id).await
        user.into()
    }

    pub async fn get_user(db: &Datastore, user_by: UserBy) -> Result<UserGetResult> {
        // let uf = User::get_fields_serialized();
        // let search_doc = match user_by {
        //     UserBy::UserId(id) => doc! { uf._id: id },
        //     UserBy::Username(user_name) => {
        //         let doc = doc! { uf.username: user_name };
        //         doc
        //     }
        //     // Temporary
        //     UserBy::Address(address) => doc! { uf.city: address.city },
        //     UserBy::Email(email) => doc! { uf.email: email },
        // };
        // todo!()
        // User::find_one(db, search_doc, None)
        //     .await?
        //     .ok_or_else(|| ApiHttpStatus::NotFound("User not found".into()).extend())
        // User::collection(db)
        //     .find_one(search_doc, None)
        //     .await?
        //     .ok_or_else(|| ApiHttpStatus::NotFound("User not found".into()).extend())
        todo!()
    }
    // pub async fn _search_users(db: &Database, user_by: Vec<UserBy>) -> Result<Vec<Self>> {
    //     todo!()
    // }
    pub async fn find_by_id(db: &Surreal<Db>, id: &uuid::Uuid) -> User {
        let uk = User::get_fields_serialized();
        todo!()
    }

    pub async fn find_or_create_for_oauth(
        db: &Datastore,
        account_oauth: model_oauth::AccountOauth,
    ) -> anyhow::Result<Self> {
        todo!()
    }

    pub async fn find_by_username(db: &Surreal<Db>, username: impl Into<String>) -> Option<Self> {
        let user: Option<User> = db
            .query("select * from type::table($tb) where username = $username")
            .bind("tb", "user")
            .bind("username", username.into())
            .await
            .unwrap()
            .get(0, 0)
            .unwrap();

        // Self::find_by_id(db, &user_id).await
        user
    }
}

#[derive(SimpleObject)]
pub struct SignOutMessage {
    pub message: String,
    pub user_id: uuid::Uuid,
}
