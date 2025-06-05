'use client';

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

// Reusable StatCard (can be moved to a shared file later if used by many sections)
const StatCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType }>> = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col">
      <div className="flex items-center text-gray-400 mb-2">
        <Icon className="w-4 h-4 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-xl font-bold text-white">{children}</div>
    </div>
  );
};

const ChartPlaceholder: React.FC<{ title: string; chartType: string }> = ({ title, chartType }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center text-gray-400 mb-2">
        <PieChart className="w-4 h-4 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-center text-gray-500 py-8">
        <p className="text-sm">({chartType} Placeholder)</p>
        <p className="text-xs">Data for Vocabulary, Grammar, Listening, Speaking, Reading, Video watching</p>
      </div>
    </div>
  );
};

export default function TimeBasedStatsSection({ stats }: TimeBasedStatsProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center mb-6">
        <Clock className="w-6 h-6 text-blue-400 mr-3" />
        <h2 className="text-xl font-semibold text-white">Time-Based Stats</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </div>
  );
} 