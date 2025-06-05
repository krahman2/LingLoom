"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Variants for the floating icons to add a bit more flair
const floatingIconLeftVariants = {
  hidden: { opacity: 0, x: -25, rotate: -50 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.5 } },
};

const floatingIconRightVariants = {
  hidden: { opacity: 0, x: 25, rotate: 50 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.5 } },
};

export default function ScienceBlock() {
  return (
    <motion.section
      className="bg-black text-white px-6 py-20 md:px-16 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      {/* Ensure no hidden corner gyphs are present */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text Content */}
        <motion.div variants={itemVariants}> {/* Stagger children of this div */}
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"
            variants={itemVariants}
          >
            The most effective <br />
            <span className="text-accent">science-based</span> approach <br />
            to language learning
          </motion.h2>

          <motion.p className="text-lg mb-4 text-white/90" variants={itemVariants}>
            Our method is a cocktail of the highest-impact techniques from
            linguistics, cognitive science, and immersion research.
          </motion.p>

          <motion.p className="italic font-semibold mb-2 text-accent" variants={itemVariants}>
            powered by brain-science.
          </motion.p>

          <motion.p className="text-white/80 leading-relaxed" variants={itemVariants}>
            We blend research-backed techniques such as spaced repetition,
            comprehensible input videos, cloze deletions, and micro grammar
            pop-ups to train reading, writing, listening, and speaking in the
            exact order your brain likes to learn.
          </motion.p>

          {/* Additional animated element */}
          <motion.div className="mt-12 flex items-center gap-8" variants={itemVariants}>
            <motion.div className="w-28 h-28" variants={itemVariants}> {/* Simple scale/fade for the image */}
              <Image
                src="/images/Untitled (1024 x 1024 px) (1)/5.gif"
                alt="Brain learning animation"
                width={112}
                height={112}
                className="rounded-full"
                unoptimized
              />
            </motion.div>
            <motion.p className="text-sm text-accent font-semibold" variants={itemVariants}>
              Scientifically optimized for your brain's natural learning patterns
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Right: Enhanced Image Section */}
        <motion.div className="flex justify-center relative" variants={itemVariants}>
          <div className="w-72 h-72 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 via-yellow-300 to-green-400 flex items-center justify-center relative">
            <motion.div variants={itemVariants}> {/* Simple scale/fade for the image */}
              <Image
                src="/images/ipadlearn.png"
                alt="Science-based learning illustration"
                width={260}
                height={260}
                className="rounded-full object-cover"
              />
            </motion.div>
            
            {/* Floating animated elements around the main image */}
            <motion.div className="absolute -top-2 -right-2 animate-bounce" variants={floatingIconRightVariants}>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
            </motion.div>
            
            <motion.div className="absolute -bottom-2 -left-2 animate-pulse" variants={floatingIconLeftVariants}>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
