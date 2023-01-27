



/*
Author: Oyelowo Oyedayo
Email: oyelowooyedayo@gmail.com
*/

#![allow(dead_code)]


// pub(crate) mod casing;
// mod parser;
// pub(crate) mod relations;
// pub(crate) mod serialize_skipper;
// mod trait_generator;
// use super:{
//     casing::CaseString,
//     get_crate_name,
//     parser::{EdgeModelAttr, ModelAttributesTokensDeriver},
// };
use darling::{ast, util, FromDeriveInput, FromField, FromMeta, ToTokens};
use proc_macro2::TokenStream;
use quote::{format_ident, quote};
use std::str::FromStr;

use syn::{self, parse_macro_input};

use super::{node_parser::SchemaFieldsProperties, casing::CaseString};

#[derive(Debug, Clone)]
pub struct Rename {
    pub(crate) serialize: String,
}

/// This enables us to handle potentially nested values i.e
///   #[serde(rename = "simple_name")]
///    or
///   #[serde(rename(serialize = "age"))]
///  #[serde(rename(serialize = "ser_name_nested", deserialize = "deser_name_nested"))]
/// However, We dont care about deserialized name from serde, so we just ignore that.
impl FromMeta for Rename {
    fn from_string(value: &str) -> ::darling::Result<Self> {
        Ok(Self {
            serialize: value.into(),
        })
    }

    fn from_list(items: &[syn::NestedMeta]) -> ::darling::Result<Self> {
        #[derive(FromMeta)]
        struct FullRename {
            serialize: String,

            #[darling(default)]
            deserialize: util::Ignored, // Ignore deserialize since we only care about the serialized string
        }

        impl From<FullRename> for Rename {
            fn from(v: FullRename) -> Self {
                let FullRename { serialize, .. } = v;
                Self { serialize }
            }
        }
        FullRename::from_list(items).map(Rename::from)
    }
}

#[derive(Debug, Clone)]
pub struct Relate {
    pub link: String,
    // #[darling(default)]
    pub edge: Option<String>,
}
//#[rename(se)]
impl FromMeta for Relate {
    fn from_string(value: &str) -> darling::Result<Self> {
        Ok(Self {
            link: value.into(),
            edge: None,
        })
    }
    //TODO: Check to maybe remove cos I probably dont need this
    fn from_list(items: &[syn::NestedMeta]) -> darling::Result<Self> {
        #[derive(FromMeta)]
        struct FullRelate {
            edge: String,
            link: String,
        }

        impl From<FullRelate> for Relate {
            fn from(v: FullRelate) -> Self {
                let FullRelate { link, edge, .. } = v;
                Self {
                    link,
                    edge: Some(edge),
                }
            }
        }
        FullRelate::from_list(items).map(Relate::from)
    }
}

#[derive(Debug, FromField)]
#[darling(attributes(surrealdb, serde), forward_attrs(allow, doc, cfg))]
pub(crate) struct MyFieldReceiver {
    /// Get the ident of the field. For fields in tuple or newtype structs or
    /// enum bodies, this can be `None`.
    pub(crate) ident: ::std::option::Option<syn::Ident>,
    /// This magic field name pulls the type from the input.
    pub(crate) ty: syn::Type,
    attrs: Vec<syn::Attribute>,

    #[darling(default)]
    pub(crate) rename: ::std::option::Option<Rename>,

    // reference singular: LinkOne<Account>
    #[darling(default)]
    pub(crate) relate: ::std::option::Option<Relate>,
    
    // reference singular: LinkOne<Account>
    #[darling(default)]
    pub(crate) link_one: ::std::option::Option<String>,

    // reference singular: LinkSelf<Account>
    #[darling(default)]
    pub(crate) link_self: ::std::option::Option<String>,
    
    // reference plural: LinkMany<Account>
    #[darling(default)]
    pub(crate) link_many: ::std::option::Option<String>,

    #[darling(default)]
    pub(crate) skip_serializing: bool,

    #[darling(default)]
    skip_serializing_if: ::darling::util::Ignored,

    #[darling(default)]
    with: ::darling::util::Ignored,

    #[darling(default)]
    default: ::darling::util::Ignored,
}

#[derive(Debug, FromDeriveInput)]
#[darling(attributes(surrealdb, serde), forward_attrs(allow, doc, cfg))]
pub struct FieldsGetterOpts {
    ident: syn::Ident,
    attrs: Vec<syn::Attribute>,
    generics: syn::Generics,
    /// Receives the body of the struct or enum. We don't care about
    /// struct fields because we previously told darling we only accept structs.
    data: ast::Data<util::Ignored, self::MyFieldReceiver>,

