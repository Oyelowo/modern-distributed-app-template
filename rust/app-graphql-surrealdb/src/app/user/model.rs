#![allow(incomplete_features)]
#![feature(generic_const_exprs)]

use super::error;
use super::guards::{AuthGuard, RoleGuard};
use super::model_oauth;
use crate::app::post::{Post, PostFields};
use crate::{get_current_user_id_unchecked, session_from_ctx};
use async_graphql::connection::{
    query, Connection, CursorType, DefaultConnectionName, DefaultEdgeName, Edge, EmptyFields,
};
use async_graphql::*;
use chrono::{serde::ts_nanoseconds_option, DateTime, Utc};
use futures_util::TryStreamExt;
use lib_common::oauth::account;
use lib_common::{authentication::TypedSession, error_handling::ApiHttpStatus};
use lib_my_macros::FieldsGetter;
use serde::{Deserialize, Serialize};
use surreal_simple_querybuilder::model;
use surreal_simple_querybuilder::prelude::*;
use surrealdb::Datastore;
use surreal_rs::embedded::Db;
use surreal_rs::Surreal;
use typed_builder::TypedBuilder;
use validator::Validate;

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct UuidSurreal(pub String);
// pub struct UuidSurreal(pub surrealdb::sql::Uuid);

// scalar!(Uuid);

scalar!(
    UuidSurreal,
    "UuidSurreal",
    "A UUID type provided by the SurrealDB database"
);

// #[derive(Debug, SimpleObject, Serialize, Deserialize)]
// struct Account {
//   id: Option<String>,
//   handle: String,
//   password: String,
//   email: String,

//   projects: ForeignVec<Project>,
// }
// mod accountr {
//   use super::project::schema::Project;
//   use surreal_simple_querybuilder::prelude::*;

//   model!(Account {
//     pub handle,
//     pub password,
//     pub email,
//     friend<Account>,

//     ->manage->Project as managed_projects,
//   });
// }

#[derive(Debug, Serialize, Deserialize, Default)]
struct Project {
    id: Option<String>,
    name: String,
    //   releases: ForeignVec<Release>,
}

// mod project {
// //   use super::accountr::schema::Account;
// //   use super::release::schema::Release;
//   use surreal_simple_querybuilder::prelude::*;

//   model!(Project {
//     pub name,

//     // pub ->has->Release as releases,
//     pub <-manage<-Account as authors
//   });
// }
// impl IntoKey<String> for Project {
//   fn into_key<E>(&self) -> Result<String, E>
//   where
//     E: serde::ser::Error,
//   {
//     self
//       .id
//       .as_ref()
//       .map(String::clone)
//       .ok_or(serde::ser::Error::custom("The project has no ID"))
//   }
// }

// impl IntoKey<String> for Account {
//   fn into_key<E>(&self) -> Result<String, E>
//   where
//     E: serde::ser::Error,
//   {
//     self
//       .id
//       .as_ref()
//       .map(String::clone)
//       .ok_or(serde::ser::Error::custom("The account has no ID"))
//   }
// }
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
    pub id: UuidSurreal,
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

mod user {
    //   use super::account::schema::Account;
    //   use super::release::schema::Release;
    use surreal_simple_querybuilder::prelude::*;

    model!(User {
      pub namre,

      // pub ->has->Release as releases,
      // pub <-manage<-Account as authors
    });
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
    FirstOrLastParamsError(error::FirstOrLastParamsError),
    ServerError(error::ServerError),
    UserSessionExpiredError(error::UserSessionExpiredError),
}

