/*
 * Author: Oyelowo Oyedayo
 * Email: oyelowooyedayo@gmail.com
 * Copyright (c) 2023 Oyelowo Oyedayo
 * Licensed under the MIT license
 */

// Embedded scripting functions
// SurrealDB allows for advanced functions with complicated logic, by allowing embedded functions to be written in JavaScript. These functions support the ES2020 JavaScript specification.
//
// Simple functions
// Embedded JavaScript functions within SurrealDB support all functionality in the ES2020 specification including async / await functions, and generator functions. Any value from SurrealDB is converted into a JavaScript type automatically, and the return value from the JavaScript function is converted to a SurrealDB value.
//
// CREATE person SET scores = function() {
// 	return [1,2,3].map(v => v * 10);
// };
//
//

use crate::sql::{Param, ToRawStatement};

use super::array::Function;

fn function_fn<T: Into<Param>>(args: Vec<T>, jscode_body: impl Into<String>) -> Function {
    let query_string = format!(
        "function({}) {}",
        args.into_iter()
            .map(|a| {
                let a: Param = a.into();
                let a = a.to_string();
                a
            })
            .collect::<Vec<_>>()
            .join(", "),
        jscode_body.into()
    );

    Function {
        query_string,
        bindings: vec![],
    }
}

#[macro_export]
macro_rules! function {
    (($($arg:expr),*), {$($code:tt)*}) => {
        function_fn(vec![$($arg),*] as Vec<Param>, stringify!({$($code)*}))
    };
    (($($arg:expr),*), $($code:tt)*) => {
        function_fn(vec![$($arg),*] as Vec<Param>, concat!($($code)*))
    };
}
pub use function;

#[test]
fn test_function_without_args() {
    let f2 = function!((), {
        return [1,2,3].map(v => v * 10);
    });
    assert_eq!(f2.to_string(), "function() { return [1, 2, 3].map(v => v * 10) ; }");
    assert_eq!(
        f2.to_raw().to_string(),
        "function() { return [1, 2, 3].map(v => v * 10) ; }"
    );
}

#[test]
fn test_function_with_args() {
    let name = Param::new("name");
    let id = Param::new("id");

    let f2 = function!((name, id), {
        return [1,2,3].map(v => v * 10 * $name * $id);
    });
    assert_eq!(
        f2.to_string(),
        "function($name, $id) { return [1, 2, 3].map(v => v * 10 * $name * $id) ; }"
    );
    assert_eq!(
        f2.to_raw().to_string(),
        "function($name, $id) { return [1, 2, 3].map(v => v * 10 * $name * $id) ; }"
    );
}

#[test]
fn test_function_with_args_code_str() {
    let name = Param::new("name");
    let id = Param::new("id");

    let f2 = function!(
        (name, id),
        "{ return [1,2,3].map(v => v * 10 * $name * $id) ; }"
    );
    insta::assert_display_snapshot!(f2);
    insta::assert_display_snapshot!(f2.to_raw());
}