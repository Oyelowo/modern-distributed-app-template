use std::{path::Path, process::Command};

// use app_graphql_surrealdb::app::get_my_graphql_schema;
use app_graphql_surrealdb::utils::graphql::generate_schema;
use lib_common::utils;
 
fn main() { 
    // println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../../typescript/lib-graphql/generated/schema.graphql");
    let path = format!("../../typescript/lib-graphql/generated/schema.graphql");
    generate_schema(path);
}
// pub fn generate_schema(path: impl AsRef<Path>) {
//     let data = &get_my_graphql_schema().finish().sdl();
//     utils::write_data_to_path(data, path);
// }

// use std::env;
// use std::fs;
// use std::path::Path;

// fn main() {
//     let out_dir = env::var_os("OUT_DIR").unwrap();
//     let dest_path = Path::new("./").join("hello.rs");
//     fs::write(
//         &dest_path,
//         "pub fn message() -> &'static str {
//             \"Hello, World!\"
//         }
//         "
//     ).unwrap();
//     // panic!();
//     // println!("cargo:rerun-if-changed=build.rs");
// }
