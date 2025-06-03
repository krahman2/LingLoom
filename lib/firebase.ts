// lib/firebase.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, User as FirebaseAuthUser } from 'firebase/auth';
import { 
  getFirestore, 
  connectFirestoreEmulator, 
  enableNetwork, 
  disableNetwork, 
  enableIndexedDbPersistence,
  doc,
  DocumentReference,
  Firestore,
} from 'firebase/firestore';

// Log to confirm the env var is loaded
console.log("Loaded API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log("🔥 Firebase app initialized with Project ID:", app.options.projectId);
} else {
  app = getApps()[0];
  console.log("🔥 Firebase app already initialized. Using existing instance with Project ID:", app.options.projectId);
}

// Initialize Firebase Auth
const authInstance = getAuth(app);

// Initialize Firestore
const firestoreInstance = getFirestore(app);

// Enable offline persistence to handle connectivity issues
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(firestoreInstance)
    .then(() => {
      console.log("🔄 Firestore offline persistence enabled");
    })
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        console.warn("⚠️ Firestore persistence failed: Multiple tabs open, or persistence already enabled.");
      } else if (err.code == 'unimplemented') {
        console.warn("⚠️ Firestore persistence not supported in this browser.");
      } else {
        console.error(" Firestore persistence error:", err);
      }
    });
}

// Helper Functions
let firebaseReady = false;
if (app && authInstance && firestoreInstance) {
    firebaseReady = true;
    console.log('Firebase core services (app, auth, firestore) are initialized.');
}


const isFirebaseReady = (): boolean => {
  const apps = getApps();
  if (!apps.length) {
    console.warn("isFirebaseReady: Firebase app not initialized yet.");
    return false;
  }
  const currentApp = apps[0];
  if (!currentApp || !currentApp.name) {
      console.warn("isFirebaseReady: Firebase app instance is invalid.");
      return false;
  }
  try {
      // Attempt to get auth and firestore to ensure they are configured
      getAuth(currentApp);
      getFirestore(currentApp);
      // console.log("isFirebaseReady: Firebase appears to be ready.");
      return true;
  } catch (error) {
      console.error("isFirebaseReady: Error checking Firebase readiness:", error);
      return false;
  }
};


const isUserAuthenticated = (user: FirebaseAuthUser | null): user is FirebaseAuthUser => {
  if (!user) {
    // console.log("isUserAuthenticated: No user object provided.");
    return false;
  }
  if (!user.uid) {
    // console.log("isUserAuthenticated: User object does not have a UID.");
    return false;
  }
  // console.log("isUserAuthenticated: User is authenticated with UID:", user.uid);
  return true;
};

const createSafeDocRef = (dbInstance: Firestore, collectionPath: string, documentId: string | undefined | null): DocumentReference | null => {
  if (!dbInstance) {
    console.error("createSafeDocRef: Firestore instance is null or undefined.");
    return null;
  }
  if (!collectionPath || typeof collectionPath !== 'string' || collectionPath.trim() === "") {
    console.error("createSafeDocRef: Collection path is invalid:", collectionPath);
    return null;
  }
  if (!documentId || typeof documentId !== 'string' || documentId.trim() === "") {
    console.error("createSafeDocRef: Document ID is invalid:", documentId);
    return null;
  }
  try {
    return doc(dbInstance, collectionPath, documentId);
  } catch (error) {
    console.error("createSafeDocRef: Error creating document reference:", error);
    return null;
  }
};

// Explicitly export all necessary services and functions
export {
  app,
  authInstance as auth,
  firestoreInstance as db,
  isFirebaseReady,
  isUserAuthenticated,
  createSafeDocRef,
  doc,
  DocumentReference,
  Firestore,
};

// Default export can remain if needed, but named exports are generally clearer for services
export default app;
