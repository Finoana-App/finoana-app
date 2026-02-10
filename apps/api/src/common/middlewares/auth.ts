import { eq } from 'drizzle-orm';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { auth } from '@/common/config/firebase';
import { db } from '@/common/databases';
import { usersTable } from '@/common/databases/schema';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    userId: string;
    role: 'user' | 'moderator' | 'admin';
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token as string);

    const [dbUser] = await db.select().from(usersTable).where(eq(usersTable.firebaseUid, decodedToken.uid)).limit(1);

    if (!dbUser?.isActive) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'User not found or inactive' });
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email ?? '',
      userId: dbUser.id,
      role: dbUser.role,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (allowedRoles: Array<'user' | 'moderator' | 'admin'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};
