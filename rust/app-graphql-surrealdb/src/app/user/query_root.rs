use std::any::Any;

use crate::{get_current_user_id_unchecked, session_from_ctx};

use super::{error, guards::AuthGuard, model::User, UserBy, UserGetResult, UuidSurrealdb};

use async_graphql::*;
use chrono::{DateTime, Utc};
use config::Source;
use lib_common::{authentication::TypedSession, error_handling::ApiHttpStatus};

use futures_util::TryStreamExt;
use lib_my_macros::FieldsGetter;
use log::warn;
use serde::{Deserialize, Serialize};
use surreal_simple_querybuilder::model;

#[derive(Union)]
enum SessionResult {
    Session(Session),
    SessionExpired(error::UserSessionExpiredError),
    ServerError(error::ServerError),
}

#[derive(Default)]
pub struct UserQueryRoot;

#[Object]
impl UserQueryRoot {
    // async fn me(&self, ctx: &Context<'_>) -> Result<UserGetResult> {
    async fn me(&self, ctx: &Context<'_>) -> UserGetResult {
        use surreal_simple_querybuilder::prelude::*;
        use surreal_simple_querybuilder::querybuilder::QueryBuilder;
        use surrealdb_rs::{embedded, embedded::Db, Surreal};
        let session = session_from_ctx!(ctx);
        let user_id: UuidSurrealdb = get_current_user_id_unchecked!(session);
        let db = ctx.data_unchecked::<Surreal<Db>>();
        dbg!(user_id.clone(), user_id.0.clone());

        // model!(User {
        //     username,
        //     first_dname
        // });

        // 👇 a "schema" module is created with a static "model" variable you can use
        // 👇 anywhere in your code.
        // use schema::model as user;
        /*
              let query = QueryBuilder::new()
        .select("*")
        .from("User")
        .filter("age > 10")
        .and("name = 'John'")
        .build();
            */
        // let xx = QueryBuilder::new()
        //     .select("*")
        //     .from(user)
        //     .filter(user.username.equals("value"))
        //     // .filter("")
        //     .build();
        let user: surrealdb_rs::Result<User> = db
            .query("SELECT * FROM user WHERE id = $user_id")
            .bind("user_id", user_id)
            .await
            .unwrap()
            .get(0, 0);
        dbg!(&user);
        match user {
            Ok(u) => u.into(),
            Err(_) => {
                return error::UserNotFoundError {
                    message: "user not found".into(),
                    solution: "find yourself".into(),
                }
                .into()
            }
        }
        // Ok(user)
    }

    async fn user(
        &self,
        ctx: &Context<'_>,
        #[graphql(desc = "id of the User")] id: uuid::Uuid,
    ) -> Result<UserGetResult> {
        todo!()
    }

    pub async fn get_user(&self, ctx: &Context<'_>, user_by: UserBy) -> Result<UserGetResult> {
        todo!()
    }

    // #[graphql(guard = "AuthGuard")]
    async fn users(&self, ctx: &Context<'_>) -> surrealdb_rs::Result<Vec<User>> {
        // User::get_current_user(ctx)
        //     .await
        //     .map_err(|_e| ApiHttpStatus::NotFound("User not found".into()).extend())
        use surrealdb_rs::{embedded, embedded::Db, Surreal};
        let db = ctx.data_unchecked::<Surreal<Db>>();

        // let users= db.select("user").await?;
        let users: Vec<User> = db.select("user").await?;
        // let xxx = db.query("SELECT * FROM user");
        // let response = xxx.await?;
        // let response = db.query("SELECT * FROM user").await?;

        // print all users:
        // let users: Vec<User> = response.get(0, 0..2)?;
        //

        Ok(users)
    }

    async fn session(&self, ctx: &Context<'_>) -> SessionResult {
        let session = session_from_ctx!(ctx);
        let user_id = get_current_user_id_unchecked!(session);

        log::info!("Successfully retrieved session for user: {user_id:?}");

        Session { user_id }.into()
    }
}

#[derive(SimpleObject, InputObject, Serialize, Deserialize)]
struct Session {
    user_id: UuidSurrealdb,
}
