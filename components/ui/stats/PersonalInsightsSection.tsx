'use client';

import React from 'react';
import { User, Activity, TrendingDown, TrendingUp, Goal, Edit3, PlusCircle, ShieldQuestion, HelpCircle } from 'lucide-react';

interface PersonalInsightsProps {
  stats: {
    retentionScores: { category: string; score: number }[];
    customGoals: { text: string; completed: boolean }[];
    topStrugglingWords: { word: string; attempts: number; correct: number }[];
  };
}

// Reusable StatCard (can be moved to a shared file later)
const StatCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType }>> = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center text-gray-400 mb-2">
        <Icon className="w-4 h-4 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-base font-semibold text-white mt-auto">{children}</div>
    </div>
  );
};

const ChartPlaceholder: React.FC<{ title: string; chartType: string; description?: string }> = ({ title, chartType, description }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center text-gray-400 mb-2">
        <Activity className="w-4 h-4 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-center text-gray-500 py-8 flex-grow flex flex-col justify-center items-center">
        <p className="text-sm">({chartType} Placeholder)</p>
        {description && <p className="text-xs mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default function PersonalInsightsSection({ stats }: PersonalInsightsProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-green-400 mr-3" />
        <h2 className="text-xl font-semibold text-white">Personal Insights</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <ChartPlaceholder 
          title="Strengths & Weaknesses" 
          chartType="Radar/Spider Chart" 
          description="Based on Reading, Listening, Speaking, Grammar, Vocabulary"
        />
        <div>
          <div className="flex items-center text-gray-400 mb-2">
            <ShieldQuestion className="w-4 h-4 mr-2" />
            <h3 className="text-xs font-medium">Retention Score per Category</h3>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2">
            {stats.retentionScores.map(item => (
              <div key={item.category} className="text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>{item.category}</span>
                  <span className={`${item.score > 80 ? 'text-green-400' : item.score > 60 ? 'text-yellow-400' : 'text-red-400'} font-semibold`}>
                    {item.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                  <div 
                    className={`${item.score > 80 ? 'bg-green-500' : item.score > 60 ? 'bg-yellow-500' : 'bg-red-500'} h-1.5 rounded-full`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center text-gray-400 mb-2">
            <HelpCircle className="w-4 h-4 mr-2" />
            <h3 className="text-xs font-medium">Top Words You Struggle With</h3>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            {stats.topStrugglingWords.length > 0 ? (
              <ul className="space-y-1">
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
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <div className="flex items-center">
              <Goal className="w-4 h-4 mr-2" />
              <h3 className="text-xs font-medium">Custom Weekly Goals</h3>
            </div>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center">
              <PlusCircle className="w-3 h-3 mr-1" /> Add Goal
            </button>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-1">
            {stats.customGoals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <input type="checkbox" checked={goal.completed} readOnly className="form-checkbox h-3 w-3 text-blue-500 bg-gray-700 border-gray-600 rounded mr-2 focus:ring-blue-600" />
                  <span className={`${goal.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>{goal.text}</span>
                </div>
                {!goal.completed && (
                  <button className="text-xs text-gray-500 hover:text-gray-400">
                    <Edit3 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 