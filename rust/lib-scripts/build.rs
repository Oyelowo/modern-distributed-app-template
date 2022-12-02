use std::path::Path;

use app_graphql_surrealdb::app::get_my_graphql_schema;
use lib_common::utils;

fn main() {
    // println!("cargo:rerun-if-changed=build.rs");
    // let path = format!("{}/generated/schema.graphql", env!("CARGO_PKG_NAME"));
    let ts_path = "../../typescript/lib-graphql/generated/schema.graphql";
    std::fs::remove_file(ts_path).expect("Problem removing file");
    println!("cargo:rerun-if-changed={ts_path}");
    generate_schema(ts_path);
}

pub fn generate_schema(path: impl AsRef<Path>) {
    let data = &get_my_graphql_schema().finish().sdl();
    utils::write_data_to_path(data, path);
}
