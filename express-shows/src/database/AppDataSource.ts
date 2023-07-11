import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Show } from '../entities/show.entity';
import { Band } from '../entities/band.entity';
import { Reservation } from '../entities/reservation.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'shows',
  synchronize: true,
  logging: true,
  entities: [User, Show, Band, Reservation],
  subscribers: [],
  migrations: [],
});

export const TestDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'admin-test',
  password: '1234',
  database: 'shows-test',
  synchronize: true,
  logging: true,
  entities: [User, Show, Band, Reservation],
  subscribers: [],
  migrations: [],
});
