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

const db = buildDbByEnv();
export const getDb = () => db;
