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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 py-8">
      <motion.div 
        className="max-w-5xl mx-auto"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-12">
          <motion.h1 variants={itemVariant} className="text-4xl md:text-5xl font-bold mb-4">
            Which course do you want to take?
          </motion.h1>
          <motion.p variants={itemVariant} className="text-lg md:text-xl text-gray-300">
            Choose your learning adventure. Each course is designed for cultural immersion and real-world fluency.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {languages.map((language) => {
            const isSelected = selectedLanguageId === language.id;
            const baseCardClasses = [
              'rounded-2xl', 'shadow-2xl', 'cursor-pointer', 'transition-all', 'duration-300',
              'transform', 'hover:-translate-y-1',
              language.bgGradient,
              'overflow-hidden'
            ];
            const selectedStateClasses = isSelected
              ? [
                  language.borderColor,
                  'border-4',
                  'scale-105',
                  'ring-4',
                  'ring-opacity-50',
                  language.borderColor.replace('border-', 'ring-')
                ]
              : ['border-2', 'border-gray-700', 'hover:border-opacity-75'];

            const cardClasses = [...baseCardClasses, ...selectedStateClasses].join(' ');

            return (
              <motion.div
                key={language.id}
                variants={itemVariant}
                whileHover={{ scale: 1.03, y: -8 }}
                className={cardClasses}
                onClick={() => handleLanguageSelect(language.id)}
              >
                <div className="p-6 text-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Image src={`/images/flags/${language.flag}`} alt={language.name} width={48} height={32} className="mr-4 rounded-md shadow-sm" />
                      <div>
                        <h3 className={`text-2xl font-bold ${language.textColor}`}>{language.name}</h3>
                        <p className={`text-lg ${language.textColor} opacity-80`}>{language.nativeName}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-8 w-8 text-white bg-green-500 rounded-full p-1.5 shadow-lg" />
                    )}
                  </div>

                  <p className="text-sm text-gray-700 mb-4 min-h-[3em]">{language.description}</p>

                  <div className="space-y-2 mb-4 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className={`w-4 h-4 ${language.textColor} opacity-75`} />
                      <span>{language.speakers}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-4 h-4 ${language.textColor} opacity-75`} />
                      <span>{language.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${language.textColor} opacity-75`} />
                      <span>Family: {language.family}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 italic mb-4 min-h-[2.5em]">{language.culturalNote}</p>

                  <div className="border-t border-gray-300 pt-4">
                    <h4 className={`text-sm font-semibold mb-2 ${language.textColor}`}>Course Features:</h4>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-700">
                      <div>
                        <span role="img" aria-label="books" className="text-xl">📚</span>
                        <p>Interactive Lessons</p>
                      </div>
                      <div>
                        <span role="img" aria-label="theater masks" className="text-xl">🎭</span>
                        <p>Cultural Content</p>
                      </div>
                      <div>
                        <span role="img" aria-label="speech bubble" className="text-xl">🗣️</span>
                        <p>Real Conversations</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`
                    mt-6 w-full h-1.5 rounded-full transition-all duration-300
                    ${isSelected 
                      ? `bg-gradient-to-r ${language.color}` 
                      : 'bg-gray-300'
                    }
                  `} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={itemVariant} className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedLanguageId || isSubmitting || !authUser}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-3 px-10 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 disabled:opacity-70 group"
          >
            {isSubmitting ? "Saving..." : "Start Learning"}
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
        
        {existingUserLangs && existingUserLangs.length > 0 && (
          <motion.div variants={itemVariant} className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-300">Languages you've added:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {existingUserLangs.map(lang => (
                <span key={lang.langCode} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                  {lang.langName}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 