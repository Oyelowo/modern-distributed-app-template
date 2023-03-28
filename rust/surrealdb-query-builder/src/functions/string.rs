/*
 * Author: Oyelowo Oyedayo
 * Email: oyelowooyedayo@gmail.com
 * Copyright (c) 2023 Oyelowo Oyedayo
 * Licensed under the MIT license
 */

// String functions
// These functions can be used when working with and manipulating text and string values.
//
// Function	Description
// string::concat()	Concatenates strings together
// string::endsWith()	Checks whether a string ends with another string
// string::join()	Joins strings together with a delimiter
// string::length()	Returns the length of a string
// string::lowercase()	Converts a string to lowercase
// string::repeat()	Repeats a string a number of times
// string::replace()	Replaces an occurence of a string with another string
// string::reverse()	Reverses a string
// string::slice()	Extracts and returns a section of a string
// string::slug()	Converts a string into human and URL-friendly string
// string::split()	Divides a string into an ordered list of substrings
// string::startsWith()	Checks whether a string starts with another string
// string::trim()	Removes whitespace from the start and end of a string
// string::uppercase()	Converts a string to uppercase
// string::words()	Splits a string into an array of separate words

use crate::sql::{Binding, Buildable, ToRawStatement};
use crate::{array, Field};
use surrealdb::sql;

use super::array::Function;
use super::math::Number;
use super::parse::String;

// struct String(sql::Value);

fn create_fn_with_single_string_arg(number: impl Into<String>, function_name: &str) -> Function {
    let binding = Binding::new(number.into());
    let query_string = format!(
        "string::{function_name}({})",
        binding.get_param_dollarised()
    );

    Function {
        query_string,
        bindings: vec![binding],
    }
}

pub fn length_fn(string: impl Into<String>) -> Function {
    create_fn_with_single_string_arg(string, "length")
}

#[macro_export]
macro_rules! length {
    ( $string:expr ) => {
        crate::functions::string::length_fn($string)
    };
}
pub use length;

pub fn lowercase_fn(string: impl Into<String>) -> Function {
    create_fn_with_single_string_arg(string, "lowercase")
}

#[macro_export]
macro_rules! lowercase {
    ( $string:expr ) => {
        crate::functions::string::lowercase_fn($string)
    };
}

pub use lowercase;

pub fn reverse_fn(string: impl Into<String>) -> Function {
    create_fn_with_single_string_arg(string, "reverse")
}

#[macro_export]
macro_rules! reverse {
    ( $string:expr ) => {
        crate::functions::string::reverse_fn($string)
    };
}

pub use reverse;

pub fn slug_fn(string: impl Into<String>) -> Function {
    create_fn_with_single_string_arg(string, "slug")
}

#[macro_export]
macro_rules! slug {
    ( $string:expr ) => {
        crate::functions::string::slug_fn($string)
    };
}

pub use slug;

pub fn concat_fn<T: Into<sql::Value>>(values: Vec<T>) -> Function {
    let mut bindings = vec![];

    let values = values
        .into_iter()
        .map(|v| {
            let binding = Binding::new(v.into());
            let string = binding.get_param_dollarised();
            bindings.push(binding);
            string
        })
        .collect::<Vec<_>>();

    let query_string = format!("string::concat({})", values.join(", "));

    Function {
        query_string,
        bindings,
    }
}

#[macro_export]
macro_rules! concat_ {
        ( $val:expr ) => {
            crate::functions::string::concat_fn( $val )
        };
        ($( $val:expr ),*) => {
            crate::functions::string::concat_fn(crate::array![ $( $val ), * ])
        };
    }

pub use concat_;

pub fn join_fn<T: Into<sql::Value>>(values: Vec<T>) -> Function {
    let mut bindings = vec![];

    let values = values
        .into_iter()
        .map(|v| {
            let binding = Binding::new(v.into());
            let string = binding.get_param_dollarised();
            bindings.push(binding);
            string
        })
        .collect::<Vec<_>>();

    let query_string = format!("string::join({})", values.join(", "));

    Function {
        query_string,
        bindings,
    }
}

#[macro_export]
macro_rules! join {
        ( $val:expr ) => {
            crate::functions::string::join_fn( $val )
        };
        ($( $val:expr ),*) => {
            crate::functions::string::join_fn(crate::array![ $( $val ), * ])
        };
    }

