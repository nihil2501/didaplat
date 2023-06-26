import { NextAuthOptions } from "next-auth";
import { getServerSession as getNextAuthServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    })
  ]
};

export const authHandler = NextAuth(authOptions);

export async function getServerSession() {
  // Is there any way to memoize this per request?
  return await getNextAuthServerSession(authOptions);
};
