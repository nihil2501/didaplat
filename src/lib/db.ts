import { env } from "@/env.mjs";

import { drizzle as nodePgDrizzle } from "drizzle-orm/node-postgres";
import { migrate as nodePgMigrate } from "drizzle-orm/node-postgres/migrator";
import { Client as NodePgClient } from "pg";

import { drizzle as vercelDrizzle } from "drizzle-orm/vercel-postgres";
import { migrate as vercelMigrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql as vercelSql } from "@vercel/postgres";

type PgParams<T> = T & {
  manageConnection: boolean;
};

type NodePgParams = PgParams<{
  migrate: typeof nodePgMigrate;
  drizzle: typeof nodePgDrizzle;
  sql: NodePgClient;
}>;

type VercelPgParams = PgParams<{
  migrate: typeof vercelMigrate;
  drizzle: typeof vercelDrizzle;
  sql: typeof vercelSql;
}>;

type Params = NodePgParams | VercelPgParams;
type MigrationConfig<T extends Params> = Parameters<T["migrate"]>[1];
type PgDatabase<T extends Params> = {
  migrate: (config: MigrationConfig<T>) => Promise<void>;
  db: ReturnType<T["drizzle"]>;
};

type NodePgDatabase = PgDatabase<NodePgParams>;
type VercelPgDatabase = PgDatabase<VercelPgParams>;

// Unclear type situation here.
// async function buildDb<T extends Params>(params: T): Promise<PgDatabase<T>>;
async function buildDb(params: NodePgParams): Promise<NodePgDatabase>;
async function buildDb(params: VercelPgParams): Promise<VercelPgDatabase>;
async function buildDb({
  manageConnection,
  migrate,
  drizzle,
  sql,
}: any) {
  const db = drizzle(sql);
  if (manageConnection) {
    await sql.connect()
  };

  const wrappedMigrate =
    async (config: MigrationConfig<Params>) => {
      try {
        console.info("⌛ Running database migrations...");
        await migrate(db, config);
        console.info("✅ Database migration succeeded");
      } catch (error) {
        console.error("❌ Database migration failed:");
        console.error(error);
        throw error;
      } finally {
        if (manageConnection) {
          await sql.end();
        }
      }
    };

  return {
    migrate: wrappedMigrate,
    db: db,
  };
};

function buildDbByEnv() {
  if (!env.POSTGRES_URL) {
    throw new Error(
      "POSTGRES_URL environment variable is not defined"
    );
  }

  switch (env.NODE_ENV) {
    case "development":
      const config = { connectionString: env.POSTGRES_URL };
      const nodePgSql = new NodePgClient(config);
      return buildDb({
        manageConnection: true,
        migrate: nodePgMigrate,
        drizzle: nodePgDrizzle,
        sql: nodePgSql,
      });
    case "production":
      return buildDb({
        manageConnection: false,
        migrate: vercelMigrate,
        drizzle: vercelDrizzle,
        sql: vercelSql,
      });
    case "test":
      throw new Error(
        "Unimplemented test DB"
      );
    default:
      throw new Error(
        `Unknown environment: ${env.NODE_ENV}`
      );
  }
};

// We don't have top-level await due to importing this during local script
// execution: `tsx script.mts`
//
// This memoizes the result of synchronously invoking an async function while
// the promise it makes is not in a rejected state. If a rejection does occur,
// the next invocation will then memoize a new asynchronous attempt.
//
// This might be well-suited for DB connection, which is just an initialization
// activity that could conceivably be retried a little until it works. I think
// later operations against the DB (like querying) will exhibit typical behavior
// like erroring if a connection can't be maintained (but I'm not certain things
// work this way).
function memoizeAsyncFn<T>(fn: () => Promise<T>) {
  let memo: ReturnType<typeof fn> | undefined;
  return () => {
    memo ??= fn().catch((error) => {
      memo = undefined;
      throw error;
    });

    return memo;
  };
};

export const getDb = memoizeAsyncFn(buildDbByEnv);
