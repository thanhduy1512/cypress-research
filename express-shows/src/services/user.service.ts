import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../database/AppDataSource';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user/CreateUserDto';
import { LoginUserDto } from '../dto/user/LoginUserDto';

const userRepository = AppDataSource.getRepository(User);

const createUser = async ({ username, password }: CreateUserDto) => {
  const user = new User();
  user.username = username;
  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS) || 10
  );
  user.password = hashPassword;

  const savedUser = await userRepository.save(user);

  return savedUser;
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
  const id = Number(req.params.id);
  await userRepository.delete({ id });
  return res.status(201).json();
};

const userLogin = async (data: LoginUserDto) => {
  const { username } = data;
  const user = await userRepository.findOne({ where: { username } });
  if (!user) return null;
  if (!bcrypt.compareSync(data.password, user.password)) return null;

  return user;
};

const registerValidator = async (data: CreateUserDto) => {
  if (!data.username) {
    throw new Error('Username is required');
  }
  if (!data.password) {
    throw new Error('Password is required');
  }
  const user = await userRepository.findOne({
    where: { username: data.username },
  });
  if (user) {
    throw new Error('User already exists');
  }

  return true;
};

export {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  registerValidator,
  userLogin,
};
