import migrate from "./migrate.common.mjs";

await migrate("production", "vercel-postgres", async () => {
  const pg = await import("@vercel/postgres");
  return pg.sql;
});
