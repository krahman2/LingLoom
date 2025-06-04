import { useState, useEffect, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useRouter } from 'next/navigation';

// Interface for a single language object in the userLanguages array
interface UserLanguage {
  langCode: string;
  langName: string; // Or any other metadata you want to store per language
  addedAt: any; // Consider using Firestore Timestamp type here if possible
  flag?: string; // Added flag property
}

// Interface for the user's language data stored in Firestore
interface UserLanguagesData {
  activeLanguage?: string;
  userLanguages?: UserLanguage[];
}

export function useUserLanguage() {
  const [user, authLoading] = useAuthState(auth); // Renamed loading to authLoading for clarity
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [userLanguages, setUserLanguages] = useState<UserLanguage[]>([]);
  // 'checking' state remains to indicate if we are currently fetching language data
  const [checkingData, setCheckingData] = useState(true); 
  const router = useRouter();

  const checkUserLanguageData = useCallback(async () => {
    if (!user) {
      // If no user, reset language states and stop checking
      setActiveLanguage(null);
      setUserLanguages([]);
      setCheckingData(false);
      return;
    }

    setCheckingData(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserLanguagesData;
        setActiveLanguage(userData.activeLanguage || null);
        setUserLanguages(userData.userLanguages || []);
      } else {
        // User document doesn't exist, means no languages selected/added yet
        setActiveLanguage(null);
        setUserLanguages([]);
      }
    } catch (error) {
      console.error('Error checking user language data:', error);
      setActiveLanguage(null);
      setUserLanguages([]);
    } finally {
      setCheckingData(false);
    }
  }, [user]); // Dependencies: user. Other setters are stable.

  useEffect(() => {
    if (authLoading) {
      setCheckingData(true); // Keep checkingData true while auth is loading
      return;
    }
    // When authLoading is false, proceed to check language data
    checkUserLanguageData();
  }, [user, authLoading, checkUserLanguageData]);

  const redirectToLanguageSelection = () => {
    router.push('/select-language');
  };

  const redirectToDashboard = () => {
    router.push('/dashboard');
  };

  return {
    user,
    loading: authLoading || checkingData, // Overall loading state
    activeLanguage,
    userLanguages,
    hasActiveLanguage: !!activeLanguage, // Helper boolean
    hasAddedLanguages: userLanguages.length > 0, // Helper boolean
    redirectToLanguageSelection,
    redirectToDashboard,
    refetchLanguageData: checkUserLanguageData, // Renamed for clarity
  };
} 