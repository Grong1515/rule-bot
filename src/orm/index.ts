import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

let orm: MikroORM<PostgreSqlDriver>;

class OrmNotInitialized extends Error {
  constructor() {
    super('DB is not initialized');
  }
}

export async function initOrm() {
  if (!orm) orm = await MikroORM.init();
  if (process.env.RUN_MIGRATIONS === "true") await runMigrations();
  console.log('DB initialized successfully.');
}

export function getOrm() {
  if (!orm) throw new OrmNotInitialized();
  return orm;
}

async function runMigrations() {
  console.log('Run Migrations');
  if (!orm) throw new OrmNotInitialized();
  const migrator = orm.getMigrator();
  const migratinosAmount = (await migrator.getPendingMigrations()).length;
  console.log(`Found ${migratinosAmount} migrations`);
  await migrator.up();
  console.log('Run Migrations: finished successfully');
}