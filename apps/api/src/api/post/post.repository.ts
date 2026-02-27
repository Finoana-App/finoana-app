import { and, desc, eq } from 'drizzle-orm';

import { CreatePostInput, PrivacyLevel } from '@workspace/types';

import { cloudinaryService, MediaType } from '@/common/config/cloudinary';
import { db } from '@/common/databases';
import { postsTable, userActivitiesTable, userFollowsTable, usersTable } from '@/common/databases/schema';

export class PostRepository {
  async create(userId: string, data: CreatePostInput, files?: Express.Multer.File[]) {
    try {
      let mediaUrls: string[] = [];

      if (files && files.length > 0) {
        const uploadResults = await cloudinaryService.uploadMultipleFiles(files, {
          mediaType: MediaType.POST_IMAGE,
          userId: userId,
        });
        mediaUrls = uploadResults.map((result) => result.secureUrl);
      }

      const [post] = await db
        .insert(postsTable)
        .values({
          authorId: userId,
          content: data.content,
          postType: data.postType,
          ...(mediaUrls.length > 0 && { mediaUrls }),
          isAnonymous: data.isAnonymous || false,
        })
        .returning();

      await db.insert(userActivitiesTable).values({
        userId,
        activityType: 'post_created',
        postId: post?.id,
        metadata: { postType: data.postType },
      });

      return post;
    } catch (ex) {
      throw new Error((ex as Error).message || 'Failed to create post');
    }
  }

  async canAccessUserContent(targetUserId: string, requestingUserId?: string) {
    if (targetUserId === requestingUserId) return true;

    const [targetUser] = await db
      .select({ privacyLevel: usersTable.privacyLevel })
      .from(usersTable)
      .where(eq(usersTable.id, targetUserId))
      .limit(1);

    if (!targetUser) return false;

    if (targetUser.privacyLevel === PrivacyLevel.PUBLIC) return true;

    if (targetUser.privacyLevel === PrivacyLevel.PRIVATE) {
      if (!requestingUserId) return false;

      const [follow] = await db
        .select()
        .from(userFollowsTable)
        .where(and(eq(userFollowsTable.followerId, requestingUserId), eq(userFollowsTable.followingId, targetUserId)))
        .limit(1);

      return !!follow;
    }

    if (targetUser.privacyLevel === PrivacyLevel.ANONYMOUS) return true;

    return false;
  }

  async getUserPosts(targetUserId: string, requestingUserId?: string, options: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 20 } = options;
    const offset = (page - 1) * limit;

    const canAccess = await this.canAccessUserContent(targetUserId, requestingUserId);

    if (!canAccess) throw new Error("You do not have permission to view this user's posts");

    const userPosts = await db
      .select({
        id: postsTable.id,
        content: postsTable.content,
        postType: postsTable.postType,
        mediaUrls: postsTable.mediaUrls,
        isAnonymous: postsTable.isAnonymous,
        isPrayerAnswered: postsTable.isPrayerAnswered,
        likesCount: postsTable.likesCount,
        commentsCount: postsTable.commentsCount,
        sharesCount: postsTable.sharesCount,
        createdAt: postsTable.createdAt,
      })
      .from(postsTable)
      .where(eq(postsTable.authorId, targetUserId))
      .orderBy(desc(postsTable.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      posts: userPosts,
      pagination: {
        page,
        limit,
        hasMore: userPosts.length === limit,
      },
    };
  }
}
