'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useUserLanguage } from '@/lib/useUserLanguage';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, BarChartHorizontalBig, BookCopy, ChevronLeft, ChevronRight } from 'lucide-react';
import StatsDashboard from '@/components/ui/StatsDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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

  // Temporary workaround: Map langCode to flag filename
  const langCodeToFlagMap: { [key: string]: string } = {
    'bengali': 'bangladesh.png', // Assuming 'bengali' is the langCode for Bangla
    'hindi': 'india.png',     // Assuming 'hindi' is the langCode for Hindi
    // Add other language codes and their corresponding flag images here
    // e.g. 'marathi': 'india.png', (if you distinguish by langCode)
  };
  
  const determinedCurrentLangFlag = activeLangDetails 
    ? langCodeToFlagMap[activeLangDetails.langCode.toLowerCase()] || 'default-flag.png' 
    : 'default-flag.png';

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="LingLoom Logo" width={40} height={11} priority />
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            {userLanguages && userLanguages.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white hover:text-gray-100 pr-2"
                  >
                    {determinedCurrentLangFlag && determinedCurrentLangFlag !== 'default-flag.png' && (
                      <Image
                        src={`/images/flags/${determinedCurrentLangFlag}`}
                        alt={`${currentLangName} flag`}
                        width={20}
                        height={15}
                        className="h-4 w-5 object-contain rounded-sm"
                      />
                    )}
                    {(determinedCurrentLangFlag === 'default-flag.png' || !determinedCurrentLangFlag) && (
                      <span className="w-5 h-4 rounded-sm bg-gray-700 flex items-center justify-center text-xs text-gray-400">?</span>
                    )}
                    <span className="hidden sm:inline">{currentLangName}</span>
                    <ChevronDown className="h-4 w-4 opacity-80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white w-56">
                  <DropdownMenuLabel className="text-gray-400 px-2 py-1.5">Switch Language</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  {userLanguages.map((lang) => {
                    const flagFileName = langCodeToFlagMap[lang.langCode.toLowerCase()] || 'default-flag.png';
                    return (
                      <DropdownMenuItem 
                        key={lang.langCode} 
                        onClick={() => handleSwitchActiveLanguage(lang.langCode)}
                        disabled={lang.langCode === activeLanguage}
                        className="hover:bg-gray-700 focus:bg-gray-700 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed flex items-center gap-2 px-2 py-1.5"
                      >
                        {flagFileName && flagFileName !== 'default-flag.png' && (
                          <Image
                            src={`/images/flags/${flagFileName}`}
                            alt={`${lang.langName} flag`}
                            width={20}
                            height={15}
                            className="h-4 w-5 object-contain rounded-sm"
                          />
                        )}
                        {(!flagFileName || flagFileName === 'default-flag.png') && (
                          <span className="w-5 h-4 rounded-sm bg-gray-700 flex items-center justify-center text-xs text-gray-400">?</span>
                        )}
                        {lang.langName}
                      </DropdownMenuItem>
                    );
                  })}
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

      <main className="w-full px-4 md:px-6 lg:px-8 pt-2 pb-6 flex-grow flex flex-col">
        <div className="flex justify-center items-center space-x-3 mb-2 py-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            disabled={!api?.canScrollPrev()}
            className="h-6 w-6 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50"
          >
            <ChevronLeft className="h-3 w-3" />
            <span className="sr-only">Previous slide</span>
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-1.5 h-1.5 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900 focus:ring-primary transition-colors
                  ${current === index + 1 ? 'bg-primary' : 'bg-gray-600 hover:bg-gray-500'}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollNext()}
            disabled={!api?.canScrollNext()}
            className="h-6 w-6 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-50"
          >
            <ChevronRight className="h-3 w-3" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-3 text-gray-100">Your Progress Dashboard</h2>

        <Carousel setApi={setApi} className="w-full flex-grow relative">
          <CarouselContent className="h-full">
            <CarouselItem className="h-full flex flex-col overflow-y-auto">
              <div className="container mx-auto py-6 flex-grow flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg shadow-xl w-full p-6">
                  <StatsDashboard />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="h-full flex flex-col">
              <section className="p-6 bg-gray-800 rounded-lg shadow-xl h-full flex flex-col flex-grow">
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
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </main>
    </div>
  );
} 