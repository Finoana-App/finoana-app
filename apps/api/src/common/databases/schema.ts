import { relations } from 'drizzle-orm';
import { boolean, index, pgEnum, pgTable, text, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['user', 'moderator', 'admin']);

export const privacyLevelEnum = pgEnum('privacy_level', ['public', 'private', 'anonymous']);

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

export const usersRelations = relations(usersTable, ({ many }) => ({
  followers: many(userFollowsTable, { relationName: 'following' }),
  following: many(userFollowsTable, { relationName: 'follower' }),
}));
