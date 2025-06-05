'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { CalendarDays, BarChart3, CheckCircle, TrendingUp, Target } from 'lucide-react';

interface ConsistencyReviewProps {
  stats: {
    reviewAccuracyRate: number;
    timeToMastery: string;
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

// Updated ChartPlaceholder
const ChartPlaceholder: React.FC<{ title: string; chartType: string; description?: string }> = ({ title, chartType, description }) => {
  return (
    <motion.div 
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 h-full flex flex-col"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center text-gray-400 mb-1.5">
        {chartType === "Heatmap Calendar" && <CalendarDays className="w-3 h-3 mr-2" />}
        {chartType === "Bar Graph" && <BarChart3 className="w-3 h-3 mr-2" />}
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-center text-gray-500 py-6 flex-grow flex flex-col justify-center items-center">
        <p className="text-xs">({chartType} Placeholder)</p>
        {description && <p className="text-xs mt-1">{description}</p>}
      </div>
    </motion.div>
  );
};

export default function ConsistencyReviewSection({ stats }: ConsistencyReviewProps) {
  return (
    <motion.div 
      className="bg-gray-900 border border-gray-800 rounded-xl p-3 w-full h-full"
      variants={sectionVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center mb-4">
        <Target className="w-5 h-5 text-red-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Consistency & Review</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ChartPlaceholder title="Heatmap Calendar" chartType="Heatmap Calendar" description="Daily activity streaks" />
        <ChartPlaceholder title="Days Practiced per Week/Month" chartType="Bar Graph" />
        <StatCard title="Review Accuracy Rate" icon={CheckCircle}>
          {stats.reviewAccuracyRate}%
        </StatCard>
        <StatCard title="Time to Mastery (Estimate)" icon={TrendingUp}>
          {stats.timeToMastery}
        </StatCard>
      </div>
    </motion.div>
  );
} 