use std::{collections::BTreeMap, time::Duration};

use chrono::{DateTime, Utc};
use poem::{error::InternalServerError, session::SessionStorage, Result};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use surreal_rs::{embedded::Db, Surreal};

/// A configuration for database.
pub struct DatabaseConfig {
    pub(crate) table_name: String,
}

impl Default for DatabaseConfig {
    fn default() -> Self {
        DatabaseConfig {
            table_name: "poem_sessions".to_string(),
        }
    }
}

impl DatabaseConfig {
    /// Create an [`DatabaseConfig`].
    pub fn new() -> Self {
        Default::default()
    }

    /// Specifies the table name.
    pub fn table_name(self, table_name: impl Into<String>) -> Self {
        Self {
            table_name: table_name.into(),
        }
    }
}

/// Session storage using Surreal.
#[derive(Clone)]
pub struct SurrealDbSessionStorage {
    db: Surreal<Db>,
    table_name: String,
}

impl SurrealDbSessionStorage {
    pub async fn try_new(config: DatabaseConfig, db: Surreal<Db>) -> Result<Self> {
        let table_name = config.table_name;
        db.query(format!(
            "DEFINE INDEX poem_sessions_expires_idx ON {table_name}  FIELDS expires_at;"
        ))
        .await
        .map_err(InternalServerError)?;

        Ok(Self { db, table_name })
    }

    /// Cleanup expired session fors, session_id.
    pub async fn cleanup(&self) -> surreal_rs::Result<()> {
        self.db
            .query("DELETE FROM poem WHERE expires_at < time::now()")
            .await?;
        Ok(())
    }
}

#[derive(Serialize, Deserialize, Debug, Default)]
struct Session {
    // #[serde(skip_serializing)]
    // session_id: Option<String>,
    expires_at: Option<DateTime<Utc>>,
    session_data: serde_json::Value,
}

#[poem::async_trait]
impl SessionStorage for SurrealDbSessionStorage {
    async fn load_session(&self, session_id: &str) -> Result<Option<BTreeMap<String, Value>>> {
        dbg!("loading session", session_id);
        let session: Option<Session> = self
            .db
            .query("SELECT * FROM type::thing($tb, $id) WHERE expires_at IS NULL OR expires_at > $expires_at")
            .bind("tb", self.table_name.clone())
            .bind("id", session_id)
            .bind("expires_at", Utc::now())
            .await
            .unwrap()
            .get(0, 0)
            .map_err(InternalServerError)?;

        let session_data: Option<BTreeMap<String, Value>> =
            session.map(|x| serde_json::from_value(x.session_data).unwrap());
        dbg!("loaded session", session_id);

        Ok(session_data)
    }

    async fn update_session(
        &self,
        session_id: &str,
        entries: &BTreeMap<String, Value>,
        expires_in: Option<Duration>,
    ) -> Result<()> {
        dbg!("updating session", session_id);
        let expires_in = match expires_in {
            Some(expires_at) => {
                Some(chrono::Duration::from_std(expires_at).map_err(InternalServerError)?)
            }
            None => None,
        };
        let _: Option<BTreeMap<String, Value>> = self
            .db
            .update((self.table_name.clone(), session_id))
            .content(self::Session {
                expires_at: expires_in.map(|expires_in| Utc::now() + expires_in),
                session_data: json!(entries),
            })
            .await
            .map_err(InternalServerError)?;

        dbg!("updated session", session_id);

        Ok(())
    }

    async fn remove_session(&self, session_id: &str) -> Result<()> {
        dbg!("removing session", session_id);
        self.db
            .delete((self.table_name.clone(), session_id))
            .await
            .map_err(InternalServerError)?;

        dbg!("removed session", session_id);
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::test_harness;
    use super::*;

    #[tokio::test]
    async fn test() {
        let db = Surreal::connect::<surreal_rs::storage::Mem>(())
            .await
            .unwrap();

        db.use_ns("namespace").use_db("database").await.unwrap();
        db.query(
            r#"
        	DEFINE INDEX poem_sessions_expires_idx ON poem expires_at age;
        "#,
        );

        let storage = SurrealDbSessionStorage::try_new(DatabaseConfig::new(), db)
            .await
            .unwrap();

        let join_handle = tokio::spawn({
            let storage = storage.clone();
            async move {
                loop {
                    tokio::time::sleep(Duration::from_secs(1)).await;
                    storage.cleanup().await.unwrap();
                }
            }
        });
        test_harness::test_storage(storage).await;
        join_handle.abort();
    }
}

pub mod test_harness {
    #![allow(dead_code)]

    use std::{collections::BTreeMap, time::Duration};

    use poem::session::SessionStorage;

    pub(crate) async fn test_storage(storage: impl SessionStorage) {
        let mut entries1 = BTreeMap::new();
        entries1.insert("a".to_string(), "1".into());
        entries1.insert("b".to_string(), "2".into());

        let mut entries2 = BTreeMap::new();
        entries2.insert("c".to_string(), "3".into());
        entries2.insert("d".to_string(), "4".into());

        let mut entries3 = BTreeMap::new();
        entries3.insert("e".to_string(), "5".into());
        entries3.insert("f".to_string(), "6".into());

        storage
            .update_session("a1", &entries1, Some(Duration::from_secs(3)))
            .await
            .unwrap();
        storage.update_session("a2", &entries2, None).await.unwrap();
        assert_eq!(
            storage.load_session("a1").await.unwrap().as_ref(),
            Some(&entries1)
        );
        assert_eq!(
            storage.load_session("a2").await.unwrap().as_ref(),
            Some(&entries2)
        );

        tokio::time::sleep(Duration::from_secs(5)).await;

        assert_eq!(storage.load_session("a1").await.unwrap().as_ref(), None);
        assert_eq!(
            storage.load_session("a2").await.unwrap().as_ref(),
            Some(&entries2)
        );

        storage.update_session("a2", &entries3, None).await.unwrap();
        assert_eq!(
            storage.load_session("a2").await.unwrap().as_ref(),
            Some(&entries3)
        );

        storage.remove_session("a2").await.unwrap();
        assert_eq!(storage.load_session("a2").await.unwrap().as_ref(), None);
    }
}
