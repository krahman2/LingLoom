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
import { FaFacebookF, FaApple } from "react-icons/fa";

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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

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
      // 4) Redirect (or show a message to check email)
      // For now, let's keep the redirect to dashboard.
      // We can later add a page/modal informing the user to check their email.
      router.push("/dashboard");
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
      router.push("/dashboard"); // Redirect to dashboard after successful sign-in
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
      router.push("/dashboard"); // Redirect to dashboard after successful sign-in
    } catch (error: any) {
      console.error("handleFacebookSignIn: Error during/after signInWithPopup:", error);
      setFirebaseError(error.message || "Failed to sign in with Facebook.");
    }
  };

  // Added Apple Sign-In Handler
  const handleAppleSignIn = async () => {
    setFirebaseError(null);
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard"); // Redirect to dashboard after successful sign-in
    } catch (error: any) {
      // Handle specific Apple errors
      setFirebaseError(error.message || "Failed to sign in with Apple.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen">
      {/* Logo top-right */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </div>

      {/* Panels */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-8 w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Illustration */}
        <motion.div
          className="hidden md:block w-full max-w-md rounded-2xl overflow-hidden"
          custom="left"
          variants={panelVariant}
        >
          <Image
            src="/images/phonelearn.png"
            alt="App Illustration"
            width={300}
            height={500}
            className="object-cover"
          />
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md"
          custom="right"
          variants={panelVariant}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create your free account
          </h2>

          {/* ← Step 4: show any Firebase error here */}
          {firebaseError && (
            <p className="text-red-600 text-center mb-4">{firebaseError}</p>
          )}

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { Icon: FcGoogle, label: "Google", handler: handleGoogleSignIn },
              { Icon: FaFacebookF, label: "Facebook", handler: handleFacebookSignIn },
              { Icon: FaApple, label: "Apple", handler: handleAppleSignIn },
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
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
