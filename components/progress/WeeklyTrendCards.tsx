import React from 'react';
import { TrendingUp } from 'lucide-react';

const WeeklyTrendCards = () => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingUp /> Weekly Trend Cards</h2>
      <p className="text-gray-400">Cards for XP trends, session length, and retention will be here.</p>
    </div>
  );
};

export default WeeklyTrendCards; 