"use client";
// components/ui/Footer.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const footerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut", staggerChildren: 0.25 },
  },
};

const footerItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <motion.footer
      className="bg-black text-white px-6 py-12 md:py-16 border-t border-gray-700"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Column 1: Logo, Tagline, Button */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left"
          variants={footerItemVariants}
        >
          <motion.div className="mb-3 flex items-center gap-2" variants={footerItemVariants}>
            <Image
              src="/images/logo.png"
              alt="LingLoom Logo"
              width={24}
              height={24}
            />
            <span className="font-semibold text-lg">LingLoom</span>
          </motion.div>

          <motion.h2 className="text-xl font-bold mb-2" variants={footerItemVariants}>Fast Track to Fluency</motion.h2>
          <motion.p className="text-sm text-gray-300 mb-4 max-w-sm" variants={footerItemVariants}>
            Every exercise is timed, ordered, and repeated according to the latest neuroscience, so 30 minutes a day compounds into real-world fluency faster than any single-method app.
          </motion.p>

          <motion.div variants={footerItemVariants}>
            <Button
              size="sm"
              className="bg-transparent border border-accent text-accent hover:bg-accent/10"
            >
              APP COMING SOON
            </Button>
          </motion.div>
        </motion.div>

        {/* Column 2: Explore + Social Links */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left gap-6"
          variants={footerItemVariants}
        >
          <motion.div variants={footerItemVariants}>
            <h3 className="font-semibold mb-2 text-sm text-white">Explore</h3>
            <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
              <Link href="/about">About</Link>
              <Link href="/mission">Mission</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/approach">Approach</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </motion.div>

          <motion.div variants={footerItemVariants}>
            <h3 className="font-semibold mb-2 text-sm text-white">Social</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 justify-center md:justify-start">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">TikTok</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">YouTube</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
