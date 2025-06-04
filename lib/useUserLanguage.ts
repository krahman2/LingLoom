import { useState, useEffect, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useRouter } from 'next/navigation';

interface UserLanguageData {
  selectedLanguage?: string;
  languageSelectedAt?: any;
}

export function useUserLanguage() {
  const [user, loading] = useAuthState(auth);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState<boolean | null>(null);
  const [languageData, setLanguageData] = useState<UserLanguageData | null>(null);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  const checkUserLanguage = useCallback(async () => {
    if (!user) return;

    try {
      setChecking(true);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserLanguageData;
        setLanguageData(userData);
        setHasSelectedLanguage(!!userData.selectedLanguage);
      } else {
        setHasSelectedLanguage(false);
        setLanguageData(null);
      }
    } catch (error) {
      console.error('Error checking user language:', error);
      setHasSelectedLanguage(false);
    } finally {
      setChecking(false);
    }
  }, [user, setChecking, setLanguageData, setHasSelectedLanguage]);

  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      setChecking(false);
      setHasSelectedLanguage(null);
      return;
    }

    checkUserLanguage();
  }, [user, loading, checkUserLanguage]);

  const redirectToLanguageSelection = () => {
    router.push('/select-language');
  };

  const redirectToDashboard = () => {
    router.push('/dashboard');
  };

  return {
    user,
    loading: loading || checking,
    hasSelectedLanguage,
    languageData,
    redirectToLanguageSelection,
    redirectToDashboard,
    refetch: checkUserLanguage
  };
} 