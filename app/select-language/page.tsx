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

const cardHover = {
  hover: { 
    scale: 1.03,
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  }
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
          {languages.map((language) => (
            <motion.div
              key={language.id}
              variants={itemVariant}
              whileHover="hover"
              className={`rounded-xl shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 
                          ${selectedLanguageId === language.id ? language.borderColor + ' border-4 scale-105 shadow-lg' : 'border-2 border-gray-700 hover:border-opacity-50'} 
                          ${language.bgGradient}`}
              onClick={() => handleLanguageSelect(language.id)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image src={`/images/flags/${language.flag}`} alt={language.name} width={40} height={28} className="mr-3 rounded" />
                  <div>
                    <h3 className={`text-2xl font-semibold ${language.textColor}`}>{language.name} <span className="text-lg text-gray-400">({language.nativeName})</span></h3>
                    <p className="text-sm text-gray-500">{language.speakers}</p>
                  </div>
                  {selectedLanguageId === language.id && (
                    <Check className="ml-auto h-7 w-7 text-green-500 bg-white rounded-full p-1 shadow-md" />
                  )}
                </div>
                <p className="text-gray-600 mb-3 text-sm">{language.description}</p>
              </div>
            </motion.div>
          ))}
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