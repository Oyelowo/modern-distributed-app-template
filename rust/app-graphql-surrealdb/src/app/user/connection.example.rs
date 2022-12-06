   async fn posts_connection_simple(
        &self,
        ctx: &Context<'_>,
        after: Option<String>,
        before: Option<String>,
        first: Option<i32>,
        last: Option<i32>,
        // characters: &[&'a StarWarsChar],
        // map_to: F,
    ) -> Result<
        Connection<
            connection::OpaqueCursor<String>,
            Post,
            EmptyFields,
            EmptyFields,
            DefaultConnectionName,
            DefaultEdgeName,
        >,
    > {
        let post = Post {
            poster_id: uuid::Uuid::new_v4(),
            id: Some(uuid::Uuid::new_v4()),
            title: "".to_string(),
            content: "".to_string(),
        };
        let add_fields = ConnectionAdditionalFields { totalCount: 43 };

        // ctx.look_ahead().field("xx").field("yy").field("zz");
        // Edge::new(1, post).node.poster_id;
        let q = query(
            after,
            before,
            first,
            last,
            |after, before, first, last| async move {
                let mut connection = Connection::new(true, true);
                connection.edges.extend([Edge::new(
                    connection::OpaqueCursor("1".to_string()),
                    post,
                    // EmptyFields,
                )]);
                Ok::<_, async_graphql::Error>(connection)
            },
        )
        .await;
        q
    }