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
	ObjectId: `scalar.ObjectId` as const,
	PostInput:{

	},
	Query:{
		user:{
			id:"ObjectId"
		},
		getUser:{
			userBy:"UserBy"
		},
		post:{
			id:"ObjectId"
		}
	},
	Role: "enum" as const,
	SignInCredentials:{

	},
	TokenType: "enum" as const,
	UserBy:{
		userId:"ObjectId",
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
	ObjectId: `scalar.ObjectId` as const,
	Post:{
		id:"ObjectId",
		posterId:"ObjectId",
		title:"String",
		content:"String",
		poster:"User"
	},
	SearchResult:{
		"...on Photo":"Photo",
		"...on Person":"Person"
	},
	Person:{
		name:"String",
		age:"Int"
	},
	Photo:{
		height:"Int",
		width:"Int"
	},
	SearchQuery:{
		firstSearchResult:"SearchResult"
	},
	Query:{
		me:"User",
		user:"User",
		getUser:"User",
		users:"User",
		session:"Session",
		post:"Post",
		posts:"Post",
		search:"SearchQuery"
	},
	Session:{
		userId:"ObjectId",
		expiresAt:"DateTime"
	},
	SignOutMessage:{
		message:"String",
		userId:"ObjectId"
	},
	Subscription:{
		values:"Int"
	},
	User:{
		id:"ObjectId",
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
	}
}

export const Ops = {
mutation: "Mutation" as const,
	query: "Query" as const,
	subscription: "Subscription" as const
}