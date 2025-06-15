'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUserLanguage } from '@/lib/useUserLanguage';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
import { LayoutDashboard, ChevronDown, LogOut, PlusCircle, Book, Wrench, Video, Mic, Users } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';

// Import the new components
import StatsDashboard from '@/components/ui/StatsDashboard';
import CoreTree from '@/components/dashboard/CoreTree';
import GrammarPath from '@/components/dashboard/GrammarPath';
import ImmersionHub from '@/components/dashboard/ImmersionHub';
import SkillsStudio from '@/components/dashboard/SkillsStudio';
import SocialFeed from '@/components/dashboard/SocialFeed';
import BottomNavBar from '@/components/dashboard/BottomNavBar';

const TABS = [
  { name: 'Dashboard', icon: LayoutDashboard, component: StatsDashboard },
  { name: 'Core Tree', icon: Book, component: CoreTree },
  { name: 'Grammar Path', icon: Wrench, component: GrammarPath },
  { name: 'Immersion Hub', icon: Video, component: ImmersionHub },
  { name: 'Social', icon: Users, component: SocialFeed },
  { name: 'Skills Studio', icon: Mic, component: SkillsStudio },
];

export default function DashboardPage() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
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
      await updateDoc(userDocRef, { activeLanguage: newLangCode });
      await refetchLanguageData();
    } catch (error) {
      console.error("Error switching active language: ", error);
      alert("Failed to switch language. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-3">Loading Dashboard...</p>
      </div>
    );
  }

  if (!user || !hasActiveLanguage || !userLanguages || userLanguages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading user data or redirecting...</p>
      </div>
    );
  }

  const activeLangDetails = userLanguages.find(lang => lang.langCode === activeLanguage);
  const currentLangName = activeLangDetails?.langName || activeLanguage || "Select Language";

  const langCodeToFlagMap: { [key: string]: string } = {
    'bengali': 'bangladesh.png',
    'hindi': 'india.png',
  };
  
  const determinedCurrentLangFlag = activeLangDetails 
    ? langCodeToFlagMap[activeLangDetails.langCode.toLowerCase()] || 'default-flag.png' 
    : 'default-flag.png';

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/animatedwallpapers/page8.mp4"
        />
        <div className="absolute inset-0 w-full h-full bg-black/50 z-1" />
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="LingLoom Logo" width={40} height={40} priority />
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Switcher Dropdown */}
            {userLanguages && userLanguages.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white hover:text-gray-100 pr-2"
                  >
                    <Image
                      src={`/images/flags/${determinedCurrentLangFlag}`}
                      alt={`${currentLangName} flag`}
                      width={20} height={15}
                      className="h-4 w-5 object-contain rounded-sm"
                    />
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
                      className="hover:bg-gray-700 focus:bg-gray-700 data-[disabled]:opacity-50 flex items-center gap-2 px-2 py-1.5"
                    >
                      <Image
                        src={`/images/flags/${langCodeToFlagMap[lang.langCode.toLowerCase()] || 'default-flag.png'}`}
                        alt={`${lang.langName} flag`}
                        width={20} height={15}
                        className="h-4 w-5 object-contain rounded-sm"
                      />
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
        {/* Tab Navigation for swipeable content */}
        <nav className="flex justify-center border-t border-gray-800">
          <div className="flex space-x-2 sm:space-x-4 md:space-x-8 p-2">
            {TABS.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => api?.scrollTo(index)}
                className={`flex flex-col sm:flex-row items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  current === index
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <Carousel setApi={setApi} className="w-full h-full">
          <CarouselContent className="h-full">
            {TABS.map((tab, index) => (
              <CarouselItem key={index} className="h-full overflow-y-auto">
                <div className="w-full h-full flex items-start justify-center p-1">
                  <tab.component />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
} 