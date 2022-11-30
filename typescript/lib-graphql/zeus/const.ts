/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Address:{

	},
	DateTime: `scalar.DateTime` as const,
	Mutation:{
		createUser:{
			userInput:"UserInput"
		},
		signUp:{
			user:"UserInput"
		},
		signIn:{
			signInCredentials:"SignInCredentials"
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
	TokenType: "enum" as const,
	UUID: `scalar.UUID` as const,
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
		signUp:"User",
		signIn:"User",
		signOut:"SignOutMessage",
		createPost:"Post"
	},
	Post:{
		id:"UUID",
		posterId:"UUID",
		title:"String",
		content:"String",
		poster:"User"
	},
	Query:{
		me:"UserResult",
		user:"User",
		getUser:"User",
		users:"User",
		session:"Session",
		post:"Post",
		posts:"Post"
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
	UUID: `scalar.UUID` as const,
	User:{
		id:"UUID",
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
		posts:"Post",
		postCount:"Int"
	},
	UserNotFoundError:{
		title:"String",
		message:"String",
		solution:"String"
	},
	UserResult:{
		"...on User":"User",
		"...on UserNotFoundError":"UserNotFoundError"
	}
}

export const Ops = {
mutation: "Mutation" as const,
	query: "Query" as const,
	subscription: "Subscription" as const
}