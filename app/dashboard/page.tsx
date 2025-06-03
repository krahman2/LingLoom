'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, isFirebaseReady, createSafeDocRef } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, enableNetwork, disableNetwork } from 'firebase/firestore';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingLanguage, setCheckingLanguage] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Simple network connectivity check
    const checkNetworkAndFirebase = async () => {
      console.log("🌐 Checking network connectivity...");
      const networkStart = Date.now();
      
      try {
        // Test basic connectivity
        await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
        const networkTime = Date.now() - networkStart;
        console.log(`🌐 Network check completed in ${networkTime}ms`);
        
        // Test Firebase connectivity
        console.log("🔥 Testing Firebase connectivity...");
        const firebaseStart = Date.now();
        try {
          // Try to read a minimal document to test Firebase performance
          await getDoc(doc(db, "test", "connectivity"));
          const firebaseTime = Date.now() - firebaseStart;
          console.log(`🔥 Firebase connectivity test completed in ${firebaseTime}ms`);
        } catch (firebaseError) {
          const firebaseTime = Date.now() - firebaseStart;
          console.warn(`🔥 Firebase test failed in ${firebaseTime}ms:`, firebaseError);
        }
      } catch (error) {
        console.warn("⚠️ Network connectivity might be slow:", error);
      }
    };
    
    checkNetworkAndFirebase();

    console.log("🎯 [Dashboard] Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      console.log("🔔 [Dashboard] Auth state changed. User:", currentUser ? "AUTHENTICATED" : "NULL");
      
      if (currentUser) {
        console.log("👤 [Dashboard] User details:", {
          uid: currentUser.uid,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
          displayName: currentUser.displayName,
          phoneNumber: currentUser.phoneNumber
        });
        
        // Validate UID before proceeding
        if (!currentUser.uid || currentUser.uid.trim() === '') {
          console.error("❌ [Dashboard] CRITICAL: User UID is empty or undefined!");
          router.push('/login');
          setLoading(false);
          return;
        }
        
        setUser(currentUser);
        
        // Add a small delay to ensure Firebase is fully ready
        console.log("⏳ [Dashboard] Waiting 100ms for Firebase to stabilize...");
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if user has selected a language
        const checkUserLanguage = async (user: User) => {
          setCheckingLanguage(true);
          
          // CRITICAL: Log all values before Firestore operations
          console.log("🛡️ [Dashboard] SAFETY CHECK - Auth state:", {
            "auth.currentUser": auth.currentUser,
            "auth.currentUser?.uid": auth.currentUser?.uid,
            "user param": user,
            "user.uid": user?.uid,
            "db instance": db ? "EXISTS" : "NULL"
          });
          
          console.log("🕵️ [Dashboard] Checking user language for UID:", user.uid);
          
          // GUARD: Validate all required values
          if (!auth.currentUser) {
            console.error("❌ [Dashboard] GUARD FAILED: auth.currentUser is null");
            router.push('/login');
            setCheckingLanguage(false);
            return;
          }
          
          if (!user || !user.uid || user.uid.trim() === '') {
            console.error("❌ [Dashboard] GUARD FAILED: user or UID is invalid:", { user, uid: user?.uid });
            router.push('/login');
            setCheckingLanguage(false);
            return;
          }
          
          if (!db) {
            console.error("❌ [Dashboard] GUARD FAILED: Firestore db instance is null");
            router.push('/login');
            setCheckingLanguage(false);
            return;
          }
          
          console.log("✅ [Dashboard] All safety checks passed");
          
          let attempt = 0;
          const maxAttempts = 3;

          while (attempt < maxAttempts) {
            attempt++;
            console.log(`➡️ [Dashboard] Attempt ${attempt}/${maxAttempts} to check language.`);
            const checkStartTime = Date.now();
            
            try {
              // Force Firebase network reconnection on retries (except first attempt)
              if (attempt > 1) {
                console.log("🔄 [Dashboard] Forcing Firebase reconnection...");
                try {
                  await disableNetwork(db);
                  await new Promise(resolve => setTimeout(resolve, 100));
                  await enableNetwork(db);
                  console.log("✅ [Dashboard] Firebase network reconnected");
                } catch (networkError) {
                  console.warn("⚠️ [Dashboard] Network toggle failed:", networkError);
                }
              }

              console.log("📖 [Dashboard] Fetching user document from Firestore...");
              console.log("📍 [Dashboard] Document path: users/" + user.uid);
              
              const userDocRef = doc(db, "users", user.uid);
              console.log("📋 [Dashboard] Document reference created:", userDocRef.path);
              
              const userDoc = await getDoc(userDocRef);
              const fetchTime = Date.now() - checkStartTime;
              console.log(`📄 [Dashboard] User document fetched in ${fetchTime}ms. Exists: ${userDoc.exists()}`);
              
              if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("📋 [Dashboard] User data from Firestore:", userData);
                
                if (userData?.selectedLanguage && userData.selectedLanguage.trim() !== '') {
                  console.log("✅ [Dashboard] Found selected language:", userData.selectedLanguage);
                  setSelectedLanguage(userData.selectedLanguage);
                  const totalTime = Date.now() - checkStartTime;
                  console.log(`🎯 [Dashboard] Language check completed in ${totalTime}ms. User stays on dashboard.`);
                  setCheckingLanguage(false);
                  return; // Success, exit loop and function
                } else {
                  console.log("⚠️ [Dashboard] No valid selected language found in Firestore. Redirecting to language selection.");
                  console.log("🔍 [Dashboard] userData.selectedLanguage value:", userData?.selectedLanguage);
                  router.push('/select-language');
                  setCheckingLanguage(false);
                  return; // No language selected, exit
                }
              } else {
                console.log("❌ [Dashboard] User document doesn't exist. Redirecting to language selection.");
                router.push('/select-language');
                setCheckingLanguage(false);
                return; // No document, exit
              }
            } catch (error: any) {
              const totalTime = Date.now() - checkStartTime;
              console.error(`💥 [Dashboard] Attempt ${attempt} failed after ${totalTime}ms:`, error);
              console.error("[Dashboard] Error details:", { 
                code: error.code, 
                message: error.message,
                name: error.name,
                stack: error.stack ? error.stack.substring(0, 500) + '...' : 'No stack'
              });

              if (attempt >= maxAttempts) {
                console.log("🚫 [Dashboard] Max retry attempts reached. Redirecting to language selection as a fallback.");
                router.push('/select-language');
                setCheckingLanguage(false);
                return; // Max retries, exit
              }
              // Wait before retrying (e.g., exponential backoff or fixed delay)
              const delay = 1000 * attempt; // Simple linear backoff
              console.log(`⏳ [Dashboard] Waiting ${delay}ms before next attempt...`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
          // Fallback if loop finishes without success (should be caught by maxAttempts redirect)
          setCheckingLanguage(false);
        };
        
        await checkUserLanguage(currentUser);
        
        // Optional: Further check for email verification if needed here for direct access
        // if (currentUser.email && !currentUser.emailVerified) {
        //   router.push('/verify-email');
        // }
      } else {
        console.log("🚪 [Dashboard] No authenticated user, redirecting to login");
        router.push('/login'); // Not logged in, redirect to login
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  // Testing function to clear language selection
  const handleClearLanguage = async () => {
    console.log("🧪 [Dashboard] Attempting to clear language selection...");

    // CRITICAL: Check if Firebase is ready and user is valid
    if (!isFirebaseReady()) {
      console.error("❌ [Dashboard] CLEAR_LANGUAGE GUARD FAILED: Firebase not ready.");
      alert("Cannot clear language: App is not fully connected. Please try again in a moment.");
      return;
    }

    // Ensure user state is also set in the component, matching auth.currentUser
    if (!user || user.uid !== auth.currentUser?.uid) {
        console.error("❌ [Dashboard] CLEAR_LANGUAGE GUARD FAILED: User state mismatch or null.", { 
            componentUser: user, 
            authUser: auth.currentUser 
        });
        alert("Cannot clear language: User session issue. Please refresh and try again.");
        return;
    }
    
    const uid = user.uid; // Safe to use now
    console.log(`🔥 [Dashboard] CLEAR_LANGUAGE - UID: ${uid}. Proceeding with write.`);

    const userDocRef = createSafeDocRef(db, "users", uid); // Pass db as the first argument

    if (!userDocRef) {
      console.error("❌ [Dashboard] CLEAR_LANGUAGE FAILED: Could not create document reference.");
      alert("Failed to clear language. Invalid user document path.");
      return;
    }

    try {
      const dataToWrite = {
        selectedLanguage: null, // Explicitly setting to null
        // We could also set selectedLanguageName to null if it exists
        // selectedLanguageName: null 
      };
      
      console.log("🔄 [Dashboard] Attempting to write to Firestore:", dataToWrite, "at path:", userDocRef.path);
      await setDoc(userDocRef, dataToWrite, { merge: true }); // Use the validated userDocRef
      console.log("✅ [Dashboard] Language selection cleared in Firestore.");
      setSelectedLanguage(null);
      alert("Language selection cleared! You will be redirected to select a language.");
      router.push('/select-language');
    } catch (error: any) {
      console.error("❌ [Dashboard] Error clearing language:", error);
      console.error("[Dashboard] CLEAR_LANGUAGE - Error details:", { 
        code: error.code, 
        message: error.message,
        name: error.name,
        // stack: error.stack 
      });
      alert("Failed to clear language selection. Please check the console for errors.");
    }
  };

  if (loading || checkingLanguage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{loading ? "Loading..." : "Checking your profile..."}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by the redirect in onAuthStateChanged
    // but as a fallback:
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to LingLoom! 🎉</h1>
        
        {selectedLanguage && (
          <div className="mb-6 p-4 bg-primary/20 border border-primary/30 rounded-lg">
            <p className="text-primary font-semibold">Currently learning: {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}</p>
          </div>
        )}
        
        <p className="text-sm text-gray-400 mb-1">You are logged in as:</p>
        <p className="text-lg font-semibold mb-6 truncate">{user.displayName || user.email || user.phoneNumber || user.uid}</p>
        
        {user.email && (
          <p className="mb-6 text-sm text-gray-400">
            Email Verified: {user.emailVerified ? <span className="text-green-400">Yes</span> : <span className="text-red-400">No</span>}
            {!user.emailVerified && (
              <Link href="/verify-email" className="ml-2 text-primary hover:underline">
                (Verify Now)
              </Link>
            )}
          </p>
        )}

        <div className="space-y-3 mb-6">
          <Link href="/select-language">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg mb-3 transition-colors duration-300">
              Add Language
            </button>
          </Link>
          
          <Link 
            href="/courses" 
            className="block w-full px-4 py-3 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
          >
            View Courses
          </Link>

          {/* Testing button - remove this later */}
          <button
            onClick={handleClearLanguage}
            className="block w-full px-4 py-3 text-xs font-medium text-gray-400 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
          >
            🧪 Clear Language (Testing)
          </button>
        </div>
        
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 