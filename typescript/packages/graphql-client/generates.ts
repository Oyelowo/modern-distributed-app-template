import { endpointUrl, fetchParams } from './my-config';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpointUrl as string, {
    method: "POST",
    ...(fetchParams),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
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

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: User;
};


export type MutationCreatePostArgs = {
  postInput: PostInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  id?: Maybe<Scalars['ObjectId']>;
  poster?: Maybe<User>;
  posterId: Scalars['ObjectId'];
  title: Scalars['String'];
};

export type PostInput = {
  content: Scalars['String'];
  posterId: Scalars['ObjectId'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostArgs = {
  id: Scalars['ObjectId'];
};


export type QueryUserArgs = {
  id: Scalars['ObjectId'];
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ObjectId']>;
  lastName: Scalars['String'];
  postCount: Scalars['Int'];
  posts: Array<Post>;
  socialMedia: Array<Scalars['String']>;
};

export type UserInput = {
  age: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  socialMedia: Array<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id?: any | null, firstName: string, lastName: string, email: string, age: number } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id?: any | null, firstName: string, lastName: string, age: number, email: string, socialMedia: Array<string>, createdAt?: any | null, posts: Array<{ __typename?: 'Post', posterId: any, title: string, content: string }> }> };


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
    >(options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['createUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables)(),
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
      variables?: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>
    ) =>
    useQuery<GetUsersQuery, TError, TData>(
      variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, variables),
      options
    );