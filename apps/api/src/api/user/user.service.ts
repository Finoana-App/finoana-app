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
      if (!authHeader?.startsWith('Bearer ')) {
        return ServiceResponse.failure('Missing or invalid authorization header', null, StatusCodes.UNAUTHORIZED);
      }

      const token = authHeader.split('Bearer ')[1];

      console.log(token);

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
        username = await this.generateUniqueUsername(firstName, familyName);
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

  private async generateUniqueUsername(firstName: string, familyName: string, maxAttempts = 8): Promise<string> {
    const f = firstName.toLowerCase().replaceAll(/\s+/g, '').trim();
    const l = familyName.toLowerCase().replaceAll(/\s+/g, '').trim();

    if (!f && !l) {
      return `user_${Math.random().toString(36).slice(2, 9)}`;
    }

    const patterns: string[] = [];

    if (l) {
      patterns.push(`${f}${l.charAt(0)}`);
      patterns.push(`${f}.${l.charAt(0)}`);
      patterns.push(`${f}${l}`);
      patterns.push(`${f}.${l}`);
      patterns.push(`${f.slice(0, 7)}${l.slice(0, 7)}`);
    } else {
      patterns.push(f);
      if (f.length >= 4) patterns.push(`${f}mg`);
    }

    for (const base of patterns) {
      if (base.length >= 4 && !(await this.userRepository.usernameExists(base))) {
        return base;
      }
    }

    const bestBase = patterns[0] || f;
    for (let i = 2; i <= maxAttempts + 1; i++) {
      const candidate = `${bestBase}${i}`;
      if (!(await this.userRepository.usernameExists(candidate))) {
        return candidate;
      }
    }

    const prefix = f.slice(0, 6) || 'user';
    const random = Math.random().toString(36).slice(2, 8);
    return `${prefix}${random}`;
  }
}

export const userService = new UserService();
