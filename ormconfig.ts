
/*
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [],

  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  synchronize: false,
  logging: true,
  keepConnectionAlive: true,
};

export = config;
*/