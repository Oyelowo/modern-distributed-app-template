/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Address:{

	},
	DateTime: `scalar.DateTime` as const,
	Mutation:{
		createUser:{
			userInput:"UserInput"
		},
		signIn:{
			signInCredentials:"SignInCredentials"
		},
		signUp:{
			user:"UserInput"
		},
		createPost:{
			post:"PostInput"
		}
	},
	OauthProvider: "enum" as const,
	PostInput:{

	},
	Query:{
		user:{
			id:"UUID"
		},
		getUser:{
			userBy:"UserBy"
		},
		post:{
			id:"UUID"
		}
	},
	Role: "enum" as const,
	SignInCredentials:{

	},
	SurrealDBUuid: `scalar.SurrealDBUuid` as const,
	TokenType: "enum" as const,
	UUID: `scalar.UUID` as const,
	User:{
		postsConnection2:{

		},
		postsConnection:{

		}
	},
	UserBy:{
		userId:"UUID",
		address:"Address"
	},
	UserInput:{

	}
}

export const ReturnTypes: Record<string,any> = {
	oneOf:{

	},
	AccountOauth:{
		id:"String",
		displayName:"String",
		email:"String",
		emailVerified:"Boolean",
		provider:"OauthProvider",
		providerAccountId:"OauthProvider",
		accessToken:"String",
		refreshToken:"String",
		expiresAt:"DateTime",
		tokenType:"TokenType",
		scopes:"String",
		idToken:"String",
		oauthToken:"String",
		oauthTokenSecret:"String"
	},
	DateTime: `scalar.DateTime` as const,
	Mutation:{
		createUser:"User",
		signIn:"UserSignInResult",
		signOut:"UserSignOutResult",
		signUp:"UserCreateResult",
		createPost:"Post"
	},
	PageInfo:{
		hasPreviousPage:"Boolean",
		hasNextPage:"Boolean",
		startCursor:"String",
		endCursor:"String"
	},
	Post:{
		id:"UUID",
		posterId:"UUID",
		title:"String",
		content:"String",
		poster:"User"
	},
	PostConnection:{
		pageInfo:"PageInfo",
		edges:"PostEdge",
		nodes:"Post"
	},
	PostEdge:{
		cursor:"String",
		node:"Post",
		lowo:"Boolean",
		happy:"Boolean"
	},
	PostsConnectionResult:{
		"...on PostConnection":"PostConnection",
		"...on UserNotFoundError":"UserNotFoundError"
	},
	Query:{
		me:"User",
		user:"UserGetResult",
		getUser:"UserGetResult",
		users:"User",
		session:"Session",
		post:"Post",
		posts:"Post"
	},
	ServerError:{
		message:"String",
		solution:"String"
	},
	Session:{
		userId:"UUID",
		expiresAt:"DateTime"
	},
	SignOutMessage:{
		message:"String",
		userId:"UUID"
	},
	Subscription:{
		values:"Int"
	},
	SurrealDBUuid: `scalar.SurrealDBUuid` as const,
	UUID: `scalar.UUID` as const,
	User:{
		id:"SurrealDBUuid",
		createdAt:"DateTime",
		username:"String",
		firstName:"String",
		lastName:"String",
		city:"String",
		email:"String",
		emailVerified:"Boolean",
		age:"Int",
		socialMedia:"String",
		roles:"Role",
		accounts:"AccountOauth",
		postsConnection2:"PostsConnectionResult",
		postsConnection:"PostConnection",
		postCount:"Int"
	},
	UserBaseError:{
		"...on ServerError": "ServerError",
		"...on UserGenericError": "UserGenericError",
		"...on UserHaveNoAccessError": "UserHaveNoAccessError",
		"...on UserNotFoundError": "UserNotFoundError",
		"...on UserSessionExpiredError": "UserSessionExpiredError",
		message:"String",
		solution:"String"
	},
	UserCreateResult:{
		"...on User":"User",
		"...on UserRegisterInvalidInputError":"UserRegisterInvalidInputError",
		"...on UserNotFoundError":"UserNotFoundError"
	},
	UserGenericError:{
		message:"String",
		solution:"String"
	},
	UserGetResult:{
		"...on User":"User",
		"...on UserNotFoundError":"UserNotFoundError"
	},
	UserHaveNoAccessError:{
		message:"String",
		solution:"String"
	},
	UserNotFoundError:{
		message:"String",
		solution:"String"
	},
	UserRegisterInvalidInputError:{
		usernameErrorMessage:"String",
		emailErrorMessage:"String",
		dateOfBirthErrorMessage:"String",
		passwordErrorMessage:"String"
	},
	UserSessionExpiredError:{
		message:"String",
		solution:"String"
	},
	UserSignInInvalidInputError:{
		usernameErrorMessage:"String",
		loginErrorMessage:"String",
		emailErrorMessage:"String",
		passwordErrorMessage:"String"
	},
	UserSignInResult:{
		"...on User":"User",
		"...on UserSignInInvalidInputError":"UserSignInInvalidInputError",
		"...on UserNotFoundError":"UserNotFoundError"
	},
	UserSignOutResult:{
		"...on SignOutMessage":"SignOutMessage",
		"...on UserSessionExpiredError":"UserSessionExpiredError",
		"...on ServerError":"ServerError"
	}
}

export const Ops = {
mutation: "Mutation" as const,
	query: "Query" as const,
	subscription: "Subscription" as const
}