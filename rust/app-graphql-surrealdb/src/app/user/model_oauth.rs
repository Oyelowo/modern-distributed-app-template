use super::error;
use super::guards::{AuthGuard, RoleGuard};
use crate::app::post::Post;
use async_graphql::*;
use chrono::{serde::ts_nanoseconds_option, DateTime, Utc};
use futures_util::TryStreamExt;
use lib_common::oauth::account;
use lib_common::{authentication::TypedSession, error_handling::ApiHttpStatus};
use lib_my_macros::FieldsGetter;
use serde::{Deserialize, Serialize};
use surrealdb::Datastore;
use typed_builder::TypedBuilder;
use validator::Validate;

#[derive(
    InputObject,
    SimpleObject,
    TypedBuilder,
    Serialize,
    Deserialize,
    Debug,
    Clone,
    FieldsGetter,
    Validate,
)]
#[serde(rename_all = "camelCase")]
#[graphql(input_name = "AccountOauthInput")]
pub struct AccountOauth {
    /// unique identifier for the oauth provider. Don't use name of user because that could be changed
    #[graphql(skip_input)]
    pub id: String,

    pub display_name: Option<String>,

    #[validate(email)]
    pub email: Option<String>,
    pub email_verified: bool,

    pub provider: OauthProvider,
    pub provider_account_id: OauthProvider,
    pub access_token: String,
    pub refresh_token: Option<String>,

    /// access token expiration timestamp, represented as the number of seconds since the epoch (January 1, 1970 00:00:00 UTC).
    pub expires_at: Option<DateTime<Utc>>,
    pub token_type: Option<TokenType>, // Should probably be changed to an enum. i.e oauth | anything else?
    pub scopes: Vec<String>,

    #[builder(default)]
    pub id_token: Option<String>,
    /* NOTE
    In case of an OAuth 1.0 provider (like Twitter), you will have to look for oauth_token and oauth_token_secret string fields. GitHub also has an extra refresh_token_expires_in integer field. You have to make sure that your database schema includes these fields.

    A single User can have multiple Accounts, but each Account can only have one User.
                 */
    #[builder(default, setter(strip_option))]
    pub(crate) oauth_token: Option<String>,
    #[builder(default, setter(strip_option))]
    pub(crate) oauth_token_secret: Option<String>,
}

impl From<account::UserAccount> for AccountOauth {
    fn from(user_account: account::UserAccount) -> Self {
        Self {
            id: user_account.id,
            display_name: user_account.display_name,
            email: user_account.email,
            email_verified: user_account.email_verified,
            provider: user_account.provider.into(),
            provider_account_id: user_account.provider_account_id.into(),
            access_token: user_account.access_token,
            refresh_token: user_account.refresh_token,
            expires_at: user_account.expires_at,
            token_type: user_account.token_type.map(Into::into),
            scopes: user_account.scopes,
            id_token: user_account.id_token,
            oauth_token: user_account.oauth_token,
            oauth_token_secret: user_account.oauth_token_secret,
        }
    }
}

#[derive(Debug, Deserialize, Serialize, Clone, Enum, PartialEq, Eq, Copy, Hash)]
#[serde(rename_all = "lowercase")]
pub enum OauthProvider {
    Github,
    Google,
}

impl From<account::OauthProvider> for OauthProvider {
    fn from(provider: account::OauthProvider) -> Self {
        match provider {
            account::OauthProvider::Github => Self::Github,
            account::OauthProvider::Google => Self::Google,
        }
    }
}

#[derive(Debug, Deserialize, Serialize, Clone, Enum, PartialEq, Eq, Copy)]
#[serde(rename_all = "lowercase")]
pub enum TokenType {
    Bearer,
}

impl From<account::TokenType> for TokenType {
    fn from(token_type: account::TokenType) -> Self {
        match token_type {
            account::TokenType::Bearer => Self::Bearer,
        }
    }
}
