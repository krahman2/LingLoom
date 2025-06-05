"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { motion } from "framer-motion";

import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  RecaptchaVerifier,
  ConfirmationResult,
  signInWithPhoneNumber,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Shadcn Dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Modal Content Components
import PrivacyPolicyModalContent from "@/components/legal/PrivacyPolicyModalContent";
import TermsOfServiceModalContent from "@/components/legal/TermsOfServiceModalContent";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaPhoneAlt } from "react-icons/fa";

// New Animation variants (similar to login page)
const pageContainerVariant = { hidden: {}, visible: { transition: { staggerChildren: 0.3 } } };

const titleVariant = {
  hidden: { opacity: 0, y: -30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: "circOut" } },
};

const formPanelVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: "circOut", staggerChildren: 0.1 } }, // Stagger children
};

const formItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Zod schema
const baseSignUpSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8),
  terms: z.literal(true, { errorMap: () => ({ message: "You must accept the Terms of Service and Privacy Policy." }) }),
});

const signUpSchema = baseSignUpSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

// Extend window type for recaptchaVerifier (if not already global in another file)
declare global {
  interface Window {
    recaptchaVerifierSignup?: RecaptchaVerifier;
  }
}

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResultState, setConfirmationResultState] = useState<ConfirmationResult | null>(null);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);
  const [isSubmittingMainForm, setIsSubmittingMainForm] = useState(false);
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
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  // Password strength meter
  const pwd = watch("password", "");
  const { score } = zxcvbn(pwd);
  const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-lime-500",
    "bg-green-500",
  ];

  const onSubmit = async (data: SignUpForm) => {
    setFirebaseError(null);
    setIsSubmittingMainForm(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(cred.user, { displayName: data.name });
      
      const userDocRef = doc(db, "users", cred.user.uid);
      await setDoc(userDocRef, {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: data.name,
        username: data.username.toLowerCase(),
        photoURL: cred.user.photoURL,
        providerId: cred.user.providerData[0]?.providerId || "email",
        createdAt: new Date().toISOString(),
        emailVerified: false,
      });

      await sendEmailVerification(cred.user);
      router.push("/verify-email");
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setFirebaseError("This email address is already in use. Please try a different email or log in.");
        setError("email", { type: "manual", message: "This email is already in use." });
      } else {
        setFirebaseError(err.message || "An unexpected error occurred during sign up.");
      }
    } finally {
      setIsSubmittingMainForm(false);
    }
  };

  const handleSocialSignUp = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
    setFirebaseError(null);
    setIsSubmittingMainForm(true);
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
          emailVerified: user.emailVerified,
        });
      }
      router.push("/select-language"); 
    } catch (error: any) {
      setFirebaseError(error.message || `Failed to sign up with ${provider.providerId}.`);
      if (error.code === 'auth/account-exists-with-different-credential') {
        setFirebaseError("An account already exists with this email address using a different sign-in method. Please log in with that method.");
      }
    } finally {
      setIsSubmittingMainForm(false);
    }
  };

  const handleGoogleSignIn = () => handleSocialSignUp(new GoogleAuthProvider());
  const handleFacebookSignIn = () => handleSocialSignUp(new FacebookAuthProvider());

  const setupRecaptchaForSignup = () => {
    if (!auth || typeof window === 'undefined') return;
    if (window.recaptchaVerifierSignup && document.getElementById("recaptcha-container-signup")?.innerHTML === "") {
        window.recaptchaVerifierSignup.clear();
        window.recaptchaVerifierSignup = undefined;
    }
    if (document.getElementById("recaptcha-container-signup") && !window.recaptchaVerifierSignup) {
        try {
            window.recaptchaVerifierSignup = new RecaptchaVerifier(auth, "recaptcha-container-signup", {
                size: "invisible",
                callback: (response: any) => { /* reCAPTCHA solved */ },
                "expired-callback": () => {
                    if (window.recaptchaVerifierSignup) {
                        window.recaptchaVerifierSignup.clear();
                        window.recaptchaVerifierSignup = undefined;
                    }
                    setupRecaptchaForSignup(); 
                },
            });
            window.recaptchaVerifierSignup.render().catch(err => { /* console.error for debug */ });
        } catch (error) { /* console.error for debug */ }
    }
};

  const handlePhoneSignIn = async () => {
    setFirebaseError(null);
    setShowPhoneInput(true);
    setShowOtpInput(false); 
    setTimeout(() => setupRecaptchaForSignup(), 50);
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setFirebaseError("Please enter a phone number.");
      return;
    }
     if (!window.recaptchaVerifierSignup) {
        setFirebaseError("reCAPTCHA not ready. Please wait or refresh.");
        setupRecaptchaForSignup();
        return;
    }
    setFirebaseError(null);
    setIsOtpSubmitting(true);
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifierSignup);
      setConfirmationResultState(confirmation);
      setShowPhoneInput(false);
      setShowOtpInput(true);
    } catch (error: any) {
      setFirebaseError(error.message || "Failed to send OTP.");
      if (window.recaptchaVerifierSignup) {
        window.recaptchaVerifierSignup.clear();
        window.recaptchaVerifierSignup = undefined;
      }
      setupRecaptchaForSignup();
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
    setFirebaseError(null);
    setIsOtpSubmitting(true);
    try {
      const result = await confirmationResultState.confirm(otp);
      const user = result.user;
      
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        providerId: "phone",
        createdAt: new Date().toISOString(),
        emailVerified: false,
      }, { merge: true });

      router.push("/select-language"); 
    } catch (error: any) {
      setFirebaseError(error.message || "Failed to verify OTP.");
    } finally {
      setIsOtpSubmitting(false);
    }
  };
  
  useEffect(() => {
     return () => {
        if (typeof window !== 'undefined' && window.recaptchaVerifierSignup) {
            window.recaptchaVerifierSignup.clear();
            window.recaptchaVerifierSignup = undefined;
        }
    };
  }, []);

  const anySubmitting = isSubmittingMainForm || isOtpSubmitting;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-black overflow-hidden">
      {/* Video Background - Updated */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/animatedwallpapers/page3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-1"></div>

      <Link href="/" className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </Link>

      {/* Main content area: Title + Form Panel */}
      <motion.div
        className="relative flex flex-col items-center justify-center w-full z-10 space-y-10 md:space-y-12"
        variants={pageContainerVariant}
        initial="hidden"
        animate="visible"
      >
        {/* Title - Moved out and enlarged */}
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg"
          variants={titleVariant}
        >
          Create Your Account
        </motion.h2>

        {/* Form Panel - Opaque white, content animated */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md"
          variants={formPanelVariant}
        >
          {/* Inner container for form items to be staggered */}
          <motion.div className="flex flex-col gap-4">
            {firebaseError && (
              <motion.p className="text-red-500 text-center text-sm p-3 bg-red-50 rounded-md" variants={formItemVariant}>
                {firebaseError}
              </motion.p>
            )}

            {!showPhoneInput && !showOtpInput && (
              <>
                <motion.div variants={formItemVariant}>
                  <p className="text-sm text-center text-black mb-3">Sign in with</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                    <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={anySubmitting}><FcGoogle className="mr-2 h-5 w-5" /> Google</Button>
                    <Button onClick={handleFacebookSignIn} variant="outline" className="w-full" disabled={anySubmitting}><FaFacebookF className="mr-2 h-5 w-5 text-[#1877F2]" /> Facebook</Button>
                    <Button onClick={handlePhoneSignIn} variant="outline" className="w-full col-span-2 md:col-span-1" disabled={anySubmitting}><FaPhoneAlt className="mr-2 h-4 w-4 text-gray-700" /> Phone</Button>
                  </div>
                  <div className="flex items-center my-3">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-xs text-gray-400">OR</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <motion.div variants={formItemVariant}>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" {...register("name")} disabled={anySubmitting} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </motion.div>

                  <motion.div variants={formItemVariant}>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Choose a username (min 3 chars)" {...register("username")} disabled={anySubmitting} />
                    {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
                  </motion.div>

                  <motion.div variants={formItemVariant}>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" {...register("email")} disabled={anySubmitting} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </motion.div>

                  <motion.div variants={formItemVariant} className="relative">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password (min 8 chars)" {...register("password")} disabled={anySubmitting} />
                     <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500 focus:outline-none" style={{ top: errors.password || pwd ? (errors.password ? '0.8rem' : 'calc(50% - 0.5rem - 10px)') : '1.8rem' }} disabled={anySubmitting}>
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                    {pwd && (
                      <div className="mt-1.5 flex items-center space-x-2">
                        <div className={`h-1.5 flex-grow rounded-full ${strengthColors[score]}`}></div>
                        <p className={`text-xs font-medium ${score < 2 ? 'text-red-500' : score < 4 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {strengthLabels[score]}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  <motion.div variants={formItemVariant}>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" {...register("confirmPassword")} disabled={anySubmitting} />
                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                  </motion.div>

                  <motion.div variants={formItemVariant} className="flex items-start space-x-2 pt-1">
                    <Checkbox id="terms" {...register("terms")} className="mt-0.5" disabled={anySubmitting} />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor="terms" className="text-xs font-normal text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to the LingLoom&nbsp;
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" type="button" className="text-xs p-0 h-auto text-primary hover:underline" disabled={anySubmitting}>Terms of Service</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">Terms of Service</DialogTitle>
                              <DialogDescription>Last updated: {new Date().toLocaleDateString()}</DialogDescription>
                            </DialogHeader>
                            <TermsOfServiceModalContent />
                            <DialogFooter>
                              <DialogClose asChild><Button type="button">Close</Button></DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        &nbsp;and&nbsp;
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" type="button" className="text-xs p-0 h-auto text-primary hover:underline" disabled={anySubmitting}>Privacy Policy</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">Privacy Policy</DialogTitle>
                              <DialogDescription>Last updated: {new Date().toLocaleDateString()}</DialogDescription>
                            </DialogHeader>
                            <PrivacyPolicyModalContent />
                            <DialogFooter>
                              <DialogClose asChild><Button type="button">Close</Button></DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>.
                      </label>
                      {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}
                    </div>
                  </motion.div>

                  <motion.div variants={formItemVariant} className="pt-2">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={!isValid || anySubmitting}>
                      {isSubmittingMainForm ? "Creating Account..." : "Create Account"}
                    </Button>
                  </motion.div>
                </form>

                <motion.p variants={formItemVariant} className="mt-4 text-center text-xs text-gray-500">
                  Already have an account? <Link href="/login" className="text-primary hover:underline font-semibold">Log In</Link>
                </motion.p>
              </>
            )}

            {showPhoneInput && (
              <motion.div variants={formItemVariant} className="space-y-4 py-4">
                <h3 className="text-lg font-semibold text-center text-gray-800">Sign Up with Phone</h3>
                <p className="text-xs text-gray-500 text-center">Enter your phone number to receive an OTP.</p>
                <Input
                  type="tel"
                  placeholder="e.g., +12345678900"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={firebaseError && !phoneNumber && firebaseError.toLowerCase().includes("phone") ? "border-red-500" : ""}
                  disabled={isOtpSubmitting}
                />
                <div id="recaptcha-container-signup" className="my-3 flex justify-center"></div>
                <Button onClick={handleSendOtp} className="w-full" disabled={isOtpSubmitting || !phoneNumber.trim() || !!firebaseError?.includes("reCAPTCHA")}>
                  {isOtpSubmitting ? "Sending OTP..." : "Send OTP"}
                </Button>
                <Button variant="ghost" onClick={() => { setShowPhoneInput(false); setFirebaseError(null); if (window.recaptchaVerifierSignup) {window.recaptchaVerifierSignup.clear(); window.recaptchaVerifierSignup = undefined;} }} className="w-full text-xs text-gray-600" disabled={isOtpSubmitting}>
                  Cancel & Use Email/Social
                </Button>
              </motion.div>
            )}

            {showOtpInput && (
              <motion.div variants={formItemVariant} className="space-y-4 py-4">
                <h3 className="text-lg font-semibold text-center text-gray-800">Enter OTP</h3>
                <p className="text-xs text-gray-500 text-center">Sent to {phoneNumber}.</p>
                <Input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className={firebaseError && !otp && firebaseError.toLowerCase().includes("otp") ? "border-red-500" : ""}
                  disabled={isOtpSubmitting}
                />
                <Button onClick={handleVerifyOtp} className="w-full" disabled={isOtpSubmitting || otp.length < 6}>
                  {isOtpSubmitting ? "Verifying..." : "Verify OTP & Create Account"}
                </Button>
                <Button variant="ghost" onClick={() => { setShowOtpInput(false); setShowPhoneInput(true); setFirebaseError(null); setOtp(""); setTimeout(() => setupRecaptchaForSignup(), 50);}} className="w-full text-xs text-gray-600" disabled={isOtpSubmitting}>
                  Change Phone Number
                </Button>
                <Button variant="link" onClick={() => { setShowOtpInput(false); setFirebaseError(null); setOtp(""); if (window.recaptchaVerifierSignup) {window.recaptchaVerifierSignup.clear(); window.recaptchaVerifierSignup = undefined;}}} className="w-full text-xs text-primary" disabled={isOtpSubmitting}>
                  Cancel & Use Email/Social
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
