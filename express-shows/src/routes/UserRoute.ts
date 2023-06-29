import express from 'express';
import { createUser } from '../services/UserService';

let userRouter = express();

userRouter.post('/user', createUser);

export default userRouter;