pub use join;

pub fn ends_with_fn(string: impl Into<String>, ending: impl Into<String>) -> Function {
    let string_binding = Binding::new(string.into());
    let ending_binding = Binding::new(ending.into());

    let query_string = format!(
        "string::ends_with({}, {})",
        string_binding.get_param_dollarised(),
        ending_binding.get_param_dollarised()
    );

    Function {
        query_string,
        bindings: vec![string_binding, ending_binding],
    }
}

#[macro_export]
macro_rules! ends_with {
    ( $string:expr, $ending: expr ) => {
        crate::functions::string::ends_with_fn($string, $ending)
    };
}

pub use ends_with;

pub fn starts_with_fn(string: impl Into<String>, starting: impl Into<String>) -> Function {
    let string_binding = Binding::new(string.into());
    let starting_binding = Binding::new(starting.into());

    let query_string = format!(
        "string::starts_with({}, {})",
        string_binding.get_param_dollarised(),
        starting_binding.get_param_dollarised()
    );

    Function {
        query_string,
        bindings: vec![string_binding, starting_binding],
    }
}

#[macro_export]
macro_rules! starts_with {
    ( $string:expr, $ending: expr ) => {
        crate::functions::string::starts_with_fn($string, $ending)
    };
}
pub use starts_with;

pub fn split_fn(string: impl Into<String>, by: impl Into<String>) -> Function {
    let string_binding = Binding::new(string.into());
    let by_binding = Binding::new(by.into());

    let query_string = format!(
        "string::split({}, {})",
        string_binding.get_param_dollarised(),
        by_binding.get_param_dollarised()
    );

    Function {
        query_string,
        bindings: vec![string_binding, by_binding],
    }
}

#[macro_export]
macro_rules! split {
    ( $string:expr, $by: expr ) => {
        crate::functions::string::split_fn($string, $by)
    };
}

pub use split;

pub fn repeat_fn(string: impl Into<String>, ending: impl Into<Number>) -> Function {
    let string_binding = Binding::new(string.into());
    let ending_binding = Binding::new(ending.into());

    let query_string = format!(
        "string::repeat({}, {})",
        string_binding.get_param_dollarised(),
        ending_binding.get_param_dollarised()
    );

    Function {
        query_string,
        bindings: vec![string_binding, ending_binding],
    }
}

#[macro_export]
macro_rules! repeat {
    ( $string:expr, $ending: expr ) => {
        crate::functions::string::repeat_fn($string, $ending)
    };
}

pub use repeat;

pub fn slice_fn(
    string: impl Into<String>,
    from: impl Into<Number>,
    to: impl Into<Number>,
) -> Function {
    let string_binding = Binding::new(string.into());
    let from_binding = Binding::new(from.into());
    let to_binding = Binding::new(to.into());

    let query_string = format!(
        "string::slice({}, {}, {})",
        string_binding.get_param_dollarised(),
        from_binding.get_param_dollarised(),
        to_binding.get_param_dollarised()
    );

    Function {
        query_string,
        bindings: vec![string_binding, from_binding, to_binding],
    }
}

#[macro_export]
macro_rules! slice {
    ( $string:expr, $from: expr, $to: expr ) => {
        crate::functions::string::slice_fn($string, $from, $to)
    };
}

pub use slice;

pub fn replace_fn(
    string: impl Into<String>,
    to_match: impl Into<String>,
    replacement: impl Into<String>,
) -> Function {
    let string_binding = Binding::new(string.into());
    let match_binding = Binding::new(to_match.into());
    let replacement_binding = Binding::new(replacement.into());

    let query_string = format!(
        "string::replace({}, {}, {})",
        string_binding.get_param_dollarised(),
        match_binding.get_param_dollarised(),
        replacement_binding.get_param_dollarised()
    );

    Function {
        query_string,
        bindings: vec![string_binding, match_binding, replacement_binding],
    }
}

#[macro_export]
macro_rules! replace {
    ( $string:expr, $match: expr, $replacement: expr ) => {
        crate::functions::string::replace_fn($string, $match, $replacement)
    };
}

pub use replace;

