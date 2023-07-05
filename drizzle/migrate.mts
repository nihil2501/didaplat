const { loadEnvConfig } = await import("@next/env");
loadEnvConfig(".", process.env.NODE_ENV === "development");
if (!process.env.POSTGRES_URL) {
  throw new Error(
    "POSTGRES_URL environment variable is not defined"
  );
}

const { initDb } = await import("../src/lib/db");
const { migrate } = await initDb();
await migrate({ migrationsFolder: "./drizzle" })
