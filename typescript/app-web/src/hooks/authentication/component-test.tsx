import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { atom } from "jotai";
import {
	GraphqlErrorResponse,
	mapReactQueryResultToImpossibleStates,
} from "./helpers.js";
import {
	graphqlApi,
	ValueTypes,
	ReturnTypesType,
	AllTypesPropsType,
} from "lib-graphql";
import { match, P } from "ts-pattern";

// const kk : AllTypesPropsType[""] = {
// "...on PostResponse":{
//     data: {
//    content: true
//     }
// }
// }

graphqlApi
	.query({
		user: [
			{ id: "" },
			{
				__typename: true,
				"...on User": {
					username: true,
					email: true,
					postsConnection2: [
						{ after: "", before: "", first: 50 },
						{
							__typename: true,
							"...on PostConnection": {
								edges: {
									cursor: true,
									node: {
										id: true,
										content: true,
										posterId: true,
										title: true,
										poster: {
											age: true,
											username: true,
											email: true,
										},
									},
								},
								pageInfo: {
									hasNextPage: true,
									hasPreviousPage: true,
									endCursor: true,
									startCursor: true,
								},
							},
							"...on UserNotFoundError": {
								message: true,
								solution: true,
							},
						},
					],
				},
				"...on UserNotFoundError": {
					message: true,
					solution: true,
				},
			},
		],
	})
	.then((u) => {
		match(u.user)
			.with({ __typename: "User" }, (x) => {
				const email = <div>{x.email}</div>;

				match(x.postsConnection2).with(
					{ __typename: "PostConnection" },
					(x) => {
						return (
							<div>
								{x.edges.map((e) => (
									<span>{e.node.content}</span>
								))}
							</div>
						);
					},
				);
			})
			.with({ __typename: "UserNotFoundError" }, (x) => {
				return (
					<div>
						{x.message}

						{x.solution}
					</div>
				);
			})
			.exhaustive();
	});

graphqlApi
	.query({
		user: [
			{ id: "" },
			{
				__typename: true,
				"...on User": {
					username: true,
					posts: {
						__typename: true,
						"...on PostResponse": {
							data: {
								content: true,
								title: true,
								posterId: true,
								poster: {
									city: true,
								},
							},
						},
						"...on UserNotFoundError": {
							message: true,
							solution: true,
						},
					},
				},
				"...on UserNotFoundError": {
					message: true,
				},
			},
		],
	})
	.then((d) => {
		const users = match(d.user)
			.with({ __typename: "User" }, (x) => x)
			.run();
		users.username;

		let k = match(d.user)
			.with({ __typename: "User" }, (d) => {
				match(d.posts)
					.with({ __typename: "PostResponse" }, (x) =>
						x.data.map((x) => {
							return <div>{x.content}</div>;
						}),
					)
					.with({ __typename: "UserNotFoundError" }, (x) => {
						return <div>{x.message}</div>;
					})
					.exhaustive();
			})
			.with({ __typename: "UserNotFoundError" }, (d) => d.message)
			.exhaustive();

		let user = match(d.user)
			.with({ __typename: "User" }, (d) => {
				<div>{d.username}</div>;
			})
			.with({ __typename: "UserNotFoundError" }, (d) => d.message)
			.exhaustive();

		let xx = match(d.user)
			.with({ __typename: "User" }, (d) =>
				match(d.posts).with({ __typename: "PostResponse" }, (x) => x),
			)
			.run()
			.run().data[0];

		// let xx = match(d.user).when(d=>d.__typename=== "User", x=>x.)
	});
