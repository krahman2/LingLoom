'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useUserLanguage } from '@/lib/useUserLanguage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, BarChartHorizontalBig, BookCopy } from 'lucide-react';
import StatsDashboard from '@/components/ui/StatsDashboard';

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
        router.push('/login');
      } else if (!hasActiveLanguage && (!userLanguages || userLanguages.length === 0)) {
        redirectToLanguageSelection();
      } else if (!hasActiveLanguage && userLanguages && userLanguages.length > 0) {
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
    if (!user || !newLangCode || newLangCode === activeLanguage) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        activeLanguage: newLangCode
      });
      await refetchLanguageData();
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

  if (!user || !hasActiveLanguage || !userLanguages || userLanguages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading user data or redirecting...</p>
      </div>
    );
  }

  const activeLangDetails = userLanguages.find(lang => lang.langCode === activeLanguage);
  const currentLangName = activeLangDetails?.langName || activeLanguage || "Select Language";
  const currentLangFlag = activeLangDetails?.flag || 'default-flag.png';

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="LingLoom Logo" width={120} height={32} priority />
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            {userLanguages && userLanguages.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2 border-gray-700 hover:bg-gray-800 text-gray-100 hover:text-white pr-2"
                  >
                    {currentLangFlag && currentLangFlag !== 'default-flag.png' && (
                      <Image
                        src={`/images/Flags/${currentLangFlag}`}
                        alt={`${currentLangName} flag`}
                        width={20}
                        height={15}
                        className="h-4 w-5 object-contain rounded-sm"
                      />
                    )}
                    {(currentLangFlag === 'default-flag.png' || !currentLangFlag) && (
                      <span className="w-5 h-4 rounded-sm bg-gray-700 flex items-center justify-center text-xs text-gray-400">?</span>
                    )}
                    <span className="hidden sm:inline">{currentLangName}</span>
                    <ChevronDown className="h-4 w-4 opacity-80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white w-56">
                  <DropdownMenuLabel className="text-gray-400 px-2 py-1.5">Switch Language</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  {userLanguages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.langCode} 
                      onClick={() => handleSwitchActiveLanguage(lang.langCode)}
                      disabled={lang.langCode === activeLanguage}
                      className="hover:bg-gray-700 focus:bg-gray-700 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed flex items-center gap-2 px-2 py-1.5"
                    >
                      {lang.flag && lang.flag !== 'default-flag.png' && (
                        <Image
                          src={`/images/Flags/${lang.flag}`}
                          alt={`${lang.langName} flag`}
                          width={20}
                          height={15}
                          className="h-4 w-5 object-contain rounded-sm"
                        />
                      )}
                      {(!lang.flag || lang.flag === 'default-flag.png') && (
                        <span className="w-5 h-4 rounded-sm bg-gray-700 flex items-center justify-center text-xs text-gray-400">?</span>
                      )}
                      {lang.langName}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={() => router.push('/select-language')} 
                    className="hover:bg-gray-700 focus:bg-gray-700 flex items-center gap-2 px-2 py-1.5"
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Add/Manage Languages
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button onClick={handleSignOut} variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full px-4 md:px-6 lg:px-8 py-6 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-full">
          <section className="p-6 bg-gray-800 rounded-lg shadow-xl h-full flex flex-col">
            <div className="flex items-center mb-4">
                <BookCopy className="w-6 h-6 text-accent mr-3" />
                <h2 className="text-xl font-semibold">Learning Content: <span className="text-accent">{currentLangName}</span></h2>
            </div>
            <p className="text-gray-400 mb-4 flex-grow">
                Your lessons, activities, and interactive modules for {currentLangName} will appear here.
                This section will host the language tree and actual learning material.
            </p>
            <Button variant="outline" className="mt-auto w-full border-primary text-primary hover:bg-primary/10">
                Start Learning Session
            </Button>
          </section>
        </div>

        <div className="lg:col-span-2 h-full flex flex-col">
            <div className="mb-4 flex justify-end">
                <Link href="/stats-dashboard-preview" passHref>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-accent">
                        View Full Stats Page <BarChartHorizontalBig className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl flex-grow overflow-y-auto">
              <StatsDashboard />
            </div>
        </div>
      </main>
    </div>
  );
} 