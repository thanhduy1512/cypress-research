import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { AppDataSource } from './src/database/AppDataSource';
import userRouter from './src/controllers/UserController';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log('Connected');
  })
  .catch((error) => console.log(error));

app.use('', userRouter);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
