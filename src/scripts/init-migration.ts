import { MikroORM } from '@mikro-orm/core';

(async () => {
  const orm = await MikroORM.init();

  const migrator = orm.getMigrator();
  await migrator.createMigration(null, null, true); // creates file Migration20191019195930.ts
  await migrator.up(); // runs migrations up to the latest
  // await migrator.up('name'); // runs only given migration, up
  // await migrator.up({ to: 'up-to-name' }); // runs migrations up to given version
  // await migrator.down(); // migrates one step down
  // await migrator.down('name'); // runs only given migration, down
  // await migrator.down({ to: 'down-to-name' }); // runs migrations down to given version
  // await migrator.down({ to: 0 }); // migrates down to the first version

  await orm.close(true);
})();