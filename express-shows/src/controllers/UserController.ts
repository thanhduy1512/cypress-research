import express from 'express';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../database/AppDataSource';
import e from 'express';

let router = express();
const userRepository = AppDataSource.getRepository(User);

router.post('/user', async (req, res) => {
  const user = new User();
  user.username = 'dex';
  user.password = '1234';

  const userFound = await userRepository.findBy({ username: 'dex' });
  console.log(userFound);

  //   await AppDataSource.manager.save(user);
  return res.status(201).json(user);
});

export default router;
