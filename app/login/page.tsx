"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  // OAuthProvider, // Not used for Apple on login
  RecaptchaVerifier,
  ConfirmationResult,
  signInWithPhoneNumber,
} from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";

// Animation variants (same as signup)
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
const panelVariant = {
  hidden: (dir: "left" | "right") => ({ opacity: 0, x: dir === "left" ? -50 : 50 }),
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } },
};
const buttonHover = { hover: { scale: 1.05 } };

// Zod schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  // State for phone authentication
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // Email/Password Login Handler
  const onSubmitEmailPassword = async (data: LoginForm) => {
    setFirebaseError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      if (user && user.email && !user.emailVerified) {
        router.push("/verify-email");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
        setFirebaseError("No user found with this email.");
      } else if (err.code === 'auth/wrong-password') {
        setFirebaseError("Incorrect password. Please try again.");
      } else if (err.code === 'auth/invalid-credential') {
        setFirebaseError("Invalid credentials. Please check your email and password.");
      }
      else {
        setFirebaseError(err.message || "Failed to log in. Please try again.");
      }
    }
  };

  // Google Sign-In Handler (reusable)
  const handleGoogleSignIn = async () => {
    setFirebaseError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user && user.email && !user.emailVerified) {
        router.push("/verify-email");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setFirebaseError(error.message || "Failed to sign in with Google.");
    }
  };

  // Facebook Sign-In Handler (reusable)
  const handleFacebookSignIn = async () => {
    setFirebaseError(null);
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user && user.email && !user.emailVerified) {
        router.push("/verify-email");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setFirebaseError(error.message || "Failed to sign in with Facebook.");
    }
  };

  // Phone Sign-In Handlers (reusable from signup)
  const handlePhoneSignIn = async () => {
    setFirebaseError(null);
    setShowPhoneInput(true);
    setShowOtpInput(false);
  };

  const handleSendOtp = async () => {
    setFirebaseError(null);
    setIsOtpSubmitting(true);
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-login', { // Ensure unique ID if on same page/SPA context
        'size': 'invisible',
        'callback': (response: any) => { console.log("reCAPTCHA solved for login, response:", response); },
        'expired-callback': () => { setFirebaseError("reCAPTCHA verification expired for login. Please try again."); }
      });
      const appVerifier = recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setShowPhoneInput(false);
      setShowOtpInput(true);
      setFirebaseError(null);
    } catch (error: any) {
      console.error("Error sending OTP for login:", error);
      if (error.code === 'auth/captcha-check-failed' && error.message.includes('invisible')) {
        setFirebaseError("reCAPTCHA check failed. Ensure the reCAPTCHA element is visible or correctly configured.");
      } else if (error.code === 'auth/invalid-phone-number') {
        setFirebaseError("Invalid phone number. Please use E.164 format (e.g., +1xxxxxxxxxx).");
      } else {
        setFirebaseError(error.message || "Failed to send OTP. Please try again.");
      }
      const recaptchaContainer = document.getElementById('recaptcha-container-login');
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = '';
      }
    } finally {
      setIsOtpSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      setFirebaseError("No confirmation result found. Please request OTP first.");
      return;
    }
    setFirebaseError(null);
    setIsOtpSubmitting(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const user = userCredential.user;
      // For phone sign-in, email might not exist, or if it does, it might not be verified yet
      // if they previously created an account with email+pass and are now linking/signing in with phone.
      if (user && user.email && !user.emailVerified) {
        router.push("/verify-email");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-verification-code') {
        setFirebaseError("Invalid OTP. Please try again.");
      } else {
        setFirebaseError(error.message || "Failed to verify OTP.");
      }
    } finally {
      setIsOtpSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      {/* Logo top-right */}
      <Link href="/" className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </Link>

      {/* Panels */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-8 w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Illustration (same as signup) */}
        <motion.div
          className="hidden md:block w-full max-w-lg rounded-2xl overflow-hidden"
          custom="left"
          variants={panelVariant}
        >
          <div className="flex justify-center items-center h-full bg-white p-12">
            <Image
              src="/images/Untitled (1024 x 1024 px) (1)/16.gif"
              alt="Login animation"
              width={500}
              height={500}
              className="rounded-full"
              unoptimized
            />
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md"
          custom="right"
          variants={panelVariant}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Welcome Back!
          </h2>

          {firebaseError && (
            <p className="text-red-600 text-center mb-4">{firebaseError}</p>
          )}

          {/* Phone Input Modal/Section (reused, ensure unique recaptcha id if needed) */}
          {showPhoneInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowPhoneInput(false)}
            >
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-foreground" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-3 text-center">Enter Phone Number</h3>
                <p className="text-xs text-gray-500 mb-3 text-center">Include country code (e.g., +1).</p>
                <div id="recaptcha-container-login" className="mb-3 flex justify-center"></div> {/* Unique ID */}
                <Input
                  type="tel"
                  placeholder="e.g., +12223334444"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mb-3"
                />
                <Button onClick={handleSendOtp} className="w-full" disabled={isOtpSubmitting || !phoneNumber.trim()}>
                  {isOtpSubmitting ? "Sending OTP..." : "Send OTP"}
                </Button>
                 <Button variant="ghost" onClick={() => setShowPhoneInput(false)} className="w-full mt-2">
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* OTP Input Modal/Section (reused) */}
          {showOtpInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowOtpInput(false)}
            >
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-foreground" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-3 text-center">Enter OTP</h3>
                <p className="text-xs text-gray-500 mb-3 text-center">Sent to {phoneNumber}.</p>
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mb-3"
                  maxLength={6}
                />
                <Button onClick={handleVerifyOtp} className="w-full" disabled={isOtpSubmitting || otp.length !== 6}>
                  {isOtpSubmitting ? "Verifying..." : "Verify OTP & Log In"}
                </Button>
                <Button variant="ghost" onClick={() => { setShowOtpInput(false); setShowPhoneInput(true); }} className="w-full mt-2">
                  Change Phone Number
                </Button>
              </div>
            </motion.div>
          )}

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { Icon: FcGoogle, label: "Google", handler: handleGoogleSignIn },
              { Icon: FaFacebookF, label: "Facebook", handler: handleFacebookSignIn },
              { Icon: FaPhoneAlt, label: "Phone", handler: handlePhoneSignIn },
            ].map(({ Icon, label, handler }) => (
              <motion.div key={label} whileHover="hover" variants={buttonHover}>
                <Button
                  variant="outline"
                  size="default"
                  className="w-full flex items-center justify-center gap-2 text-base py-3 rounded-full"
                  onClick={handler}
                >
                  <Icon className="text-2xl" /> {label}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit(onSubmitEmailPassword)} noValidate className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500"
                style={{ top: 'auto', bottom: errors.password ? '2.5rem' : '0.5rem' }} // Adjust position if error message is present
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <div className="text-right text-xs">
                <Link href="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                </Link>
            </div>

            <motion.div whileHover="hover" variants={buttonHover}>
              <Button
                type="submit"
                className="w-full text-sm py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </Button>
            </motion.div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-700">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
} 