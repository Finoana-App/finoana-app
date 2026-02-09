import { eq } from 'drizzle-orm';

import { db } from '@/common/databases';
import { usersTable } from '@/common/databases/schema';

import { RegisterInput } from './user.model';

export class UserRepository {
  async create(firebaseUid: string, data: RegisterInput) {
    return await db
      .insert(usersTable)
      .values({
        firebaseUid,
        email: data.email,
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
}
