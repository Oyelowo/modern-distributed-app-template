#![allow(dead_code)]

use darling::{ast, util};
use proc_macro2::{Span, TokenStream, TokenTree};
use proc_macro_crate::{crate_name, FoundCrate};
use quote::quote;

use syn::{self, Ident};

use super::{trait_generator::MyFieldReceiver, types::CaseString};

pub(crate) struct FieldIdentifier {
    serialized: ::std::string::String,
    ident: syn::Ident,
}

#[derive(Debug, Default)]
pub(crate) struct FieldsNames {
    pub struct_ty_fields: Vec<TokenStream>,
    pub struct_values_fields: Vec<TokenStream>,
}

impl FieldsNames {
    pub(crate) fn from_receiver_data(
        data: &ast::Data<util::Ignored, MyFieldReceiver>,
        struct_level_casing: Option<CaseString>,
    ) -> Self {
        let fields = data
            .as_ref()
            .take_struct()
            .expect("Should never be enum")
            .fields;

        fields.into_iter().enumerate().fold(
            Self::default(),
            |mut store, (index, field_receiver)| {
                let field_case = struct_level_casing.unwrap_or(CaseString::None);
                let field_ident = Self::get_field_identifier(field_receiver, index);
                let field_identifier_string = ::std::string::ToString::to_string(&field_ident);

                let FieldIdentifier { serialized, ident } =
                    FieldCaseMapper::new(field_case, field_identifier_string)
                        .get_field_ident(&field_receiver);

                // struct type used to type the function
                store
                    .struct_ty_fields
                    .push(quote!(pub #ident: &'static str));

                // struct values themselves
                store.struct_values_fields.push(quote!(#ident: #serialized));
                store
            },
        )
    }

    fn get_field_identifier(field_receiver: &MyFieldReceiver, index: usize) -> TokenStream {
        // This works with named or indexed fields, so we'll fall back to the index so we can
        // write the output as a key-value pair.
        // the index is really not necessary since our models will nevel be tuple struct
        // but leaving it as is anyways
        field_receiver.ident.as_ref().map_or_else(
            || {
                let i = syn::Index::from(index);
                quote!(#i)
            },
            |v| quote!(#v),
        )
    }

    fn get_fields(data: &ast::Data<util::Ignored, MyFieldReceiver>) -> Vec<&MyFieldReceiver> {
        let fields = data
            .as_ref()
            .take_struct()
            .expect("Should never be enum")
            .fields;
        fields
    }
}

#[derive(Debug, Clone)]
struct FieldCaseMapper {
    field_case: CaseString,
    field_identifier_string: ::std::string::String,
}

impl FieldCaseMapper {
    fn new(field_case: CaseString, field_identifier_string: ::std::string::String) -> Self {
        Self {
            field_case,
            field_identifier_string,
        }
    }

    pub(crate) fn to_case_string(&self) -> ::std::string::String {
        let convert = |case: convert_case::Case| {
            convert_case::Converter::new()
                .to_case(case)
                .convert(&self.field_identifier_string)
        };

        match self.field_case {
            // Also, if rename_all attribute is not specified to change the casing,
            // it defaults to exactly how the fields are written out.
            // However, Field rename attribute overrides this
            CaseString::None => self.field_identifier_string.to_string(),
            CaseString::Camel => convert(convert_case::Case::Camel),
            CaseString::Snake => convert(convert_case::Case::Snake),
            CaseString::Pascal => convert(convert_case::Case::Pascal),
            CaseString::Lower => convert(convert_case::Case::Lower),
            CaseString::Upper => convert(convert_case::Case::Upper),
            CaseString::ScreamingSnake => convert(convert_case::Case::ScreamingSnake),
            CaseString::Kebab => convert(convert_case::Case::Kebab),
            CaseString::ScreamingKebab => convert(convert_case::Case::UpperKebab),
        }
    }

    /// Ident format is the name used in the code
    /// e.g
    /// ```
    /// struct User {
    ///     //user_name is ident and the serialized format by serde is "user_name"
    ///     user_name: String  
    /// }
    /// ```
    /// This is what we use as the field name and is mostly same as the serialized format
    /// except in the case of kebab-case serialized format in which case we fallback
    /// to the original ident format as written exactly in the code except when a user
    /// uses rename attribute on a specific field, in which case that takes precedence.
    pub(crate) fn get_field_ident(self, field_receiver: &MyFieldReceiver) -> FieldIdentifier {
        let field = self.to_case_string();
        let field = field.as_str();

        let field_ident = match &self.field_case {
            // Tries to keep the field name ident as written in the struct
            //  if ure using kebab case which cannot be used as an identifier.
            // However, Field rename attribute overrides this
            CaseString::Kebab | CaseString::ScreamingKebab => &self.field_identifier_string,
            _ => field,
        };

        let field_ident = syn::Ident::new(field_ident, ::proc_macro2::Span::call_site());

        // Prioritize serde/field_getter field_attribute renaming for field string
        let rename_field_from_serde = field_receiver.rename.as_ref();
        if let ::std::option::Option::Some(name) = rename_field_from_serde {
            let field_renamed_from_attribute = name.serialize.to_string();
            return FieldIdentifier {
                ident: syn::Ident::new(
                    &field_renamed_from_attribute,
                    ::proc_macro2::Span::call_site(),
                ),
                serialized: field_renamed_from_attribute,
            };
        }

        FieldIdentifier {
            ident: field_ident,
            serialized: ::std::string::ToString::to_string(field),
        }
    }
}
