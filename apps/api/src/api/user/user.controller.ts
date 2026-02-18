import { RequestHandler, Response } from 'express';

import { AuthRequest } from '@/common/middlewares/auth';

import { userService } from './user.service';

class UserController {
  public register: RequestHandler = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await userService.create(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public getProfile: RequestHandler = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await userService.whoami(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public updateProfile: RequestHandler = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await userService.update(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };
}

export const userController = new UserController();
