import express, { Express } from 'express';
import dotenv from 'dotenv';
import { AppDataSource, TestDataSource } from './src/database/AppDataSource';
import userRouter from './src/routes/UserRoute';
import bandRouter from './src/routes/BandRoute';
import showRouter from './src/routes/ShowRoute';
import reservationRouter from './src/routes/ReservationRoute';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

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

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
