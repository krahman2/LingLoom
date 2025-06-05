// components/ui/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageBar from "@/components/ui/LanguageBar";
import NavigationBar from "./NavigationBar";
import { Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
};

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const textBlockVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 1.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const languageBarVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 1.8 },
  },
};

const mainHeadlineText = "A language-learning app focused on interactive and effective methods";
const subHeadlineText = "The human way to fluency—through cultural immersion and connection.";

export default function Hero() {
  return (
    <section
      className="
        relative
        flex flex-col
        min-h-screen
        px-4
        pb-24
        bg-black text-white
        overflow-hidden
      "
    >
      {/* Top Navigation Bar */}
      <NavigationBar />

      {/* Main Content - Centered */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto z-10">
          
          {/* Left side - Text content */}
          <motion.div className="flex-1 text-center lg:text-left" variants={textBlockVariants}>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-2xl"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {mainHeadlineText.split(" ").map((word, index) => {
                if (word.toLowerCase() === "interactive" || word.toLowerCase() === "effective") {
                  return (
                    <motion.span key={index} className="text-accent" variants={wordVariants}>
                      {word}{" "}
                    </motion.span>
                  );
                }
                return (
                  <motion.span key={index} variants={wordVariants}>
                    {word}{" "}
                  </motion.span>
                );
              })}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl leading-snug text-gray-200 mb-8"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {subHeadlineText.split(" ").map((word, index) => (
                <motion.span key={index} variants={wordVariants}>
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex gap-6 justify-center lg:justify-start flex-wrap mb-8"
              variants={buttonContainerVariants}
            >
              <motion.div variants={wordVariants}>
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                  >
                    <Rocket className="w-5 h-5" />
                    Start Your Adventure!
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={wordVariants}>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-accent text-accent hover:bg-accent hover:text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 bg-transparent"
                  >
                    <Sparkles className="w-5 h-5" />
                    Jump Back Into Learning!
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Hero animation */}
          <motion.div
            className="flex-1 relative flex justify-center items-center"
            variants={imageVariants}
          >
            <Image
              src="/images/Untitled (1024 x 1024 px) (1)/3.gif"
              alt="Learning animation"
              width={380}
              height={380}
              className="rounded-full object-contain"
              unoptimized
              priority
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Language bar pinned to bottom */}
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        variants={languageBarVariants}
        initial="hidden"
        animate="visible"
      >
        <LanguageBar />
      </motion.div>
    </section>
  );
}
