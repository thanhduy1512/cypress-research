import { Request, Response, response } from 'express';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dto/user/CreateUserDto';
import { createUser, registerValidator, userLogin } from './user.service';

const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user: CreateUserDto = { username, password };

  try {
    await registerValidator(user);
  } catch (error) {
    return res.status(400).json(error);
  }

  try {
    const resUser = await createUser(user);
    return res.status(201).json(resUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const authLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userLogin({ username, password });
  if (!user) {
    return res.status(422).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign(
    { _id: user.id },
    process.env.TOKEN_SECRET || '123456',
    {
      expiresIn: 60 * 60 * 24,
    }
  );
  return res.header('auth-token', token).send(token);
};

const authUser = async (req: Request, res: Response) => {};

export { registerUser, authUser, authLogin };
