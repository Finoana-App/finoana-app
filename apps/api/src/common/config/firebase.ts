import admin from 'firebase-admin';

import { env } from '@/common/utils/env-config';

const privateKey = env.FIREBASE_PRIVATE_KEY?.replaceAll(String.raw`\n`, '\n');

if (!env.FIREBASE_PROJECT_ID || !privateKey || !env.FIREBASE_CLIENT_EMAIL) {
  throw new Error('Missing Firebase credentials in environment variables');
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.FIREBASE_PROJECT_ID,
    privateKey: privateKey,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
  }),
});

export const auth = admin.auth();
export default admin;
