import { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = new User();
  user.username = username;
  user.password = password;

  await userRepository.save(user);
  return res.status(201).json(user);
};

const getAllUser = async () => {};

const getUserById = async () => {
  // const userFound = await userRepository.findBy({ username: 'dex' });
};

const updateUser = async () => {
  // const userFound = await userRepository.findBy({ username: 'dex' });
};

const deleteUser = async () => {
  // const userFound = await userRepository.findBy({ username: 'dex' });
};

export { createUser, getAllUser, getUserById, updateUser, deleteUser };
