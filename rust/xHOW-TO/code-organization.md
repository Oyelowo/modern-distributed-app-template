> tree -L 3 > xHOW-TO/code-organization.md  

```sh
.
├── Cargo.lock
├── Cargo.toml
├── Dockerfile.development
├── Dockerfile.production
├── Makefile
├── README.md
├── lib-common
│   ├── Cargo.toml
│   └── src
│       ├── authentication
│       ├── configurations
│       ├── error_handling
│       ├── lib.rs
│       ├── macros
│       ├── middleware
│       ├── oauth
│       └── utils
├── examplequery.graphql
├── app-graphql-surrealdb
│   ├── Cargo.toml
│   ├── generated
│   │   └── schema.graphql
│   ├── gql_test.graphql
│   └── src
│       ├── app
│       ├── bin
│       ├── handlers
│       ├── lib.rs
│       ├── main.rs
│       └── utils
├── app-grpc-surrealdb
│   ├── Cargo.toml
│   ├── Helloworld.md
│   ├── build.rs
│   ├── grpc_setting_started.md
│   ├── grpc_setting_started.readme
│   ├── grpccurl.sh
│   ├── protobuf
│   │   ├── app_analytics.proto
│   │   ├── helloworld.proto
│   │   └── music.proto
│   └── src
│       ├── app
│       ├── bin
│       ├── lib.rs
│       ├── main.rs
│       └── utils
├── lib-my-macros
│   ├── Cargo.toml
│   ├── derive
│   │   ├── Cargo.toml
│   │   └── src
│   ├── src
│   │   ├── lib.rs
│   │   └── main.rs
│   └── tests
│       └── fields_getter.rs
├── target
│   ├── debug
│   │   ├── build
│   │   ├── deps
│   │   ├── examples
│   │   └── incremental
│   └── tmp
└── xHOW-TO
    ├── code-organization.md
    └── update-graphql-operations.md
```
