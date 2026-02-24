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

  public getFollowers = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.getFollowers(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public getComprehensiveSuggestions = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.getComprehensiveSuggestions(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public getPopularUsers = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.getPopularUsers(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public getFriendsOfFriends = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.getFriendsOfFriends(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public getRecentlyActiveUsers = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.getRecentlyActiveUsers(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };

  public getNewUsers = async (req: AuthRequest, res: Response) => {
    const serviceResponse = await followService.getNewUsers(req, res);
    return res.status(serviceResponse.statusCode).json(serviceResponse);
  };
}

export const followController = new FollowController();
