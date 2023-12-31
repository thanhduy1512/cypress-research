import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppDataSource, TestDataSource } from './src/database/AppDataSource';
import userRouter from './src/routes/user.route';
import bandRouter from './src/routes/band.route';
import showRouter from './src/routes/show.route';
import reservationRouter from './src/routes/reservation.route';
import authRouter from './src/routes/auth.route';
import initRouter from './src/routes/initData';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors());
app.use(express.json());

if (process.env.APP_ENV === 'dev') {
  AppDataSource.initialize()
    .then(() => {
      console.log('Connected');
    })
    .catch((error: any) => console.log(error));
} else if (process.env.APP_ENV === 'test') {
  TestDataSource.initialize()
    .then(() => {
      console.log('Connected');
    })
    .catch((error: any) => console.log(error));
}

app.use('', userRouter);
app.use('', bandRouter);
app.use('', showRouter);
app.use('', reservationRouter);
app.use('', authRouter);
app.use('', initRouter);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
