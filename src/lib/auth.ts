import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    })
  ]
};
