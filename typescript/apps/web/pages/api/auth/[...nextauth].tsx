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
  // if(req.query.nextauth.includes("callback") && req.method === "POST") {
  //   console.log(
  //     "Handling callback request from my Identity Provider",
  //     req.body
  //   )
  // }

  // // Get a custom cookie value from the request
  // const someCookie = req.cookies["some-custom-cookie"]
  console.log("req.urlll", req.url);
  console.log("req.body", req.body);
  console.log("req.headers", req.headers);
  console.log("req.query", req.query);
  console.log("req.method", req.method);
  console.log("req.cookies", req.cookies);
  console.log("req.cookies", req.cookies["oyelowo-session"]);
  console.log("req.cookies-test", req.cookies["test"]);
  // console.log("reqALL",req);
  // console.log("resALL",res);
  console.log("resALLheaders", res.getHeaders());
  console.log("resALL", res.getHeader("cookie"));
  console.log("resheadersent", res.headersSent);
  console.log("tes.req.headers", res.req.headers);
  console.log("tes.req.uel", res.req.url);
  // res.setHeader
  // setHeader(headerName: string, cookies: string | string[])
  // can use array for multiple cookies
  res.setHeader(
    "Set-Cookie",
    serialize("token", "token_cookie_value", { path: "/" })
  );
  // res.setHeader(
  //   "Set-Cookie",
  //   "oyelowo-session=FT3b0G8xEih3LEaqLItVVR1LFFSlMaTth3Z3hUTRVbc=4WdvoWHCzyqXWoQdKq8TwkE8S4FvbygT; HttpOnly; SameSite=Lax; Path=/; Max-Age=15552000"
  // );

  /* 
      // Create a cookies instance
    const cookies = new Cookies(req, res)
    // Get a cookie
    cookies.get('myCookieName')
    // Set a cookie
    cookies.set('myCookieName', 'some-value', {
        httpOnly: true // true by default
    })
    // Delete a cookie
    cookies.set('myCookieName')
  */

  // GOOD
  /* 
    // setHeader(headerName: string, cookies: string | string[])
   // can use array for multiple cookies
   res.setHeader('Set-Cookie', serialize('token', 'token_cookie_value', { path: '/' }));
}
    */
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
        console.log("oiuygtfryguhijok account", account);
        console.log("oiuygtfryguhijok profile", profile);
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

          console.log("BEFORE FETCH");
          // a cookie jar scoped to the client object
          // const fetch = require("fetch-cookie")(crossFetch);
          // This code runs on the server which runs within the cluster, so, we need to
          // use the domain name(maybe FQDN) of the respective graphql server which also runs within
          // the same cluster and namespace. If it were on the client, then, we should use the
          // cluster domain exposed by the reverse proxy(Nginx-ingress controller in this case. 23/March/2022)

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
          const authCookie = resp.headers.get("set-cookie");
          console.log("The real header", authCookie);
          res.setHeader("set-cookie", authCookie);
          console.log("BIG HEADDDD", (await resp).headers);
          console.log("RESSSPONSE", (await resp).json());

          // If string is provided, it will redirect to the URI
          // TODO: Use variables for routes rather than hardcoding them
          return "/";
        }
      } catch (error) {
        return false;
      }
    },
  };
}
