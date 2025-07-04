'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { CalendarDays, BarChart3, CheckCircle, TrendingUp, Target, Calendar, BarChart, Clock } from 'lucide-react';

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

// Updated ChartPlaceholder
const ChartPlaceholder: React.FC<{ title: string; chartType: string; description?: string }> = ({ title, chartType, description }) => {
  return (
    <motion.div 
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 h-full flex flex-col"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center text-gray-400 mb-1.5">
        {chartType === "Heatmap Calendar" && <CalendarDays className="w-4 h-4 mr-2" />}
        {chartType === "Bar Graph" && <BarChart3 className="w-4 h-4 mr-2" />}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="text-center text-gray-500 py-4 flex-grow flex flex-col justify-center items-center">
        <p className="text-sm">({chartType} Placeholder)</p>
        {description && <p className="text-xs mt-1">{description}</p>}
      </div>
    </motion.div>
  );
};

export default function ConsistencyReviewSection({ stats }: ConsistencyReviewProps) {
  return (
    <motion.div 
      className="bg-gray-900 border border-gray-700 rounded-xl p-4 w-full"
      variants={sectionVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center mb-3">
        <Target className="w-5 h-5 text-green-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Consistency & Review</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Heatmap Calendar */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Practice Calendar</h3>
          <div className="flex items-center justify-center h-24 text-gray-500">
            <Calendar className="w-6 h-6 mr-2" />
            <span className="text-sm">Heatmap Calendar</span>
          </div>
        </div>
        
        {/* Bar Graph */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Weekly Progress</h3>
          <div className="flex items-center justify-center h-24 text-gray-500">
            <BarChart className="w-6 h-6 mr-2" />
            <span className="text-sm">Bar Graph</span>
          </div>
        </div>
        
        {/* Review Accuracy */}
        <motion.div 
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-col"
          variants={interactiveElementVariants}
          initial="initial"
          whileHover="hover"
          whileTap="hover"
        >
          <div className="flex items-center text-gray-400 mb-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            <h3 className="text-sm font-medium">Review Accuracy</h3>
          </div>
          <div className="text-lg font-bold text-white">{stats.reviewAccuracyRate}%</div>
        </motion.div>
        
        {/* Time to Mastery */}
        <motion.div 
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-col"
          variants={interactiveElementVariants}
          initial="initial"
          whileHover="hover"
          whileTap="hover"
        >
          <div className="flex items-center text-gray-400 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            <h3 className="text-sm font-medium">Time to Mastery</h3>
          </div>
          <div className="text-lg font-bold text-white">{stats.timeToMastery}</div>
        </motion.div>
      </div>
    </motion.div>
  );
} 