"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc, enableNetwork, disableNetwork } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Star, TrendingUp } from "lucide-react";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);
      
      // Redirect if not authenticated
      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);

      // REMOVED: No longer checking for existing language to redirect.
      // The page will now always show language options, allowing users to add more.
      console.log("🕵️ [SelectPage] User authenticated with UID:", currentUser.uid);
      console.log("ℹ️ [SelectPage] Displaying language options for user to select or add.");
      
    });

    return () => unsubscribe();
  }, [router]);

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
  };

  const forceFirebaseReconnect = async () => {
    console.log("🔄 Manually forcing Firebase reconnection...");
    try {
      await disableNetwork(db);
      await new Promise(resolve => setTimeout(resolve, 500));
      await enableNetwork(db);
      console.log("✅ Firebase manually reconnected");
      alert("Firebase reconnection attempted. Please try selecting your language again.");
    } catch (error) {
      console.error("❌ Manual reconnection failed:", error);
      alert("Reconnection failed. Please refresh the page.");
    }
  };

  const handleContinue = async () => {
    if (!selectedLanguage || !user) return;
    
    setIsSubmitting(true);
    setRetryAttempt(0);
    setSubmitStatus("Saving your selection...");
    console.log("🚀 Starting language selection process...");
    const startTime = Date.now();
    
    // Retry function with exponential backoff
    const saveWithRetry = async (retryCount = 0): Promise<void> => {
      const maxRetries = 3;
      const baseDelay = 1000; // 1 second
      
      setRetryAttempt(retryCount + 1);
      setSubmitStatus(retryCount === 0 ? "Saving your selection..." : `Retrying... (${retryCount + 1}/${maxRetries + 1})`);
      
      try {
        const selectedLangData = languages.find(lang => lang.id === selectedLanguage);
        
        // Force Firebase network reconnection on retries
        if (retryCount > 0) {
          console.log("🔄 Forcing Firebase reconnection...");
          try {
            await disableNetwork(db);
            await new Promise(resolve => setTimeout(resolve, 100));
            await enableNetwork(db);
            console.log("✅ Firebase network reconnected");
          } catch (networkError) {
            console.warn("⚠️ Network toggle failed:", networkError);
          }
        }
        
        console.log(`💾 Saving to Firestore (attempt ${retryCount + 1}/${maxRetries + 1})...`);
        const saveStartTime = Date.now();
        
        // Add timeout wrapper for Firestore operation  
        const savePromise = setDoc(doc(db, "users", user.uid), {
          selectedLanguage,
          selectedLanguageName: selectedLangData?.name,
          courseStartedAt: new Date(),
          streak: 0,
          totalLessons: 0,
          completedLessons: 0,
          email: user.email,
          displayName: user.displayName,
          uid: user.uid
        }, { merge: true });
        
        const timeoutDelay = retryCount === 0 ? 8000 : 15000; // Longer timeout for retries
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error(`Firestore operation timed out after ${timeoutDelay/1000} seconds`)), timeoutDelay);
        });
        
        // Race between save and timeout
        await Promise.race([savePromise, timeoutPromise]);

        const saveEndTime = Date.now();
        console.log(`✅ Firestore save completed in ${saveEndTime - saveStartTime}ms`);
        return; // Success, exit retry loop
        
      } catch (error: any) {
        const saveEndTime = Date.now();
        console.log(`❌ Save attempt ${retryCount + 1} failed after ${saveEndTime - startTime}ms:`, error.message);
        
        if (retryCount < maxRetries && (error.message?.includes('timeout') || error.code === 'unavailable')) {
          // Calculate delay with exponential backoff
          const delay = baseDelay * Math.pow(2, retryCount);
          console.log(`⏳ Retrying in ${delay}ms...`);
          
          await new Promise(resolve => setTimeout(resolve, delay));
          return saveWithRetry(retryCount + 1);
        } else {
          // Max retries reached or non-retryable error
          throw error;
        }
      }
    };
    
    try {
      await saveWithRetry();

      console.log("🔄 Redirecting to dashboard...");
      // Add a small delay to ensure Firestore write is fully committed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Redirect to dashboard
      router.push("/dashboard");
      
      const totalTime = Date.now() - startTime;
      console.log(`🎉 Total process completed in ${totalTime}ms`);
    } catch (error: any) {
      console.error("❌ Final error after all retries:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      // Show user-friendly error message based on error type
      if (error.message?.includes('timed out')) {
        alert("The connection to our servers is slower than usual. This might be due to your internet connection or temporary server issues. Please try again in a moment.");
      } else if (error.code === 'permission-denied') {
        alert("There was a permission error. Please try logging out and back in.");
      } else {
        alert("Failed to save your language selection. Please try again or contact support if the problem persists.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth state
  if (loading) {
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
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo.png"
              alt="LingLoom"
              width={60}
              height={60}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Which course do you want to take?
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose your learning adventure. Each course is designed for cultural immersion and real-world fluency.
          </p>
        </motion.div>

        {/* Language Course Cards */}
        <motion.div 
          variants={itemVariant}
          className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto"
        >
          {languages.map((language) => (
            <motion.div
              key={language.id}
              variants={cardHover}
              whileHover="hover"
              onClick={() => handleLanguageSelect(language.id)}
              className={`
                relative cursor-pointer group
                bg-white text-gray-900 rounded-3xl p-8 transition-all duration-300
                border-4 hover:shadow-2xl
                ${selectedLanguage === language.id 
                  ? `${language.borderColor} shadow-xl ring-4 ring-${language.borderColor.split('-')[1]}-200` 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {/* Selection Indicator */}
              {selectedLanguage === language.id && (
                <div className={`absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r ${language.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <Check className="w-6 h-6 text-white" />
                </div>
              )}

              {/* Flag and Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={`/images/flags/${language.flag}`}
                      alt={`${language.name} flag`}
                      fill
                      className="object-contain rounded-lg shadow-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{language.name}</h3>
                    <p className="text-2xl opacity-70">{language.nativeName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    {language.speakers}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    {language.difficulty}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Star className="w-4 h-4 text-gray-400" />
                    {language.family}
                  </div>
                  <p className="text-xs text-gray-400 italic mb-5">{language.culturalNote}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 text-lg font-medium">
                {language.description}
              </p>

              {/* Course Features */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">📚</div>
                  <p className="text-xs text-gray-600">Interactive Lessons</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🎭</div>
                  <p className="text-xs text-gray-600">Cultural Content</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🎯</div>
                  <p className="text-xs text-gray-600">Real Conversations</p>
                </div>
              </div>

              {/* Selection indicator bar */}
              <div className={`
                mt-6 w-full h-2 rounded-full transition-all duration-300
                ${selectedLanguage === language.id 
                  ? `bg-gradient-to-r ${language.color}` 
                  : 'bg-gray-200 group-hover:bg-gray-300'
                }
              `} />
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div variants={itemVariant} className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedLanguage || isSubmitting}
            className={`
              px-12 py-4 text-lg font-bold rounded-2xl
              transition-all duration-300 hover:scale-105
              flex items-center gap-3 mx-auto shadow-lg
              ${selectedLanguage 
                ? 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white' 
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                {submitStatus}
              </>
            ) : (
              <>
                Start Learning
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </Button>
          
          {selectedLanguage && (
            <p className="text-gray-400 text-sm mt-4">
              You can always change your course later in settings
            </p>
          )}
          
          {isSubmitting && retryAttempt > 1 && (
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-6 max-w-md mx-auto">
              <p className="text-yellow-400 text-sm mb-3">
                <strong>Connection seems slow.</strong><br />
                This might be due to your internet connection or temporary server issues. 
                The app will keep trying automatically.
              </p>
              <Button
                onClick={forceFirebaseReconnect}
                variant="outline"
                size="sm"
                className="w-full text-yellow-400 border-yellow-600 hover:bg-yellow-900/30"
              >
                🔄 Force Reconnect
              </Button>
            </div>
          )}
        </motion.div>

        {/* Coming Soon Teaser */}
        <motion.div variants={itemVariant} className="text-center mt-16">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-accent font-semibold">Coming Soon</span>
            </div>
            <p className="text-gray-300 text-sm">
              More courses including Marathi, Telugu, Urdu, and Nepali are in development!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 