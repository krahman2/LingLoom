"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Star, TrendingUp } from "lucide-react";
import { useUserLanguage } from "@/lib/useUserLanguage";

const languages = [
  {
    id: 'bengali',
    name: 'Bangla',
    nativeName: 'বাংলা',
    flag: 'bangladesh.png',
    description: 'The 6th most spoken language in the world',
    speakers: '270M+ Speakers',
    difficulty: 'Beginner friendly',
    culturalNote: 'Rich literary tradition & vibrant culture',
    family: 'Indo-Aryan',
    color: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-500',
    bgGradient: 'bg-gradient-to-br from-green-50 to-emerald-50',
    textColor: 'text-green-700'
  },
  {
    id: 'hindi',
    name: 'Hindi', 
    nativeName: 'हिन्दी',
    flag: 'india.png',
    description: 'Gateway to Bollywood & Indian culture',
    speakers: '600M+ Speakers',
    difficulty: 'Beginner friendly',
    culturalNote: 'World\'s largest film industry & philosophy',
    family: 'Indo-Aryan',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500',
    bgGradient: 'bg-gradient-to-br from-orange-50 to-red-50',
    textColor: 'text-orange-700'
  }
];

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardHoverStyles = { 
  scale: 1.03,
  y: -8,
  transition: { duration: 0.3, ease: "easeOut" }
};

