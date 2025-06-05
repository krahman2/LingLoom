'use client';

import React from 'react';
import { CalendarDays, BarChart3, CheckCircle, TrendingUp, Target } from 'lucide-react';

interface ConsistencyReviewProps {
  stats: {
    reviewAccuracyRate: number;
    timeToMastery: string;
  };
}

// Reusable StatCard (can be moved to a shared file later)
const StatCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType }>> = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-col h-full">
      <div className="flex items-center text-gray-400 mb-1.5">
        <Icon className="w-3 h-3 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-lg font-bold text-white mt-auto">{children}</div>
    </div>
  );
};

const ChartPlaceholder: React.FC<{ title: string; chartType: string; description?: string }> = ({ title, chartType, description }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 h-full flex flex-col">
      <div className="flex items-center text-gray-400 mb-1.5">
        {chartType === "Heatmap Calendar" && <CalendarDays className="w-3 h-3 mr-2" />}
        {chartType === "Bar Graph" && <BarChart3 className="w-3 h-3 mr-2" />}
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-center text-gray-500 py-6 flex-grow flex flex-col justify-center items-center">
        <p className="text-xs">({chartType} Placeholder)</p>
        {description && <p className="text-xs mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default function ConsistencyReviewSection({ stats }: ConsistencyReviewProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
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
    </div>
  );
} 