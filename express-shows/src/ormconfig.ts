import { DataSource } from 'typeorm';

export const config = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'shows',
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'custom_migration_table',
});
