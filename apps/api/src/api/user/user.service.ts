import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { cloudinaryService } from '@/common/config/cloudinary';
import { auth } from '@/common/config/firebase';
import { AuthRequest } from '@/common/middlewares/auth';
import { ServiceResponse } from '@/common/models/service-response';
import { logger } from '@/server';

import { RegisterInputSchema, UpdateProfileSchema } from './user.model';
import { UserRepository } from './user.repository';
import { userUtils } from './utils';

class UserService {
  private readonly userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async create(req: AuthRequest, _res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return ServiceResponse.failure('Missing or invalid authorization header', null, StatusCodes.UNAUTHORIZED);
      }

      const token = authHeader.split('Bearer ')[1];

      const decodedToken = await auth.verifyIdToken(token as string);

      const input = RegisterInputSchema.parse(req.body);

      const existing = await this.userRepository.findByFirebaseUid(decodedToken.uid);

      if (existing) {
        if (!existing.isActive) {
          await this.userRepository.reactivate(existing.id);
        }

        return ServiceResponse.success('Account ready', {
          id: existing.id,
          email: existing.email,
          username: existing.username,
          name: existing.name,
          firstName: existing.firstName,
          displayName: existing.displayName,
          photoUrl: existing.photoUrl,
          role: existing.role,
          isActive: true,
        });
      }

      const firstName = input.firstName?.trim() || decodedToken.given_name || '';
      const familyName = input.name?.trim() || decodedToken.family_name || decodedToken.name || '';
      const emailPrefix = decodedToken.email?.split('@')[0]?.toLowerCase() || '';

      const displayName =
        [firstName, familyName].filter(Boolean).join(' ') || emailPrefix || `user_${decodedToken.uid.slice(-8)}`;

      let username = input.username?.trim().toLowerCase();

      if (username) {
        if (await this.userRepository.usernameExists(username)) {
          return ServiceResponse.failure('Username already taken. Please choose another.', null, StatusCodes.CONFLICT);
        }
      } else {
        username = await userUtils.generateUniqueUsername(firstName, familyName);
      }

      const userData = {
        email: decodedToken.email ?? '',
        username,
        name: familyName,
        firstName,
        displayName,
        photoUrl: decodedToken.picture ?? null,
        bio: input.bio ?? null,
      };

      const [newUser] = await this.userRepository.create(decodedToken.uid, userData);

      return ServiceResponse.success('User created successfully', {
        id: newUser?.id,
        email: newUser?.email,
        username: newUser?.username,
        name: newUser?.name,
        firstName: newUser?.firstName,
        displayName: newUser?.displayName,
        photoUrl: newUser?.photoUrl,
        role: newUser?.role,
        isActive: true,
      });
    } catch (ex) {
      const errorMessage = `Error creating user:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('An error occurred while creating user.', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async whoami(req: AuthRequest, _res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return ServiceResponse.failure('User not found', null, StatusCodes.NOT_FOUND);
      }

      const user = await this.userRepository.findById(userId);

      if (!user) {
        return ServiceResponse.failure('User not found', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('User found', user);
    } catch (ex) {
      const errorMessage = `Error finding user:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure('An error occurred while finding user.', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async update(req: AuthRequest, _res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
      return ServiceResponse.failure('User not found', null, StatusCodes.NOT_FOUND);
    }

    try {
      const validatedData = UpdateProfileSchema.parse(req.body);

      if (req.file) {
        const avatarUrl = await userUtils.handleAvatarUpload(req.file, userId);
        if (!avatarUrl) {
          return ServiceResponse.failure(
            'Failed to upload avatar. Please try again.',
            null,
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
        validatedData.photoUrl = avatarUrl;
      }

      const updatedUser = await this.userRepository.update(userId, validatedData);
      return ServiceResponse.success('Profile updated successfully', updatedUser);
    } catch (ex) {
      userUtils.cleanupFile(req.file);
      if (ex instanceof Error && ex.name === 'ZodError') {
        return ServiceResponse.failure('Validation failed', null, StatusCodes.BAD_REQUEST);
      }
      logger.error(`Error updating profile: ${(ex as Error).message}`);
      return ServiceResponse.failure(
        'An error occurred while updating profile.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteAvatar(req: AuthRequest, _res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return ServiceResponse.failure('User not found', null, StatusCodes.NOT_FOUND);
      }

      const currentUser = await this.userRepository.findById(userId);

      if (!currentUser) {
        return ServiceResponse.failure('User not found', null, StatusCodes.NOT_FOUND);
      }

      if (currentUser.photoUrl) {
        const publicId = cloudinaryService.extractPublicId(currentUser.photoUrl);
        if (publicId) {
          await cloudinaryService.deleteFile(publicId);
        }
      }

      const updatedUser = await this.userRepository.update(userId, {
        photoUrl: null,
      });

      return ServiceResponse.success('Avatar deleted successfully', updatedUser);
    } catch (ex) {
      const errorMessage = `Error deleting avatar: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while deleting avatar.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const userService = new UserService();
