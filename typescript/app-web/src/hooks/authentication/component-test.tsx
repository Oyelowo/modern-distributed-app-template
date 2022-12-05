import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { atom } from "jotai";
import {
  GraphqlErrorResponse,
  mapReactQueryResultToImpossibleStates,
} from "./helpers.js";
import {
  AllTypesPropsType,
  graphqlApi,
  ReturnTypesType,
  ValueTypes,
} from "lib-graphql";
import { isMatching, match, P } from "ts-pattern";

const basicErrorShape: ValueTypes["ServerError"] = {
  message: true,
  solution: true,
};

const query = graphqlApi
  .query({
    user: [
      { id: "" },
      {
        __typename: true,
        "...on User": {
          username: true,
          postsConnection2: [{ after: "", first: 10 }, {
            __typename: true,
            "...on PostConnection": {
              edges: {
                cursor: true,
                happy: true,
                lowo: true,
                node: {
                  content: true,
                },
              },
              pageInfo: {
                hasNextPage: true,
                hasPreviousPage: true,
                endCursor: true,
                startCursor: true,
              },
            },
            "...on UserNotFoundError": basicErrorShape,
          }],
        },
        "...on UserNotFoundError": basicErrorShape,
        "...on ServerError": basicErrorShape,
      },
    ],
  });

query.then((d) => {
  // const users = match(d.user)
  // 	.with({ __typename: "User" }, (x) => x)
  // 	.run();

  match(d.user)
    .with({ __typename: "User" }, (d) => {
      match(d.postsConnection2)
        .with({ __typename: "PostConnection" }, (x) =>
          x.edges.map((x) => {
            return (
              <>
                {x.node.content}
              </>
            );
          }))
        .with({ __typename: "UserNotFoundError" }, (x) => x.message)
        .exhaustive();
    })
    .with(
      { __typename: P.union("UserNotFoundError", "ServerError") },
      (d) => {
        return (
          <>
            {d.message}
            {d.solution}
          </>
        );
      },
    )
    .exhaustive();
});

query.then((d) => {
  // P.union("UserNotFoundError", "ServerError"),
  // if (isMatching(P.union("UserNotFoundError", "ServerError"), d.user.__typename)) {
  if (
    d.user.__typename === "UserNotFoundError" ||
    d.user.__typename === "ServerError"
  ) {
    return {
      x: d.user.message,
    };
  }

  match(d.user.postsConnection2)
    .with({ __typename: "PostConnection" }, (x) =>
      x.edges.map((x) => {
        return (
          <>
            {x.node.content}
          </>
        );
      }))
    .with({ __typename: "UserNotFoundError" }, (x) => x.message)
    .exhaustive();
});
