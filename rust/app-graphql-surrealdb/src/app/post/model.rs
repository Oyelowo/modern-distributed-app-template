use std::path::Display;

use async_graphql::*;

// use lib_common::error_handling::ApiHttpStatus;
use lib_my_macros::FieldsGetter;
use serde::{Deserialize, Serialize};
// use surrealdb::sql::Uuid;
use typed_builder::TypedBuilder;
use validator::Validate;

use crate::app::user::User;

#[derive(
    FieldsGetter,
    SimpleObject,
    InputObject,
    Clone,
    Serialize,
    Deserialize,
    TypedBuilder,
    Validate,
    Debug,
)]
#[serde(rename_all = "camelCase")]
#[graphql(input_name = "PostInput")]
#[graphql(complex)]
pub struct Post {
    #[builder(default)]
    #[graphql(skip_input)]
    pub id: Option<uuid::Uuid>,

    // This will usually come from session/jwt token / oauth token
    #[graphql(skip_input)]
    pub poster_id: uuid::Uuid,

    #[validate(length(min = 1))]
    pub title: String,

    #[validate(length(min = 1))]
    pub content: String,
}

#[ComplexObject]
impl Post {
    async fn poster(&self, _ctx: &Context<'_>) -> Result<User> {
        // let db = get_db_from_ctx(ctx)?;
        // let PostFields {
        //     id,
        //     posterId,
        //     title,
        //     content,
        // } = Post::get_fields_serialized();
        // let id = "lowo";
        // let Post = stringify!(Post);
        // let Select = "Select";
        // let From = "From";
        // let Where = "where";
        // // use Op::Select;

        // quote::quote!(#Select * #From #Post #Where #posterId=#id;);
        todo!()
    }
}
