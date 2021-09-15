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
  console.log('DB initialized successfully.');
}

export function getOrm() {
  if (!orm) throw new OrmNotInitialized();
  return orm;
}