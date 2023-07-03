import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../database/AppDataSource';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = new User();
  user.username = username;
  bcrypt.hash(password, process.env.SALT_ROUNDS || 10, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Error password' });
    user.password = hash;
  });

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
  const id = Number(req.params.id);
  const { password } = req.body;

  const userFound = await userRepository.findOne({ where: { id } });
  //update user
  if (!userFound) return res.status(404).json({ message: 'User not found' });

  bcrypt.hash(password, process.env.SALT_ROUNDS || 10, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Error password' });
    userFound.password = hash;
  });
  await userRepository.save(userFound);
  return res.status(200).json(userFound);
};

const deleteUser = async (req: Request, res: Response) => {
  // const userFound = await userRepository.findBy({ username: 'dex' });
  const id = Number(req.params.id);
  await userRepository.delete({ id });
  return res.status(201).json();
};

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userRepository.findOne({ where: { username } });
  if (user && bcrypt.compareSync(password, user.password)) {
    return res.status(200).json(user);
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export { createUser, getAllUser, getUserById, updateUser, deleteUser };
