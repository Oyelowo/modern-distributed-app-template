/*
 * Author: Oyelowo Oyedayo
 * Email: oyelowooyedayo@gmail.com
 * Copyright (c) 2023 Oyelowo Oyedayo
 * Licensed under the MIT license
 */

// array::add() Adds an item to an array if it doesn't exist
// array::all() Checks whether all array values are truthy
// array::any() Checks whether any array value is truthy
// array::append() Appends an item to the end of an array
// array::combine()	Combines all values from two arrays together
// array::complement() Returns the complement of two arrays
// array::concat()	Returns the merged values from two arrays
// array::difference()	Returns the difference between two arrays
// array::distinct()	Returns the unique items in an array
// array::flatten() Flattens multiple arrays into a single array
// array::group() Flattens and returns the unique items in an array
// array::insert() Inserts an item at the end of an array, or in a specific position
// array::intersect()	Returns the values which intersect two arrays
// array::len()	Returns the length of an array
// array::max() Returns the maximum item in an array
// array::min() Returns the minimum item in an array
// array::pop() Returns the last item from an array
// array::prepend() Prepends an item to the beginning of an array
// array::push() Appends an item to the end of an array
// array::remove() Removes an item at a specific position from an array
// array::reverse() Reverses the sorting order of an array
// array::sort()	Sorts the values in an array in ascending or descending order
// array::sort::asc()	Sorts the values in an array in ascending order
// array::sort::desc()	Sorts the values in an array in descending order
// array::union()

use std::fmt::Display;

use crate::{ArrayLike, Buildable, Erroneous, Function, NumberLike, Parametric, Valuex};

/// The array::add function adds an item to an array only if it doesn't exist.
/// array::add(array, value) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::add(["one", "two"], "three");
/// ["one", "two", "three"]
pub fn add_fn(arr: impl Into<ArrayLike>, value: impl Into<Valuex>) -> Function {
    let arr: ArrayLike = arr.into();
    let value: Valuex = value.into();
    let mut bindings = vec![];
    let mut errors = vec![];
    bindings.extend(arr.get_bindings());
    bindings.extend(value.get_bindings());
    errors.extend(arr.get_errors());
    errors.extend(value.get_errors());

    Function {
        query_string: format!("array::add({}, {})", arr.build(), value.build()),
        bindings,
        errors,
    }
}

/// The array::add function adds an item to an array only if it doesn't exist.
/// # Arguments
/// * `arr` - The array to add the value to. Could be an array, `Field` or `Param`
/// * `value` - The value to add to the array. any supported surrealdb value, `Field` or `Param`
/// # Example
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::add!(vec![1, 2, 3], 4);
/// array::add!(&[1, 2, 3], 4);
/// array::add!(arr![1, "oyelowo", 3], 4);
///
/// let numbers = Field::new("numbers");
/// let value = Param::new("value");
/// let result = array::add!(numbers, value);
///
/// assert_eq!(
///    result.to_raw().build(),
///    "array::add(numbers, $value)"
/// );
/// ```
#[macro_export]
macro_rules! array_add {
    ( $arr:expr, $value:expr ) => {
        $crate::functions::array::add_fn($arr, $value)
    };
}
pub use array_add as add;

#[cfg(test)]
mod add_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_add_with_values() {
        let result = array::add!(vec![1, 2, 3], 4);

        assert_eq!(result.get_bindings().len(), 2);
        assert_eq!(
            result.fine_tune_params(),
            "array::add($_param_00000001, $_param_00000002)"
        );
        assert_eq!(result.to_raw().build(), "array::add([1, 2, 3], 4)");
    }

    #[test]
    fn test_add_with_field_and_param() {
        let numbers = Field::new("numbers");
        let value = Param::new("value");
        let result = array::add!(numbers, value);

        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::add(numbers, $value)");
        assert_eq!(result.to_raw().build(), "array::add(numbers, $value)");
    }
}

/// The array::all function checks whether all array values are truthy.
///
/// array::all(array) -> bool
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::all([1, 2, 3, NONE, 'SurrealDB', 5]);
/// false
pub fn all_fn(arr: impl Into<ArrayLike>) -> Function {
    let arr: ArrayLike = arr.into();
    let mut bindings = vec![];
    let mut errors = vec![];
    bindings.extend(arr.get_bindings());
    errors.extend(arr.get_errors());

    Function {
        query_string: format!("array::all({})", arr.build()),
        bindings,
        errors,
    }
}

/// The array::all function checks whether all array values are truthy.
///
/// # Arguments
/// * `arr` - The array to check. Could be an array, `Field` or `Param`
///
/// # Example
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::all!(vec![1, 2, 3, 4, 5]);
/// array::all!(&[1, 2, 3, 4, 5]);
/// array::all!(arr![1, 2, 3, 4, 5]);
///
/// # let numbers_field = Field::new("numbers");
/// let result = array::all!(numbers_field);
///
/// assert_eq!(
///   result.to_raw().build(),
///   "array::all(numbers)"
///   );
///   ```
#[macro_export]
macro_rules! array_all {
    ( $arr:expr ) => {
        $crate::functions::array::all_fn($arr)
    };
}
pub use array_all as all;
#[cfg(test)]
mod all_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_all_with_values() {
        let result = array::all!(vec![1, 2, 3, 4, 5]);

        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(result.fine_tune_params(), "array::all($_param_00000001)");
        assert_eq!(result.to_raw().build(), "array::all([1, 2, 3, 4, 5])");
    }

    #[test]
    fn test_all_with_field() {
        let numbers = Field::new("numbers");
        let result = array::all!(numbers);

        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::all(numbers)");
        assert_eq!(result.to_raw().build(), "array::all(numbers)");
    }
}

/// The array::any function checks whether any array values are truthy.
///
/// array::any(array) -> bool
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::any([1, 2, 3, NONE, 'SurrealDB', 5]);
/// true
pub fn any_fn(arr: impl Into<ArrayLike>) -> Function {
    let arr: ArrayLike = arr.into();
    let mut bindings = vec![];
    let mut errors = vec![];
    bindings.extend(arr.get_bindings());
    errors.extend(arr.get_errors());

    Function {
        query_string: format!("array::any({})", arr.build()),
        bindings,
        errors,
    }
}

/// The array::any function checks whether any array values are truthy.
///
/// # Arguments
/// * `arr` - The array to check. Could be an array, `Field` or `Param`
///
/// # Example
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::any!(vec![1, 2, 3, 4, 5]);
/// array::any!(&[1, 2, 3, 4, 5]);
/// array::any!(arr![1, 2, 3, 4, 5]);
///
/// let numbers = Field::new("numbers");
/// let result = array::any!(numbers);
/// assert_eq!(
///  result.to_raw().build(),
///  "array::any(numbers)"
///  );
///  ```
#[macro_export]
macro_rules! array_any {
    ( $arr:expr ) => {
        $crate::functions::array::any_fn($arr)
    };
}
pub use array_any as any;
#[cfg(test)]
mod any_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_any_with_values() {
        let result = array::any!(vec![1, 2, 3, 4, 5]);

        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(result.fine_tune_params(), "array::any($_param_00000001)");
        assert_eq!(result.to_raw().build(), "array::any([1, 2, 3, 4, 5])");
    }

    #[test]
    fn test_any_with_field() {
        let numbers = Field::new("numbers");
        let result = array::any!(numbers);

        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::any(numbers)");
        assert_eq!(result.to_raw().build(), "array::any(numbers)");
    }
}

