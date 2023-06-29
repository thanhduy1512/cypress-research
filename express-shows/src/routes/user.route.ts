import express from 'express';
import { createUser } from '../services/user.service';

let userRouter = express();

userRouter.post('/user', createUser);

export default userRouter;
