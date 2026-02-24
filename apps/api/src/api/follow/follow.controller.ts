import { Response } from 'express';

import { AuthRequest } from '@/common/middlewares';

import { followService } from './follow.service';

class FollowController {
  public follow = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.follow(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public unfollow = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.unfollow(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public getFriendsOfFriends = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.getFriendsOfFriends(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };
}

export const followController = new FollowController();