#[test]
fn test_concat_macro() {
    let title = Field::new("title");
    let result = concat_!(title, "one", 3, 4.15385, "  ", true);
    assert_eq!(result.fine_tune_params(), "string::concat($_param_00000001, $_param_00000002, $_param_00000003, $_param_00000004, $_param_00000005, $_param_00000006)");
    assert_eq!(
        result.to_raw().to_string(),
        "string::concat(title, 'one', 3, 4.15385, '  ', true)"
    );
}

#[test]
fn test_concat_macro_with_array() {
    let result = concat_!(array!["one", "two", 3, 4.15385, "five", true]);
    assert_eq!(result.fine_tune_params(), "string::concat($_param_00000001, $_param_00000002, $_param_00000003, $_param_00000004, $_param_00000005, $_param_00000006)");
    assert_eq!(
        result.to_raw().to_string(),
        "string::concat('one', 'two', 3, 4.15385, 'five', true)"
    );
}

#[test]
fn test_join_macro() {
    let title = Field::new("title");
    let result = join!(title, "one", 3, 4.15385, "  ", true);
    assert_eq!(result.fine_tune_params(), "string::join($_param_00000001, $_param_00000002, $_param_00000003, $_param_00000004, $_param_00000005, $_param_00000006)");
    assert_eq!(
        result.to_raw().to_string(),
        "string::join(title, 'one', 3, 4.15385, '  ', true)"
    );
}

#[test]
fn test_join_macro_with_array() {
    let result = join!(array!["one", "two", 3, 4.15385, "five", true]);
    assert_eq!(result.fine_tune_params(), "string::join($_param_00000001, $_param_00000002, $_param_00000003, $_param_00000004, $_param_00000005, $_param_00000006)");
    assert_eq!(
        result.to_raw().to_string(),
        "string::join('one', 'two', 3, 4.15385, 'five', true)"
    );
}

#[test]
fn test_ends_with_macro_with_field_and_string() {
    let name = Field::new("name");
    let result = ends_with!(name, "lowo");
    assert_eq!(
        result.fine_tune_params(),
        "string::ends_with($_param_00000001, $_param_00000002)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::ends_with(name, 'lowo')"
    );
}

#[test]
fn test_ends_with_macro_with_plain_strings() {
    let result = ends_with!("Oyelowo", "lowo");
    assert_eq!(
        result.fine_tune_params(),
        "string::ends_with($_param_00000001, $_param_00000002)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::ends_with('Oyelowo', 'lowo')"
    );
}

#[test]
fn test_starts_with_macro_with_field_and_string() {
    let name = Field::new("name");
    let result = starts_with!(name, "lowo");
    assert_eq!(
        result.fine_tune_params(),
        "string::starts_with($_param_00000001, $_param_00000002)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::starts_with(name, 'lowo')"
    );
}

#[test]
fn test_starts_with_macro_with_plain_strings() {
    let result = starts_with!("Oyelowo", "Oye");
    assert_eq!(
        result.fine_tune_params(),
        "string::starts_with($_param_00000001, $_param_00000002)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::starts_with('Oyelowo', 'Oye')"
    );
}
#[test]
fn test_split_macro_with_field_and_string() {
    let phrase = Field::new("phrase");
    let result = split!(phrase, ", ");
    assert_eq!(
        result.fine_tune_params(),
        "string::split($_param_00000001, $_param_00000002)"
    );
    assert_eq!(result.to_raw().to_string(), "string::split(phrase, ', ')");
}

#[test]
fn test_split_macro_with_plain_strings() {
    let result = split!("With great power, comes great responsibility", ", ");
    assert_eq!(
        result.fine_tune_params(),
        "string::split($_param_00000001, $_param_00000002)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::split('With great power, comes great responsibility', ', ')"
    );
}

#[test]
fn test_length_with_macro_with_field() {
    let name = Field::new("name");
    let result = length!(name);
    assert_eq!(
        result.fine_tune_params(),
        "string::length($_param_00000001)"
    );
    assert_eq!(result.to_raw().to_string(), "string::length(name)");
}

#[test]
fn test_length_with_macro_with_plain_string() {
    let result = length!("toronto");
    assert_eq!(
        result.fine_tune_params(),
        "string::length($_param_00000001)"
    );
    assert_eq!(result.to_raw().to_string(), "string::length('toronto')");
}

