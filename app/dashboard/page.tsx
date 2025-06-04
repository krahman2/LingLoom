'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useUserLanguage } from '@/lib/useUserLanguage';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    loading,
    activeLanguage,
    userLanguages,
    hasActiveLanguage,
    redirectToLanguageSelection,
    refetchLanguageData
  } = useUserLanguage();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("[Dashboard] No authenticated user, redirecting to login");
        router.push('/login');
      } else if (!hasActiveLanguage && (!userLanguages || userLanguages.length === 0)) {
        console.log("[Dashboard] User authenticated but no active/added languages, redirecting to select-language");
        redirectToLanguageSelection();
      } else if (!hasActiveLanguage && userLanguages && userLanguages.length > 0) {
        console.log("[Dashboard] User has languages but no active one, redirecting to select-language");
        redirectToLanguageSelection();
      }
    }
  }, [user, loading, hasActiveLanguage, userLanguages, router, redirectToLanguageSelection]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleSwitchActiveLanguage = async (newLangCode: string) => {
    if (!user || !newLangCode) return;
    console.log(`[Dashboard] Attempting to switch active language to: ${newLangCode}`);
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        activeLanguage: newLangCode
      });
      await refetchLanguageData();
      console.log(`[Dashboard] Active language switched to: ${newLangCode}`);
    } catch (error) {
      console.error("Error switching active language: ", error);
      alert("Failed to switch language. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-3">Loading Dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Redirecting to login...</p>
      </div>
    );
  }
  
  if (!hasActiveLanguage || !userLanguages || userLanguages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>No language selected. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <Button onClick={handleSignOut} variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
          Sign Out
        </Button>
      </header>

      <section className="mb-8 p-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.displayName || 'User'}!</h2>
        {activeLanguage && (
          <p className="text-lg">Your current active language is: <span className="font-bold text-accent">{userLanguages.find(lang => lang.langCode === activeLanguage)?.langName || activeLanguage}</span></p>
        )}
      </section>

      <section className="mb-8 p-6 bg-gray-800 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Your Languages:</h3>
        {userLanguages && userLanguages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {userLanguages.map((lang) => (
              <Button
                key={lang.langCode}
                variant={lang.langCode === activeLanguage ? "default" : "secondary"}
                onClick={() => handleSwitchActiveLanguage(lang.langCode)}
                className="w-full justify-start text-left p-4 h-auto"
              >
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">{lang.langName}</span>
                    <span className="text-xs text-gray-400">Code: {lang.langCode} | Added: {new Date(lang.addedAt?.toDate()).toLocaleDateString()}</span>
                    <span className="text-xs mt-1 italic text-primary/80">Progress: N/A</span>
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <p>You haven't added any languages yet.</p>
        )}
        <Link href="/select-language">
          <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/10">
            Add New Language / Change Active Language
          </Button>
        </Link>
      </section>
      
      {activeLanguage && (
        <section className="p-6 bg-gray-800 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold mb-2">Learning Content for <span className="text-accent">{userLanguages.find(lang => lang.langCode === activeLanguage)?.langName || activeLanguage}</span></h3>
          <p>Your lessons and activities for {userLanguages.find(lang => lang.langCode === activeLanguage)?.langName || activeLanguage} will appear here.</p>
        </section>
      )}
    </div>
  );
} 