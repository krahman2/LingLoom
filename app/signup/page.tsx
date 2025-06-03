"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { motion } from "framer-motion";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  OAuthProvider,
  RecaptchaVerifier,
  ConfirmationResult,
  signInWithPhoneNumber,
} from "firebase/auth";

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

// Animation variants
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
const panelVariant = {
  hidden: (dir: "left" | "right") => ({ opacity: 0, x: dir === "left" ? -50 : 50 }),
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } },
};
const buttonHover = { hover: { scale: 1.05 } };

// Zod schema
const signUpSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
    terms: z.literal(true, { errorMap: () => ({ message: "You must accept the Terms of Service and Privacy Policy." }) }),
  })
  .refine((data: SignUpForm) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
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
    try {
      // 1) Create user
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      // 2) Save display name
      await updateProfile(cred.user, { displayName: data.name });
      // 3) Send verification email
      await sendEmailVerification(cred.user);
      // 4) Redirect to verification pending page
      router.push("/verify-email");
    } catch (err: any) {
      setFirebaseError(err.message || "An unexpected error occurred");
    }
  };

  // Added Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setFirebaseError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/select-language"); // Redirect to language selection for new users
    } catch (error: any) {
      setFirebaseError(error.message || "Failed to sign in with Google.");
    }
  };

  // Added Facebook Sign-In Handler
  const handleFacebookSignIn = async () => {
    console.log("handleFacebookSignIn: Click detected");
    setFirebaseError(null);
    const provider = new FacebookAuthProvider();
    try {
      console.log("handleFacebookSignIn: Attempting signInWithPopup...");
      await signInWithPopup(auth, provider);
      console.log("handleFacebookSignIn: signInWithPopup successful");
      router.push("/select-language"); // Redirect to language selection for new users
    } catch (error: any) {
      console.error("handleFacebookSignIn: Error during/after signInWithPopup:", error);
      setFirebaseError(error.message || "Failed to sign in with Facebook.");
    }
  };

  // Added Phone Sign-In Handler
  const handlePhoneSignIn = async () => {
    setFirebaseError(null);
    setShowPhoneInput(true);
    setShowOtpInput(false); // Reset OTP input if shown
    // reCAPTCHA will be setup when user clicks "Send OTP"
  };

  const handleSendOtp = async () => {
    setFirebaseError(null);
    setIsOtpSubmitting(true);
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("reCAPTCHA solved, response:", response);
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          setFirebaseError("reCAPTCHA verification expired. Please try again.");
        }
      });
      // Format phone number to E.164 format
      const appVerifier = recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setShowPhoneInput(false);
      setShowOtpInput(true);
      setFirebaseError(null); // Clear any previous errors
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      // Common errors: auth/invalid-phone-number, auth/too-many-requests
      if (error.code === 'auth/captcha-check-failed' && error.message.includes('invisible')) {
        setFirebaseError("reCAPTCHA check failed. Ensure the reCAPTCHA element is visible or correctly configured for invisible mode.");
      } else if (error.code === 'auth/invalid-phone-number') {
        setFirebaseError("Invalid phone number. Please enter a valid number in E.164 format (e.g., +1xxxxxxxxxx).");
      } else {
        setFirebaseError(error.message || "Failed to send OTP. Please try again.");
      }
      // Ensure reCAPTCHA is reset or re-rendered if necessary
      // For invisible reCAPTCHA, this might involve ensuring the container is present and re-initializing.
      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = ''; // Clear previous reCAPTCHA
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
      await confirmationResult.confirm(otp);
      router.push("/select-language"); // Redirect to language selection for new users
    } catch (error: any) {
      // Common errors: auth/invalid-verification-code, auth/code-expired
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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-black">
      {/* Corrected Logo top-right */}
      <Link href="/" className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </Link>

      {/* Main content wrapper for centering form and illustration */}
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 w-full mt-10 md:mt-0"> {/* Added mt for spacing from new logo pos */}
        {/* Panels */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center justify-center gap-8 w-full"
        >
          {/* Illustration */}
          <motion.div
            className="hidden md:block w-full max-w-lg rounded-2xl overflow-hidden"
            custom="left"
            variants={panelVariant}
          >
            <div className="flex justify-center items-center h-full bg-white p-12">
              <Image
                src="/images/Untitled (1024 x 1024 px) (1)/17.gif"
                alt="Signup animation"
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
              Create Your Account
            </h2>

            {/* ← Step 4: show any Firebase error here */}
            {firebaseError && (
              <p className="text-red-600 text-center mb-4">{firebaseError}</p>
            )}

            {/* Phone Input Modal/Section */}
            {showPhoneInput && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setShowPhoneInput(false)} // Close on overlay click
              >
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-foreground" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-semibold mb-3 text-center">Enter Phone Number</h3>
                  <p className="text-xs text-gray-500 mb-3 text-center">
                    Please include your country code (e.g., +1 for USA).
                  </p>
                  <div id="recaptcha-container" className="mb-3 flex justify-center"></div>
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

            {/* OTP Input Modal/Section */}
            {showOtpInput && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setShowOtpInput(false)} // Close on overlay click
              >
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-foreground" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-semibold mb-3 text-center">Enter OTP</h3>
                  <p className="text-xs text-gray-500 mb-3 text-center">
                    A one-time password has been sent to {phoneNumber}.
                  </p>
                  <Input
                    type="text" // Should be text, can add pattern for numbers only
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mb-3"
                    maxLength={6}
                  />
                  <Button onClick={handleVerifyOtp} className="w-full" disabled={isOtpSubmitting || otp.length !== 6}>
                    {isOtpSubmitting ? "Verifying..." : "Verify OTP & Sign In"}
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
            <div className="flex items-center my-3">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Signup form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register("username")} />
                {errors.username && (
                  <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} />
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                )}
                {pwd && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all ${strengthColors[score]}`}
                        style={{ width: `${((score + 1) / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1">{strengthLabels[score]}</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-start">
                <Checkbox id="terms" {...register("terms")} />
                <div className="ml-2">
                  <Label htmlFor="terms" className="text-xs">
                    I agree to the{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="underline text-primary cursor-pointer">Terms of Service</span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          {/* <DialogTitle>Terms of Service</DialogTitle> */}
                          {/* DialogTitle can be omitted if content has its own title */}
                        </DialogHeader>
                        <TermsOfServiceModalContent />
                        <DialogFooter className="sm:justify-start mt-2">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {" "}and{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="underline text-primary cursor-pointer">Privacy Policy</span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          {/* <DialogTitle>Privacy Policy</DialogTitle> */}
                        </DialogHeader>
                        <PrivacyPolicyModalContent />
                        <DialogFooter className="sm:justify-start mt-2">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    .
                  </Label>
                  {errors.terms && (
                    <p className="text-red-600 text-xs mt-1">{errors.terms.message}</p>
                  )}
                </div>
              </div>

              <motion.div whileHover="hover" variants={buttonHover}>
                <Button
                  type="submit"
                  className="w-full text-sm py-2"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
              </motion.div>
            </form>

            {/* Added Forgot Password Link */}
            <div className="mt-4 text-center">
              <Link href="/login" className="text-xs text-primary hover:underline">
                Already have an account? Log In
              </Link>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
