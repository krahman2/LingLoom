"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, BookOpen, Heart, Target, Mail, GraduationCap, DollarSign } from "lucide-react"; // Keep all icons for now, will remove unused later if needed
import { motion } from "framer-motion";

const navVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function NavigationBar() {
  return (
    <motion.nav
      className="flex justify-between items-center w-full py-6 px-4 z-20 bg-black text-white"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo + Company Name */}
      <motion.div variants={navItemVariants}>
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="LingLoom Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">LingLoom</span>
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <motion.div
        className="hidden md:flex items-center gap-6"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div variants={navItemVariants}>
          <Link
            href="/about"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <Heart className="w-4 h-4" />
            About
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants}>
          <Link
            href="/mission"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <Target className="w-4 h-4" />
            Mission
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants}>
          <Link
            href="/approach"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            Approach
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants}>
          <Link
            href="/courses"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <GraduationCap className="w-4 h-4" />
            Courses
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants}>
          <Link
            href="/pricing"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <DollarSign className="w-4 h-4" />
            Pricing
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants}>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            Contact
          </Link>
        </motion.div>
      </motion.div>

      {/* Top Right Auth Buttons */}
      <motion.div
        className="flex items-center gap-3"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3, // Delay these slightly after nav links
            },
          },
        }}
      >
        <motion.div variants={navItemVariants}>
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              Log In
            </Button>
          </Link>
        </motion.div>
        <motion.div variants={navItemVariants}>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-200 hover:scale-105"
            >
              Sign Up
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
} 