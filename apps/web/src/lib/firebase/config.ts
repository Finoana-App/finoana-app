import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

function getFirebaseConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  console.log('Firebase env vars check:', {
    apiKey: apiKey ? 'present' : 'missing',
    authDomain: authDomain ? 'present' : 'missing',
    projectId: projectId ? 'present' : 'missing',
    storageBucket: storageBucket ? 'present' : 'missing',
    messagingSenderId: messagingSenderId ? 'present' : 'missing',
    appId: appId ? 'present' : 'missing',
    allPublicVars: Object.keys(process.env).filter((key) => key.startsWith('NEXT_PUBLIC_')),
  });

  if (!apiKey) {
    throw new Error(
      'NEXT_PUBLIC_FIREBASE_API_KEY is not defined!\n' +
        'Make sure you have a .env.local file in your project root with:\n' +
        'NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDhuA9T_W-F8SbtUnswoY7F42IF83gEGbI\n\n' +
        'Current env: ' +
        process.env.NODE_ENV
    );
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
}

const firebaseConfig = getFirebaseConfig();
console.log('Firebase initialized with config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey?.substring(0, 5) + '...',
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
