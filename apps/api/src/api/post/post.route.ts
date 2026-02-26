import express, { type Router } from 'express';

import { authenticate } from '@/common/middlewares';
import { handleUploadError, uploadMultiple } from '@/common/middlewares/upload';

import { postController } from './post.controller';

export const postRouter: Router = express.Router();

postRouter.use(authenticate);

postRouter.post('/', uploadMultiple, handleUploadError, postController.create);
