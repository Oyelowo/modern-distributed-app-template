import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
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
  __typename?: 'AccountOauth';
  accessToken: Scalars['String'];
  accountType: Scalars['String'];
  expiresAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  idToken?: Maybe<Scalars['String']>;
  profile: ProfileOauth;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  sessionState?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type AccountOauthInput = {
  accessToken: Scalars['String'];
  accountType: Scalars['String'];
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  idToken?: InputMaybe<Scalars['String']>;
  profile: ProfileOauthInput;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refreshToken?: InputMaybe<Scalars['String']>;
  scope?: InputMaybe<Scalars['String']>;
  sessionState?: InputMaybe<Scalars['String']>;
  tokenType?: InputMaybe<Scalars['String']>;
};

export type Address = {
  city: Scalars['String'];
  houseNumber: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdateUserOauth: User;
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


export type MutationCreateOrUpdateUserOauthArgs = {
  account: AccountOauthInput;
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

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  id?: Maybe<Scalars['ObjectId']>;
  poster: User;
  posterId: Scalars['ObjectId'];
  title: Scalars['String'];
};

export type PostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type ProfileOauth = {
  __typename?: 'ProfileOauth';
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type ProfileOauthInput = {
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUser: User;
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
  id: Scalars['ObjectId'];
};


export type QueryUserArgs = {
  id: Scalars['ObjectId'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Session = {
  __typename?: 'Session';
  expiresAt: Scalars['DateTime'];
  user: SessionUser;
};

export type SessionUser = {
  __typename?: 'SessionUser';
  email: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type SignInCredentials = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignOutMessage = {
  __typename?: 'SignOutMessage';
  message: Scalars['String'];
  userId: Scalars['ObjectId'];
};

export type Subscription = {
  __typename?: 'Subscription';
  values: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  accounts: Array<AccountOauth>;
  age?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  emailVerifiedAt?: Maybe<Scalars['DateTime']>;
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ObjectId']>;
  lastName: Scalars['String'];
  postCount: Scalars['Int'];
  posts: Array<Post>;
  roles: Array<Role>;
  socialMedia: Array<Scalars['String']>;
  username: Scalars['String'];
};

export type UserBy = {
  address?: InputMaybe<Address>;
  email?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ObjectId']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserInput = {
  age?: InputMaybe<Scalars['Int']>;
  city?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  socialMedia: Array<Scalars['String']>;
  username: Scalars['String'];
};

export type SignInMutationVariables = Exact<{
  signInCredentials: SignInCredentials;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', username: string, email: string, age?: number | null } };

export type SignUpMutationVariables = Exact<{
  user: UserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', username: string, email: string, age?: number | null } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'SignOutMessage', userId: any, message: string } };

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = { __typename?: 'Query', session: { __typename?: 'Session', expiresAt: any, user: { __typename?: 'SessionUser', name: string, email: string, image: string } } };

export type CreateOrUpdateUserOauthMutationVariables = Exact<{
  account: AccountOauthInput;
}>;


export type CreateOrUpdateUserOauthMutation = { __typename?: 'Mutation', createOrUpdateUserOauth: { __typename?: 'User', username: string, email: string, age?: number | null } };

export type CreateUserMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id?: any | null, firstName: string, lastName: string, email: string, age?: number | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id?: any | null, firstName: string, lastName: string, age?: number | null, email: string, socialMedia: Array<string>, createdAt?: any | null, posts: Array<{ __typename?: 'Post', posterId: any, title: string, content: string }> }> };


export const SignInDocument = `
    mutation signIn($signInCredentials: SignInCredentials!) {
  signIn(signInCredentials: $signInCredentials) {
    username
    email
    age
  }
}
    `;
export const useSignInMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignInMutation, TError, SignInMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignInMutation, TError, SignInMutationVariables, TContext>(
      ['signIn'],
      (variables?: SignInMutationVariables) => fetcher<SignInMutation, SignInMutationVariables>(client, SignInDocument, variables, headers)(),
      options
    );
export const SignUpDocument = `
    mutation signUp($user: UserInput!) {
  signUp(user: $user) {
    username
    email
    age
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['signUp'],
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers)(),
      options
    );
export const SignOutDocument = `
    mutation signOut {
  signOut {
    userId
    message
  }
}
    `;
export const useSignOutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignOutMutation, TError, SignOutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignOutMutation, TError, SignOutMutationVariables, TContext>(
      ['signOut'],
      (variables?: SignOutMutationVariables) => fetcher<SignOutMutation, SignOutMutationVariables>(client, SignOutDocument, variables, headers)(),
      options
    );
export const SessionDocument = `
    query session {
  session {
    user {
      name
      email
      image
    }
    expiresAt
  }
}
    `;
export const useSessionQuery = <
      TData = SessionQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: SessionQueryVariables,
      options?: UseQueryOptions<SessionQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SessionQuery, TError, TData>(
      variables === undefined ? ['session'] : ['session', variables],
      fetcher<SessionQuery, SessionQueryVariables>(client, SessionDocument, variables, headers),
      options
    );
export const CreateOrUpdateUserOauthDocument = `
    mutation createOrUpdateUserOauth($account: AccountOauthInput!) {
  createOrUpdateUserOauth(account: $account) {
    username
    email
    age
  }
}
    `;
export const useCreateOrUpdateUserOauthMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateOrUpdateUserOauthMutation, TError, CreateOrUpdateUserOauthMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateOrUpdateUserOauthMutation, TError, CreateOrUpdateUserOauthMutationVariables, TContext>(
      ['createOrUpdateUserOauth'],
      (variables?: CreateOrUpdateUserOauthMutationVariables) => fetcher<CreateOrUpdateUserOauthMutation, CreateOrUpdateUserOauthMutationVariables>(client, CreateOrUpdateUserOauthDocument, variables, headers)(),
      options
    );
export const CreateUserDocument = `
    mutation createUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    id
    firstName
    lastName
    email
    age
  }
}
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['createUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
      options
    );
export const GetUsersDocument = `
    query GetUsers {
  users {
    id
    firstName
    lastName
    age
    email
    socialMedia
    createdAt
    posts {
      posterId
      title
      content
    }
  }
}
    `;
export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUsersQuery, TError, TData>(
      variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers),
      options
    );