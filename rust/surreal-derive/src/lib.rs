/*
 * Author: Oyelowo Oyedayo
 * Email: oyelowooyedayo@gmail.com
 * Copyright (c) 2023 Oyelowo Oyedayo
 * Licensed under the MIT license
 */

extern crate proc_macro;

use proc_macro::TokenStream;
mod models;

#[proc_macro_derive(Node, attributes(surreal_orm))]
pub fn surreal_node_trait_derive(input: TokenStream) -> TokenStream {
    models::node::generate_fields_getter_trait(input)
}

#[proc_macro_derive(Edge, attributes(surreal_orm))]
pub fn surreal_edge_trait_derive(input: TokenStream) -> TokenStream {
    models::edge::generate_fields_getter_trait(input)
}

#[proc_macro_derive(Object, attributes(surreal_orm))]
pub fn surreal_object_trait_derive(input: TokenStream) -> TokenStream {
    models::object::generate_fields_getter_trait(input)
}
