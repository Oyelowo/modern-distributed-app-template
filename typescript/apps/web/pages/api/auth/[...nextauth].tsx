import NextAuth, { NextAuthOptions, User } from "next-auth";
import EmailProvider from "next-auth/providers/email";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GraphQLClient } from "graphql-request";
import {
  SignInDocument,
  SignInMutation,
  SignInMutationVariables,
} from "@oyelowo/graphql-client";

import {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";

// import CredentialsProvider from 'next-auth/providers/credentials';
import crossFetch from "cross-fetch";
// const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

import type { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // if(req.query.nextauth.includes("callback") && req.method === "POST") {
  //   console.log(
  //     "Handling callback request from my Identity Provider",
  //     req.body
  //   )
  // }

  // // Get a custom cookie value from the request
  // const someCookie = req.cookies["some-custom-cookie"]

  return await NextAuth(req, res, authOptions);
}

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  // adapter: PrismaAdapter(prisma),
  // adapter: MyAdapter({}),
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      /* 
      The Credentials provider can only be used if JSON Web Tokens are enabled for sessions. 
      Users authenticated with the Credentials provider are not persisted in the database.
      */
      credentials: {
        // email: {
        //   label: "Email",
        //   type: "text ",
        //   placeholder: "jsmith@example.com",
        // },
        username: {
          label: "Username",
          type: "text ",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("http://localhost:3000/api/login", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // Return null if user data could not be retrieved
        const query = SignInDocument;
        const variables: SignInMutationVariables = {
          signInCredentials: {
            username: credentials.username,
            password: credentials.password,
          },
        };
        // a cookie jar scoped to the client object
        // const fetch = require("fetch-cookie")(crossFetch);
        const client = new GraphQLClient("http://localhost:8080/graphql", {
          credentials: "include",
          // headers: {},
        });
        const { data, extensions, headers, status } =
          await client.rawRequest<SignInMutation>(query, variables);
        console.log("DATAAAAAA", JSON.stringify(data, undefined, 2));
        console.log("headers", JSON.stringify(headers, undefined, 2));
        console.log("extensions", JSON.stringify(extensions, undefined, 2));
        console.log("status", JSON.stringify(status, undefined, 2));
        return data.signIn;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  // Generate one with the command: `openssl rand -base64 32`
  secret: "process.env.SECRET",
  // secret: process.env.SECRET,

  session: {
    strategy: "jwt",
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    // jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/auth/signin", // Displays signin buttons
    // signIn: "/custom-signin", // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: "/newUser", // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    /* 
  WITH SESSION STRATEGY SET AS DATABASE
Listening on port 3000
async getUserByAccount({ providerAccountId, provider })
{ providerAccountId: '31687368', provider: 'github' }
async getUserByAccount({ providerAccountId, provider })
SIGNIN START
user {}
account {
  provider: 'github',
  type: 'oauth',
  providerAccountId: '31687368',
  access_token: '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',
  token_type: 'bearer',
  scope: 'read:user,user:email'
}
profile {
  login: 'Oyelowo',
  id: 31687368,
  node_id: 'MDQ6VXNlcjMxNjg3MzY4',
  avatar_url: 'https://avatars.githubusercontent.com/u/31687368?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/Oyelowo',
  html_url: 'https://github.com/Oyelowo',
  followers_url: 'https://api.github.com/users/Oyelowo/followers',
  following_url: 'https://api.github.com/users/Oyelowo/following{/other_user}',
  gists_url: 'https://api.github.com/users/Oyelowo/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/Oyelowo/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/Oyelowo/subscriptions',
  organizations_url: 'https://api.github.com/users/Oyelowo/orgs',
  repos_url: 'https://api.github.com/users/Oyelowo/repos',
  events_url: 'https://api.github.com/users/Oyelowo/events{/privacy}',
  received_events_url: 'https://api.github.com/users/Oyelowo/received_events',
  type: 'User',
  site_admin: false,
  name: 'Oyelowo Oyedayo',
  company: null,
  blog: '',
  location: 'Helsinki, Finland',
  email: 'oyelowooyedayo@gmail.com',
  hireable: true,
  bio: 'Full-stack Engineer | Rust | Typescript React | Kubernetes',
  twitter_username: null,
  public_repos: 281,
  public_gists: 2,
  followers: 25,
  following: 36,
  created_at: '2017-09-06T07:43:22Z',
  updated_at: '2022-03-16T00:55:55Z',
  private_gists: 1,
  total_private_repos: 21,
  owned_private_repos: 21,
  disk_usage: 1158956,
  collaborators: 2,
  two_factor_authentication: true,
  plan: {
    name: 'free',
    space: 976562499,
    collaborators: 0,
    private_repos: 10000
  }
}
email undefined
credentials undefined
SIGNIN END
async getSessionAndUser(sessionToken)
async getUserByAccount({ providerAccountId, provider })
{ providerAccountId: '31687368', provider: 'github' }
async getUserByAccount({ providerAccountId, provider })
async createSession({ sessionToken, userId, expires })
isNewUser: false

    */
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SIGNIN START");
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      console.log("email", email);
      console.log("credentials", credentials);
      console.log("SIGNIN END");
      return true;
    },
    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    signIn: ({ user, account, profile, isNewUser }) => {
      console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
    },
    // updateUser({ user })
  },

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: "auto",
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    brandColor: "green",
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
};

// export default NextAuth(authOptions);

interface AdapterUserHack extends AdapterUser {
  /*   id omitted here, I had to readd the type explicitly here in `createUser`
   function below and set id to never
  because autocompletion wasn't working in vscode because `AdapterUser`
    interface extends `Record<string, unknown>` somewhere in the inheritance tree.
   `id` field should be omitted
  20th, March, 2022. Oyelowo */
  id: never;
}

// Adapter logs from k8s cluster
/* 
Listening on port 3000
async getUserByAccount({ providerAccountId, provider })
async getUserByAccount({ providerAccountId, provider })
isNewUser: false
*/

export function MyAdapter(client, options = {}): Adapter {
  return {
    async createUser(user: AdapterUserHack) {
      console.log("async createUser(user: AdapterUserHack) ");
      return Promise.resolve({} as AdapterUser);
    },
    async getUser(id) {
      console.log("async getUser(id)");
      return Promise.resolve({} as AdapterUser);
    },
    async getUserByEmail(email) {
      console.log("async getUserByEmail(email)");
      return Promise.resolve({} as AdapterUser);
    },
    async getUserByAccount({ providerAccountId, provider }) {
      console.log("async getUserByAccount({ providerAccountId, provider })");
      console.log({ providerAccountId, provider });
      console.log("async getUserByAccount({ providerAccountId, provider })");
      return Promise.resolve({} as AdapterUser);
    },
    async updateUser(user) {
      console.log("async updateUser(user)");
      return Promise.resolve({} as AdapterUser);
    },
    async deleteUser(userId) {
      console.log("async deleteUser(userId)");
      return;
    },
    async linkAccount(account) {
      console.log("async linkAccount(account)");
      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      console.log("async unlinkAccount({ providerAccountId, provider })");
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log("async createSession({ sessionToken, userId, expires })", {
        sessionToken,
        userId,
        expires,
      });
      return Promise.resolve({} as AdapterSession);
    },
    async getSessionAndUser(sessionToken) {
      console.log("async getSessionAndUser(sessionToken), sessionToken:", sessionToken);
      return Promise.resolve(
        {} as { session: AdapterSession; user: AdapterUser }
      );
      return;
    },
    async updateSession({ sessionToken }) {
      console.log("async updateSession({ sessionToken })");
      return Promise.resolve({} as AdapterSession);
    },
    async deleteSession(sessionToken) {
      console.log("async deleteSession(sessionToken) START");
      console.log("sessionToken:", sessionToken);
      console.log("async deleteSession(sessionToken) END");
      return Promise.resolve({} as AdapterSession);
    },
    async createVerificationToken({ identifier, expires, token }) {
      console.log(
        "async createVerificationToken({ identifier, expires, token })"
      );
      return Promise.resolve({} as VerificationToken);
    },
    async useVerificationToken({ identifier, token }) {
      console.log("async useVerificationToken({ identifier, token })");
      return Promise.resolve({} as VerificationToken);
    },
  };
}
