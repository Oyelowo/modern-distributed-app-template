use async_graphql::*;
use serde::{Deserialize, Serialize};

/// This macro generates a basic error struct with two fields: `message` and `solution`.
///
/// The struct is derived from the `SimpleObject` and `Serialize` and `Deserialize` traits.
/// The name of the struct is determined by the `$name` parameter.
macro_rules! generate_basic_error_struct {
    (
        $name:ident
    ) => {
        #[derive(SimpleObject, Serialize, Deserialize)]
        pub struct $name {
            pub message: String,
            pub solution: String,
        }
    };
}

generate_basic_error_struct!(Error);
generate_basic_error_struct!(ServerError);
generate_basic_error_struct!(UserNotFoundError);
generate_basic_error_struct!(UserSessionExpiredError);
generate_basic_error_struct!(UserHaveNoAccessError);
generate_basic_error_struct!(UserGenericError);

// Write more specific error messages here with more fields

#[derive(SimpleObject, Serialize, Deserialize)]
pub struct UserRegisterInvalidInputError {
    username_error_message: String,
    email_error_message: String,
    date_of_birth_error_message: String,
    password_error_message: String,
}

#[derive(SimpleObject, Serialize, Deserialize)]
pub struct UserSignInInvalidInputError {
    username_error_message: String,
    login_error_message: String,
    email_error_message: String,
    password_error_message: String,
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
    ServerError(ServerError),
    UserSessionExpiredError(UserSessionExpiredError),
}
