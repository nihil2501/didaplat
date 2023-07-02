export default async function migrate(env, packagePart, getSql) {
  // Overkill use of `next-env` to resolve .env files?
  const nextEnv = await import("@next/env");
  const dev = env === "development";
  nextEnv.default.loadEnvConfig(".", dev);

  if (process.env.NODE_ENV !== env) {
    throw new Error(
      `Cannot run ${env} migration from ${process.env.NODE_ENV}`
    );
  }

  const { drizzle } = await import(`drizzle-orm/${packagePart}`);
  const { migrate } = await import(`drizzle-orm/${packagePart}/migrator`);

  const sql = await getSql();
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./drizzle" });
  await sql.end();
};
