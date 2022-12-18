use chrono::{DateTime, Duration, Utc};
use poem::{
    session::{CookieConfig, RedisStorage, ServerSession},
    web::cookie::{CookieKey, SameSite},
};
use redis::aio::ConnectionManager;
use std::process;
use surrealdb_rs::{embedded::Db, Surreal};

use crate::{
    authentication::surrealdb_session::{DatabaseConfig, SurrealDbSessionStorage},
    configurations::{
        application::Environment,
        redis::{RedisConfigError, RedisConfigs},
    },
};

#[derive(thiserror::Error, Debug)]
pub enum SessionSurrealDbError {
    #[error("Failed to connect to db")]
    DbConnectionFailure(String),
}

pub async fn get_session_surrealdb(
    db: Surreal<Db>,
    environment: &Environment,
) -> Result<ServerSession<SurrealDbSessionStorage>, SessionSurrealDbError> {
    let storage = SurrealDbSessionStorage::try_new(DatabaseConfig::new(), db)
        .await
        .unwrap();
    let cookie_config = session_helpers::get_cookie_config(environment);

    Ok(ServerSession::new(cookie_config, storage))
}

#[derive(thiserror::Error, Debug)]
pub enum SessionRedisError {
    #[error("Failed to get redis client")]
    RedisCientFailure(#[from] RedisConfigError),
}

pub async fn get_session_redis(
    redis_config: RedisConfigs,
    environment: &Environment,
) -> Result<ServerSession<RedisStorage<ConnectionManager>>, SessionRedisError> {
    let cookie_config = session_helpers::get_cookie_config(environment);
    Ok(ServerSession::new(
        cookie_config,
        RedisStorage::new(redis_config.get_connection_manager().await?),
    ))
}

pub mod session_helpers {
    use super::*;

    const EXPIRES_IN_DAY: u8 = 180;

    pub fn get_cookie_config(environment: &Environment) -> CookieConfig {
        use Environment::*;

        let cookie_key = CookieKey::generate();
        // Alternative, if you want stable key to regenerate all cookies
        // Generate a random 32 byte key. Note that it is important to use a unique
        // private key for every project. Anyone with access to the key can generate
        // authentication cookies for any user!
        // Generate key with the command `openssl rand -base64 32`
        // let cookie_key = CookieKey::from(
        //     "YN7sLNF+vsvAX+bYe5qNUtmCUOJSYuZFF9PasqO+b8w="
        //         .repeat(256)
        //         .as_bytes(),
        // );
        
        CookieConfig::private(cookie_key)
            .name("oyelowo-session")
            .secure(matches!(environment, Production | Staging | Development))
            .same_site(SameSite::Lax)
            .max_age(Some(get_session_duration_std()))
    }

    pub fn get_session_duration() -> Duration {
        Duration::days(EXPIRES_IN_DAY.into())
    }

    pub fn get_session_duration_std() -> std::time::Duration {
        get_session_duration().to_std().unwrap_or_else(|e| {
            // "We are sure it's greater than zero"
            log::error!("Cannot be less than zero. Error: {e}");
            process::exit(-1)
        })
    }

    pub fn get_session_expiry() -> DateTime<Utc> {
        Utc::now() + Duration::days(EXPIRES_IN_DAY.into())
    }
}
