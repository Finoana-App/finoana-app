import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/common/databases';
import { usersTable } from '@/common/databases/schema';

export class UserRepository {
  async create(
    firebaseUid: string,
    data: {
      email: string;
      username: string;
      name: string;
      firstName: string;
      displayName: string;
      photoUrl: string | null;
      bio: string | null;
    }
  ) {
    return await db
      .insert(usersTable)
      .values({
        firebaseUid,
        email: data.email,
        username: data.username,
        name: data.name,
        firstName: data.firstName,
        displayName: data.displayName,
        photoUrl: data.photoUrl,
        bio: data.bio,
      })
      .returning();
  }

  async findByFirebaseUid(firebaseUid: string) {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.firebaseUid, firebaseUid)).limit(1);

    return user;
  }

  async reactivate(id: string) {
    return await db
      .update(usersTable)
      .set({
        isActive: true,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, id))
      .returning();
  }

  async findById(id: string) {
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        displayName: usersTable.displayName,
        photoUrl: usersTable.photoUrl,
        bio: usersTable.bio,
        role: usersTable.role,
        privacyLevel: usersTable.privacyLevel,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(and(eq(usersTable.id, id), eq(usersTable.isActive, true)))
      .limit(1);

    return user;
  }

  async usernameExists(username: string): Promise<boolean> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(usersTable)
      .where(eq(usersTable.username, username.toLowerCase()));

    return Number(result[0]?.count ?? 0) > 0;
  }
}
