## Field Attributes

| Attribute         | Description                                                                                                                                                                                                                                                                                                                                                                  | Type                                          | Optional |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | -------- |
| rename            | Renames the field.                                                                                                                                                                                                                                                                                                                                                           | `string`                                      | Y        |
| link_one          | Specifies a relationship to a singular record in another node table in the database.                                                                                                                                                                                                                                                                                         | `model=NodeEdgeNode, connection ->edge->node` | Y        |
| link_self         | Specifies a relationship to a singular record in the same node table in the database.                                                                                                                                                                                                                                                                                        | `Node`                                        | Y        |
| link_many         | Specifies a relationship to multiple records in another node table in the database.                                                                                                                                                                                                                                                                                          | `Vec<S                                        |          |
| type              | Specify the valid surrealdb field's type. One of any, array, bool, datetime, decimal, duration, float, int, number, object, string, record.                                                                                                                                                                                                                                  | surrealdb field type                          | Y        |
| assert            | Assert the field's value meets a certain criteria using the an filter using `value()` function as an operation (e.g `value().is_not(NONE)`) or in `cond` helper function for more complex filter assertion. e.g `cond(value().is_not(NONE)).and(value().like("@codebreather"))`.                                                                                             | inline code string                            | Y        |
| assert_fn         | Provide a function to assert the field's value meets a certain criteria. This is similar to `assert` but is intended for an already created external function which is useful when reusing an assertion e.g `is_email`.                                                                                                                                                      | function name string                          | Y        |
| item_type      | Only when for nested array. Specifies the type of the items of the array.                                                                                                                                                                                                                                                                                                    | `Option<FieldTypeWrapper>`                    | Y        |
| item_assert    | Only used for nested array. Asserts a condition on the content.                                                                                                                                                                                                                                                                                                              | `Option<syn::LitStr>`                         | Y        |
| item_assert_fn | Only used for nested array. Specifies the function to assert a condition on the content.                                                                                                                                                                                                                                                                                     | `Option<syn::Path>`                           | Y        |
| define            | Generates a `DEFINE FIELD` statement for the table. This overrides other specific definitions to prevent confusion and collision. You can also invoke an external function directly rather than inlining the function e.g `define = "define_age()"`                                                                                                                          | inline code string                            | Y        |
| define_fn         | Generates a `DEFINE FIELD` statement for the table. This overrides other specific definitions to prevent confusion and collision. Same as `define` attribute but expects the function name instead rather than invocation i.e `define_age` instead of `define_age()`. You can also invoke an external function directly rather than inlining the function e.g `define = "def |                                               |          |
| skip_serializing  | When true, this field will be omitted when serializing the struct.                                                                                                                                                                                                                                                                                                           | bool                                          | Y        |