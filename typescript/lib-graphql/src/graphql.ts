/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: any;
  ObjectId: any;
};

export type AccountOauth = {
  __typename?: "AccountOauth";
  accessToken: Scalars["String"];
  displayName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  emailVerified: Scalars["Boolean"];
  /** access token expiration timestamp, represented as the number of seconds since the epoch (January 1, 1970 00:00:00 UTC). */
  expiresAt?: Maybe<Scalars["DateTime"]>;
  /** unique identifier for the oauth provider. Don't use name of user because that could be changed */
  id: Scalars["String"];
  idToken?: Maybe<Scalars["String"]>;
  oauthToken?: Maybe<Scalars["String"]>;
  oauthTokenSecret?: Maybe<Scalars["String"]>;
  provider: OauthProvider;
  providerAccountId: OauthProvider;
  refreshToken?: Maybe<Scalars["String"]>;
  scopes: Array<Scalars["String"]>;
  tokenType?: Maybe<TokenType>;
};

export type Address = {
  city: Scalars["String"];
  houseNumber: Scalars["String"];
  street: Scalars["String"];
  zip: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  createUser: User;
  signIn: User;
  signOut: SignOutMessage;
  /**
   * Creates a new user but doesn't log in the user
   * Currently like this because of future developments
   */
  signUp: User;
};

export type MutationCreatePostArgs = {
  post: PostInput;
};

export type MutationCreateUserArgs = {
  userInput: UserInput;
};

export type MutationSignInArgs = {
  signInCredentials: SignInCredentials;
};

export type MutationSignUpArgs = {
  user: UserInput;
};

export enum OauthProvider {
  Github = "GITHUB",
  Google = "GOOGLE",
}

export type Post = {
  __typename?: "Post";
  content: Scalars["String"];
  id?: Maybe<Scalars["ObjectId"]>;
  poster: User;
  posterId: Scalars["ObjectId"];
  title: Scalars["String"];
};

export type PostInput = {
  content: Scalars["String"];
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getUser: User;
  me: User;
  post: Post;
  posts: Array<Post>;
  session: Session;
  user: User;
  users: Array<User>;
};

export type QueryGetUserArgs = {
  userBy: UserBy;
};

export type QueryPostArgs = {
  id: Scalars["ObjectId"];
};

export type QueryUserArgs = {
  id: Scalars["ObjectId"];
};

export enum Role {
  Admin = "ADMIN",
  User = "USER",
}

export type Session = {
  __typename?: "Session";
  expiresAt: Scalars["DateTime"];
  userId: Scalars["ObjectId"];
};

export type SignInCredentials = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type SignOutMessage = {
  __typename?: "SignOutMessage";
  message: Scalars["String"];
  userId: Scalars["ObjectId"];
};

export type Subscription = {
  __typename?: "Subscription";
  values: Scalars["Int"];
};

export enum TokenType {
  Bearer = "BEARER",
}

export type User = {
  __typename?: "User";
  accounts: Array<AccountOauth>;
  age?: Maybe<Scalars["Int"]>;
  city?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  email?: Maybe<Scalars["String"]>;
  emailVerified: Scalars["Boolean"];
  firstName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ObjectId"]>;
  lastName?: Maybe<Scalars["String"]>;
  postCount: Scalars["Int"];
  posts: Array<Post>;
  roles: Array<Role>;
  socialMedia: Array<Scalars["String"]>;
  username: Scalars["String"];
};

export type UserBy = {
  address?: InputMaybe<Address>;
  email?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["ObjectId"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type UserInput = {
  age?: InputMaybe<Scalars["Int"]>;
  city?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  socialMedia: Array<Scalars["String"]>;
  username: Scalars["String"];
};

export type SignInMutationVariables = Exact<{
  signInCredentials: SignInCredentials;
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "User";
    username: string;
    email?: string | null;
    age?: number | null;
  };
};

export type SignUpMutationVariables = Exact<{
  user: UserInput;
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "User";
    username: string;
    email?: string | null;
    age?: number | null;
  };
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = {
  __typename?: "Mutation";
  signOut: { __typename?: "SignOutMessage"; userId: any; message: string };
};

export type SessionQueryVariables = Exact<{ [key: string]: never }>;

export type SessionQuery = {
  __typename?: "Query";
  session: { __typename?: "Session"; userId: any; expiresAt: any };
};

export type CreateUserMutationVariables = Exact<{
  userInput: UserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: {
    __typename?: "User";
    id?: any | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    age?: number | null;
  };
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  users: Array<
    {
      __typename?: "User";
      id?: any | null;
      firstName?: string | null;
      lastName?: string | null;
      age?: number | null;
      email?: string | null;
      socialMedia: Array<string>;
      createdAt?: any | null;
      posts: Array<
        { __typename?: "Post"; posterId: any; title: string; content: string }
      >;
    }
  >;
};

export type GetUserQueryVariables = Exact<{
  UserBy: UserBy;
}>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser: {
    __typename?: "User";
    id?: any | null;
    firstName?: string | null;
    lastName?: string | null;
    age?: number | null;
    email?: string | null;
    socialMedia: Array<string>;
    createdAt?: any | null;
    posts: Array<
      { __typename?: "Post"; posterId: any; title: string; content: string }
    >;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id?: any | null;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    age?: number | null;
    city?: string | null;
    roles: Array<Role>;
    email?: string | null;
    socialMedia: Array<string>;
    createdAt?: any | null;
    postCount: number;
    accounts: Array<{ __typename?: "AccountOauth"; provider: OauthProvider }>;
    posts: Array<
      { __typename?: "Post"; posterId: any; title: string; content: string }
    >;
  };
};

