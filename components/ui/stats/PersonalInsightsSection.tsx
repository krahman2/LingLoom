'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { User, Activity, TrendingDown, TrendingUp, Goal, Edit3, PlusCircle, ShieldQuestion, HelpCircle } from 'lucide-react';

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
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col h-full"
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
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-full flex flex-col"
      variants={interactiveElementVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center text-gray-400 mb-2">
        <Activity className="w-4 h-4 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-center text-gray-500 py-8 flex-grow flex flex-col justify-center items-center">
        <p className="text-xs">({chartType} Placeholder)</p>
        {description && <p className="text-xs mt-1">{description}</p>}
      </div>
    </motion.div>
  );
};

export default function PersonalInsightsSection({ stats }: PersonalInsightsProps) {
  return (
    <motion.div 
      className="bg-gray-900 border border-gray-800 rounded-xl p-4 w-full h-full"
      variants={sectionVariants}
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <div className="flex items-center mb-4">
        <User className="w-5 h-5 text-green-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Personal Insights</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <ChartPlaceholder 
          title="Strengths & Weaknesses" 
          chartType="Radar/Spider Chart" 
          description="Based on Reading, Listening, Speaking, Grammar, Vocabulary"
        />
        <div>
          <div className="flex items-center text-gray-400 mb-2">
            <ShieldQuestion className="w-4 h-4 mr-1.5" />
            <h3 className="text-xs font-medium">Retention Score per Category</h3>
          </div>
          <motion.div 
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2"
            variants={interactiveElementVariants}
            initial="initial"
            whileHover="hover"
            whileTap="hover"
          >
            {stats.retentionScores.map(item => (
              <div key={item.category} className="text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>{item.category}</span>
                  <span className={`${item.score > 80 ? 'text-green-400' : item.score > 60 ? 'text-yellow-400' : 'text-red-400'} font-semibold`}>
                    {item.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1.5">
                  <div 
                    className={`${item.score > 80 ? 'bg-green-500' : item.score > 60 ? 'bg-yellow-500' : 'bg-red-500'} h-1.5 rounded-full`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div>
          <div className="flex items-center text-gray-400 mb-2">
            <HelpCircle className="w-4 h-4 mr-1.5" />
            <h3 className="text-xs font-medium">Top Words You Struggle With</h3>
          </div>
          <motion.div 
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
            variants={interactiveElementVariants}
            initial="initial"
            whileHover="hover"
            whileTap="hover"
          >
            {stats.topStrugglingWords.length > 0 ? (
              <ul className="space-y-1.5">
                {stats.topStrugglingWords.map((item, index) => (
                  <li key={index} className="text-xs text-gray-300 flex justify-between items-center">
                    <span>{item.word}</span>
                    <span className="text-xs text-gray-500">
                      ({item.correct}/{item.attempts} correct)
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500">No specific struggling words identified yet.</p>
            )}
          </motion.div>
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <div className="flex items-center">
              <Goal className="w-4 h-4 mr-1.5" />
              <h3 className="text-xs font-medium">Custom Weekly Goals</h3>
            </div>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center">
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Goal
            </button>
          </div>
          <motion.div 
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-1.5"
            variants={interactiveElementVariants}
            initial="initial"
            whileHover="hover"
            whileTap="hover"
          >
            {stats.customGoals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <input type="checkbox" checked={goal.completed} readOnly className="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded mr-1.5 focus:ring-blue-600" />
                  <span className={`${goal.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>{goal.text}</span>
                </div>
                {!goal.completed && (
                  <button className="text-xs text-gray-500 hover:text-gray-400">
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 