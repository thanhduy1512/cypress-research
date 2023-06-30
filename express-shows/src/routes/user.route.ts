import express from 'express';
import { createUser, getUserById } from '../services/user.service';

let userRouter = express();

userRouter.post('/user', createUser);
userRouter.get('/user/:id', getUserById);

export default userRouter;
