use app_graphql_surrealdb::utils::graphql::generate_schema;

fn main() {
    // println!("cargo:rerun-if-changed=build.rs");
    let ts_path = "../../typescript/lib-graphql/generated/schema.graphql";
    println!("cargo:rerun-if-changed={ts_path}");
    generate_schema(ts_path);
}
