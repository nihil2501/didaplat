import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import NextAuth, {
  getServerSession as getNextAuthServerSession,
  SessionStrategy
} from "next-auth";
import DrizzleAdapter from "./DrizzleAdapter";
import { Adapter } from "next-auth/adapters";

if (!env.GITHUB_ID || !env.GITHUB_SECRET) {
  throw new Error(
    "GITHUB_ID or GITHUB_SECRET environment variable is not defined"
  );
}

const authOptions = {
  adapter: await DrizzleAdapter() as Adapter,
  session: { strategy: "jwt" as SessionStrategy },
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
