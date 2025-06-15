'use client';

import React from 'react';
import { Award, Star, Shield, Gem } from 'lucide-react';
import { StatCard } from './StatCard';

const gamificationData = {
    level: 12,
    currentXp: 450,
    xpToNextLevel: 1000,
    badges: ["100 Words Learned", "7-Day Streak", "1 Hour Immersion", "Grammar Guru LVL 1"],
};

const ProgressBar = ({ current, max, label }: { current: number, max: number, label: string }) => {
    const percentage = max > 0 ? (current / max) * 100 : 0;
    return (
        <div>
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <span>{label}</span>
                <span>{current} / {max} XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                    className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const GamificationAchievementsSection = () => {
  return (
    <StatCard title="Gamification & Achievements" icon={Award} accentColor="text-yellow-400">
        <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                <p className="font-bold text-base">Level {gamificationData.level}</p>
                <Gem className="h-5 w-5 text-yellow-400" />
            </div>
            <ProgressBar current={gamificationData.currentXp} max={gamificationData.xpToNextLevel} label="XP to Next Level" />
            <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Badges</h4>
                <div className="grid grid-cols-2 gap-2">
                    {gamificationData.badges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg text-xs">
                            <Shield className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                            <span>{badge}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </StatCard>
  );
};

export default GamificationAchievementsSection; 