/// The array::append function appends a value to the end of an array.
///
/// array::append(array, value) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::append([1,2,3,4], 5);
/// [1,2,3,4,5]
pub fn append_fn(arr: impl Into<ArrayLike>, value: impl Into<Valuex>) -> Function {
    let arr: ArrayLike = arr.into();
    let value: Valuex = value.into();
    let mut bindings = vec![];
    let mut errors = vec![];
    bindings.extend(arr.get_bindings());
    bindings.extend(value.get_bindings());
    errors.extend(arr.get_errors());
    errors.extend(value.get_errors());
    Function {
        query_string: format!("array::append({}, {})", arr.build(), value.build()),
        bindings,
        errors,
    }
}

/// The array::append function appends a value to the end of an array.
///
/// # Arguments
/// * `arr` - The array to append to. Could be an array, `Field` or `Param`
/// * `value` - The value to append. Could be a `Value`, `Field` or `Param`
///
/// # Example
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::append!(vec![1, 2, 3, 4, 5], 6);
/// array::append!(&[1, 2, 3, 4, 5], 6);
/// array::append!(arr![1, 2, 3, 4, 5], 6);
///
/// # let value_field = Field::new("value_field");
/// # let value_param = Param::new("value_param");
/// array::append!(vec![1, 2, 3, 4, 5], value_field);
/// array::append!(vec![1, 2, 3, 4, 5], value_param);
///
/// # let numbers = Field::new("numbers");
/// # let value = Field::new("value");
/// let result = array::append!(numbers, value);
/// assert_eq!(
///         result.to_raw().build(),
///         "array::append(numbers, value)"
///     );
/// ```
#[macro_export]
macro_rules! array_append {
    ( $arr:expr, $value:expr ) => {
        $crate::functions::array::append_fn($arr, $value)
    };
}
pub use array_append as append;
#[cfg(test)]
mod append_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_append_with_values() {
        let result = array::append!(vec![1, 2, 3, 4, 5], 6);

        assert_eq!(result.get_bindings().len(), 2);
        assert_eq!(
            result.fine_tune_params(),
            "array::append($_param_00000001, $_param_00000002)"
        );
        assert_eq!(result.to_raw().build(), "array::append([1, 2, 3, 4, 5], 6)");
    }

    #[test]
    fn test_append_with_field() {
        let numbers = Field::new("numbers");
        let value = Field::new("value");
        let result = array::append!(numbers, value);

        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::append(numbers, value)");
        assert_eq!(result.to_raw().build(), "array::append(numbers, value)");
    }

    #[test]
    fn test_append_with_param() {
        let numbers = Field::new("numbers");
        let value = Param::new("value");
        let result = array::append!(numbers, value);

        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::append(numbers, $value)");
        assert_eq!(result.to_raw().build(), "array::append(numbers, $value)");
    }
}

fn create_array_helper(
    arr1: impl Into<ArrayLike>,
    arr2: impl Into<ArrayLike>,
    func_name: &str,
) -> Function {
    let arr1: ArrayLike = arr1.into();
    let arr2: ArrayLike = arr2.into();
    let mut bindings = vec![];
    let mut errors = vec![];
    bindings.extend(arr1.get_bindings());
    bindings.extend(arr2.get_bindings());
    errors.extend(arr1.get_errors());
    errors.extend(arr2.get_errors());
    Function {
        query_string: format!("array::{func_name}({}, {})", arr1.build(), arr2.build()),
        bindings,
        errors,
    }
}

