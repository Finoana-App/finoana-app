import { RequestHandler, Response } from 'express';

import { AuthRequest } from '@/common/middlewares';

import { postService } from './post.service';

class PostController {
  public create: RequestHandler = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await postService.create(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };
}

export const postController = new PostController();
