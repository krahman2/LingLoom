'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Zap, Clock, Film, PieChart, CalendarClock } from 'lucide-react';

interface TimeBasedStatsProps {
  stats: {
    streak: number;
    totalPracticeTime: string;
    immersionTime: string;
    avgDailyPracticeTime: string;
    avgDailyPracticeTimePeriod?: string;
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

// Updated StatCard to use motion
const StatCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType }>> = ({ title, icon: Icon, children }) => {
  return (
    <motion.div 
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-col"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center text-gray-400 mb-1.5">
        <Icon className="w-3 h-3 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-lg font-bold text-white">{children}</div>
    </motion.div>
  );
};

// Updated ChartPlaceholder to use motion
const ChartPlaceholder: React.FC<{ title: string; chartType: string }> = ({ title, chartType }) => {
  return (
    <motion.div 
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center text-gray-400 mb-1.5">
        <PieChart className="w-3 h-3 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-center text-gray-500 py-6">
        <p className="text-xs">({chartType} Placeholder)</p>
        <p className="text-xs mt-1">Data for Vocabulary, Grammar, Listening, Speaking, Reading, Video watching</p>
      </div>
    </motion.div>
  );
};

export default function TimeBasedStatsSection({ stats }: TimeBasedStatsProps) {
  return (
    <motion.div 
      className="bg-gray-900 border border-gray-800 rounded-xl p-3 w-full h-full"
      variants={sectionVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-blue-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Time-Based Stats</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatCard title="Streak (Consecutive Days)" icon={Zap}>
          {stats.streak} days
        </StatCard>
        <StatCard title="Total Practice Time" icon={Clock}>
          {stats.totalPracticeTime}
        </StatCard>
        <StatCard title="Immersion Time" icon={Film}>
          {stats.immersionTime}
        </StatCard>
        <StatCard title="Average Daily Practice" icon={CalendarClock}>
          {stats.avgDailyPracticeTime}
          {stats.avgDailyPracticeTimePeriod && 
            <p className="text-xs text-gray-500 mt-1 font-normal">({stats.avgDailyPracticeTimePeriod})</p>
          }
        </StatCard>
        <div className="sm:col-span-2">
          <ChartPlaceholder title="Time Breakdown" chartType="Pie Chart" />
        </div>
      </div>
    </motion.div>
  );
} 