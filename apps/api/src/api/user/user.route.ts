import express, { type Router } from 'express';

import { authenticate } from '@/common/middlewares';
import { handleUploadError, uploadAvatar } from '@/common/middlewares/upload';

import { userController } from './user.controller';

export const userRouter: Router = express.Router();

userRouter.post('/register', userController.register);

userRouter.use(authenticate);

userRouter.get('/me', userController.getProfile);
userRouter.put('/me', uploadAvatar, handleUploadError, userController.updateProfile);
userRouter.delete('/me/avatar', uploadAvatar, handleUploadError, userController.deleteAvatar);

userRouter.get('/:id', userController.getUserById);
