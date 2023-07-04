import GithubProvider from "next-auth/providers/github";
import { env } from "@/env.mjs";
import NextAuth, {
  getServerSession as getNextAuthServerSession,
  NextAuthOptions
} from "next-auth";
import { Adapter } from "next-auth/adapters";
import { accounts, users } from "@/schema";
import { and, eq } from "drizzle-orm";
import { initDb } from "./db";

const { db } = await initDb();

// We aren't using sessions and verification tokens.
type SimpleAdapter = Omit<Adapter, UnusedMethods>;
type UnusedMethods = "createSession" | "getSessionAndUser" | "updateSession" |
  "deleteSession" | "createVerificationToken" | "userVerificationToken";


const adapter: SimpleAdapter = {
  createUser: async (data) => {
    return db
      .insert(users)
      .values({ ...data, id: crypto.randomUUID() })
      .returning()
      .then((res) => res[0])
  },
  getUser: async (data) => {
    return (
      db
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0]) ?? null
    )
  },
  getUserByEmail: async (data) => {
    return (
      db
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => res[0]) ?? null
    )
  },
  updateUser: async (data) => {
    if (!data.id) {
      throw new Error("No user id.")
    }

    return db
      .update(users)
      .set(data)
      .where(eq(users.id, data.id))
      .returning()
      .then((res) => res[0])
  },
  linkAccount: async (rawAccount) => {
    const updatedAccount = await db
      .insert(accounts)
      .values(rawAccount)
      .returning()
      .then((res) => res[0])

    // Drizzle will return `null` for fields that are not defined.
    // However, the return type is expecting `undefined`.
    const account = {
      ...updatedAccount,
      access_token: updatedAccount.access_token ?? undefined,
      token_type: updatedAccount.token_type ?? undefined,
      id_token: updatedAccount.id_token ?? undefined,
      refresh_token: updatedAccount.refresh_token ?? undefined,
      scope: updatedAccount.scope ?? undefined,
      expires_at: updatedAccount.expires_at ?? undefined,
      session_state: updatedAccount.session_state ?? undefined,
    }

    return account
  },
  getUserByAccount: async (account) => {
    const dbAccount =
      await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .innerJoin(users, eq(accounts.userId, users.id))
        .then(res => res[0])

    if (!dbAccount) return null
    return dbAccount.users
  },
  deleteUser: async (id) => {
    await db
      .delete(users)
      .where(eq(users.id, id))
      .returning()
      .then((res) => res[0] ?? null)
  },
  unlinkAccount: async (account) => {
    const { type, provider, providerAccountId, userId } = await db
      .delete(accounts)
      .where(
        and(
          eq(accounts.providerAccountId, account.providerAccountId),
          eq(accounts.provider, account.provider)
        )
      )
      .returning()
      .then(res => res[0] ?? null)

    return { provider, type, providerAccountId, userId }
  },
};

const authOptions: NextAuthOptions = {
  adapter: adapter as Adapter,
  session: { strategy: "jwt" },
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
