import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthRequest } from '@/common/middlewares';
import { ServiceResponse } from '@/common/models/service-response';
import { logger } from '@/server';

import { FollowRepository } from './follow.repository';

class FollowService {
  private readonly followRepository: FollowRepository;

  constructor(repository: FollowRepository = new FollowRepository()) {
    this.followRepository = repository;
  }

  async follow(req: AuthRequest, _res: Response) {
    try {
      const { userId } = req.params;
      const followerId = req.user?.userId;

      if (!followerId) {
        return ServiceResponse.failure('Unauthorized', null, StatusCodes.UNAUTHORIZED);
      }

      if (!userId) {
        return ServiceResponse.failure('User id is required', null, StatusCodes.BAD_REQUEST);
      }

      const follow = await this.followRepository.follow(followerId, userId as string);

      return ServiceResponse.success('User followed successfully', follow, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Follow user error: ${(ex as Error).message}`);

      if (
        (ex as Error).message.includes('cannot follow yourself') ||
        (ex as Error).message.includes('already following')
      ) {
        return ServiceResponse.failure((ex as Error).message, null, StatusCodes.BAD_REQUEST);
      }

      if ((ex as Error).message.includes('not found')) {
        return ServiceResponse.failure((ex as Error).message, null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.failure(
        'An error occurred while following user.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async unfollow(req: AuthRequest, _res: Response) {
    try {
      const { userId } = req.params;
      const followerId = req.user!.userId;

      await this.followRepository.unfollow(followerId, userId as string);

      return ServiceResponse.success('Successfully unfollowed user', null, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Unfollow user error: ${(ex as Error).message}`);

      if ((ex as Error).message.includes('not following')) {
        return ServiceResponse.failure((ex as Error).message, null, StatusCodes.BAD_REQUEST);
      }

      return ServiceResponse.failure('Failed to unfollow user', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getFollowers(req: AuthRequest, _res: Response) {
    try {
      const { userId } = req.params;
      const { page, limit } = req.query as { page?: string; limit?: string };

      const result = await this.followRepository.getFollowers(userId as string, {
        page: page ? Number.parseInt(page) : undefined,
        limit: limit ? Number.parseInt(limit) : undefined,
      });

      return ServiceResponse.success('Followers retrieved successfully', result, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Get followers error: ${(ex as Error).message}`);
      return ServiceResponse.failure('Failed to get followers', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getFollowing(req: AuthRequest, _res: Response) {
    try {
      const { userId } = req.params;
      const { page, limit } = req.query;

      const result = await this.followRepository.getFollowing(userId as string, {
        page: page ? Number.parseInt(page as string) : undefined,
        limit: limit ? Number.parseInt(limit as string) : undefined,
      });

      return ServiceResponse.success('Following retrieved successfully', result, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Get following error: ${(ex as Error).message}`);
      return ServiceResponse.failure('Failed to get following', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getComprehensiveSuggestions(req: AuthRequest, _res: Response) {
    try {
      const userId = req.user!.userId;
      const { limit } = req.query;

      const suggestions = await this.followRepository.getComprehensiveSuggestions(
        userId,
        limit ? Number.parseInt(limit as string) : 10
      );

      return ServiceResponse.success('Comprehensive suggestions retrieved successfully', suggestions, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Get comprehensive suggestions error: ${(ex as Error).message}`);
      return ServiceResponse.failure(
        'Failed to get comprehensive suggestions',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getPopularUsers(req: AuthRequest, _res: Response) {
    try {
      const userId = req.user!.userId;
      const { limit } = req.query;

      const suggestions = await this.followRepository.getPopularUsers(
        userId,
        limit ? Number.parseInt(limit as string) : 10
      );

      return ServiceResponse.success('Popular users retrieved successfully', suggestions, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Get popular users error: ${(ex as Error).message}`);
      return ServiceResponse.failure('Failed to get popular users', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getFriendsOfFriends(req: AuthRequest, _res: Response) {
    try {
      const userId = req.user!.userId;
      const { limit } = req.query;

      const suggestions = await this.followRepository.getFriendsOfFriends(
        userId,
        limit ? Number.parseInt(limit as string) : 10
      );

      return ServiceResponse.success('Friends of friends retrieved successfully', suggestions, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Get friends of friends error: ${(ex as Error).message}`);
      return ServiceResponse.failure('Failed to get friends of friends', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getRecentlyActiveUsers(req: AuthRequest, _res: Response) {
    try {
      const userId = req.user!.userId;
      const { limit } = req.query;

      const suggestions = await this.followRepository.getRecentlyActiveUsers(
        userId,
        limit ? Number.parseInt(limit as string) : 10
      );

      return ServiceResponse.success('Recently active users retrieved successfully', suggestions, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Get recently active users error: ${(ex as Error).message}`);
      return ServiceResponse.failure('Failed to get recently active users', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getNewUsers(req: AuthRequest, _res: Response) {
    try {
      const userId = req.user!.userId;
      const { limit } = req.query;

      const suggestions = await this.followRepository.getNewUsers(
        userId,
        limit ? Number.parseInt(limit as string) : 10
      );

      return ServiceResponse.success('New users retrieved successfully', suggestions, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Get new users error: ${(ex as Error).message}`);
      return ServiceResponse.failure('Failed to get new users', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getFollowCounts(req: AuthRequest, _res: Response) {
    try {
      const { userId } = req.params;

      const counts = await this.followRepository.getFollowCounts(userId as string);

      return ServiceResponse.success('Follow counts retrieved successfully', counts, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Get follow counts error: ${(ex as Error).message}`);
      return ServiceResponse.failure('Failed to get follow counts', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async removeFollower(req: AuthRequest, _res: Response) {
    try {
      const { followerId } = req.params;
      const userId = req.user!.userId;
      
      await this.followRepository.removeFollower(userId, followerId as string);
      
      return ServiceResponse.success('Follower removed successfully', null, StatusCodes.OK);
    } catch (ex) {
      logger.error(`Remove follower error: ${(ex as Error).message}`);
      return ServiceResponse.failure('Failed to remove follower', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const followService = new FollowService();
