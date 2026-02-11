import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

function getFirebaseConfig() {
  const {
    NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID,
  } = process.env;

  if (!NEXT_PUBLIC_FIREBASE_API_KEY || !NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || !NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    throw new Error('Missing required Firebase environment variables. Check .env.local');
  }

  return {
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY || 'SOME_API_KEY',
    authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'SOME_AUTH_DOMAIN',
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'SOME_PROJECT_ID',
    storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'SOME_STORAGE_BUCKET',
    messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'SOME_MESSAGING_SENDER_ID',
    appId: NEXT_PUBLIC_FIREBASE_APP_ID || 'SOME_APP_ID',
  };
}

const firebaseConfig = getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
