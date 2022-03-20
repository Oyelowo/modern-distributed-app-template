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
  adapter: MyAdapter({}),
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
    strategy: "database",
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
    // async signIn(user, account, profile) { return true },
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

export function MyAdapter(client, options = {}): Adapter {
  return {
    async createUser(user: AdapterUserHack) {
      return Promise.resolve({} as AdapterUser);
    },
    async getUser(id) {
      return Promise.resolve({} as AdapterUser);
    },
    async getUserByEmail(email) {
      return Promise.resolve({} as AdapterUser);
    },
    async getUserByAccount({ providerAccountId, provider }) {
      return Promise.resolve({} as AdapterUser);
    },
    async updateUser(user) {
      return Promise.resolve({} as AdapterUser);
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      return Promise.resolve({} as AdapterSession);
    },
    async getSessionAndUser(sessionToken) {
      return Promise.resolve(
        {} as { session: AdapterSession; user: AdapterUser }
      );
      return;
    },
    async updateSession({ sessionToken }) {
      return Promise.resolve({} as AdapterSession);
    },
    async deleteSession(sessionToken) {
      return Promise.resolve({} as AdapterSession);
    },
    async createVerificationToken({ identifier, expires, token }) {
      return Promise.resolve({} as VerificationToken);
    },
    async useVerificationToken({ identifier, token }) {
      return Promise.resolve({} as VerificationToken);
    },
  };
}
