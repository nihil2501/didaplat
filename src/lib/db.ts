import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import { migrate as pgMigrate } from "drizzle-orm/node-postgres/migrator";
import { Client as PgClient } from "pg";

import { drizzle as vercelDrizzle } from "drizzle-orm/vercel-postgres";
import { migrate as vercelMigrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql as vercelSql } from "@vercel/postgres";

type NodePgParams = {
  migrate: typeof pgMigrate;
  drizzle: typeof pgDrizzle;
  sql: PgClient;
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
type Database = NodePgDatabase | VercelPgDatabase;

// Unclear type situation here.
// function setup<T extends Params>({ migrate, drizzle, sql }: T) {
async function init(params: NodePgParams): Promise<NodePgDatabase>;
async function init(params: VercelPgParams): Promise<VercelPgDatabase>;
async function init({ migrate, drizzle, sql }: any) {
  const db = drizzle(sql);
  await sql.connect();

  return {
    db: db,
    async migrate(config: MigrationConfig<Params>) {
      try {
        await migrate(db, config);
      } finally {
        await sql.end();
      }
    },
  };
};

function initByEnv() {
  switch (process.env.NODE_ENV) {
    case "development":
      const config = { connectionString: process.env.POSTGRES_URL };
      const pgSql = new PgClient(config);
      return init({
        migrate: pgMigrate,
        drizzle: pgDrizzle,
        sql: pgSql,
      });
    case "production":
      return init({
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

let memo: Database;
function memoize(fn: () => Promise<Database>) {
  return async () => {
    if (!memo) memo = await fn();
    return memo;
  };
};

export const initDb = memoize(initByEnv);