export default function SelectLanguagePage() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { userLanguages: existingUserLangs, refetchLanguageData } = useUserLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthLoading(false);
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setAuthUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguageId(languageId);
  };

  const handleContinue = async () => {
    if (!selectedLanguageId || !authUser) return;

    setIsSubmitting(true);
    console.log(`Processing selected language: ${selectedLanguageId}`);

    try {
      const userDocRef = doc(db, "users", authUser.uid);
      const languageToAdd = languages.find(lang => lang.id === selectedLanguageId);

      if (!languageToAdd) {
        console.error("Selected language data not found in predefined list.");
        alert("Could not add language. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const newLanguageEntryForUpdate = {
        langCode: languageToAdd.id,
        langName: languageToAdd.name,
        addedAt: new Date(),
      };

      const newLanguageEntryForSet = {
        langCode: languageToAdd.id,
        langName: languageToAdd.name,
        addedAt: serverTimestamp(),
      };

      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const currentData = userDocSnap.data();
        const languagesArray = currentData.userLanguages || [];
        const languageAlreadyAdded = languagesArray.some((lang: any) => lang.langCode === newLanguageEntryForUpdate.langCode);

        if (!languageAlreadyAdded) {
          await updateDoc(userDocRef, {
            userLanguages: arrayUnion(newLanguageEntryForUpdate),
            activeLanguage: newLanguageEntryForUpdate.langCode,
          });
          console.log("Language added to existing user.");
        } else {
          await updateDoc(userDocRef, {
            activeLanguage: newLanguageEntryForUpdate.langCode,
          });
          console.log("Language already added, set as active.");
        }
      } else {
        await setDoc(userDocRef, {
          userLanguages: [newLanguageEntryForSet],
          activeLanguage: newLanguageEntryForSet.langCode,
          email: authUser.email,
          displayName: authUser.displayName,
          uid: authUser.uid,
          createdAt: serverTimestamp()
        });
        console.log("New user document created with language.");
      }
      
      await refetchLanguageData();
      router.push("/dashboard");

    } catch (error: any) {
      console.error("Failed to save language selection:", error);
      alert(`Failed to save language: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/80">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/animatedwallpapers/page7.mp4"
      />
      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />
      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-2 py-8 md:py-16">
        <motion.div 
          className="w-full max-w-5xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-16 mt-8">
            <motion.h1 
              variants={itemVariant} 
              className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg" 
              style={{textShadow: '0 2px 16px rgba(0,0,0,0.7)'}}
            >
              Which course do you want to take?
            </motion.h1>
            <motion.p 
              variants={itemVariant} 
              className="text-lg md:text-2xl text-white opacity-90 max-w-2xl mx-auto mb-2"
              style={{textShadow: '0 1px 8px rgba(0,0,0,0.5)'}}
            >
              Choose your learning adventure. Each course is designed for cultural immersion and real-world fluency.
            </motion.p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 justify-center mb-16">
              {languages.map((language) => {
                const isSelected = selectedLanguageId === language.id;
                const baseCardClasses = [
                  'rounded-xl', 'shadow-lg', 'cursor-pointer', 'transition-all', 'duration-200',
                  'transform', 'hover:-translate-y-1',
                  language.bgGradient,
                  'overflow-hidden', 'border', 'bg-opacity-80',
                  'p-4', 'min-h-[260px]', 'flex', 'flex-col', 'justify-between'
                ];
                const selectedStateClasses = isSelected
                  ? [
                      language.borderColor,
                      'border-2',
                      'scale-105',
                      'ring-2',
                      'ring-opacity-50',
                      language.borderColor.replace('border-', 'ring-')
                    ]
                  : ['border-gray-600', 'hover:border-opacity-75'];

                const cardClasses = [...baseCardClasses, ...selectedStateClasses].join(' ');

                return (
                  <motion.div
                    key={language.id}
                    variants={itemVariant}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className={cardClasses}
                    onClick={() => handleLanguageSelect(language.id)}
                  >
                    <div className="flex items-center mb-2">
                      <Image src={`/images/flags/${language.flag}`} alt={language.name} width={32} height={22} className="mr-2 rounded shadow-sm" />
                      <div>
                        <h3 className={`text-lg font-bold ${language.textColor}`}>{language.name}</h3>
                        <p className={`text-sm ${language.textColor} opacity-80`}>{language.nativeName}</p>
                      </div>
                      {isSelected && (
                        <Check className="ml-auto h-6 w-6 text-white bg-green-500 rounded-full p-1 shadow" />
                      )}
                    </div>
                    <p className="text-xs text-gray-700 mb-2 min-h-[2em]">{language.description}</p>
                    <div className="space-y-1 mb-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className={`w-3 h-3 ${language.textColor} opacity-75`} />
                        <span>{language.speakers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${language.textColor} opacity-75`} />
                        <span>{language.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className={`w-3 h-3 ${language.textColor} opacity-75`} />
                        <span>Family: {language.family}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 italic mb-2 min-h-[1.5em]">{language.culturalNote}</p>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <h4 className={`text-xs font-semibold mb-1 ${language.textColor}`}>Course Features:</h4>
                      <div className="flex justify-between text-[11px] text-gray-700">
                        <div className="flex flex-col items-center">
                          <span role="img" aria-label="books" className="text-lg">📚</span>
                          <span>Lessons</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span role="img" aria-label="theater masks" className="text-lg">🎭</span>
                          <span>Cultural</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span role="img" aria-label="speech bubble" className="text-lg">🗣️</span>
                          <span>Convos</span>
                        </div>
                      </div>
                    </div>
                    <div className={`mt-3 w-full h-1 rounded-full transition-all duration-200 ${isSelected ? `bg-gradient-to-r ${language.color}` : 'bg-gray-200'}`} />
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariant} className="text-center mb-12">
              <Button
                onClick={handleContinue}
                disabled={!selectedLanguageId || isSubmitting || !authUser}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold text-base py-2 px-6 rounded-full shadow-md transition-transform duration-200 hover:scale-105 disabled:opacity-70 group"
              >
                {isSubmitting ? "Saving..." : "Start Learning"}
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {existingUserLangs && existingUserLangs.length > 0 && (
              <motion.div variants={itemVariant} className="mt-2 pt-2 border-t border-gray-700 w-full">
                <h3 className="text-base font-semibold text-center mb-2 text-white">Languages you've added:</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {existingUserLangs.map(lang => (
                    <span key={lang.langCode} className="bg-gray-700 text-gray-200 px-2 py-0.5 rounded-full text-xs">
                      {lang.langName}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 