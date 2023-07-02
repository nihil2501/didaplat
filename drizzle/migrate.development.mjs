import migrate from "./migrate.common.mjs";

await migrate("development", "node-postgres", async () => {
  const pg = await import("pg");
  const sql = new pg.default.Client({
    connectionString: process.env.POSTGRES_URL
  });

  await sql.connect();
  return sql;
});
