'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { User, Activity, TrendingDown, TrendingUp, Goal, Edit3, PlusCircle, ShieldQuestion, HelpCircle, Brain, Target, Edit } from 'lucide-react';

interface PersonalInsightsProps {
  stats: {
    retentionScores: { category: string; score: number }[];
    customGoals: { text: string; completed: boolean }[];
    topStrugglingWords: { word: string; attempts: number; correct: number }[];
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

// Updated StatCard (currently unused in layout but updated for consistency)
const StatCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType }>> = ({ title, icon: Icon, children }) => {
  return (
    <motion.div 
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 h-full flex flex-col"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center text-gray-400 mb-2">
        <Icon className="w-4 h-4 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-base font-semibold text-white mt-auto">{children}</div>
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
      <div className="flex items-center text-gray-400 mb-2">
        <Activity className="w-4 h-4 mr-2" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="text-center text-gray-500 py-6 flex-grow flex flex-col justify-center items-center">
        <p className="text-sm">({chartType} Placeholder)</p>
        {description && <p className="text-xs mt-1">{description}</p>}
      </div>
    </motion.div>
  );
};

export default function PersonalInsightsSection({ stats }: PersonalInsightsProps) {
  return (
    <motion.div 
      className="bg-gray-900 border border-gray-700 rounded-xl p-4 w-full"
      variants={sectionVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center mb-3">
        <Brain className="w-5 h-5 text-purple-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Personal Insights</h2>
      </div>
      <div className="space-y-4">
        {/* Radar Chart */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Strengths & Weaknesses</h3>
          <div className="flex items-center justify-center h-32 text-gray-500">
            <Target className="w-8 h-8 mr-2" />
            <span className="text-sm">Radar Chart Placeholder</span>
          </div>
        </div>
        
        {/* Retention Scores */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Retention Scores</h3>
          <div className="space-y-2">
            {stats.retentionScores.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.category}</span>
                  <span className="text-gray-400">{item.score}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Struggling Words */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Top Struggling Words</h3>
          <div className="space-y-2">
            {stats.topStrugglingWords.map((word, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{word.word}</span>
                <span className="text-gray-500">{word.correct}/{word.attempts}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Custom Weekly Goals */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Weekly Goals</h3>
            <button className="text-xs text-blue-400 hover:text-blue-300">
              <Edit className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {stats.customGoals.map((goal, index) => (
              <div key={index} className="flex items-center text-sm">
                <input 
                  type="checkbox" 
                  checked={goal.completed}
                  className="mr-2 w-3 h-3 rounded border-gray-600 bg-gray-700 text-blue-500"
                  readOnly
                />
                <span className={`${goal.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                  {goal.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 