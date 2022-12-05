use std::fmt::{Display, Debug};

use crate::{error_handling::ApiHttpStatus::*, middleware::session_helpers::get_session_expiry};
use async_graphql::{Context, ErrorExtensions, Result};
use chrono::{DateTime, Utc};
use log::warn;
use poem::session::Session;
use serde::{de::DeserializeOwned, Serialize};

#[derive(Debug, thiserror::Error)]
pub enum TypedSessionError {
    #[error("Failed to parse data")]
    ParsingFailure(#[from] serde_json::Error),

    #[error(transparent)]
    Unknown(#[from] anyhow::Error), // source and Display delegate to anyhow::Error
}

type TypedSessionResult<T> = Result<T>;

#[derive(Debug)]
pub struct TypedSession(pub Session);

impl TypedSession {
    const USER_ID_KEY: &'static str = "user_id";

    pub fn from_ctx<'a>(ctx: &'a Context<'_>) -> Result<&'a Self> {
        let session = ctx.data::<Self>().map_err(|e| {
            warn!("{e:?}");
            InternalServerError("Something went wrong while getting session".into()).extend()
        });
        // println!("runsxxxx:session {:?}", session.clone().unwrap().clone().0).get;
        session
    }

    pub fn renew(&self) {
        println!("runsxxxx:renew {self:?}");
        self.0.renew();
    }

    pub fn insert_user_id<T: Serialize + ?Sized + Debug>(&self, user_id: &T) {
        println!("runsxxxx:insert_user_id {user_id:?}");
        self.0.set(Self::USER_ID_KEY, user_id)
    }

    pub fn get_current_user_id<T>(&self) -> TypedSessionResult<T>
    where
        T: DeserializeOwned + std::fmt::Debug + Clone,
    {
        println!("Getting it: {self:?}");
        let value: Option<T> = self.0.get(Self::USER_ID_KEY);
        if let Some(value) = value {
            println!("Yes Value: {value:?}");
            Ok(value)
        } else {
            println!("No Value: {value:?}");
            Err(Unauthorized("Not logged in. Please sign in.".into()).extend())
        }
    }

    pub fn clear(&self) {
        println!("runsxxxx:clear {self:?}");
        self.0.clear()
    }

    pub fn purge(&self) {
        println!("runsxxxx:purge {self:?}");
        self.0.purge()
    }

    pub fn get_expiry() -> DateTime<Utc> {
        get_session_expiry()
    }
}
