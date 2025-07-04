'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Award, Star, ShieldCheck, Trophy } from 'lucide-react';

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
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 flex flex-col h-full"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center text-gray-400 mb-1.5">
        <Icon className="w-4 h-4 mr-2" />
        <h3 className="text-sm font-medium">{title}</h3>
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
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-2"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
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
      className="bg-gray-900 border border-gray-700 rounded-xl p-4 w-full"
      variants={sectionVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center mb-3">
        <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Gamification & Achievements</h2>
      </div>
      <div className="space-y-4">
        {/* Current Level */}
        <motion.div 
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-col"
          variants={interactiveElementVariants}
          initial="initial"
          whileHover="hover"
          whileTap="hover"
        >
          <div className="flex items-center text-gray-400 mb-2">
            <Star className="w-4 h-4 mr-2" />
            <h3 className="text-sm font-medium">Current Level</h3>
          </div>
          <div className="text-lg font-bold text-white">Level {stats.level}</div>
        </motion.div>
        
        {/* XP Progress */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">XP Progress</h3>
            <span className="text-xs text-gray-500">{stats.currentXp}/{stats.xpToNextLevel}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(stats.currentXp / stats.xpToNextLevel) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Badges */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Badges</h3>
          <div className="space-y-2">
            {stats.badges.slice(0, 3).map((badge, index) => (
              <div key={index} className="flex items-center text-gray-300">
                <Award className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 