import { cloudinaryService, MediaType } from "@/common/config/cloudinary";
import { db } from "@/common/databases";
import { postsTable, userActivitiesTable } from "@/common/databases/schema";
import { CreatePostInput } from "@workspace/types";

export class PostRepository {
  async create(userId: string, data: CreatePostInput, files?: Express.Multer.File[]) {
    try {
      let mediaUrls: string[] = [];

      if (files && files.length > 0) {
        const uploadResults = await cloudinaryService.uploadMultipleFiles(files, {
          mediaType: MediaType.POST_IMAGE,
          userId: userId,
        })
        mediaUrls = uploadResults.map((result) => result.secureUrl);
      }

      const [post] = await db
        .insert(postsTable)
        .values({
          authorId: userId,
          content: data.content,
          postType: data.postType,
          mediaUrls: mediaUrls,
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
}