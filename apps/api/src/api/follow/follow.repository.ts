import { and, desc, eq, inArray, ne, notInArray, sql } from 'drizzle-orm';

import { db } from '@/common/databases';
import { userFollowsTable, usersTable } from '@/common/databases/schema';

const isSuggestible = and(eq(usersTable.isActive, true), ne(usersTable.privacyLevel, 'anonymous'));

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

  async getFollowers(userId: string, options: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 20 } = options;
    const offset = (page - 1) * limit;

    const baseCondition = eq(userFollowsTable.followingId, userId);

    const [followers, countResult] = await Promise.all([
      db
        .select({
          id: usersTable.id,
          displayName: usersTable.displayName,
          username: usersTable.username,
          photoUrl: usersTable.photoUrl,
          bio: usersTable.bio,
          followedAt: userFollowsTable.createdAt,
          privacyLevel: usersTable.privacyLevel,
        })
        .from(userFollowsTable)
        .innerJoin(usersTable, eq(userFollowsTable.followerId, usersTable.id))
        .where(and(baseCondition, eq(usersTable.isActive, true), ne(usersTable.privacyLevel, 'anonymous')))
        .orderBy(desc(userFollowsTable.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({
          count: sql<number>`count(*)::int`,
        })
        .from(userFollowsTable)
        .innerJoin(usersTable, eq(userFollowsTable.followerId, usersTable.id))
        .where(and(baseCondition, eq(usersTable.isActive, true))),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      followers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getFollowing(userId: string, options: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 20 } = options;
    const offset = (page - 1) * limit;

    const whereCondition = eq(userFollowsTable.followerId, userId);

    const [following, countResult] = await Promise.all([
      db
        .select({
          id: usersTable.id,
          displayName: usersTable.displayName,
          photoUrl: usersTable.photoUrl,
          bio: usersTable.bio,
          followedAt: userFollowsTable.createdAt,
        })
        .from(userFollowsTable)
        .innerJoin(usersTable, eq(userFollowsTable.followingId, usersTable.id))
        .where(whereCondition)
        .orderBy(desc(userFollowsTable.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({
          count: sql<number>`count(*)::int`,
        })
        .from(userFollowsTable)
        .where(whereCondition),
    ]);

    const total = countResult[0]?.count ?? 0;

    return {
      following,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getFollowCounts(userId: string) {
    const [followerCount] = await db
      .select({ count: sql`count(*)::int` })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followingId, userId));

    const [followingCount] = await db
      .select({ count: sql`count(*)::int` })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followerId, userId));

    return {
      followersCount: followerCount?.count,
      followingCount: followingCount?.count,
    };
  }

  async getPopularUsers(userId: string, limit = 10) {
    const currentlyFollowingIds = await db
      .select({ id: userFollowsTable.followingId })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followerId, userId));

    const followingIdsList = currentlyFollowingIds.map((f) => f.id);

    const followerCountSql = sql<number>`(
      SELECT COUNT(*)::int
      FROM ${userFollowsTable}
      WHERE ${userFollowsTable.followingId} = ${usersTable.id}
    )`;

    const popularUsers = await db
      .select({
        id: usersTable.id,
        displayName: usersTable.displayName,
        username: usersTable.username,
        photoUrl: usersTable.photoUrl,
        bio: usersTable.bio,
        followerCount: followerCountSql,
      })
      .from(usersTable)
      .where(
        and(
          ne(usersTable.id, userId),
          isSuggestible,
          eq(usersTable.isActive, true),
          followingIdsList.length > 0
            ? notInArray(usersTable.id, [...followingIdsList, userId])
            : ne(usersTable.id, userId)
        )
      )
      .orderBy(desc(followerCountSql))
      .limit(limit);

    return popularUsers.map((user) => ({
      ...user,
      suggestionReason: 'Popular in community',
      suggestionType: 'popular' as const,
    }));
  }

  async getFriendsOfFriends(userId: string, limit = 10) {
    const following = await db
      .select({ id: userFollowsTable.followingId })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followerId, userId));

    if (following.length === 0) {
      return [];
    }

    const followingIds = following.map((f) => f.id);

    const currentlyFollowingIds = await db
      .select({ id: userFollowsTable.followingId })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followerId, userId));

    const followingIdsList = currentlyFollowingIds.map((f) => f.id);

    const mutualCountSql = sql`COUNT(DISTINCT ${userFollowsTable.followerId})::int`;

    const friendsOfFriends = await db
      .select({
        id: usersTable.id,
        displayName: usersTable.displayName,
        username: usersTable.username,
        photoUrl: usersTable.photoUrl,
        bio: usersTable.bio,
        mutualFollowersCount: mutualCountSql,
      })
      .from(userFollowsTable)
      .innerJoin(usersTable, eq(userFollowsTable.followingId, usersTable.id))
      .where(
        and(
          inArray(userFollowsTable.followerId, followingIds),
          ne(usersTable.id, userId),
          isSuggestible,
          eq(usersTable.isActive, true),
          followingIdsList.length > 0
            ? notInArray(usersTable.id, [...followingIdsList, userId])
            : ne(usersTable.id, userId)
        )
      )
      .groupBy(usersTable.id, usersTable.displayName, usersTable.photoUrl, usersTable.bio)
      .orderBy(desc(mutualCountSql))
      .limit(limit);

    return friendsOfFriends.map((user) => ({
      ...user,
      suggestionReason: `Followed by ${user.mutualFollowersCount} people you follow`,
      suggestionType: 'friends_of_friends' as const,
    }));
  }

  async getRecentlyActiveUsers(userId: string, limit = 10) {
    const currentlyFollowingIds = await db
      .select({ id: userFollowsTable.followingId })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followerId, userId));

    const followingIdsList = currentlyFollowingIds.map((f) => f.id);

    const recentUsers = await db
      .select({
        id: usersTable.id,
        displayName: usersTable.displayName,
        username: usersTable.username,
        photoUrl: usersTable.photoUrl,
        bio: usersTable.bio,
        lastSeenAt: usersTable.lastSeenAt,
      })
      .from(usersTable)
      .where(
        and(
          ne(usersTable.id, userId),
          isSuggestible,
          eq(usersTable.isActive, true),
          sql`${usersTable.lastSeenAt} IS NOT NULL`,
          followingIdsList.length > 0
            ? notInArray(usersTable.id, [...followingIdsList, userId])
            : ne(usersTable.id, userId)
        )
      )
      .orderBy(desc(usersTable.lastSeenAt))
      .limit(limit);

    return recentUsers.map((user) => ({
      ...user,
      suggestionReason: 'Recently active',
      suggestionType: 'recently_active' as const,
    }));
  }

  async getNewUsers(userId: string, limit = 10) {
    const currentlyFollowingIds = await db
      .select({ id: userFollowsTable.followingId })
      .from(userFollowsTable)
      .where(eq(userFollowsTable.followerId, userId));

    const followingIdsList = currentlyFollowingIds.map((f) => f.id);

    const newUsers = await db
      .select({
        id: usersTable.id,
        displayName: usersTable.displayName,
        username: usersTable.username,
        photoUrl: usersTable.photoUrl,
        bio: usersTable.bio,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(
        and(
          ne(usersTable.id, userId),
          isSuggestible,
          eq(usersTable.isActive, true),
          followingIdsList.length > 0
            ? notInArray(usersTable.id, [...followingIdsList, userId])
            : ne(usersTable.id, userId)
        )
      )
      .orderBy(desc(usersTable.createdAt))
      .limit(limit);

    return newUsers.map((user) => ({
      ...user,
      suggestionReason: 'New to Finoana',
      suggestionType: 'new_user' as const,
    }));
  }

  async getComprehensiveSuggestions(userId: string, limit = 10) {
    const [friendsOfFriends, popularUsers, recentlyActive, newUsers] = await Promise.all([
      this.getFriendsOfFriends(userId, 5),
      this.getPopularUsers(userId, 5),
      this.getRecentlyActiveUsers(userId, 3),
      this.getNewUsers(userId, 2),
    ]);

    const allSuggestions = [...friendsOfFriends, ...popularUsers, ...recentlyActive, ...newUsers];

    const uniqueSuggestions = allSuggestions.filter(
      (user, index, self) => index === self.findIndex((u) => u.id === user.id)
    );

    return uniqueSuggestions.slice(0, limit);
  }
}
