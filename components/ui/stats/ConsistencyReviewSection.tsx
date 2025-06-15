'use client';

import React from 'react';
import { CalendarCheck2, Percent, CheckCircle, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';

const consistencyData = {
    reviewAccuracyRate: 88,
    timeToMastery: "~3 months",
    heatmapData: Array.from({ length: 35 }, (_, i) => ({
        value: Math.floor(Math.random() * 100)
    }))
};

const HeatmapPlaceholder = () => (
    <div>
        <p className="text-xs text-gray-400 text-center mb-2">Daily Activity (Last 5 Weeks)</p>
        <div className="grid grid-cols-7 gap-1.5">
            {consistencyData.heatmapData.map((day, index) => {
                const bgOpacity = day.value / 100;
                return (
                    <div 
                        key={index}
                        className="w-full aspect-square rounded bg-primary"
                        style={{ opacity: bgOpacity }}
                        title={`Value: ${day.value}`}
                    />
                );
            })}
        </div>
    </div>
);


const ConsistencyReviewSection = () => {
  return (
    <StatCard title="Consistency & Review" icon={CalendarCheck2} accentColor="text-red-400">
        <div className="space-y-4">
            <HeatmapPlaceholder />
            <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">{consistencyData.reviewAccuracyRate}%</p>
                    <p className="text-xs text-gray-400">Review Accuracy</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold">{consistencyData.timeToMastery}</p>
                    <p className="text-xs text-gray-400">Est. Time to Mastery</p>
                </div>
            </div>
        </div>
    </StatCard>
  );
};

export default ConsistencyReviewSection; 