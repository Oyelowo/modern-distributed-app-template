import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
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
    // ...add more providers here
  ],
});
