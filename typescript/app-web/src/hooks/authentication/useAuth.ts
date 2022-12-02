import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { atom } from "jotai";
import {
	GraphqlErrorResponse,
	mapReactQueryResultToImpossibleStates,
} from "./helpers.js";
import { graphqlApi, ValueTypes } from "lib-graphql";
import { match, P } from "ts-pattern";

const error: ValueTypes["ServerError"] = {
	message: true,
	solution: true,
};

const z = graphqlApi.mutation({
	signOut: {
		__typename: true,
		"...on ServerError": error,
		"...on UserSessionExpiredError": error,
		"...on SignOutMessage": {
			userId: true,
		},
	},
}).then(res => {

	match(res.signOut)
		.with({ __typename: "SignOutMessage" }, d => {
			d.userId
		})
		.with({ __typename: P.union("ServerError", "UserSessionExpiredError") }, d => {
			d.message
			d.solution
		})
		.exhaustive()
});


const xx = graphqlApi
	.query({
		me: {
			__typename: true,
			// message: true,
			"...on User": {
				id: true,
				username: true,
				firstName: true,
				emailVerified: true,
				email: true,
			},
			"...on UserNotFoundError": {
				title: true,
				message: true,
				solution: true,
				moreField: true,
			},
			"...on UserRegisterInvalidInputError": {
				emailErrorMessage: true,
				loginErrorMessage: true,
			},
			// "...on UserBaseError": {
			// 	title: true,
			// 	message: true,
			// 	solution: true,
			// },
		},
	})
	.then((d) => {
		const xx = match(d.me)
			.with({ __typename: "User" }, (x) => ({ new: x.username }))
			.with({ __typename: "UserNotFoundError" }, (x) => ({ new: x.message }))
			.with({ __typename: "UserRegisterInvalidInputError" }, (x) => ({
				new: x.loginErrorMessage,
			}))
			// .with({ __typename: "UserB" }, (x) => ({ new: x.message }))
			.exhaustive();
	});

const createUserQuery = graphqlApi.mutation({
	createUser: [
		{
			userInput: {
				username: "",
				password: "",
				socialMedia: [],
			},
		},
		{
			firstName: true,
			lastName: true,
			email: true,
			age: true,
			posts: {
				id: true,
				title: true,
				poster: {
					age: true,
					email: true,
					username: true,
					posts: {
						id: true,
					},
				},
			},
		},
	],
});

export interface UseSessionProps {
	// queryConfig?: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
}

export function useAuth() {
	const { data: xx } = useQuery(
		["er"],
		async () =>
			await graphqlApi.query({
				session: {
					expiresAt: true,
					userId: true,
				},
			}),
	);

	const { data, status, error } = useQuery(
		["auth"],
		async () => await createUserQuery,
	);

	const _mappedData = mapReactQueryResultToImpossibleStates({
		status,
		data,
		error,
	});

	if (_mappedData.status === "success") {
		_mappedData.data?.createUser.posts[0].poster.posts[1].id;
	}

	return {
		// isAuth: !!(!data?.session.userId && error?.response.data),
		isAuth: true,
		isLoading: false,
	};
	// return mappedData;
}

type Auth =
	| {
		status: "loggedIn";
		username: string;
	}
	| {
		status: "loggedOut";
	};

const textAtom = atom<Auth>({ status: "loggedOut" });

// const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())

export function useAuth2(): Auth {
	return {
		status: "loggedIn",
		username: "lowo",
	};
}
