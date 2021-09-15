import { Configuration, Connection, IDatabaseDriver, Options } from "@mikro-orm/core";
import { Poll } from "./entity/Poll";
import { Rule } from "./entity/Rule";

export default {
  entities: [Poll, Rule],
  multipleStatements: true,
  type: 'postgresql',
  clientUrl: process.env.DATABASE_URL,
  migrations: {
    path: './src/migrations',
  },
} as Options<IDatabaseDriver<Connection>>;