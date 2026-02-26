import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AuthRequest } from '@/common/middlewares';
import { cleanupTempFiles } from '@/common/middlewares/upload';
import { ServiceResponse } from '@/common/models/service-response';
import { logger } from '@/server';

import { PostRepository } from './post.repository';

class PostService {
  private readonly postRepository: PostRepository;

  constructor(repository: PostRepository = new PostRepository()) {
    this.postRepository = repository;
  }

  async create(req: AuthRequest, _res: Response) {
    try {
      const { content, postType, isAnonymous } = req.body;
      const files = req.files as Express.Multer.File[] | undefined;

      if (!content || content.trim().length === 0) {
        if (files) cleanupTempFiles(files);
        return ServiceResponse.failure('Content is required', null, StatusCodes.BAD_REQUEST);
      }

      const post = await this.postRepository.create(
        req.user!.userId,
        {
          content,
          postType: postType || 'general',
          isAnonymous: isAnonymous === 'true' || isAnonymous === true,
        },
        files
      );

      return ServiceResponse.success('Post created successfully', post);
    } catch (ex) {
      logger.error(`Create post error: ${(ex as Error).message}`);

      if (req.files) {
        cleanupTempFiles(req.files as Express.Multer.File[]);
      }

      return ServiceResponse.failure('An error occurred while creating post.', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const postService = new PostService();
