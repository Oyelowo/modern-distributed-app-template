import NextAuth, {
  Account,
  CallbacksOptions,
  NextAuthOptions,
  Profile,
  User,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GraphQLClient } from "graphql-request";
import {
  CreateOrUpdateUserOauthDocument,
  CreateOrUpdateUserOauthMutation,
  CreateOrUpdateUserOauthMutationVariables,
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
// import Cookies from "cookies";
import { serialize } from "cookie";

// import CredentialsProvider from 'next-auth/providers/credentials';
import crossFetch from "cross-fetch";
// const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

import type { NextApiRequest, NextApiResponse } from "next";
import { Provider } from "next-auth/providers";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: initProviders(req, res),
    secret: "process.env.SECRET",
    session: {
      strategy: "database",
    },
    pages: {
      signIn: "/auth/signin",
    },
    callbacks: initCallbacks(req, res),
  });
}

function initProviders(req: NextApiRequest, res: NextApiResponse): Provider[] {
  return [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ];
}

function initCallbacks(
  req: NextApiRequest,
  res: NextApiResponse
): Partial<CallbacksOptions<Profile, Account>> {
  return {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const query = CreateOrUpdateUserOauthDocument;
        // Login for github oauth
        // TODO: Add google
        // TODO: Camelize all keys before using to standardize them
        if (account?.provider === "github") {
          const variables: CreateOrUpdateUserOauthMutationVariables = {
            account: {
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
              accessToken: account?.access_token,
              accountType: account?.type ?? "",
              expiresAt: account?.expires_at ?? new Date().toISOString(),
              idToken: account?.id_token ?? "",
              refreshToken: account?.refresh_token ?? "",
              scope: account?.scope ?? "",
              sessionState: account?.session_state ?? "",
              tokenType: account?.token_type ?? "",
            },
            profile: {
              email: profile?.email,
              // TODO: DO this right. Dont hardcode
              emailVerified: false,
              // TODO: Fix this hack
              firstName: profile.name,
              // firstName: (profile as any).first_name ?? profile?.name?.split(" ").at(0),
              lastName: "Oyedayo",
              // lastName:  (profile as any).last_name ?? profile?.name?.split(" ").at(-1),
              username: (profile as any).login ?? profile.name,
            },
          };


          // This code runs on the server which runs within the cluster, so, we need to
          // use the domain name(maybe FQDN) of the respective rust graphql service which also runs within
          // the same cluster and namespace. 
          // If it were on the client, then, we should use the
          // cluster domain exposed by the reverse proxy(Nginx-ingress controller in this case. 23/March/2022)
          // TODO: Grab the domain using environment variables which will be provided by the nextjs k8s deployment
          const resp = await fetch(
            "http://graphql-mongo.development:8000/graphql",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: query,
                variables: variables,
              }),
            }
          );
          // Relay the cookie from the rust graphql api to the client via the nextjs server. This runs in the server
          const authCookie = resp.headers.get("set-cookie");
          res.setHeader("set-cookie", authCookie);

          // TODO: Use variables for routes rather than hard-coding them
          // If string is provided, it will redirect to the URI
          return "/";
        }
      } catch (error) {
        return false;
      }
    },
  };
}
