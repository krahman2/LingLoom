// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";


// Log to confirm the env var is loaded
console.log("Loaded API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  // (you can add storageBucket, messagingSenderId, appId, etc. if needed)
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
