```sh
tree -L 3
```

```txt
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
│       ├── configurations
│       ├── error_handling
│       ├── lib.rs
│       ├── macros
│       ├── middleware
│       └── utils
├── examplequery.graphql
├── graphql-mongo
│   ├── Cargo.toml
│   ├── generated
│   │   └── schema.graphql
│   ├── gql_test.graphql
│   └── src
│       ├── app
│       ├── bin
│       ├── handlers
│       ├── lib.rs
│       ├── main.rs
│       ├── oauth
│       └── utils
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
│   │   ├── bin
│   │   ├── lib.rs
│   │   ├── main.rs
│   │   ├── migration
│   │   ├── tests
│   │   └── utils
│   ├── target
│   │   ├── debug
│   │   └── sqlx
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
│       ├── bin
│       ├── lib.rs
│       ├── main.rs
│       └── utils
├── mongo-helpers
│   ├── Cargo.toml
│   └── src
│       ├── lib.rs
│       ├── operations
│       └── utils
├── my-macros
│   ├── Cargo.toml
│   ├── derive
│   │   ├── Cargo.toml
│   │   └── src
│   ├── src
│   │   ├── lib.rs
│   │   └── main.rs
│   └── tests
│       └── fields_getter.rs
```