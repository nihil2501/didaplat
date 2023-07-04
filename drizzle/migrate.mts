import nextEnv from "@next/env";
import dbUtils from "../src/lib/db";

try {
  nextEnv.loadEnvConfig(".", process.env.NODE_ENV === "development");
  if (!process.env.POSTGRES_URL) {
    throw new Error(
      "POSTGRES_URL environment variable is not defined"
    );
  }

  console.info("⌛ Running database migrations...");
  const migrate = dbUtils.getMigrate();
  await migrate({ migrationsFolder: "./drizzle" })
  console.info("✅ Database migration succeeded");

} catch(error) {
  console.error("❌ Database migration failed");
  throw error;
}
