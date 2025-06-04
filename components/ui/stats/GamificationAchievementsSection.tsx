'use client';

import React from 'react';
import { Award, Star, TrendingUp, ShieldCheck } from 'lucide-react';

interface GamificationAchievementsProps {
  stats: {
    level: number;
    currentXp: number;
    xpToNextLevel: number;
    badges: string[];
  };
}

// Reusable StatCard (can be moved to a shared file later)
const StatCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType }>> = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center text-gray-400 mb-2">
        <Icon className="w-5 h-5 mr-2" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-white mt-auto">{children}</div>
    </div>
  );
};

const ProgressBar: React.FC<{ current: number; max: number; label: string }> = ({ current, max, label }) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
      <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
        <span>{label}</span>
        <span>{current} / {max} XP</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function GamificationAchievementsSection({ stats }: GamificationAchievementsProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center mb-6">
        <Award className="w-7 h-7 text-yellow-400 mr-3" />
        <h2 className="text-2xl font-semibold text-white">Gamification & Achievements</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <StatCard title="Current Level" icon={Star}>
          Level {stats.level}
        </StatCard>
        <ProgressBar current={stats.currentXp} max={stats.xpToNextLevel} label="XP to Next Level" />
        <div>
          <div className="flex items-center text-gray-400 mb-2">
            <ShieldCheck className="w-5 h-5 mr-2" />
            <h3 className="text-sm font-medium">Badges & Milestones</h3>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            {stats.badges.length > 0 ? (
              <ul className="space-y-2">
                {stats.badges.map((badge, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0" />
                    {badge}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No badges earned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 