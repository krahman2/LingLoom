"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  User,
  ConfirmationResult,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Animation variants
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.3 } } };
const welcomeTextVariant = {
  hidden: { opacity: 0, y: -30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: "circOut" } },
};
const formPanelVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: "circOut", staggerChildren: 0.15 } }, 
};
const formItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

declare global {
  interface Window {
    recaptchaVerifierLogin?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult; 
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResultState, setConfirmationResultState] = useState<ConfirmationResult | null>(null);
  const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const setupRecaptcha = () => {
    if (!auth || typeof window === 'undefined') return;
    if (window.recaptchaVerifierLogin && document.getElementById("recaptcha-container-login")?.innerHTML === "") {
        window.recaptchaVerifierLogin.clear();
        window.recaptchaVerifierLogin = undefined;
    }
    if (document.getElementById("recaptcha-container-login") && !window.recaptchaVerifierLogin) {
        try {
            window.recaptchaVerifierLogin = new RecaptchaVerifier(auth, "recaptcha-container-login", {
                size: "invisible",
                callback: (response: any) => { /* reCAPTCHA solved */ },
                "expired-callback": () => {
                    if (window.recaptchaVerifierLogin) {
                        window.recaptchaVerifierLogin.clear();
                        window.recaptchaVerifierLogin = undefined;
                    }
                    setupRecaptcha(); 
                },
            });
            window.recaptchaVerifierLogin.render().catch(err => {});
        } catch (error) {}
    }
};

  const handleSocialLogin = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
    setIsSubmitting(true);
    setFirebaseError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerId: user.providerData[0]?.providerId,
          createdAt: new Date().toISOString(),
        });
      }
      router.push("/dashboard");
    } catch (error: any) {
      setFirebaseError(error.message || "Failed to login. Please try again.");
      if (error.code === 'auth/account-exists-with-different-credential') {
        setFirebaseError("An account already exists with the same email. Try another sign-in method.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => handleSocialLogin(new GoogleAuthProvider());
  const handleFacebookSignIn = () => handleSocialLogin(new FacebookAuthProvider());

  const handlePhoneSignIn = () => {
    setShowPhoneInput(true);
    setShowOtpInput(false);
    setFirebaseError(null);
    setTimeout(() => setupRecaptcha(), 50); 
  };

  const onSubmitEmailPassword = async (data: LoginSchema) => {
    setIsSubmitting(true);
    setFirebaseError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setFirebaseError("Invalid email or password.");
        setError("email", { type: "manual", message: " " });
        setError("password", { type: "manual", message: " " });
      } else {
        setFirebaseError(error.message || "Failed to login.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setFirebaseError("Please enter a phone number.");
      return;
    }
    if (!window.recaptchaVerifierLogin) {
        setFirebaseError("reCAPTCHA not ready. Please wait or refresh.");
        setupRecaptcha(); 
        return;
    }
    setIsOtpSubmitting(true);
    setFirebaseError(null);
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifierLogin);
      setConfirmationResultState(confirmation);
      setShowPhoneInput(false);
      setShowOtpInput(true);
    } catch (error: any) {
      setFirebaseError(error.message || "Failed to send OTP.");
      if (window.recaptchaVerifierLogin) {
        window.recaptchaVerifierLogin.clear();
        window.recaptchaVerifierLogin = undefined;
      }
      setupRecaptcha(); 
    } finally {
      setIsOtpSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setFirebaseError("Please enter the OTP.");
      return;
    }
    if (!confirmationResultState) {
        setFirebaseError("Could not verify OTP. Please try sending it again.");
        return;
    }
    setIsOtpSubmitting(true);
    setFirebaseError(null);
    try {
      const result = await confirmationResultState.confirm(otp);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          providerId: "phone",
          createdAt: new Date().toISOString(),
        });
      }
      router.push("/dashboard");
    } catch (error: any) {
      setFirebaseError(error.message || "Failed to verify OTP.");
    } finally {
      setIsOtpSubmitting(false);
    }
  };

  useEffect(() => {
     return () => {
        if (typeof window !== 'undefined' && window.recaptchaVerifierLogin) {
            window.recaptchaVerifierLogin.clear();
            window.recaptchaVerifierLogin = undefined;
        }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-black overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/animatedwallpapers/page1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-1"></div>

      <Link href="/" className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </Link>

      <motion.div
        className="relative flex flex-col items-center justify-center w-full z-10 space-y-10 md:space-y-12"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg"
          variants={welcomeTextVariant}
        >
          Welcome Back!
        </motion.h2>

        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md"
          variants={formPanelVariant}
        >
          <motion.div className="flex flex-col gap-5"> 
            {firebaseError && (
              <motion.p className="text-red-600 text-center" variants={formItemVariant}>{firebaseError}</motion.p>
            )}

            {!showPhoneInput && !showOtpInput && (
              <>
                <motion.div variants={formItemVariant}>
                  <p className="text-sm text-center text-black mb-3">Sign in with</p>
                  <div className="flex justify-center gap-3 mb-4">
                    <Button onClick={handleGoogleSignIn} variant="outline" className="flex-1"><FcGoogle className="mr-2 h-5 w-5" /> Google</Button>
                    <Button onClick={handleFacebookSignIn} variant="outline" className="flex-1"><FaFacebookF className="mr-2 h-5 w-5 text-[#1877F2]" /> Facebook</Button>
                    <Button onClick={handlePhoneSignIn} variant="outline" className="flex-1"><FaPhoneAlt className="mr-2 h-4 w-4 text-gray-700" /> Phone</Button>
                  </div>
                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-xs text-gray-400">OR</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>
                </motion.div>
                
                <form onSubmit={handleSubmit(onSubmitEmailPassword)} className="space-y-5">
                  <motion.div variants={formItemVariant}>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </motion.div>

                  <motion.div variants={formItemVariant} className="relative">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Your password" {...register("password")} className={errors.password ? "border-red-500" : ""}/>
                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500 focus:outline-none" style={{ top: errors.password ? '0.8rem' : '1.8rem' }}>
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                  </motion.div>
                  
                  <motion.div variants={formItemVariant} className="text-right">
                      <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                  </motion.div>

                  <motion.div variants={formItemVariant}>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting || isOtpSubmitting}>
                      {isSubmitting ? "Logging In..." : "Log In"}
                    </Button>
                  </motion.div>
                </form>
                <motion.p variants={formItemVariant} className="mt-4 text-center text-xs text-gray-500">
                  Don't have an account? <Link href="/signup" className="text-primary hover:underline font-semibold">Sign Up</Link>
                </motion.p>
              </>
            )}
            
            {showPhoneInput && (
              <motion.div variants={formItemVariant} className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-gray-800">Enter Phone Number</h3>
                <p className="text-xs text-gray-500 text-center">Include country code (e.g., +1).</p>
                <Input
                  type="tel"
                  placeholder="e.g., +12345678900"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={firebaseError && !phoneNumber ? "border-red-500" : ""}
                />
                <div id="recaptcha-container-login" className="my-3 flex justify-center"></div>
                <Button onClick={handleSendOtp} className="w-full" disabled={isOtpSubmitting || !phoneNumber.trim() || !!firebaseError?.includes("reCAPTCHA")}>
                  {isOtpSubmitting ? "Sending OTP..." : "Send OTP"}
                </Button>
                <Button variant="ghost" onClick={() => { setShowPhoneInput(false); setFirebaseError(null); if (window.recaptchaVerifierLogin) { window.recaptchaVerifierLogin.clear(); window.recaptchaVerifierLogin = undefined; } }} className="w-full text-xs text-gray-600">
                  Cancel
                </Button>
              </motion.div>
            )}

            {showOtpInput && (
              <motion.div variants={formItemVariant} className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-gray-800">Enter OTP</h3>
                <p className="text-xs text-gray-500 text-center">Sent to {phoneNumber}.</p>
                <Input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className={firebaseError && !otp ? "border-red-500" : ""}
                />
                <Button onClick={handleVerifyOtp} className="w-full" disabled={isOtpSubmitting || otp.length < 6}>
                  {isOtpSubmitting ? "Verifying..." : "Verify OTP & Log In"}
                </Button>
                <Button variant="ghost" onClick={() => { setShowOtpInput(false); setShowPhoneInput(true); setFirebaseError(null); setOtp(""); setTimeout(() => setupRecaptcha(), 50); }} className="w-full text-xs text-gray-600">
                  Change Phone Number
                </Button>
                 <Button variant="link" onClick={() => { setShowOtpInput(false); setFirebaseError(null); setOtp(""); if (window.recaptchaVerifierLogin) { window.recaptchaVerifierLogin.clear(); window.recaptchaVerifierLogin = undefined; } }} className="w-full text-xs text-primary">
                  Cancel & Return to Main Login
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
} 