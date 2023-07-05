import { loadEnvConfig } from "@next/env";
const dev = process.env.NODE_ENV == "development"
loadEnvConfig(".", dev);
if (!process.env.POSTGRES_URL) {
  throw new Error(
    "POSTGRES_URL environment variable is not defined"
  );
}

import { drizzle as nodePgDrizzle } from "drizzle-orm/node-postgres";
import { migrate as nodePgMigrate } from "drizzle-orm/node-postgres/migrator";
import { Client as NodePgClient } from "pg";

import { drizzle as vercelDrizzle } from "drizzle-orm/vercel-postgres";
import { migrate as vercelMigrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql as vercelSql } from "@vercel/postgres";
import { memoize } from "./utils";

type NodePgParams = {
  migrate: typeof nodePgMigrate;
  drizzle: typeof nodePgDrizzle;
  sql: NodePgClient;
};

type VercelPgParams = {
  migrate: typeof vercelMigrate;
  drizzle: typeof vercelDrizzle;
  sql: typeof vercelSql;
};

type Params = NodePgParams | VercelPgParams;
type MigrationConfig<T extends Params> = Parameters<T["migrate"]>[1];
type PgDatabase<T extends Params> = {
  migrate: (config: MigrationConfig<T>) => Promise<void>;
  db: ReturnType<T["drizzle"]>;
};

type NodePgDatabase = PgDatabase<NodePgParams>;
type VercelPgDatabase = PgDatabase<VercelPgParams>;

// Unclear type situation here.
// function setup<T extends Params>({ migrate, drizzle, sql }: T) {
async function buildDb(params: NodePgParams): Promise<NodePgDatabase>;
async function buildDb(params: VercelPgParams): Promise<VercelPgDatabase>;
async function buildDb({ migrate, drizzle, sql }: any) {
  await sql.connect();
  const db = drizzle(sql);

  const wrappedMigrate =
    async (config: MigrationConfig<Params>) => {
      try {
        console.info("⌛ Running database migrations...");
        await migrate(db, config);
        console.info("✅ Database migration succeeded");
      } catch(error) {
        console.error("❌ Database migration failed");
        throw error;
      } finally {
        console.log("starting await sql.end()");
        await sql.end();
        console.log("finishing await sql.end()");
      }
    };

  return {
    migrate: wrappedMigrate,
    db: db,
  };
};

function buildDbByEnv() {
  switch (process.env.NODE_ENV) {
    case "development":
      const config = { connectionString: process.env.POSTGRES_URL };
      const nodePgSql = new NodePgClient(config);
      return buildDb({
        migrate: nodePgMigrate,
        drizzle: nodePgDrizzle,
        sql: nodePgSql,
      });
    case "production":
      return buildDb({
        migrate: vercelMigrate,
        drizzle: vercelDrizzle,
        sql: vercelSql,
      });
    case "test":
      throw new Error(
        "Unimplemented test environment migration"
      );
    default:
      throw new Error(
        `Unknown environment: ${process.env.NODE_ENV}`
      );
  }
};

export const getDb = memoize(buildDbByEnv, {});
