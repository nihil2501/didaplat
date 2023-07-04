import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import NextAuth, {
  NextAuthOptions,
  getServerSession as getNextAuthServerSession
} from "next-auth";

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
