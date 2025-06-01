"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

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
const forgotPasswordSchema = z.object({
  email: z.string().email(),
});
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setMessage(null);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-edge-glow bg-black bg-blend-screen">
      {/* Logo top-right */}
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
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password?</h2>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <motion.div whileHover="hover" variants={buttonHover}>
            <Button
              type="submit"
              className="w-full text-sm py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </motion.div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            Remember your password? Log In
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 