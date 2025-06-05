"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function MethodsGrid() {
  const methods = [
    {
      icon: "🌍",
      title: "Cultural Immersion.",
      description: "Real-world content (music, memes, media) from the cultures you're learning, integrated directly. No need to hunt for external resources."
    },
    {
      icon: "💎",
      title: "Underrepresented Languages.",
      description: "Championing languages like Bangla, Marathi, Telugu, Urdu, and Nepali with quality, comprehensive resources often missing elsewhere."
    },
    {
      icon: "🧠",
      title: "Comprehensible Input.",
      description: "Lessons immerse you in understandable content, letting your brain naturally acquire grammar and vocabulary—less rote memorization, more flow."
    },
    {
      icon: "⚡",
      title: "Contextual Micro-Grammar.",
      description: "Bite-sized grammar explanations within cultural contexts. Understand the 'why' without dense textbook study, all in one place."
    },
    {
      icon: "🎯",
      title: "Smart Spaced Repetition.",
      description: "Our intelligent built-in scheduler optimizes reviews, embedding vocabulary and concepts into long-term memory efficiently. No separate flashcard app needed."
    },
    {
      icon: "✍️",
      title: "Active Recall & Writing.",
      description: "Engaging prompts encourage active vocabulary use in context. Stronger recall than passive review, integrated into your learning path."
    },
    {
      icon: "🎵",
      title: "Shadowing Pronunciation.",
      description: "Mimic native speakers in real-time to improve your accent and listening skills simultaneously, all within the app."
    },
    {
      icon: "👥",
      title: "Human-First Community.",
      description: "Connect, share, and practice with fellow learners and native speakers (planned). An integrated community, no need to find external groups for support and practice."
    }
  ];

  return (
    <motion.section
      className="bg-white text-black py-24 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1 }} // Removed once: true
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-16" variants={titleVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What makes us <span className="text-primary">different?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Our innovative approach combines cutting-edge technology with human-centered design
          </p>
          <div className="flex justify-center">
            <Image
              src="/images/Untitled (1024 x 1024 px) (1)/6.gif"
              alt="Innovation animation"
              width={120}
              height={120}
              className="rounded-full"
              unoptimized
            />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-sm"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }} // Increased stagger
        >
          {methods.map((method, index) => (
            <motion.div
              key={index}
              className="group hover:bg-gray-50 p-6 rounded-lg transition-colors duration-200 hover:shadow-xl hover:scale-105"
              variants={gridItemVariants}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-200">
                  <span className="text-primary font-bold text-lg">{method.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-lg">{method.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes slow-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-slow-bounce {
          animation: slow-bounce 3s ease-in-out infinite;
        }
      `}</style>
    </motion.section>
  );
}
