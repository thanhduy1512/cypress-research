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

const getAllUser = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  return res.status(200).json(users);
};

const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userFound = await userRepository.findOne({ where: { id } });
  return res.status(200).json(userFound);
};

const updateUser = async (req: Request, res: Response) => {
  // const userFound = await userRepository.findBy({ username: 'dex' });
  const id = Number(req.params.id);
  const userFound = await userRepository.findOne({ where: { id } });
  //update user
  return res.status(200).json(userFound);
};

const deleteUser = async (req: Request, res: Response) => {
  // const userFound = await userRepository.findBy({ username: 'dex' });
  const id = Number(req.params.id);
  await userRepository.delete({ id });
  return res.status(201).json();
};

export { createUser, getAllUser, getUserById, updateUser, deleteUser };
