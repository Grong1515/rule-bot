import { ConnectionOptions } from 'typeorm';
 
const config: ConnectionOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  // synchronize: true,
  migrationsRun: true,
  entities: [
      "src/entity/*.ts"
  ],
  subscribers: [
      "src/subscriber/*.ts"
  ],
  migrations: [
      "src/migration/*.ts"
  ],
  cli: {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
 
export = config;