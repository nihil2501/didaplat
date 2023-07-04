import { drizzle as drizzleDev } from "drizzle-orm/node-postgres";
import { migrate as migrateDev } from "drizzle-orm/node-postgres/migrator";
import { Client as PgClient } from "pg";

import { drizzle as drizzleProd } from "drizzle-orm/vercel-postgres";
import { migrate as migrateProd } from "drizzle-orm/vercel-postgres/migrator";
import { sql as sqlProd } from "@vercel/postgres";

export function getDb() {
  return initialize().db;
};

export function getMigrate() {
  return initialize().migrate;
};

type DevReturnType = {
  db: ReturnType<typeof drizzleDev>;
  migrate: ReturnType<typeof connectedMigrate<DevMigrateParams>>;
};

type ProdReturnType = {
  db: ReturnType<typeof drizzleProd>;
  migrate: ReturnType<typeof connectedMigrate<ProdMigrateParams>>;
};

let memo: DevReturnType | ProdReturnType;
function initialize() {
  if (!memo) {
    switch (process.env.NODE_ENV) {

      case "development":
        const clientConfig = { connectionString: process.env.POSTGRES_URL };
        const sqlDev = new PgClient(clientConfig);
        const dbDev = drizzleDev(sqlDev);
        const connectedMigrateDev = connectedMigrate({
          migrate: migrateDev,
          sql: sqlDev,
          db: dbDev
        });

        memo = {
          migrate: connectedMigrateDev,
          db: dbDev,
        };

        break;

      case "production":
        const dbProd = drizzleProd(sqlProd);
        const connectedMigrateProd = connectedMigrate({
          migrate: migrateProd,
          sql: sqlProd,
          db: dbProd
        });

        memo = {
          migrate: connectedMigrateProd,
          db: dbProd,
        };

        break;

      case "test":
        throw new Error(
          "Unimplemented test environment migration"
        );

      default:
        throw new Error(
          `Unknown environment: ${process.env.NODE_ENV}`
        );
    }
  }

  return memo;
};

type DevMigrateParams = {
  migrate: typeof migrateDev;
  sql: PgClient;
  db: ReturnType<typeof drizzleDev>;
};

type ProdMigrateParams = {
  migrate: typeof migrateProd;
  sql: typeof sqlProd;
  db: ReturnType<typeof drizzleProd>;
};

function connectedMigrate
  <T extends DevMigrateParams | ProdMigrateParams>
  ({ migrate, sql, db }: T) {
  return async (config: Parameters<T["migrate"]>[1]) => {
    sql.connect();

    try {
      await migrate(db, config);
    } finally {
      sql.end();
    }
  }
};
