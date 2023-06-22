import express, { Express } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/database/AppDataSource';
import userRouter from './src/routes/UserRoute';
import bandRouter from './src/routes/BandRoute';
import showRouter from './src/routes/ShowRoute';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => console.log(error));

app.use('', userRouter);
app.use('', bandRouter);
app.use('', showRouter);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
