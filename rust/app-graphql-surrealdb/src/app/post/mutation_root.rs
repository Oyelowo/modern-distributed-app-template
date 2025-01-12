use super::model::Post;
use async_graphql::*;
use lib_common::error_handling::ApiHttpStatus;
use log::warn;
use surrealdb::Datastore;
use validator::Validate;

#[derive(Default)]
pub struct PostMutationRoot;

#[Object]
impl PostMutationRoot {
    async fn create_post(
        &self,
        ctx: &Context<'_>,
        #[graphql(desc = "post")] mut post: Post,
    ) -> Result<Post> {
        post.validate().map_err(|e| {
            ApiHttpStatus::BadRequest(format!(
                "Invalid Input. Please check and correct: Error: {e:?}"
            ))
            .extend()
        })?;

        let db = ctx.data::<Datastore>()?;
        // post.save(db, None).await.map_err(|e| {
        //     warn!("{e:?}");
        //     ApiHttpStatus::InternalServerError("Server Error. Try again".into()).extend()
        // })?;

        // Ok(post)
        todo!()
    }
}
