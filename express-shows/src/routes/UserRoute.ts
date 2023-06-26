import express from 'express';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../database/AppDataSource';

let userRouter = express();
const userRepository = AppDataSource.getRepository(User);

userRouter.post('/user', async (req, res) => {
  const user = new User();
  user.username = 'dex';
  user.password = '1234';

  // const userFound = await userRepository.findBy({ username: 'dex' });

  await userRepository.save(user);
  return res.status(201).json(user);
});

export default userRouter;