export const SignInDocument = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "mutation",
    "name": { "kind": "Name", "value": "signIn" },
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": { "kind": "Name", "value": "signInCredentials" },
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": { "kind": "Name", "value": "SignInCredentials" },
        },
      },
    }],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": { "kind": "Name", "value": "signIn" },
        "arguments": [{
          "kind": "Argument",
          "name": { "kind": "Name", "value": "signInCredentials" },
          "value": {
            "kind": "Variable",
            "name": { "kind": "Name", "value": "signInCredentials" },
          },
        }],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "username" },
            },
            { "kind": "Field", "name": { "kind": "Name", "value": "email" } },
            { "kind": "Field", "name": { "kind": "Name", "value": "age" } },
          ],
        },
      }],
    },
  }],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "mutation",
    "name": { "kind": "Name", "value": "signUp" },
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": { "kind": "Name", "value": "user" },
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": { "kind": "Name", "value": "UserInput" },
        },
      },
    }],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": { "kind": "Name", "value": "signUp" },
        "arguments": [{
          "kind": "Argument",
          "name": { "kind": "Name", "value": "user" },
          "value": {
            "kind": "Variable",
            "name": { "kind": "Name", "value": "user" },
          },
        }],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "username" },
            },
            { "kind": "Field", "name": { "kind": "Name", "value": "email" } },
            { "kind": "Field", "name": { "kind": "Name", "value": "age" } },
          ],
        },
      }],
    },
  }],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const SignOutDocument = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "mutation",
    "name": { "kind": "Name", "value": "signOut" },
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": { "kind": "Name", "value": "signOut" },
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "name": { "kind": "Name", "value": "userId" },
          }, {
            "kind": "Field",
            "name": { "kind": "Name", "value": "message" },
          }],
        },
      }],
    },
  }],
} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const SessionDocument = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "query",
    "name": { "kind": "Name", "value": "session" },
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": { "kind": "Name", "value": "session" },
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "name": { "kind": "Name", "value": "userId" },
          }, {
            "kind": "Field",
            "name": { "kind": "Name", "value": "expiresAt" },
          }],
        },
      }],
    },
  }],
} as unknown as DocumentNode<SessionQuery, SessionQueryVariables>;
export const CreateUserDocument = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "mutation",
    "name": { "kind": "Name", "value": "createUser" },
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": { "kind": "Name", "value": "userInput" },
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": { "kind": "Name", "value": "UserInput" },
        },
      },
    }],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": { "kind": "Name", "value": "createUser" },
        "arguments": [{
          "kind": "Argument",
          "name": { "kind": "Name", "value": "userInput" },
          "value": {
            "kind": "Variable",
            "name": { "kind": "Name", "value": "userInput" },
          },
        }],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            { "kind": "Field", "name": { "kind": "Name", "value": "id" } },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "firstName" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "lastName" },
            },
            { "kind": "Field", "name": { "kind": "Name", "value": "email" } },
            { "kind": "Field", "name": { "kind": "Name", "value": "age" } },
          ],
        },
      }],
    },
  }],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetUsersDocument = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "query",
    "name": { "kind": "Name", "value": "GetUsers" },
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": { "kind": "Name", "value": "users" },
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            { "kind": "Field", "name": { "kind": "Name", "value": "id" } },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "firstName" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "lastName" },
            },
            { "kind": "Field", "name": { "kind": "Name", "value": "age" } },
            { "kind": "Field", "name": { "kind": "Name", "value": "email" } },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "socialMedia" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "createdAt" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "posts" },
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [{
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "posterId" },
                }, {
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "title" },
                }, {
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "content" },
                }],
              },
            },
          ],
        },
      }],
    },
  }],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "query",
    "name": { "kind": "Name", "value": "getUser" },
    "variableDefinitions": [{
      "kind": "VariableDefinition",
      "variable": {
        "kind": "Variable",
        "name": { "kind": "Name", "value": "UserBy" },
      },
      "type": {
        "kind": "NonNullType",
        "type": {
          "kind": "NamedType",
          "name": { "kind": "Name", "value": "UserBy" },
        },
      },
    }],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": { "kind": "Name", "value": "getUser" },
        "arguments": [{
          "kind": "Argument",
          "name": { "kind": "Name", "value": "userBy" },
          "value": {
            "kind": "Variable",
            "name": { "kind": "Name", "value": "UserBy" },
          },
        }],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            { "kind": "Field", "name": { "kind": "Name", "value": "id" } },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "firstName" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "lastName" },
            },
            { "kind": "Field", "name": { "kind": "Name", "value": "age" } },
            { "kind": "Field", "name": { "kind": "Name", "value": "email" } },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "socialMedia" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "createdAt" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "posts" },
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [{
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "posterId" },
                }, {
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "title" },
                }, {
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "content" },
                }],
              },
            },
          ],
        },
      }],
    },
  }],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const MeDocument = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "query",
    "name": { "kind": "Name", "value": "me" },
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": { "kind": "Name", "value": "me" },
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [
            { "kind": "Field", "name": { "kind": "Name", "value": "id" } },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "username" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "firstName" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "lastName" },
            },
            { "kind": "Field", "name": { "kind": "Name", "value": "age" } },
            { "kind": "Field", "name": { "kind": "Name", "value": "city" } },
            { "kind": "Field", "name": { "kind": "Name", "value": "roles" } },
            { "kind": "Field", "name": { "kind": "Name", "value": "email" } },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "socialMedia" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "createdAt" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "postCount" },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "accounts" },
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [{
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "provider" },
                }],
              },
            },
            {
              "kind": "Field",
              "name": { "kind": "Name", "value": "posts" },
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [{
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "posterId" },
                }, {
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "title" },
                }, {
                  "kind": "Field",
                  "name": { "kind": "Name", "value": "content" },
                }],
              },
            },
          ],
        },
      }],
    },
  }],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
