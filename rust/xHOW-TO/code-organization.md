 tree -I "target"   
    
 ```
 .
├── Cargo.lock
├── Cargo.toml
├── Dockerfile.development
├── Dockerfile.production
├── Makefile
├── README.md
├── common
│   ├── Cargo.toml
│   └── src
│       ├── authentication
│       │   ├── mod.rs
│       │   ├── password.rs
│       │   └── session_state.rs
│       ├── configurations
│       │   ├── application.rs
│       │   ├── mod.rs
│       │   ├── mongodb.rs
│       │   ├── oauth.rs
│       │   ├── postgres.rs
│       │   ├── redis.rs
│       │   └── utils.rs
│       ├── error_handling
│       │   ├── api_http_statuses.rs
│       │   ├── graphql_error_extensions.rs
│       │   └── mod.rs
│       ├── lib.rs
│       ├── macros
│       │   ├── calculator.rs
│       │   ├── helpers.rs
│       │   └── mod.rs
│       ├── middleware
│       │   ├── cors.rs
│       │   ├── log.rs
│       │   ├── mod.rs
│       │   └── session.rs
│       └── utils
│           ├── export_data.rs
│           ├── filename.rs
│           └── mod.rs
├── examplequery.graphql
├── graphql-mongo
│   ├── Cargo.toml
│   ├── generated
│   │   └── schema.graphql
│   ├── gql_test.graphql
│   └── src
│       ├── app
│       │   ├── mod.rs
│       │   ├── post
│       │   │   ├── migration.rs
│       │   │   ├── mod.rs
│       │   │   ├── model.rs
│       │   │   ├── mutation_root.rs
│       │   │   ├── query_root.rs
│       │   │   └── subscription_root.rs
│       │   └── user
│       │       ├── guards.rs
│       │       ├── mod.rs
│       │       ├── model.rs
│       │       ├── mutation_root.rs
│       │       ├── query_root.rs
│       │       └── subscription_root.rs
│       ├── bin
│       │   └── graphql_generator_graphql_mongo.rs
│       ├── handlers
│       │   ├── healthcheck.rs
│       │   ├── mod.rs
│       │   └── oauth.rs
│       ├── lib.rs
│       ├── main.rs
│       ├── oauth
│       │   ├── github.rs
│       │   ├── google.rs
│       │   ├── mod.rs
│       │   └── utils.rs
│       └── utils
│           ├── configuration.rs
│           ├── graphql.rs
│           ├── mod.rs
│           ├── mongodb.rs
│           ├── rbac
│           └── token.rs
├── graphql-postgres
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── Dockerfile.migrations
│   ├── Makefile
│   ├── Migration.cli.md
│   ├── README.md
│   ├── env.sample
│   ├── gql_test.graphql
│   ├── migrations_legacy_for_reference_only
│   │   ├── 20220201151946_setup.sql
│   │   ├── 20220201152218_create_users_table.sql
│   │   └── 20220201152224_create_posts_table.sql
│   ├── sqlx-data.json
│   ├── src
│   │   ├── app
│   │   │   ├── mod.rs
│   │   │   ├── post
│   │   │   │   ├── mod.rs
│   │   │   │   ├── model.rs
│   │   │   │   ├── mutation_root.rs
│   │   │   │   └── query_root.rs
│   │   │   └── user
│   │   │       ├── mod.rs
│   │   │       ├── model.rs
│   │   │       ├── mutation_root.rs
│   │   │       └── query_root.rs
│   │   ├── bin
│   │   │   ├── graphql_generator_graphql_postgres.rs
│   │   │   └── migration.rs
│   │   ├── lib.rs
│   │   ├── main.rs
│   │   ├── migration
│   │   │   ├── README.md
│   │   │   ├── autocreation_example
│   │   │   ├── m20220101_000001_setup.rs
│   │   │   ├── m20220101_000002_create_users_table.rs
│   │   │   ├── m20220101_000003_create_posts_table.rs
│   │   │   └── mod.rs
│   │   ├── tests
│   │   │   └── health_check.rs
│   │   └── utils
│   │       ├── configuration.rs
│   │       ├── graphql.rs
│   │       ├── mod.rs
│   │       ├── postgresdb.rs
│   │       └── token.rs
│   └── update-sqlx-data.sh
├── grpc-mongo
│   ├── Cargo.toml
│   ├── Helloworld.md
│   ├── SQLx_Migration.md
│   ├── build.rs
│   ├── grpc_setting_started.md
│   ├── grpc_setting_started.readme
│   ├── grpccurl.sh
│   ├── protobuf
│   │   ├── app_analytics.proto
│   │   ├── helloworld.proto
│   │   └── music.proto
│   └── src
│       ├── app
│       │   ├── app_analytics
│       │   │   ├── mod.rs
│       │   │   ├── model.rs
│       │   │   └── service.rs
│       │   ├── greetings
│       │   │   ├── hello.rs
│       │   │   └── mod.rs
│       │   ├── mod.rs
│       │   └── music
│       │       ├── fan.rs
│       │       └── mod.rs
│       ├── bin
│       │   ├── analytics.rs
│       │   ├── client.rs
│       │   └── client_music.rs
│       ├── lib.rs
│       ├── main.rs
│       └── utils
│           ├── configuration.rs
│           ├── connection.rs
│           └── mod.rs
├── mongo-helpers
│   ├── Cargo.toml
│   └── src
│       ├── lib.rs
│       ├── operations
│       │   ├── mod.rs
│       │   └── sorting.rs
│       └── utils
│           ├── bson.rs
│           ├── mod.rs
│           └── sync_mongo_models.rs
├── my-macros
│   ├── Cargo.toml
│   ├── derive
│   │   ├── Cargo.toml
│   │   └── src
│   │       ├── examples
│   │       │   ├── foo_bar.rs
│   │       │   ├── hello.rs
│   │       │   └── mod.rs
│   │       ├── fields_getter
│   │       │   ├── helpers.rs
│   │       │   ├── mod.rs
│   │       │   ├── trait_generator.rs
│   │       │   └── types.rs
│   │       └── lib.rs
│   ├── src
│   │   ├── lib.rs
│   │   └── main.rs
│   └── tests
│       └── fields_getter.rs
└── slim.report.json
 ```



From the root
Build all
`cargo build`

Build graphql-mongo
`cargo build -p graphql-mongo`

Run graphql-mongo alone
`cargo run -p graphql-mongo`