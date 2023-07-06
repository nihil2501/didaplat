const { loadEnvConfig } = await import("@next/env");
loadEnvConfig(".", process.env.NODE_ENV === "development");

const { getDb } = await import("../src/lib/db");
const { migrate } = await getDb;

await migrate({ migrationsFolder: "./drizzle" });
