import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import NextAuth, {
  getServerSession as getNextAuthServerSession,
  SessionStrategy
} from "next-auth";
import { memoize } from "./utils";
import DrizzleAdapter from "./DrizzleAdapter";
import { Adapter } from "next-auth/adapters";

async function buildAuth() {
  if (!env.GITHUB_ID || !env.GITHUB_SECRET) {
    throw new Error(
      "GITHUB_ID or GITHUB_SECRET environment variable is not defined"
    );
  }

  const strategy: SessionStrategy = "jwt";
  const adapter = await DrizzleAdapter();
  const authOptions = {
    adapter: adapter as Adapter,
    session: { strategy },
    providers: [
      GithubProvider({
        clientId: env.GITHUB_ID,
        clientSecret: env.GITHUB_SECRET,
      })
    ]
  };
  const authHandler = NextAuth(authOptions);
  return { authHandler, authOptions };
}

export const getAuth = memoize(buildAuth, {});

export async function getServerSession() {
  const { authOptions } = await getAuth();
  // Is there any way to memoize this per request?
  return await getNextAuthServerSession(authOptions);
};
