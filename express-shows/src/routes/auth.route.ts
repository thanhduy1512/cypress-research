import express from 'express';
import { authLogin, authUser, registerUser } from '../services/auth.service';

let authRouter = express();

authRouter.post('/auth/register', registerUser);

authRouter.post('/auth/login', authLogin);

authRouter.post('/auth/user', authUser);

export default authRouter;
