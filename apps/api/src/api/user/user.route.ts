import express, { type Router } from 'express';

import { authenticate } from '@/common/middlewares';

import { userController } from './user.controller';

export const userRouter: Router = express.Router();

userRouter.post('/register', userController.register);

userRouter.use(authenticate);

userRouter.get('/me', userController.getProfile);
userRouter.put('/me', userController.updateProfile);
