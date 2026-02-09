import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { auth } from '@/common/config/firebase';
import { AuthRequest } from '@/common/middlewares/auth';
import { ServiceResponse } from '@/common/models/service-response';
import { logger } from '@/server';

import { RegisterInputSchema } from './user.model';
import { UserRepository } from './user.repository';

class UserService {
  private readonly userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async create(req: AuthRequest, _res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ServiceResponse.failure('Missing or invalid authorization header', null, StatusCodes.UNAUTHORIZED);
      }

      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(token as string);

      const validatedData = RegisterInputSchema.parse(req.body);
      const existingUser = await this.userRepository.findByFirebaseUid(decodedToken.uid);
      if (existingUser) {
        if (!existingUser.isActive) {
          await this.userRepository.reactivate(existingUser.id);
        }

        return ServiceResponse.success('Account reactivated successfully', {
          id: existingUser.id,
          email: existingUser.email,
          displayName: existingUser.displayName,
          photoUrl: existingUser.photoUrl,
          role: existingUser.role,
          isActive: true,
        });
      }

      const newUser = await this.userRepository.create(decodedToken.uid, {
        ...validatedData,
        email: decodedToken.email ?? '',
        photoUrl: decodedToken.picture ?? '',
      });

      return ServiceResponse.success('User created successfully', newUser);
    } catch (ex) {
      const errorMessage = `Error creating user:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('An error occurred while creating user.', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const userService = new UserService();
