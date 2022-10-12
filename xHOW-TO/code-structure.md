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
├── graphql-surrealdb
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
├── grpc-surrealdb
│   ├── Cargo.toml
│   ├── Helloworld.md
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