    #[darling(default)]
    rename_all: ::std::option::Option<Rename>,

    #[darling(default)]
    pub(crate) relation_name: ::std::option::Option<String>,
}

impl ToTokens for FieldsGetterOpts {
    fn to_tokens(&self, tokens: &mut TokenStream) {
        let FieldsGetterOpts {
            ident: ref struct_name_ident,
            ref data,
            ref rename_all,
            ref relation_name,
            ..
        } = *self;

        let struct_level_casing = rename_all.as_ref().map(|case| {
            CaseString::from_str(case.serialize.as_str()).expect("Invalid casing, The options are")
        });
        
        let binding = struct_name_ident.to_string();
        let struct_name_ident_as_str = binding.as_str();
        let schema_mod_name = format_ident!("{}", struct_name_ident.to_string().to_lowercase());
        let crate_name = super::get_crate_name(false);

        let SchemaFieldsProperties {
            schema_struct_fields_types_kv,
            schema_struct_fields_names_kv,
            serialized_field_names_normalised,
            static_assertions,
            connection_with_field_appended,
            referenced_edge_schema_struct_alias,
            relate_edge_schema_struct_alias_impl,
            relate_edge_schema_method_connection,
            relate_node_alias_method,
            imports_referenced_node_schema,
            record_link_fields_methods,
            relate_edge_struct_type_alias,
        }: SchemaFieldsProperties  = SchemaFieldsProperties::from_receiver_data(
            data,
            struct_level_casing,
            struct_name_ident,
        );
        // schema_struct_fields_names_kv.dedup_by(same_bucket)

        let test_name = format_ident!("test_{schema_mod_name}_edge_name");

        let field_names_ident = format_ident!("{struct_name_ident}DbFields");
        let module_name = format_ident!("{}", struct_name_ident.to_string().to_lowercase());
        // let module_name = format_ident!("{}_schema", struct_name_ident.to_string().to_lowercase());
        
        let schema_alias = format_ident!("{}Schema", struct_name_ident.to_string().to_lowercase());
        
        tokens.extend(quote!( 
                        
            // #[derive(SurrealdbModel, TypedBuilder, Serialize, Deserialize, Debug, Clone)]
            // #[serde(rename_all = "camelCase")]
            // pub struct Student {
            //     #[serde(skip_serializing_if = "Option::is_none")]
            //     #[builder(default, setter(strip_option))]
            //     id: Option<String>,
            //     first_name: String,
            //
            //     #[surrealdb(link_one = "Book", skip_serializing)]
            //     course: LinkOne<Book>,
            //
            //     #[surrealdb(link_many = "Book", skip_serializing)]
            //     #[serde(rename = "lowo")]
            //     all_semester_courses: LinkMany<Book>,
            //
            //     #[surrealdb(relate(edge = "StudentWritesBlog", link = "->writes->Blog"))]
            //     written_blogs: Relate<Blog>,
            // }
            
            // Model's Schema SurrealdbNode implementation
            impl #crate_name::SurrealdbNode for #struct_name_ident {
                type Schema = #module_name::#struct_name_ident;

                fn get_schema() -> Self::Schema {
                    #module_name::#struct_name_ident::new()
                }
            }

            pub mod #module_name {
                use ::serde::Serialize;

                // Alternative old consideration: use super::book_schema::Book;
                // type Book = < super::Book as SurrealdbNode>::Schema;
               #( #imports_referenced_node_schema); *
                

                // Build struct for Schema for node. e.g struct Student {id: DbField, ...}
                #[derive(Debug, Serialize, Default)]
                pub struct #struct_name_ident {
                   #( #schema_struct_fields_types_kv), *
                    // Use for storing graph paths. Should probably rename
                    pub ___________store: ::std::string::String,
                }

                
                // Displays a schema as it's current path in the graph
                // e.g Student->Writes->Book or simple Student
                impl ::std::fmt::Display for #struct_name_ident {
                    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
                        f.write_fmt(format_args!("{}", self.___________store))
                    }
                }

                impl #struct_name_ident {
                    pub fn new() -> Self {
                        // Actually instatiate the schema with the normalized fields as
                        // both the field name and field value. e.g firstName: "firstName".into(),
                        Self {
                            // id: "id".into(),
                           #( #schema_struct_fields_names_kv), *
                            ___________store: "".to_string(),
                        }
                    }

                    // TODO: Change id to be SurrealdbCoplexId wrapper struct
                    pub fn __with_id__(mut self, id: impl ::std::fmt::Display) -> Self {
                        // TODO: Remove prefix book, so that its not bookBook:lowo
                        self.___________store.push_str(id.to_string().as_str());
                        self
                    }
                    
                    // TODO: let this take a query object which it can build
                    // Potentially rename to __with_query__
                    pub fn __with__(db_name: impl ::std::fmt::Display) -> Self {
                        let mut self_model = Self::new();
                        self_model
                            .___________store
                            .push_str(db_name.to_string().as_str());
                        self_model
                    }

                    pub fn __________update_connection(store: &::std::string::String, clause: #crate_name::Clause) -> Self {
                        let mut self_instance = Self::default();
                        let connection = format!("{}{}{}", store, #struct_name_ident_as_str, #cr
                                                 ::format_clause(clause, #struct_name_ident_as_str));

                        // TODO: Make self_instance ident into a variable which can also be passed
                        // to SchemaFieldsProperties Generator/transoforer in node_parser.rs
                        self_instance.___________store.push_str(connection.as_str());

                        // self_instance.drunk_water
                            // .push_str(format!("{}.drunk_water", self_instance.___________store).as_str());
                        #( #connection_with_field_appended); *
                        self_instance
                    }

                    // edge with dunda(__) before or after the edge_name depending on the
                    // direction
                    // pub fn writes__(&self, clause: #crate_name::Clause) -> Writes {
                    //     Writes::__________update_edge(
                    //         &self.___________store,
                    //         clause,
                    //         #crate_name::EdgeDirection::OutArrowRight,
                    //     )
                    // }
                    //
                    #( #relate_edge_schema_method_connection) *


                    // Generated method to access record links fields
                    // pub fn favorite_book(&self, clause: Clause) -> Book {
                    //     Book::__________update_connection(&self.__________store, clause)
                    // }
                    #( #record_link_fields_methods) *
                    
                    // Aliases
                    pub fn __as__(&self, alias: impl ::std::fmt::Display) -> ::std::string::String {
                        // let xx = self.___________store;
                        format!("{self} AS {alias}")
                    }
                    /// These are for aliasing Relate<T> fields 
                    /// Returns the   as book written   of this [`Student`].
                    /// AS book_written
                    // pub fn __as_book_written__(&self) -> String {
                    //     format!("{self} AS book_written")
                    // }
                    #( #relate_node_alias_method) *
                }
                
                // Used for importing and aliasing edge schema. The generic 
                // represents the current SurrealdbNode e.g Student
                // still consiering either of the two approaches below
                // type Writes = super::writes::Writes<Student>;
                // type Writes = super::WritesSchema<#struct_name_ident>;
                    #( #relate_edge_struct_type_alias); *

                // Generates implementation for edge to allow access to destination node
                // It's okay in rust to have multiple separate impl Struct. So, we can generate
                // for each edge->node separately without extra dedup logic
                // impl Writes {
                //     pub fn book(&self, clause: #crate_name::Clause) -> Book {
                //         Book::__________update_connection(&self.__________store, clause)
                //     }
                // }
                #( #relate_edge_schema_struct_alias_impl) *
                
            }

                
            fn #test_name() {
                // Static assertions to validate properties at compile time e.g
                // type StudentWritesBlogTableName = <StudentWritesBlog as
                // SurrealdbEdge>::TableNameChecker;
                // ::static_assertions::assert_fields!(StudentWritesBlogTableName: Writes);
                //
                // type StudentWritesBlogInNode = <StudentWritesBlog as SurrealdbEdge>::In;
                // ::static_assertions::assert_type_eq_all!(StudentWritesBlogInNode, Student);
                //
                // type StudentWritesBlogOutNode = <StudentWritesBlog as SurrealdbEdge>::Out;
                // ::static_assertions::assert_type_eq_all!(StudentWritesBlogOutNode, Blog);
                //
                // 
                // ::static_assertions::assert_impl_one!(StudentWritesBlog: SurrealdbEdge);
                // ::static_assertions::assert_impl_one!(Student: SurrealdbNode);
                // ::static_assertions::assert_impl_one!(Blog: SurrealdbNode);
                // ::static_assertions::assert_type_eq_all!(LinkOne<Book>, LinkOne<Book>);
                #( #static_assertions); *
            }
));
    }
}

pub fn generate_fields_getter_trait(input: proc_macro::TokenStream) -> proc_macro::TokenStream {
    // Construct a representation of Rust code as a syntax tree
    // that we can manipulate
    let input = parse_macro_input!(input);
    // let output = FieldsGetterOpts::from_derive_input(&input).expect("Wrong options");
    let output = match FieldsGetterOpts::from_derive_input(&input) {
        Ok(out) => out,
        Err(err) => return proc_macro::TokenStream::from(err.write_errors()),
    };
    quote!(#output).into()
}