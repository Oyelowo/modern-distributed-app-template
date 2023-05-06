use num_traits::{Float, Num, PrimInt};
use static_assertions::assert_impl_all;

/// Validate that type is a number at compile time
///
/// # Example
/// ```
/// # use surrealdb_query_builder::validators::is_number;
/// is_number::<i8>();
/// is_number::<i16>();
/// is_number::<i32>();
/// is_number::<i64>();
/// is_number::<i128>();
/// is_number::<isize>();
/// is_number::<u8>();
/// is_number::<u16>();
/// is_number::<u32>();
/// is_number::<u64>();
/// is_number::<u128>();
/// is_number::<usize>();
/// is_number::<f32>();
/// is_number::<f64>();
/// ```
pub fn is_number<T: Num>() {}

/// Validate that type is a primitive integer at compile time
///
/// # Example
/// ```
/// # use surrealdb_query_builder::validators::is_int;
/// is_int::<i8>();
/// is_int::<i16>();
/// is_int::<i32>();
/// is_int::<i64>();
/// is_int::<i128>();
/// is_int::<isize>();
/// ```
pub fn is_int<T: PrimInt>() {}

/// Validate that type is a primitive float at compile time
///
/// # Example
/// ```
/// # use surrealdb_query_builder::validators::is_float;
///
/// is_float::<f32>();
/// is_float::<f64>();
/// ```
pub fn is_float<T: Float>() {}

/// Validate that type is a vector at compile time
///
/// # Example
/// ```
/// # use surrealdb_query_builder::validators::assert_is_vec;
/// assert_is_vec::<Vec<i8>>();
/// assert_is_vec::<Vec<String>>();
/// assert_is_vec::<Vec<i32>>();
/// assert_is_vec::<Vec<i64>>();
/// assert_is_vec::<Vec<i128>>();
/// assert_is_vec::<Vec<isize>>();
/// assert_is_vec::<Vec<u8>>();
/// assert_is_vec::<Vec<u16>>();
/// assert_is_vec::<Vec<u32>>();
/// assert_is_vec::<Vec<u64>>();
/// assert_is_vec::<Vec<u128>>();
/// assert_is_vec::<Vec<usize>>();
/// assert_is_vec::<Vec<f32>>();
/// assert_is_vec::<Vec<f64>>();
/// ```
pub fn assert_is_vec<T: IntoIterator>() {
    let _ = <T as IntoIterator>::into_iter;
}