/// Relay-compliant connection parameters to page results by cursor/page size
#[derive(Debug, InputObject)]
pub struct Params {
    after: Option<String>,
    before: Option<String>,
    first: Option<i32>,
    last: Option<i32>,
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
        // map_to: F,
    ) -> PostsConnectionResult {
        use super::statements::Logicals::*;
        use super::statements::Ordering::*;
        use super::statements::*;
        // ctx.look_ahead().field("xx").field("yy").field("zz");
        use surreal_rs::{embedded, embedded::Db, Surreal};
        let session = session_from_ctx!(ctx);
        let user_id: UuidSurreal = get_current_user_id_unchecked!(session);
        let db = ctx.data_unchecked::<Surreal<Db>>();
        let q = query(
            after,
            before,
            first,
            last,
            |after: Option<connection::OpaqueCursor<String>>,
             before: Option<connection::OpaqueCursor<String>>,
             first: Option<usize>,
             last: Option<usize>| async move {
                let connection_additional_fields = ConnectionAdditionalFields { totalCount: 43 };
                let limit = match (first, last) {
                    (Some(first), None) => first,
                    (None, Some(last)) => last,
                    _ => 10,
                } + 1;

                let after = after.as_ref().map(|a| a.as_str());
                let before = before.as_ref().map(|b| b.as_str());

                let order_by = match (after, before) {
                    (Some(_), Some(_)) => ASC,
                    (Some(_), None) => ASC,
                    (None, Some(_)) => DESC,
                    (None, None) => ASC,
                };

                let PostFields { id, .. } = Post::get_fields_serialized();

                let where_clause = match (after, before) {
                    (Some(after), Some(before)) => {
                        format!("{WHERE} {id} > {after} {AND} {id} < {before}")
                    }
                    (Some(after), None) => format!("{WHERE} {id} > {after}"),
                    (None, Some(before)) => format!("{WHERE} {id} < {before}"),
                    (None, None) => "".into(),
                };

                let posts: Vec<Post> = db
                    .query(format!(
                        r#"{SELECT} * {FROM} user:$user_id ->writes->(post {where_clause} 
                            {order_by} {LIMIT} {limit}) {TIMEOUT} 30s
                        "#
                    ))
                    .bind("key", "value")
                    .await
                    .unwrap()
                    .get(0, ..)
                    .unwrap();

                let has_next_page = match (first, last) {
                    (Some(first), Some(_)) => posts.len() > first,
                    (Some(first), None) => posts.len() > first,
                    (None, Some(last)) => posts.len() > last,
                    (None, None) => posts.len() > limit,
                };

                let operator_for_has_previous = match (first, last) {
                    (Some(first), Some(_)) => Operator::LessThan,
                    (Some(first), None) => Operator::LessThan,
                    (None, Some(last)) => Operator::GreaterThan,
                    (None, None) => Operator::LessThan,
                };

                let start_cursor = posts.first();
                let end_cursor = posts.last();
                // > SELECT * FROM users where id < users:5dg1crif052igikvr83u
                let post_before_cursor: Option<Post> = db
                    .query(format!(
                        "{SELECT} * {FROM} users {WHERE} {id} {operator_for_has_previous} $user_id"
                    ))
                    .bind("user_id", start_cursor)
                    .await
                    .unwrap()
                    .get(0, 0)
                    .unwrap();

                let has_previous_page = post_before_cursor.is_some();

                let mut connection = Connection::with_additional_fields(
                    has_previous_page,
                    has_next_page,
                    connection_additional_fields,
                );

                let res_posts = &posts[0..posts.len() - 1];
                connection.edges.extend(posts.into_iter().map(|p| {
                    Edge::with_additional_fields(
                        (connection::OpaqueCursor(format!("{:?}", p.id))),
                        p,
                        EdgeAdditionalFields {
                            relationship_to_next_node: Relation::Brother,
                        },
                    )
                }));
                Ok::<_, async_graphql::Error>(connection)
            },
        )
        .await;

        match q {
            Ok(con) => con.into(),
            Err(e) => {
                log::error!("The error: {e:?}");
                error::UserNotFoundError {
                    message: "nod here buddy".into(),
                    solution: "Go find him".into(),
                }
                .into()
            }
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
