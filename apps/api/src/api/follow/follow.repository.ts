import { and, eq } from 'drizzle-orm';

import { db } from '@/common/databases';
import { userFollowsTable, usersTable } from '@/common/databases/schema';

export class FollowRepository {
  async follow(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new Error('You cannot follow yourself');
    }

    const [existingFollow] = await db
      .select()
      .from(userFollowsTable)
      .where(and(eq(userFollowsTable.followerId, followerId), eq(userFollowsTable.followingId, followingId)))
      .limit(1);

    if (existingFollow) {
      throw new Error('You are already following this user');
    }

    const [targetUser] = await db.select().from(usersTable).where(eq(usersTable.id, followingId)).limit(1);

    if (!targetUser) {
      throw new Error('User not found');
    }

    const [follow] = await db
      .insert(userFollowsTable)
      .values({
        followerId,
        followingId,
      })
      .returning();

    return follow;
  }

  async unfollow(followerId: string, followingId: string) {
    const result = await db
      .delete(userFollowsTable)
      .where(and(eq(userFollowsTable.followerId, followerId), eq(userFollowsTable.followingId, followingId)))
      .returning();

    if (result.length === 0) {
      throw new Error('You are not following this user');
    }

    return result[0];
  }
}
