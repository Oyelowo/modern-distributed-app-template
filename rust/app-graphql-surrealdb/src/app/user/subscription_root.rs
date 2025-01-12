use async_graphql::{Context, ErrorExtensions, Result, Subscription};
use futures_util::Stream;
use lib_common::error_handling::ApiHttpStatus;

use crate::utils::token::Token;

#[derive(Default)]
pub struct UserSubscriptionRoot;

#[Subscription]
impl UserSubscriptionRoot {
    async fn values(&self, ctx: &Context<'_>) -> Result<impl Stream<Item = i32>> {
        if *Token::from_ctx(ctx)? != "123456".to_string().into() {
            return Err(ApiHttpStatus::Forbidden("Invalid token".into()).extend());
        }
        Ok(futures_util::stream::once(async move { 10 }))
    }
}
