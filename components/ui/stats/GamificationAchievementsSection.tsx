'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Award, Star, ShieldCheck } from 'lucide-react';

interface GamificationAchievementsProps {
  stats: {
    level: number;
    currentXp: number;
    xpToNextLevel: number;
    badges: string[];
  };
}

const sectionVariants = {
  initial: {
    borderColor: "rgba(71, 85, 105, 0.5)", 
  },
  hover: {
    scale: 1.02,
    borderColor: 'rgba(100, 116, 139, 0.7)',
    transition: { duration: 0.2, ease: "easeOut" },
  }
};

const interactiveElementVariants = {
  initial: {
    y: 0,
    backgroundColor: "rgba(31, 41, 55, 0.5)",
  },
  hover: {
    y: -4, 
    backgroundColor: 'rgba(55, 65, 81, 0.7)',
    transition: { duration: 0.2, ease: "easeOut" },
  }
};

// Updated StatCard
const StatCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType }>> = ({ title, icon: Icon, children }) => {
  return (
    <motion.div 
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-col h-full"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center text-gray-400 mb-1.5">
        <Icon className="w-3 h-3 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-lg font-bold text-white mt-auto">{children}</div>
    </motion.div>
  );
};

// Updated ProgressBar
const ProgressBar: React.FC<{ current: number; max: number; label: string }> = ({ current, max, label }) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;
  return (
    <motion.div 
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{current} / {max} XP</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </motion.div>
  );
};

export default function GamificationAchievementsSection({ stats }: GamificationAchievementsProps) {
  return (
    <motion.div 
      className="bg-gray-900 border border-gray-800 rounded-xl p-3 w-full h-full"
      variants={sectionVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center mb-4">
        <Award className="w-5 h-5 text-yellow-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Gamification & Achievements</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatCard title="Current Level" icon={Star}>
          Level {stats.level}
        </StatCard>
        <ProgressBar current={stats.currentXp} max={stats.xpToNextLevel} label="XP to Next Level" />
        <div className="sm:col-span-2">
          <div className="flex items-center text-gray-400 mb-1.5">
            <ShieldCheck className="w-3 h-3 mr-1.5" />
            <h3 className="text-xs font-medium">Badges & Milestones</h3>
          </div>
          <motion.div 
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"
            variants={interactiveElementVariants}
            initial="initial"
            whileHover="hover"
            whileTap="hover"
          >
            {stats.badges.length > 0 ? (
              <ul className="space-y-1.5">
                {stats.badges.map((badge, index) => (
                  <li key={index} className="text-xs text-gray-300 flex items-center">
                    <Award className="w-3 h-3 mr-1.5 text-yellow-500 flex-shrink-0" />
                    {badge}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500">No badges earned yet.</p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 