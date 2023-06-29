import { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

const createUser = async (req: Request, res: Response) => {
  const user = new User();
  user.username = 'dex';
  user.password = '1234';

  // const userFound = await userRepository.findBy({ username: 'dex' });

  await userRepository.save(user);
  return res.status(201).json(user);
};

export { createUser };
