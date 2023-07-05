const { getDb } = await import("../src/lib/db");
const { migrate } = await getDb();
await migrate({ migrationsFolder: "./drizzle" });
