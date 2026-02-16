import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

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
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
