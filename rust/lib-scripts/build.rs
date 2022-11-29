use app_graphql_surrealdb::utils::graphql::generate_schema;

fn main() {
    // println!("cargo:rerun-if-changed=build.rs");
    println!("cargo:rerun-if-changed=../../typescript/lib-graphql/generated/schema.graphql");
    generate_schema("../../typescript/lib-graphql/generated/schema.graphql");
}
