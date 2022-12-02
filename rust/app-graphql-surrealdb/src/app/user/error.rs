use async_graphql::*;
use serde::{Deserialize, Serialize};

#[derive(SimpleObject, Serialize, Deserialize)]
pub struct UserNotFoundError {
    pub message: String,
    pub solution: String,
    // pub more_field: String,
}

#[derive(SimpleObject, Serialize, Deserialize)]
pub struct UserSessionExpiredError {
    pub message: String,
    pub solution: String,
    // pub more_field: String,
}

#[derive(SimpleObject, Serialize, Deserialize)]
pub struct ServerError {
    pub message: String,
    pub solution: String,
    // pub more_field: String,
}



#[derive(SimpleObject, Serialize, Deserialize)]
pub struct UserRegisterInvalidInputError {
    message: String,
    title: String,
    solution: String,
    login_error_message: String,
    email_error_message: String,
    password_error_message: String,
}

#[derive(SimpleObject, Serialize, Deserialize)]
pub struct UserSignInInvalidInputError {
    message: String,
    title: String,
    solution: String,
    username_error_message: String,
    login_error_message: String,
    email_error_message: String,
    password_error_message: String,
}

#[derive(SimpleObject, Serialize, Deserialize)]
pub struct UserHaveNoAccessError {
    title: String,
    message: String,
    solution: String,
    more_field: String,
}

#[derive(SimpleObject, Serialize, Deserialize)]
pub struct UserGenericError {
    title: String,
    message: String,
    solution: String,
    more_field: String,
}

#[derive(Interface)]
#[graphql(
    field(name = "message", type = "String"),
    field(name = "solution", type = "String")
)]
pub enum UserBaseError {
    NotFound(UserNotFoundError),
    HaveNoAccess(UserHaveNoAccessError),
    Generic(UserGenericError),
    RegisterInvalidInput(UserRegisterInvalidInputError),
    ServerError(ServerError)
}