macro_rules! create_fn_with_two_array_args {
    ($(#[$attr:meta])* => $function_name:expr) => {
        paste::paste! {
            $(#[$attr])*
            pub fn [<$function_name _fn>](arr1: impl Into<$crate::ArrayLike>, arr2: impl Into<$crate::ArrayLike>) -> $crate::Function {
                create_array_helper(arr1, arr2, $function_name)
            }

            $(#[$attr])*
            #[macro_export]
            macro_rules! [<array_ $function_name>] {
                ( $arr1:expr, $arr2:expr ) => {
                    $crate::functions::array::[<$function_name _fn>]($arr1, $arr2)
                };
            }
            pub use [<array_ $function_name>] as [<$function_name>];

            #[cfg(test)]
            mod [<test_ $function_name>] {
                use $crate::{functions::array, *};

                #[test]
                fn [<test $function_name fn_on_array_macro_on_diverse_array>]() {
                    let age = Field::new("age");
                    let arr1 = arr![1, "Oyelowo", age];
                    let arr2 = arr![4, "dayo", 6];
                    let result = functions::array::[<$function_name _fn>](arr1, arr2);
                    assert_eq!(
                        result.fine_tune_params(),
                        format!("array::{}([$_param_00000001, $_param_00000002, age], [$_param_00000003, $_param_00000004, $_param_00000005])", $function_name)
                    );
                    assert_eq!(
                        result.to_raw().build(),
                        format!("array::{}([1, 'Oyelowo', age], [4, 'dayo', 6])", $function_name)
                    );
                }

                #[test]
                fn [<test $function_name _fn_on_same_element_types>]() {
                    let arr1 = arr![1, 2, 3];
                    let arr2 = arr![4, 5, 6];
                    let result = array::[<$function_name _fn>](arr1, arr2);
                    assert_eq!(
                        result.fine_tune_params(),
                        format!("array::{}([$_param_00000001, $_param_00000002, $_param_00000003], \
                            [$_param_00000004, $_param_00000005, $_param_00000006])", $function_name)
                    );

                    assert_eq!(
                        result.to_raw().build(),
                        format!("array::{}([1, 2, 3], [4, 5, 6])", $function_name)
                    );
                }

                #[test]
                fn [<test $function_name _macro_on_array_macro_on_diverse_array>]() {
                    let age = Field::new("age");
                    let arr1 = arr![1, "Oyelowo", age];
                    let arr2 = arr![4, "dayo", 6];
                    let result = array::[<$function_name>]!(arr1, arr2);
                    assert_eq!(
                        result.fine_tune_params(),
                        format!("array::{}([$_param_00000001, $_param_00000002, age], \
                            [$_param_00000003, $_param_00000004, $_param_00000005])", $function_name)
                    );
                    assert_eq!(
                        result.to_raw().build(),
                        format!("array::{}([1, 'Oyelowo', age], [4, 'dayo', 6])", $function_name)
                    );
                }

                #[test]
                fn [<test $function_name _macro_on_same_element_types>]() {
                    let arr1 = $crate::arr![1, 2, 3];
                    let arr2 = $crate::arr![4, 5, 6];
                    let result = $crate::functions::array::[<$function_name>]!(arr1, arr2);
                    assert_eq!(
                        result.fine_tune_params(),
                        format!("array::{}([$_param_00000001, $_param_00000002, $_param_00000003], \
                            [$_param_00000004, $_param_00000005, $_param_00000006])", $function_name)
                    );

                    assert_eq!(
                        result.to_raw().build(),
                        format!("array::{}([1, 2, 3], [4, 5, 6])", $function_name)
                    );
                }

                #[test]
                fn [<test $function_name _macro_on_fields>]() {
                    let students_ages = Field::new("students_ages");
                    let teachers_ages = Field::new("teachers_ages");
                    let result = array::[<$function_name>]!(students_ages, teachers_ages);
                    assert_eq!(
                        result.fine_tune_params(),
                        format!("array::{}(students_ages, teachers_ages)", $function_name)
                    );

                    assert_eq!(
                        result.to_raw().build(),
                        format!("array::{}(students_ages, teachers_ages)", $function_name)
                    );
                }
        }
        }
    };
}

create_fn_with_two_array_args!(
    /// "The array::combine function combines all values from two arrays together, returning an array of arrays.
    ///
    ///   # Arguments
    ///   * `arr1` - The first array to combine. A vector, field or param.
    ///   * `arr2` - The second array to combine. A vector, field or param.
    ///
    /// # Examples
    /// ```rust
    /// # use surreal_query_builder as  surreal_orm;
    /// use surreal_orm::{*, functions::array};
    /// let own_goals = Field::new("own_goals");
    /// let goals = Param::new("goals");
    ///
    /// array::combine!(vec![1, 2, 3], vec![4, 5, 6]);
    /// array::combine!(own_goals, goals);
    /// array::combine!(&[1, 2, 3], &[4, 5, 6]);
    ///
    /// // It is also aliased as array_combine;
    /// array_combine!(&[1, 2, 3], &[4, 5, 6]);
    /// ```
=>
    "combine"
);

create_fn_with_two_array_args!(
    /// The array::concat function merges two arrays together, returning an array which may contain duplicate values. If you want to remove duplicate values from the resulting array, then use the array::union() function
    ///
    ///   # Arguments
    ///   * `arr1` - The first array to concat. A vector, field or param.
    ///   * `arr2` - The second array to concat. A vector, field or param.
    /// # Examples
    /// ```rust
    /// # use surreal_query_builder as  surreal_orm;
    /// use surreal_orm::{*, functions::array};
    /// let own_goals = Field::new("own_goals");
    /// let goals = Param::new("goals");
    ///
    /// array::concat!(vec![1, 2, 3], vec![4, 5, 6]);
    /// array::concat!(own_goals, goals);
    /// array::concat!(&[1, 2, 3], &[4, 5, 6]);
    ///
    /// // It is also aliased as array_concat;
    /// array_concat!(&[1, 2, 3], &[4, 5, 6]);
    /// ```
    =>
    "concat"
);

create_fn_with_two_array_args!(
    /// The array::union function combines two arrays together, removing duplicate values, and returning a single array.
    /// # Examples
    ///
    /// # Arguments
    ///  * `arr1` -  A vector, field or param.
    ///  * `arr2` -  A vector, field or param.
    ///
    /// ```rust
    /// # use surreal_query_builder as  surreal_orm;
    /// use surreal_orm::{*, functions::array};
    /// let own_goals = Field::new("own_goals");
    /// let goals = Param::new("goals");
    ///
    /// array::union!(vec![1, 2, 3], vec![4, 5, 6]);
    /// array::union!(own_goals, goals);
    /// array::union!(&[1, 2, 3], &[4, 5, 6]);
    /// // It is also aliased as array_union;
    /// array_union!(&[1, 2, 3], &[4, 5, 6]);
    /// ```
    =>
    "union"
);

create_fn_with_two_array_args!(
    /// The array::difference determines the difference between two arrays, returning a single array
    /// containing items which are not in both arrays.
    ///
    /// # Arguments
    /// * `arr1` -  A vector, field or param.
    /// * `arr2` -  A vector, field or param.
    ///
    /// # Examples
    /// ```rust
    /// # use surreal_query_builder as  surreal_orm;
    /// use surreal_orm::{*, functions::array};
    /// let own_goals = Field::new("own_goals");
    /// let goals = Param::new("goals");
    ///
    /// array::difference!(vec![1, 2, 3], vec![4, 5, 6]);
    /// array::difference!(own_goals, goals);
    /// array::difference!(&[1, 2, 3], &[4, 5, 6]);
    ///
    /// // It is also aliased as array_difference;
    /// array_difference!(&[1, 2, 3], &[4, 5, 6]);
    /// ```
    =>
    "difference"
);

create_fn_with_two_array_args!(
    /// The array::intersect function calculates the values which intersect two arrays, returning a
    /// single array containing the values which are in both arrays.
    /// array::intersect(array, array) -> array
    /// The following example shows this function, and its output, when used in a select statement:
    ///
    /// SELECT * FROM array::intersect([1,2,3,4], [3,4,5,6]);
    /// [3,4]
    ///
    /// # Arguments
    /// * `arr1` -  A vector, field or param.
    /// * `arr2` -  A vector, field or param.
    ///
    /// # Examples
    ///
    /// ```rust
    /// # use surreal_query_builder as  surreal_orm;
    /// use surreal_orm::{*, functions::array};
    /// let own_goals = Field::new("own_goals");
    /// let goals = Param::new("goals");
    ///
    /// array::intersect!(vec![1, 2, 3], vec![4, 5, 6]);
    /// array::intersect!(own_goals, goals);
    /// array::intersect!(&[1, 2, 3], &[4, 5, 6]);
    ///
    /// // It is also aliased as array_intersect;
    /// array_intersect!(&[1, 2, 3], &[4, 5, 6]);
    /// ```
    =>
    "intersect"
);

create_fn_with_two_array_args!(
    /// The array::complement function returns the complement of two arrays, returning a single array containing items which are not in the second array.
    /// array::complement(array, array) -> array
    /// The following example shows this function, and its output, when used in a select statement:
    ///
    /// SELECT * FROM array::complement([1,2,3,4], [3,4,5,6]);
    /// [1,2]
    ///
    /// # Arguments
    /// * `arr1` -  A vector, field or param.
    /// * `arr2` -  A vector, field or param.
    ///
    /// # Examples
    ///
    /// ```rust
    /// # use surreal_query_builder as  surreal_orm;
    /// use surreal_orm::{*, functions::array};
    /// let own_goals = Field::new("own_goals");
    /// let goals = Param::new("goals");
    ///
    /// array::complement!(vec![1, 2, 3, 4], vec![3, 4, 5, 6]);
    /// array::complement!(own_goals, goals);
    /// array::complement!(&[1, 2, 3, 4], &[3, 4, 5, 6]);
    ///
    /// // It is also aliased as array_complement;
    /// array_complement!(&[1, 2, 3, 4], &[3, 4, 5, 6]);
    /// ```
    =>
    "complement"
);

/// The array::distinct function calculates the unique values in an array, returning a single array.
pub fn distinct_fn(arr: impl Into<ArrayLike>) -> Function {
    let arr: ArrayLike = arr.into();

    Function {
        query_string: format!("array::distinct({})", arr.build()),
        bindings: arr.get_bindings(),
        errors: arr.get_errors(),
    }
}

/// The array::distinct function calculates the unique values in an array, returning a single
/// array.
/// # Arguments
/// * `arr` -  A vector, field or param.
///
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// let own_goals = Field::new("own_goals");
/// let goals = Param::new("goals");
///
/// array::distinct!(vec![1, 2, 3]);
/// array::distinct!(&[1, 2, 3]);
/// array::distinct!(own_goals);
/// array::distinct!(goals);
///
/// // It is also aliased as array_distinct;
/// array_distinct!(vec![1, 2, 3]);
/// ```
#[macro_export]
macro_rules! array_distinct {
    ( $arr:expr ) => {
        $crate::functions::array::distinct_fn($arr)
    };
}
pub use array_distinct as distinct;

#[cfg(test)]
mod array_distinct_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_distinct() {
        let result = array::distinct!(vec![1, 2, 3]);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::distinct($_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::distinct([1, 2, 3])");
    }

    #[test]
    fn test_array_distinct_field() {
        let own_goals = Field::new("own_goals");

        let result = array::distinct!(own_goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::distinct(own_goals)");
        assert_eq!(result.to_raw().build(), "array::distinct(own_goals)");
    }

    #[test]
    fn test_array_distinct_param() {
        let goals = Param::new("goals");

        let result = array::distinct!(goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::distinct($goals)");
        assert_eq!(result.to_raw().build(), "array::distinct($goals)");
    }
}

/// The array::flatten flattens an array of arrays, returning a new array with all sub-array elements concatenated into it.
///
/// array::flatten(array) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::flatten([ [1,2], [3, 4], 'SurrealDB', [5, 6, [7, 8]] ]);
/// [1, 2, 3, 4, 'SurrealDB', 5, 6, [7, 8]]
pub fn flatten_fn(arr: impl Into<ArrayLike>) -> Function {
    let arr: ArrayLike = arr.into();

    Function {
        query_string: format!("array::flatten({})", arr.build()),
        bindings: arr.get_bindings(),
        errors: arr.get_errors(),
    }
}

/// The array::flatten flattens an array of arrays, returning a new array with all sub-array
/// elements concatenated into it.
/// # Arguments
/// * `arr` -  A vector, field or param.
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::flatten!(array![vec![1, 2], vec![3, 4], "SurrealDB", vec![5, 6]]);
/// array::flatten!(arr![vec![1, 2], vec![3, 4], "SurrealDB", vec![5, 6]]);
///
/// # let own_goals_field = Field::new("own_goals_field");
/// # let goals_param = Param::new("goals_param");
/// array::flatten!(own_goals_field);
/// array::flatten!(goals_param);
/// // It is also aliased as array_flatten;
/// array_flatten!(arr![vec![1, 2], vec![3, 4], "SurrealDB", vec![5, 6]]);
/// array_flatten!(array![vec![1, 2], vec![3, 4], "SurrealDB", vec![5, 6]]);
/// ```
/// # Output
/// ```json
/// [1, 2, 3, 4, "SurrealDB", 5, 6, [7, 8]]
/// ```
#[macro_export]
macro_rules! array_flatten {
    ( $arr:expr ) => {
        $crate::functions::array::flatten_fn($arr)
    };
}
pub use array_flatten as flatten;

#[cfg(test)]
mod array_flatten_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_flatten() {
        let result = array::flatten!(array![vec![1, 2], vec![3, 4], "SurrealDB", vec![5, 6]]);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::flatten($_param_00000001)"
        );
        assert_eq!(
            result.to_raw().build(),
            "array::flatten([[1, 2], [3, 4], 'SurrealDB', [5, 6]])"
        );
    }

    #[test]
    fn test_array_flatten_field() {
        let own_goals = Field::new("own_goals");

        let result = array::flatten!(own_goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::flatten(own_goals)");
        assert_eq!(result.to_raw().build(), "array::flatten(own_goals)");
    }

    #[test]
    fn test_array_flatten_param() {
        let goals = Param::new("goals");

        let result = array::flatten!(goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::flatten($goals)");
        assert_eq!(result.to_raw().build(), "array::flatten($goals)");
    }
}

/// The array::group function flattens and returns the unique items in an array.
///
/// array::group(array) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::group([1, 2, 3, 4, [3,5,6], [2,4,5,6], 7, 8, 8, 9]);
/// [1,2,3,4,5,6,7,8,9]
pub fn group_fn(arr: impl Into<ArrayLike>) -> Function {
    let arr: ArrayLike = arr.into();

    Function {
        query_string: format!("array::group({})", arr.build()),
        bindings: arr.get_bindings(),
        errors: arr.get_errors(),
    }
}

/// The array::group function flattens and returns the unique items in an array.
///
/// array::group(array) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::group([1, 2, 3, 4, [3,5,6], [2,4,5,6], 7, 8, 8, 9]);
/// [1,2,3,4,5,6,7,8,9]
///
/// # Arguments
/// * `arr` -  A vector, field or param.
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::group!(array![1, 2, 3, 4, array![3, 5, 6], vec![2, 4, 5, 6], 7, 8, 8, 9]);
/// # let own_goals_field = Field::new("own_goals_field");
/// # let goals_param = Param::new("goals_param");
/// array::group!(own_goals_field);
/// array::group!(goals_param);
/// // It is also aliased as array_group;
/// array_group!(arr![1, 2, 3, 4, vec![3, 5, 6], vec![2, 4, 5, 6], 7, 8, 8, 9]);
/// ```
/// # Output
/// ```json
/// [1,2,3,4,5,6,7,8,9]
/// ```
#[macro_export]
macro_rules! array_group {
    ( $arr:expr ) => {
        $crate::functions::array::group_fn($arr)
    };
}
pub use array_group as group;

#[cfg(test)]
mod array_group_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_group() {
        let result = array::group!(array![
            1,
            2,
            3,
            4,
            array![3, 5, 6],
            vec![2, 4, 5, 6],
            7,
            8,
            8,
            9
        ]);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(result.fine_tune_params(), "array::group($_param_00000001)");
        assert_eq!(
            result.to_raw().build(),
            "array::group([1, 2, 3, 4, [3, 5, 6], [2, 4, 5, 6], 7, 8, 8, 9])"
        );
    }

    #[test]
    fn test_array_group_field() {
        let own_goals = Field::new("own_goals");

        let result = array::group!(own_goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::group(own_goals)");
        assert_eq!(result.to_raw().build(), "array::group(own_goals)");
    }

    #[test]
    fn test_array_group_param() {
        let goals = Param::new("goals");

        let result = array::group!(goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::group($goals)");
        assert_eq!(result.to_raw().build(), "array::group($goals)");
    }
}

/// The array::insert function inserts a value into an array at a specific position.
///
/// array::insert(array, value, number) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::insert([1,2,3,4], 5, 2);
/// [1,2,5,3,4]
pub fn insert_fn(
    arr: impl Into<ArrayLike>,
    value: impl Into<Valuex>,
    index: impl Into<NumberLike>,
) -> Function {
    let arr: ArrayLike = arr.into();
    let value: Valuex = value.into();
    let index: NumberLike = index.into();

    Function {
        query_string: format!(
            "array::insert({}, {}, {})",
            arr.build(),
            value.build(),
            index.build()
        ),
        bindings: arr
            .get_bindings()
            .into_iter()
            .chain(value.get_bindings())
            .chain(index.get_bindings())
            .collect(),
        errors: arr
            .get_errors()
            .into_iter()
            .chain(value.get_errors())
            .chain(index.get_errors())
            .collect(),
    }
}

/// The array::insert function inserts a value into an array at a specific position.
/// array::insert(array, value, number) -> array
/// The following example shows this function, and its output, when used in a select statement:
/// SELECT * FROM array::insert([1,2,3,4], 5, 2);
/// [1,2,5,3,4]
///
/// # Arguments
///
/// * `arr` -  A vector, `Field`, `Param`
/// * `value` -  A value, `Field`, `Param`
/// * `index` -  A number, `Field`, `Param`
///
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::insert!(arr![1, 2, 3, 4], 5, 2);
/// array::insert!(array![1, 2, 3, 4], 5, 2);
/// # let own_goals_field = Field::new("own_goals_field");
/// # let goals_param = Param::new("goals_param");
/// array::insert!(own_goals_field, 5, 2);
/// array::insert!(goals_param, 5, 2);
/// // It is also aliased as array_insert;
/// array_insert!(arr![1, 2, 3, 4], 5, 2);
/// ```
/// # Output
/// ```json
/// [1,2,5,3,4]
/// ```
#[macro_export]
macro_rules! array_insert {
    ( $arr:expr, $value:expr, $index:expr ) => {
        $crate::functions::array::insert_fn($arr, $value, $index)
    };
}
pub use array_insert as insert;

#[cfg(test)]
mod array_insert_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_insert() {
        let result = array::insert!(array![1, 2, 3, 4], 5, 2);
        assert_eq!(result.get_bindings().len(), 3);
        assert_eq!(
            result.fine_tune_params(),
            "array::insert($_param_00000001, $_param_00000002, $_param_00000003)"
        );
        assert_eq!(result.to_raw().build(), "array::insert([1, 2, 3, 4], 5, 2)");
    }

    #[test]
    fn test_array_insert_field() {
        let own_goals = Field::new("own_goals");

        let result = array::insert!(own_goals, 5, 2);
        assert_eq!(result.get_bindings().len(), 2);
        assert_eq!(
            result.fine_tune_params(),
            "array::insert(own_goals, $_param_00000001, $_param_00000002)"
        );
        assert_eq!(result.to_raw().build(), "array::insert(own_goals, 5, 2)");
    }

    #[test]
    fn test_array_insert_param() {
        let goals = Param::new("goals");

        let result = array::insert!(goals, 5, 2);
        assert_eq!(result.get_bindings().len(), 2);
        assert_eq!(
            result.fine_tune_params(),
            "array::insert($goals, $_param_00000001, $_param_00000002)"
        );
        assert_eq!(result.to_raw().build(), "array::insert($goals, 5, 2)");
    }
}

/// The array::len function calculates the length of an array, returning a number. This function
/// includes all items when counting the number of items in the array. If you want to only count
/// truthy values, then use the count() function.
pub fn len_fn(arr: impl Into<ArrayLike>) -> Function {
    let arr: ArrayLike = arr.into();

    Function {
        query_string: format!("array::len({})", arr.build()),
        bindings: arr.get_bindings(),
        errors: arr.get_errors(),
    }
}

/// The array::len function calculates the length of an array, returning a number.
/// This function includes all items when counting the number of items in the array.
/// If you want to only count truthy values, then use the count() function.
///
/// # Arguments
/// * `arr` -  A vector, field or param.
///
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// let own_goals = Field::new("own_goals");
/// let goals = Param::new("goals");
///
/// array::len!(vec![1, 2, 3]);
/// array::len!(&[1, 2, 3]);
/// array::len!(own_goals);
/// array::len!(goals);
/// // It is also aliased as array_len;
/// array_len!(vec![1, 2, 3]);
/// ```
#[macro_export]
macro_rules! array_len {
    ( $arr:expr ) => {
        $crate::functions::array::len_fn($arr)
    };
}
pub use array_len as len;

#[cfg(test)]
mod array_len_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_len() {
        let result = array::len!(vec![1, 2, 3]);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(result.fine_tune_params(), "array::len($_param_00000001)");
        assert_eq!(result.to_raw().build(), "array::len([1, 2, 3])");
    }

    #[test]
    fn test_array_len_field() {
        let own_goals = Field::new("own_goals");

        let result = array::len!(own_goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::len(own_goals)");
        assert_eq!(result.to_raw().build(), "array::len(own_goals)");
    }

    #[test]
    fn test_array_len_param() {
        let goals = Param::new("goals");

        let result = array::len!(goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::len($goals)");
        assert_eq!(result.to_raw().build(), "array::len($goals)");
    }
}

/// The array::pop function removes a value from the end of an array and returns it.
///
/// array::pop(array) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::pop([1,2,3,4]);
/// 4
pub fn pop_fn(arr: impl Into<ArrayLike>) -> Function {
    let arr: ArrayLike = arr.into();

    Function {
        query_string: format!("array::pop({})", arr.build()),
        bindings: arr.get_bindings(),
        errors: arr.get_errors(),
    }
}

/// The array::pop function removes a value from the end of an array and returns it.
/// array::pop(array) -> array
/// The following example shows this function, and its output, when used in a select statement:
/// SELECT * FROM array::pop([1,2,3,4]);
/// 4
/// # Arguments
/// * `arr` -  A vector, field or param.
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::pop!(vec![1, 2, 3]);
/// array::pop!(&[1, 2, 3]);
/// # let own_goals_field = Field::new("own_goals_field");
/// # let goals_param = Param::new("goals_param");
/// array::pop!(own_goals_field);
/// array::pop!(goals_param);
/// // It is also aliased as array_pop;
/// array_pop!(vec![1, 2, 3]);
/// ```
#[macro_export]
macro_rules! array_pop {
    ( $arr:expr ) => {
        $crate::functions::array::pop_fn($arr)
    };
}
pub use array_pop as pop;

#[cfg(test)]
mod array_pop_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_pop() {
        let result = array::pop!(vec![1, 2, 3]);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(result.fine_tune_params(), "array::pop($_param_00000001)");
        assert_eq!(result.to_raw().build(), "array::pop([1, 2, 3])");
    }

    #[test]
    fn test_array_pop_field() {
        let own_goals = Field::new("own_goals");

        let result = array::pop!(own_goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::pop(own_goals)");
        assert_eq!(result.to_raw().build(), "array::pop(own_goals)");
    }

    #[test]
    fn test_array_pop_param() {
        let goals = Param::new("goals");

        let result = array::pop!(goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::pop($goals)");
        assert_eq!(result.to_raw().build(), "array::pop($goals)");
    }
}

/// The array::prepend function prepends a value to the end of an array.
///
/// array::prepend(array, value) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::prepend([1,2,3,4], 5);
/// [5,1,2,3,4]
pub fn prepend_fn(arr: impl Into<ArrayLike>, value: impl Into<Valuex>) -> Function {
    let arr: ArrayLike = arr.into();
    let value: Valuex = value.into();

    Function {
        query_string: format!("array::prepend({}, {})", arr.build(), value.build()),
        bindings: arr
            .get_bindings()
            .into_iter()
            .chain(value.get_bindings())
            .collect(),
        errors: arr
            .get_errors()
            .into_iter()
            .chain(value.get_errors())
            .collect(),
    }
}

/// The array::prepend function prepends a value to the end of an array.
/// array::prepend(array, value) -> array
/// The following example shows this function, and its output, when used in a select statement:
/// SELECT * FROM array::prepend([1,2,3,4], 5);
/// [5,1,2,3,4]
/// j
/// # Arguments
/// * `arr` -  An array, `Field` or `Param`
/// * `value` -  A value, `Field` or `Param`
///
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::prepend!(vec![1, 2, 3], 4);
/// array::prepend!(&[1, 2, 3], 4);
/// # let own_goals_field = Field::new("own_goals_field");
/// # let goals_param = Param::new("goals_param");
/// array::prepend!(own_goals_field, 4);
/// array::prepend!(goals_param, 4);
/// // It is also aliased as array_prepend;
/// array_prepend!(vec![1, 2, 3], 4);
/// ```
#[macro_export]
macro_rules! array_prepend {
    ( $arr:expr, $value:expr ) => {
        $crate::functions::array::prepend_fn($arr, $value)
    };
}
pub use array_prepend as prepend;

#[cfg(test)]
mod array_prepend_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_prepend() {
        let result = array::prepend!(vec![1, 2, 3], 4);
        assert_eq!(result.get_bindings().len(), 2);
        assert_eq!(
            result.fine_tune_params(),
            "array::prepend($_param_00000001, $_param_00000002)"
        );
        assert_eq!(result.to_raw().build(), "array::prepend([1, 2, 3], 4)");
    }

    #[test]
    fn test_array_prepend_field() {
        let own_goals = Field::new("own_goals");

        let result = array::prepend!(own_goals, 4);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::prepend(own_goals, $_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::prepend(own_goals, 4)");
    }

    #[test]
    fn test_array_prepend_param() {
        let goals = Param::new("goals");

        let result = array::prepend!(goals, 4);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::prepend($goals, $_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::prepend($goals, 4)");
    }
}

/// The array::push function appends a value to the end of an array.
///
/// array::push(array, value) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::push([1,2,3,4], 5);
/// [1,2,3,4,5]
/// The ordering of the array.
pub fn push_fn(arr: impl Into<ArrayLike>, value: impl Into<Valuex>) -> Function {
    let arr: ArrayLike = arr.into();
    let value: Valuex = value.into();

    Function {
        query_string: format!("array::push({}, {})", arr.build(), value.build()),
        bindings: arr
            .get_bindings()
            .into_iter()
            .chain(value.get_bindings())
            .collect(),
        errors: arr
            .get_errors()
            .into_iter()
            .chain(value.get_errors())
            .collect(),
    }
}

/// The array::push function appends a value to the end of an array.
/// array::push(array, value) -> array
/// The following example shows this function, and its output, when used in a select statement:
/// SELECT * FROM array::push([1,2,3,4], 5);
/// [1,2,3,4,5]
///
/// # Arguments
/// * `arr` -  An array, `Field` or `Param`
/// * `value` -  A value, `Field` or `Param`
///
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::push!(vec![1, 2, 3], 4);
/// array::push!(&[1, 2, 3], 4);
/// # let own_goals_field = Field::new("own_goals_field");
/// # let goals_param = Param::new("goals_param");
/// array::push!(own_goals_field, 4);
/// array::push!(goals_param, 4);
/// // It is also aliased as array_push;
/// array_push!(vec![1, 2, 3], 4);
/// ```
#[macro_export]
macro_rules! array_push {
    ( $arr:expr, $value:expr ) => {
        $crate::functions::array::push_fn($arr, $value)
    };
}
pub use array_push as push;

#[cfg(test)]
mod array_push_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_push() {
        let result = array::push!(vec![1, 2, 3], 4);
        assert_eq!(result.get_bindings().len(), 2);
        assert_eq!(
            result.fine_tune_params(),
            "array::push($_param_00000001, $_param_00000002)"
        );
        assert_eq!(result.to_raw().build(), "array::push([1, 2, 3], 4)");
    }

    #[test]
    fn test_array_push_field() {
        let own_goals = Field::new("own_goals");

        let result = array::push!(own_goals, 4);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::push(own_goals, $_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::push(own_goals, 4)");
    }

    #[test]
    fn test_array_push_param() {
        let goals = Param::new("goals");

        let result = array::push!(goals, 4);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::push($goals, $_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::push($goals, 4)");
    }
}

/// The array::remove function removes an item from a specific position in an array.
///
/// array::remove(array, number) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::remove([1,2,3,4,5], 2);
/// [1,2,4,5]
pub fn remove_fn(arr: impl Into<ArrayLike>, number: impl Into<Valuex>) -> Function {
    let arr: ArrayLike = arr.into();
    let number: Valuex = number.into();

    Function {
        query_string: format!("array::remove({}, {})", arr.build(), number.build()),
        bindings: arr
            .get_bindings()
            .into_iter()
            .chain(number.get_bindings())
            .collect(),
        errors: arr
            .get_errors()
            .into_iter()
            .chain(number.get_errors())
            .collect(),
    }
}

/// The array::remove function removes an item from a specific position in an array.
/// array::remove(array, number) -> array
/// The following example shows this function, and its output, when used in a select statement:
/// SELECT * FROM array::remove([1,2,3,4,5], 2);
/// [1,2,4,5]
///
/// # Arguments
/// * `arr` -  An array, `Field` or `Param`
/// * `number` -  A number, `Field` or `Param`
///
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::remove!(vec![1, 2, 3, 4, 5], 2);
/// array::remove!(&[1, 2, 3, 4, 5], 2);
/// # let own_goals_field = Field::new("own_goals_field");
/// # let goals_param = Param::new("goals_param");
/// array::remove!(own_goals_field, 2);
/// array::remove!(goals_param, 2);
/// // It is also aliased as array_remove;
/// array_remove!(vec![1, 2, 3, 4, 5], 2);
/// ```
#[macro_export]
macro_rules! array_remove {
    ( $arr:expr, $number:expr ) => {
        $crate::functions::array::remove_fn($arr, $number)
    };
}
pub use array_remove as remove;

#[cfg(test)]
mod array_remove_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_remove() {
        let result = array::remove!(vec![1, 2, 3, 4, 5], 2);
        assert_eq!(result.get_bindings().len(), 2);
        assert_eq!(
            result.fine_tune_params(),
            "array::remove($_param_00000001, $_param_00000002)"
        );
        assert_eq!(result.to_raw().build(), "array::remove([1, 2, 3, 4, 5], 2)");
    }

    #[test]
    fn test_array_remove_field() {
        let own_goals = Field::new("own_goals");

        let result = array::remove!(own_goals, 2);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::remove(own_goals, $_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::remove(own_goals, 2)");
    }

    #[test]
    fn test_array_remove_param() {
        let goals = Param::new("goals");

        let result = array::remove!(goals, 2);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::remove($goals, $_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::remove($goals, 2)");
    }
}

/// The array::reverse function appends a value to the end of an array.
///
/// array::reverse(array) -> array
/// The following example shows this function, and its output, when used in a select statement:
///
/// SELECT * FROM array::reverse([1,2,3,4,5]);
/// [5,4,3,2,1]
pub fn reverse_fn(arr: impl Into<ArrayLike>) -> Function {
    let arr: ArrayLike = arr.into();

    Function {
        query_string: format!("array::reverse({})", arr.build()),
        bindings: arr.get_bindings(),
        errors: arr.get_errors(),
    }
}

/// The array::reverse function appends a value to the end of an array.
/// array::reverse(array) -> array
/// The following example shows this function, and its output, when used in a select statement:
/// SELECT * FROM array::reverse([1,2,3,4,5]);
/// [5,4,3,2,1]
///
/// # Arguments
/// * `arr` -  An array, `Field` or `Param`
///
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// array::reverse!(vec![1, 2, 3, 4, 5]);
/// array::reverse!(&[1, 2, 3, 4, 5]);
/// # let own_goals_field = Field::new("own_goals_field");
/// # let goals_param = Param::new("goals_param");
///     
/// array::reverse!(own_goals_field);
/// array::reverse!(goals_param);
/// // It is also aliased as array_reverse;
/// array_reverse!(vec![1, 2, 3, 4, 5]);
/// ```
#[macro_export]
macro_rules! array_reverse {
    ( $arr:expr ) => {
        $crate::functions::array::reverse_fn($arr)
    };
}
pub use array_reverse as reverse;

#[cfg(test)]
mod array_reverse_tests {
    use crate::{functions::array, *};

    #[test]
    fn test_array_reverse() {
        let result = array::reverse!(vec![1, 2, 3, 4, 5]);
        assert_eq!(result.get_bindings().len(), 1);
        assert_eq!(
            result.fine_tune_params(),
            "array::reverse($_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::reverse([1, 2, 3, 4, 5])");
    }

    #[test]
    fn test_array_reverse_field() {
        let own_goals = Field::new("own_goals");

        let result = array::reverse!(own_goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::reverse(own_goals)");
        assert_eq!(result.to_raw().build(), "array::reverse(own_goals)");
    }

    #[test]
    fn test_array_reverse_param() {
        let goals = Param::new("goals");

        let result = array::reverse!(goals);
        assert_eq!(result.get_bindings().len(), 0);
        assert_eq!(result.fine_tune_params(), "array::reverse($goals)");
        assert_eq!(result.to_raw().build(), "array::reverse($goals)");
    }
}

/// The array::sort function sorts an array in ascending or descending order.
#[derive(Debug, Clone, PartialEq)]
pub enum Ordering {
    /// Sort the array in ascending order.
    Asc,
    /// Sort the array in descending order.
    Desc,
    /// Do not sort the array.
    False,
    /// Do not sort the array.
    Empty,
}

impl Display for Ordering {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Ordering::Asc => "'asc'",
                Ordering::Desc => "'desc'",
                Ordering::False => "false",
                Ordering::Empty => "",
            }
        )
    }
}

/// The array::sort function calculates the length of an array, returning a number. This function
/// includes all items when counting the number of items in the array. If you want to only count
/// truthy values, then use the count() function.
pub fn sort_fn(arr: impl Into<ArrayLike>, ordering: Ordering) -> Function {
    let arr: ArrayLike = arr.into();
    let query_string = match ordering {
        Ordering::Empty => format!("array::sort({})", arr.build()),
        _ => format!("array::sort({}, {ordering})", arr.build()),
    };
    Function {
        query_string,
        bindings: arr.get_bindings(),
        errors: arr.get_errors(),
    }
}
/// The array::sort function calculates the length of an array, returning a number. This function
/// includes all items when counting the number of items in the array. If you want to only count
/// truthy values, then use the count() function.
///
/// # Arguments
/// * `arr` -  A vector, field or param.
/// * `ordering` -  The ordering of the array.
/// # Examples
/// ```rust
/// # use surreal_query_builder as  surreal_orm;
/// use surreal_orm::{*, functions::array};
/// let own_goals = Field::new("own_goals");
/// let goals = Param::new("goals");
///
/// array::sort!(vec![1, 2, 3], "asc");
/// array::sort!(&[1, 2, 3], "desc");
/// array::sort!(own_goals, false);
/// array::sort!(goals, array::Ordering::Empty);
/// // It is also aliased as array_sort;
/// array_sort!(vec![1, 2, 3], "asc");
/// ```
#[macro_export]
macro_rules! array_sort {
    ( $arr:expr, "asc" ) => {
        $crate::functions::array::sort_fn($arr, $crate::functions::array::Ordering::Asc)
    };
    ( $arr:expr, "desc" ) => {
        $crate::functions::array::sort_fn($arr, $crate::functions::array::Ordering::Desc)
    };
    ( $arr:expr, false ) => {
        $crate::functions::array::sort_fn($arr, $crate::functions::array::Ordering::False)
    };
    ( $arr:expr, $ordering:expr ) => {
        $crate::functions::array::sort_fn($arr, $ordering)
    };
    ( $arr:expr ) => {
        $crate::functions::array::sort_fn($arr, $crate::functions::array::Ordering::Empty)
    };
}
pub use array_sort as sort;

/// This module contains functions for sorting arrays.
pub mod sort {
    use crate::*;

    /// The array::sort::asc function is a shorthand convenience function for the array::sort function, to sort values in an array in ascending order.
    pub fn asc_fn(arr: impl Into<ArrayLike>) -> Function {
        let arr: ArrayLike = arr.into();

        Function {
            query_string: format!("array::sort::asc({})", arr.build()),
            bindings: arr.get_bindings(),
            errors: arr.get_errors(),
        }
    }

    /// The array::sort::asc function is a shorthand convenience function for the array::sort function, to sort values in an array in ascending order.
    /// # Arguments
    /// * `arr` -  A vector, field or param.
    /// # Examples
    /// ```rust
    /// # use surreal_query_builder as  surreal_orm;
    /// use surreal_orm::{*, functions::array};
    /// let own_goals = Field::new("own_goals");
    /// let goals = Param::new("goals");
    /// array::sort::asc!(vec![1, 2, 3]);
    /// array::sort::asc!(&[1, 2, 3]);
    /// array::sort::asc!(own_goals);
    /// array::sort::asc!(goals);
    ///
    /// // It is also aliased as array_sort_asc;
    /// array_sort_asc!(vec![1, 2, 3]);
    /// ```
    #[macro_export]
    macro_rules! array_sort_asc {
        ( $arr:expr ) => {
            $crate::functions::array::sort::asc_fn($arr)
        };
    }
    pub use array_sort_asc as asc;

    /// The array::sort::desc function is a shorthand convenience function for the array::sort
    /// function, to sort values in an array in descending order.
    pub fn desc_fn(arr: impl Into<ArrayLike>) -> Function {
        let arr: ArrayLike = arr.into();

        Function {
            query_string: format!("array::sort::desc({})", arr.build()),
            bindings: arr.get_bindings(),
            errors: arr.get_errors(),
        }
    }

    /// The array::sort::desc function is a shorthand convenience function for the array::sort function, to sort values in an array in descending order.
    /// # Arguments
    /// * `arr` -  A vector, field or param.
    /// # Examples
    /// ```rust
    /// # use surreal_query_builder as  surreal_orm;
    /// use surreal_orm::{*, functions::array};
    /// let own_goals = Field::new("own_goals");
    /// let goals = Param::new("goals");
    /// array::sort::desc!(vec![1, 2, 3]);
    /// array::sort::desc!(&[1, 2, 3]);
    /// array::sort::desc!(own_goals);
    /// array::sort::desc!(goals);
    /// // It is also aliased as array_sort_desc;
    /// array_sort_desc!(vec![1, 2, 3]);
    /// ```
    #[macro_export]
    macro_rules! array_sort_desc {
        ( $arr:expr ) => {
            $crate::functions::array::sort::desc_fn($arr)
        };
    }
    pub use array_sort_desc as desc;
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::*;

    #[test]
    fn test_distinct() {
        let arr = arr![1, 2, 31];
        let result = distinct_fn(arr);

        assert_eq!(
            result.fine_tune_params(),
            "array::distinct([$_param_00000001, $_param_00000002, $_param_00000003])"
        );
        assert_eq!(result.to_raw().build(), "array::distinct([1, 2, 31])");
    }

    #[test]
    fn test_distinct_macro_with_vec_parameterization() {
        let arr = vec![1, 2, 3, 3, 2, 1];
        let result = distinct!(arr);
        assert_eq!(
            result.fine_tune_params(),
            "array::distinct($_param_00000001)"
        );
        assert_eq!(
            result.to_raw().to_string(),
            "array::distinct([1, 2, 3, 3, 2, 1])"
        );
    }

    #[test]
    fn test_distinct_macro_with_mixed_array_parametization() {
        let age = Field::new("age");
        let arr = arr![1, 2, 3, age];
        let result = distinct!(arr);
        assert_eq!(
            result.fine_tune_params(),
            "array::distinct([$_param_00000001, $_param_00000002, $_param_00000003, age])"
        );
        assert_eq!(
            result.to_raw().to_string(),
            "array::distinct([1, 2, 3, age])"
        );
    }

    #[test]
    fn test_len_on_diverse_array_custom_array_function() {
        let email = Field::new("email");
        let arr = arr![1, 21, "4334", "Oyelowo", email];
        let result = len_fn(arr);
        assert_eq!(
        result.fine_tune_params(),
        "array::len([$_param_00000001, $_param_00000002, $_param_00000003, $_param_00000004, email])"
    );
        assert_eq!(
            result.to_raw().build(),
            "array::len([1, 21, '4334', 'Oyelowo', email])"
        );
    }

    #[test]
    fn test_len_macro_on_diverse_array_custom_array_function() {
        let email = Field::new("email");
        let arr = arr![1, 21, "4334", "Oyelowo", email];
        let result = len!(arr);
        assert_eq!(result.fine_tune_params(),
        "array::len([$_param_00000001, $_param_00000002, $_param_00000003, $_param_00000004, email])");
        assert_eq!(
            result.to_raw().to_string(),
            "array::len([1, 21, '4334', 'Oyelowo', email])"
        );
    }

    #[test]
    fn test_sort() {
        // Mono vector should use a single param
        let arr = vec![3, 2, 1];
        let result = sort_fn(arr.clone(), Ordering::Asc);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, 'asc')"
        );
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1], 'asc')");

        let result = sort_fn(arr.clone(), Ordering::Desc);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, 'desc')"
        );
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1], 'desc')");

        let result = sort_fn(arr.clone(), Ordering::Empty);
        assert_eq!(result.fine_tune_params(), "array::sort($_param_00000001)");
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1])");

        let result = sort_fn(arr.clone(), Ordering::False);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, false)"
        );
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1], false)");
    }

    #[test]
    fn test_sort_macro_ordering_type() {
        let arr = vec![3, 2, 1];
        let result = sort!(arr.clone(), Ordering::Asc);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, 'asc')"
        );
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1], 'asc')");

        let result = sort!(arr.clone(), Ordering::Desc);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, 'desc')"
        );
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1], 'desc')");

        let result = sort!(arr.clone(), Ordering::Empty);
        assert_eq!(result.fine_tune_params(), "array::sort($_param_00000001)");
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1])");

        let result = sort!(arr.clone(), Ordering::False);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, false)"
        );
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1], false)");
    }

    #[test]
    fn test_sort_macro() {
        let arr = vec![3, 2, 1];
        let result = sort!(arr.clone(), "asc");
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, 'asc')"
        );
        assert_eq!(result.to_raw().to_string(), "array::sort([3, 2, 1], 'asc')");

        let result = sort!(arr.clone(), "desc");
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, 'desc')"
        );
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1], 'desc')");

        // Without ordering
        let result = sort!(arr.clone());
        assert_eq!(result.fine_tune_params(), "array::sort($_param_00000001)");
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1])");

        let result = sort!(arr.clone(), false);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort($_param_00000001, false)"
        );
        assert_eq!(result.to_raw().build(), "array::sort([3, 2, 1], false)");
    }

    #[test]
    fn test_sort_asc() {
        let arr = vec![3, 2, 1];
        let result = sort::asc_fn(arr);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort::asc($_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::sort::asc([3, 2, 1])");
    }

    #[test]
    fn test_sort_asc_macro() {
        let arr = arr![3, 2, 1];
        let result = sort::asc!(arr);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort::asc([$_param_00000001, $_param_00000002, $_param_00000003])"
        );
        assert_eq!(result.to_raw().build(), "array::sort::asc([3, 2, 1])");
    }

    #[test]
    fn test_sort_desc() {
        let arr = vec![3, 2, 1];
        let result = sort::desc_fn(arr);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort::desc($_param_00000001)"
        );
        assert_eq!(result.to_raw().build(), "array::sort::desc([3, 2, 1])");
    }

    #[test]
    fn test_sort_desc_macro() {
        let arr = arr![3, 2, 1];
        let result = sort::desc!(arr);
        assert_eq!(
            result.fine_tune_params(),
            "array::sort::desc([$_param_00000001, $_param_00000002, $_param_00000003])"
        );
        assert_eq!(result.to_raw().build(), "array::sort::desc([3, 2, 1])");
    }
}
