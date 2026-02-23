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
}

export const followService = new FollowService();
