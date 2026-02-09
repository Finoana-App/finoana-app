import express, { type Router } from 'express';

import { userController } from './user.controller';

export const userRouter: Router = express.Router();

userRouter.post('/register', userController.register);
