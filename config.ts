export const clientConfig = {
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'reboot-badminton',
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    'AIzaSyC-RV0DJURYoXuLGjgmD0Q8JRw-xGOW6P0',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    'reboot-badminton.firebaseapp.com',
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ??
    'reboot-badminton.firebaseio.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '922071552287',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    'reboot-badminton.appspot.com',
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    '1:922071552287:web:4f0f4747c31da46f60202a',
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? 'G-K4T7BQQ6BF',
};

export const NAVER_API_KEY = 'b665agx8f3';
