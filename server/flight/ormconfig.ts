import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: null,
  database: 'SOAProject',
  synchronize: false,
  entities: [
    'src/entities/flight.entity.ts',
    'src/entities/flightPackage.entity.ts',
  ],
  migrations: ['./migrations/**/*.ts'],
  subscribers: ['./subscribers/**/*.ts'],
  logging: true,
});
export default AppDataSource;
