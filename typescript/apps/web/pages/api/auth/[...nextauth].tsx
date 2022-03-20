/* eslint-disable react-hooks/rules-of-hooks */

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { useQueryClient } from "react-query";
import { useGetUsersQuery, useSignInMutation } from "@oyelowo/graphql-client";
import { GraphQLClient } from "graphql-request";
// process.env.NEXTAUTH_URL = "localhost:3000";
export default NextAuth({
  // Configure one or more authentication providers
  secret: "thefggfgfgfgfg secret",
  jwt: {},
  session: {},
  providers: [
    GithubProvider({
      //   clientId: process.env.GITHUB_ID,
      clientId: "89c19374f7e7b5b35164",
      //   clientSecret: process.env.GITHUB_SECRET,
      clientSecret: "129488cc92e2d2f91e3a5a024086396c48c65339",
    }),
    GoogleProvider({
      //   clientId: process.env.GITHUB_ID,
      clientId:
        "855174209543-6m0f088e55d3mevhnr8bs0qjap8j6g0g.apps.googleusercontent.com",
      //   clientSecret: process.env.GITHUB_SECRET,
      clientSecret: "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",
    }),
    //     // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const client = new GraphQLClient("http://localhost:8080/graphql", {
          headers: {},
        });
        client.setHeader(
          "Cookie",
          "oyelowo-session=6vIf6/Y49o2yXEpZAf2C88c8vpyd9pek9hZcEZTMPfg=XEeyKD6HxNKg5tbjKHCAAMIwYNfqgB3u"
        );
        // const queryClient = useQueryClient();
        // const { mutate, data } = useSignInMutation(client, {
        //   onMutate: () => {},
        // });
        // //  const { data, isSuccess } = makeGetUsersQuery(client);
        // // const { mutate } = useCreateUserMutation(client, {
        // //   onMutate: () => {
        // //     // queryClient.invalidateQueries(["GetUsers"]);
        // //     queryClient.refetchQueries(["GetUsers"]);
        // //   },
        // // });
        // //   mutate({
        // //     signInCredentials: {
        // //       username: "oyelowo",
        // //       password: "1234",
        // //     },
        // //   });
        // mutate({
        //   signInCredentials: {
        //     username: credentials.username,
        //     password: credentials.password,
        //   },
        // });

        // console.log("CREdentialsss", credentials);
        // console.log("Dataaaa", data);
        // return data.signIn;
        //     const SignInDocument = `
        //     mutation signIn($signInCredentials: SignInCredentials!) {
        //   signIn(signInCredentials: $signInCredentials) {
        //     username
        //     email
        //     age
        //   }
        // }
        //     `;

            const SignInDocument2 = `
          signIn(
              username: "oyelowo"
              password: "opolo"
          ) {
            username
            email
            age
          }
            `;

            console.log("RUNSSSSS");

            const res = await fetch("localhost:8080/graphql", {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify(SignInDocument2),
            });
            const user = await res.json();

            console.log("FERGERGFERGFDFGVD", user);
            // If no error and we have user data, return it
            if (res.ok && user) {
              return user;
            }
            // Return null if user data could not be retrieved
            return null;
      },
    }),
  ],

  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }): Promise<any> {
  //     console.log("RUNANANANAN");
  //   },
  //   // async signOut({user, account, profile, email, credentials}) {

  //   // },
  // },
  // secret: "process.env.SECRET"
});
