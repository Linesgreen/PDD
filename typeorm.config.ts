import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  url: process.env.POSTGRES_URL,
  type: 'postgres',
  migrations: ['migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
});