#[test]
fn test_reverse_with_macro_with_field() {
    let name = Field::new("name");
    let result = reverse!(name);
    assert_eq!(
        result.fine_tune_params(),
        "string::reverse($_param_00000001)"
    );
    assert_eq!(result.to_raw().to_string(), "string::reverse(name)");
}

#[test]
fn test_reverse_with_macro_with_plain_string() {
    let result = reverse!("oyelowo");
    assert_eq!(
        result.fine_tune_params(),
        "string::reverse($_param_00000001)"
    );
    assert_eq!(result.to_raw().to_string(), "string::reverse('oyelowo')");
}

#[test]
fn test_slug_with_macro_with_field() {
    let name = Field::new("name");
    let result = slug!(name);
    assert_eq!(result.fine_tune_params(), "string::slug($_param_00000001)");
    assert_eq!(result.to_raw().to_string(), "string::slug(name)");
}

#[test]
fn test_slug_with_macro_with_plain_string() {
    let result = slug!("Codebreather is from #Jupiter");
    assert_eq!(result.fine_tune_params(), "string::slug($_param_00000001)");
    assert_eq!(
        result.to_raw().to_string(),
        "string::slug('Codebreather is from #Jupiter')"
    );
}

#[test]
fn test_lowercase_with_macro_with_field() {
    let name = Field::new("name");
    let result = lowercase!(name);
    assert_eq!(
        result.fine_tune_params(),
        "string::lowercase($_param_00000001)"
    );
    assert_eq!(result.to_raw().to_string(), "string::lowercase(name)");
}

#[test]
fn test_lowercase_with_macro_with_plain_string() {
    let result = lowercase!("OYELOWO");
    assert_eq!(
        result.fine_tune_params(),
        "string::lowercase($_param_00000001)"
    );
    assert_eq!(result.to_raw().to_string(), "string::lowercase('OYELOWO')");
}

#[test]
fn test_repeat_with_macro_with_fields() {
    let name = Field::new("name");
    let count = Field::new("count");
    let result = repeat!(name, count);
    assert_eq!(
        result.fine_tune_params(),
        "string::repeat($_param_00000001, $_param_00000002)"
    );
    assert_eq!(result.to_raw().to_string(), "string::repeat(name, count)");
}

#[test]
fn test_repeat_with_macro_with_plain_string() {
    let result = repeat!("Oyelowo", 5);
    assert_eq!(
        result.fine_tune_params(),
        "string::repeat($_param_00000001, $_param_00000002)"
    );
    assert_eq!(result.to_raw().to_string(), "string::repeat('Oyelowo', 5)");
}

#[test]
fn test_replace_with_macro_with_fields() {
    let name = Field::new("name");
    let last_name = Field::new("last_name");
    let first_name = Field::new("first_name");

    let result = replace!(name, last_name, first_name);
    assert_eq!(
        result.fine_tune_params(),
        "string::replace($_param_00000001, $_param_00000002, $_param_00000003)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::replace(name, last_name, first_name)"
    );
}

#[test]
fn test_slice_with_macro_with_plain_string() {
    let result = slice!("Oyelowo", 3, 5);
    assert_eq!(
        result.fine_tune_params(),
        "string::slice($_param_00000001, $_param_00000002, $_param_00000003)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::slice('Oyelowo', 3, 5)"
    );
}

#[test]
fn test_slice_with_macro_with_fields() {
    let name = Field::new("name");
    let last_name = Field::new("last_name");
    let first_name = Field::new("first_name");

    let result = slice!(name, last_name, first_name);
    assert_eq!(
        result.fine_tune_params(),
        "string::slice($_param_00000001, $_param_00000002, $_param_00000003)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::slice(name, last_name, first_name)"
    );
}

#[test]
fn test_replace_with_macro_with_plain_strings() {
    let result = replace!("Oyelowo Oyedayo", "Oyelowo", "Oyedayo");
    assert_eq!(
        result.fine_tune_params(),
        "string::replace($_param_00000001, $_param_00000002, $_param_00000003)"
    );
    assert_eq!(
        result.to_raw().to_string(),
        "string::replace('Oyelowo Oyedayo', 'Oyelowo', 'Oyedayo')"
    );
}