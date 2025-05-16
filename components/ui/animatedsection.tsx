"use client";

import { motion } from "framer-motion";

export default function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  speed = 1.2,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  speed?: number;
}) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: speed, delay },
    },
  };

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {children}
    </motion.section>
  );
}
