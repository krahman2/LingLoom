'use client';

import React from 'react';
import { Clock, Zap, Film, CalendarDays } from 'lucide-react';
import { StatCard } from './StatCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const timeData = {
    streak: 14,
    totalPracticeTime: "150 hours",
    immersionTime: "35 hours",
    dailyPractice: [
        { day: 'Mon', minutes: 30 },
        { day: 'Tue', minutes: 45 },
        { day: 'Wed', minutes: 60 },
        { day: 'Thu', minutes: 25 },
        { day: 'Fri', minutes: 50 },
        { day: 'Sat', minutes: 75 },
        { day: 'Sun', minutes: 20 },
    ]
};

const MiniStat = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string | number, label: string }) => (
    <div className="flex items-center gap-3 bg-gray-800/50 p-2 rounded-lg">
        <Icon className="h-5 w-5 text-gray-400" />
        <div>
            <p className="font-bold text-base">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
        </div>
    </div>
);


const TimeBasedStatsSection = () => {
  return (
    <StatCard title="Time-Based Stats" icon={Clock} accentColor="text-green-400">
        <div className="space-y-4">
            <p className="text-xs text-gray-400 text-center mb-2">Practice Minutes (Last 7 Days)</p>
            <ResponsiveContainer width="100%" height={120}>
                <BarChart data={timeData.dailyPractice} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                        cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                        contentStyle={{
                            backgroundColor: '#1F2937',
                            borderColor: '#374151',
                            borderRadius: '0.5rem',
                            fontSize: '0.75rem',
                        }}
                    />
                    <Bar dataKey="minutes" fill="#34D399" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <MiniStat icon={Zap} value={`${timeData.streak} days`} label="Current Streak" />
                <MiniStat icon={Clock} value={timeData.totalPracticeTime} label="Total Practice" />
            </div>
        </div>
    </StatCard>
  );
};

export default TimeBasedStatsSection; 