import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['user', 'moderator', 'admin']);

export const privacyLevelEnum = pgEnum('privacy_level', ['public', 'private', 'anonymous']);

export const postTypeEnum = pgEnum('post_type', ['general', 'prayer_request', 'testimony', 'devotion']);

export const reactionTypeEnum = pgEnum('reaction_type', ['love', 'support', 'amen', 'praise']);

export const activityTypeEnum = pgEnum('activity_type', [
  'post_created',
  'post_liked',
  'post_commented',
  'post_shared',
  'comment_liked',
  'user_followed',
  'prayer_answered',
]);

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firebaseUid: varchar('firebase_uid', { length: 255 }).unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  photoUrl: text('photo_url'),
  bio: text('bio'),
  role: userRoleEnum('role').default('user').notNull(),
  privacyLevel: privacyLevelEnum('privacy_level').default('public').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastSeenAt: timestamp('last_seen_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userFollowsTable = pgTable(
  'user_follows',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    followerId: uuid('follower_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    followingId: uuid('following_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('user_follows_follower_idx').on(table.followerId),
    index('user_follows_following_idx').on(table.followingId),
    unique('user_follows_unique').on(table.followerId, table.followingId),
  ]
);

export const postsTable = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    authorId: uuid('author_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    content: text('content').notNull(),
    postType: postTypeEnum('post_type').default('general').notNull(),
    mediaUrls: jsonb('media_urls')
      .$type<string[]>()
      .default(sql`'[]'::jsonb`),
    isAnonymous: boolean('is_anonymous').default(false).notNull(),
    isPinned: boolean('is_pinned').default(false).notNull(),
    isPrayerAnswered: boolean('is_prayer_answered').default(false),
    answeredAt: timestamp('answered_at'),
    likesCount: integer('likes_count').default(0).notNull(),
    commentsCount: integer('comments_count').default(0).notNull(),
    sharesCount: integer('shares_count').default(0).notNull(),
    viewsCount: integer('views_count').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('posts_author_idx').on(table.authorId),
    index('posts_type_idx').on(table.postType),
    index('posts_created_at_idx').on(table.createdAt),
  ]
);

export const postReactionsTable = pgTable(
  'post_reactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .references(() => postsTable.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    reactionType: reactionTypeEnum('reaction_type').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('post_reactions_post_user_idx').on(table.postId, table.userId),
    index('post_reactions_user_idx').on(table.userId),
  ]
);

export const commentsTable = pgTable(
  'comments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .references(() => postsTable.id, { onDelete: 'cascade' })
      .notNull(),
    authorId: uuid('author_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    parentCommentId: uuid('parent_comment_id').references((): any => commentsTable.id, {
      onDelete: 'cascade',
    }),
    content: text('content').notNull(),
    isAnonymous: boolean('is_anonymous').default(false).notNull(),
    likesCount: integer('likes_count').default(0).notNull(),
    repliesCount: integer('replies_count').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('comments_post_idx').on(table.postId),
    index('comments_author_idx').on(table.authorId),
    index('comments_parent_idx').on(table.parentCommentId),
  ]
);

export const commentReactionsTable = pgTable(
  'comment_reactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    commentId: uuid('comment_id')
      .references(() => commentsTable.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    reactionType: reactionTypeEnum('reaction_type').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('comment_reactions_comment_user_idx').on(table.commentId, table.userId)]
);

export const postSharesTable = pgTable(
  'post_shares',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .references(() => postsTable.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    message: text('message'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('post_shares_post_idx').on(table.postId), index('post_shares_user_idx').on(table.userId)]
);

export const userActivitiesTable = pgTable(
  'user_activities',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    activityType: activityTypeEnum('activity_type').notNull(),
    postId: uuid('post_id').references(() => postsTable.id, { onDelete: 'cascade' }),
    commentId: uuid('comment_id').references(() => commentsTable.id, { onDelete: 'cascade' }),
    targetUserId: uuid('target_user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
    metadata: jsonb('metadata').$type<Record<string, unknown>>(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('user_activities_user_idx').on(table.userId),
    index('user_activities_type_idx').on(table.activityType),
    index('user_activities_created_at_idx').on(table.createdAt),
  ]
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  followers: many(userFollowsTable, { relationName: 'following' }),
  following: many(userFollowsTable, { relationName: 'follower' }),
  posts: many(postsTable),
  postReactions: many(postReactionsTable),
  commentReactions: many(commentReactionsTable),
  postShares: many(postSharesTable),
  comments: many(commentsTable),
  activities: many(userActivitiesTable, { relationName: 'userActivities' }),
  targetedActivities: many(userActivitiesTable, { relationName: 'targetedActivities' }),
}));

export const userFollowsRelations = relations(userFollowsTable, ({ one }) => ({
  follower: one(usersTable, {
    fields: [userFollowsTable.followerId],
    references: [usersTable.id],
    relationName: 'follower',
  }),
  following: one(usersTable, {
    fields: [userFollowsTable.followingId],
    references: [usersTable.id],
    relationName: 'following',
  }),
}));

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postsTable.authorId],
    references: [usersTable.id],
  }),
  reactions: many(postReactionsTable),
  comments: many(commentsTable),
  shares: many(postSharesTable),
  activities: many(userActivitiesTable),
}));

export const postReactionsRelations = relations(postReactionsTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [postReactionsTable.postId],
    references: [postsTable.id],
  }),
  user: one(usersTable, {
    fields: [postReactionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id],
  }),
  author: one(usersTable, {
    fields: [commentsTable.authorId],
    references: [usersTable.id],
  }),
  parentComment: one(commentsTable, {
    fields: [commentsTable.parentCommentId],
    references: [commentsTable.id],
    relationName: 'commentReplies',
  }),
  replies: many(commentsTable, { relationName: 'commentReplies' }),
  reactions: many(commentReactionsTable),
  activities: many(userActivitiesTable),
}));

export const commentReactionsRelations = relations(commentReactionsTable, ({ one }) => ({
  comment: one(commentsTable, {
    fields: [commentReactionsTable.commentId],
    references: [commentsTable.id],
  }),
  user: one(usersTable, {
    fields: [commentReactionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const postSharesRelations = relations(postSharesTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [postSharesTable.postId],
    references: [postsTable.id],
  }),
  user: one(usersTable, {
    fields: [postSharesTable.userId],
    references: [usersTable.id],
  }),
}));

export const userActivitiesRelations = relations(userActivitiesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userActivitiesTable.userId],
    references: [usersTable.id],
    relationName: 'userActivities',
  }),
  targetUser: one(usersTable, {
    fields: [userActivitiesTable.targetUserId],
    references: [usersTable.id],
    relationName: 'targetedActivities',
  }),
  post: one(postsTable, {
    fields: [userActivitiesTable.postId],
    references: [postsTable.id],
  }),
  comment: one(commentsTable, {
    fields: [userActivitiesTable.commentId],
    references: [commentsTable.id],
  }),
}));
