"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { auth } from "@/lib/firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Animation variants
const panelVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const buttonHover = { hover: { scale: 1.05 } };

// Zod schema
const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

function ResetPasswordConfirmComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoadingCode, setIsLoadingCode] = useState(true);
  const [isValidCode, setIsValidCode] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid or missing password reset code.");
      setIsLoadingCode(false);
      return;
    }
    verifyPasswordResetCode(auth, oobCode)
      .then((userEmail) => {
        setEmail(userEmail);
        setIsValidCode(true);
        setIsLoadingCode(false);
      })
      .catch(() => {
        setError("Invalid or expired password reset code. Please request a new one.");
        setIsValidCode(false);
        setIsLoadingCode(false);
      });
  }, [oobCode]);

  const onSubmit = async (data: ResetPasswordForm) => {
    setError(null);
    setSuccessMessage(null);
    if (!oobCode) {
      setError("Password reset code is missing.");
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, data.password);
      setSuccessMessage("Password has been reset successfully! You can now log in with your new password.");
      // Optionally redirect to login page after a delay
      setTimeout(() => router.push("/login"), 3000); // Assuming you have a /login page
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
    }
  };

  if (isLoadingCode) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Image src="/images/logo.png" alt="LingLoom" width={32} height={32} />
        <span className="text-xl md:text-2xl font-bold text-white">LingLoom</span>
      </div>

      <motion.div
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md"
        variants={panelVariant}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>

        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {isValidCode && !successMessage && (
          <>
            <p className="text-center mb-4 text-sm text-gray-600">
              Enter a new password for {email}.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter new password"
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
              <motion.div whileHover="hover" variants={buttonHover}>
                <Button
                  type="submit"
                  className="w-full text-sm py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </motion.div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function ResetPasswordConfirmPage() {
  return (
    <Suspense fallback={<div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen text-white">Loading page...</div>}>
      <ResetPasswordConfirmComponent />
    </Suspense>
  );
} 