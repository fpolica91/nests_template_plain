import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  migrationsRun: false,
  synchronize: true,
  entities: [__dirname + '/src/*/entities/*.entity.ts'],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/*/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};

export default options;
