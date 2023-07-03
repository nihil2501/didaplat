try {
  const env = process.env.NODE_ENV;
  // Load DB connection environment variables.
  const { default: { loadEnvConfig } } = await import("@next/env");
  loadEnvConfig(".", env === "development");

  if (!process.env.POSTGRES_URL) {
    throw new Error(
      "POSTGRES_URL environment variable is not defined"
    );
  }

  let sql, packagePart;
  switch (env) {
    case "development":
      const { default: { Client } } = await import("pg");
      const clientConfig = { connectionString: process.env.POSTGRES_URL };

      sql = new Client(clientConfig);
      packagePart = "node-postgres"

      await sql.connect();
      break;
    case "production":
      ({ sql } = await import("@vercel/postgres"));
      packagePart = "vercel-postgres"
      break;
    case "test":
      // Don't forget to add a `break` if `throw` is removed.
      throw new Error(
        "Unimplemented test environment migration"
      );
    default:
      // Don't forget to add a `break` if `throw` is removed.
      throw new Error(
        `Unknown environment: ${env}`
      );
  }

  const { drizzle } = await import(`drizzle-orm/${packagePart}`);
  const { migrate } = await import(`drizzle-orm/${packagePart}/migrator`);
  const db = drizzle(sql);

  console.info("⌛ Running database migrations...");
  await migrate(db, { migrationsFolder: "./drizzle" })

  await sql.end();
  console.info("✅ Database migration succeeded");
} catch(error) {
  console.error("❌ Database migration failed");
  throw error;
}
