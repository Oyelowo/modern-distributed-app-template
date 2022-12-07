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
	Relation: "enum" as const,
	Role: "enum" as const,
	SignInCredentials:{

	},
	TokenType: "enum" as const,
	UUID: `scalar.UUID` as const,
	User:{
		postsConnection:{

		}
	},
	UserBy:{
		userId:"UUID",
		address:"Address"
	},
	UserInput:{

	},
	UuidSurrealdb: `scalar.UuidSurrealdb` as const
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
	FirstOrLastParamsError:{
		message:"String",
		solution:"String"
	},
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
		nodes:"Post",
		totalCount:"Int"
	},
	PostEdge:{
		cursor:"String",
		node:"Post",
		relationshipToNextNode:"Relation"
	},
	PostsConnectionResult:{
		"...on PostConnection":"PostConnection",
		"...on UserNotFoundError":"UserNotFoundError",
		"...on FirstOrLastParamsError":"FirstOrLastParamsError",
		"...on ServerError":"ServerError",
		"...on UserSessionExpiredError":"UserSessionExpiredError"
	},
	Query:{
		me:"UserGetResult",
		user:"UserGetResult",
		getUser:"UserGetResult",
		users:"User",
		session:"SessionResult",
		post:"Post",
		posts:"Post"
	},
	ServerError:{
		message:"String",
		solution:"String"
	},
	Session:{
		userId:"UuidSurrealdb"
	},
	SessionResult:{
		"...on Session":"Session",
		"...on UserSessionExpiredError":"UserSessionExpiredError",
		"...on ServerError":"ServerError"
	},
	SignOutMessage:{
		message:"String",
		userId:"UUID"
	},
	Subscription:{
		values:"Int"
	},
	UUID: `scalar.UUID` as const,
	User:{
		id:"UuidSurrealdb",
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
		postsConnection:"PostsConnectionResult"
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
		"...on UserNotFoundError":"UserNotFoundError",
		"...on ServerError":"ServerError"
	},
	UserGenericError:{
		message:"String",
		solution:"String"
	},
	UserGetResult:{
		"...on User":"User",
		"...on UserNotFoundError":"UserNotFoundError",
		"...on ServerError":"ServerError",
		"...on UserSessionExpiredError":"UserSessionExpiredError"
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
		"...on UserNotFoundError":"UserNotFoundError",
		"...on ServerError":"ServerError"
	},
	UserSignOutResult:{
		"...on SignOutMessage":"SignOutMessage",
		"...on UserSessionExpiredError":"UserSessionExpiredError",
		"...on ServerError":"ServerError"
	},
	UuidSurrealdb: `scalar.UuidSurrealdb` as const
}

export const Ops = {
mutation: "Mutation" as const,
	query: "Query" as const,
	subscription: "Subscription" as const
}