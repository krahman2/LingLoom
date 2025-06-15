'use client';

import React from 'react';
import { BookOpen, CheckCircle, Target, BarChart, PieChart, TrendingUp, Zap, Award, Star, BrainCircuit, Calendar, Clock, AreaChart } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart } from 'recharts';
import { StatCard } from './StatCard';

const learningMetricsData = {
    totalWords: 1250,
    grammarRules: 45,
    lessonsCompleted: 120,
    fluencyScore: 75,
};

const LearningMetricsSection = () => {
  const fluencyData = [{ name: 'Fluency', value: learningMetricsData.fluencyScore, fill: '#34D399' }];

  return (
    <StatCard title="Learning Metrics" icon={BookOpen} accentColor="text-blue-400">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
        {/* Left Side: Stats Tiles */}
        <div className="space-y-4">
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{learningMetricsData.totalWords}</p>
                <p className="text-xs text-gray-400">Words Learned</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{learningMetricsData.grammarRules}</p>
                <p className="text-xs text-gray-400">Grammar Rules</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{learningMetricsData.lessonsCompleted}</p>
                <p className="text-xs text-gray-400">Lessons Done</p>
            </div>
        </div>
        {/* Right Side: Fluency Radial Chart */}
        <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-gray-300 mb-2">Fluency Score</p>
            <ResponsiveContainer width="100%" height={150}>
                <RadialBarChart 
                    innerRadius="70%" 
                    outerRadius="100%" 
                    data={fluencyData} 
                    startAngle={90} 
                    endAngle={-270}
                >
                    <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                    />
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white text-2xl font-bold"
                    >
                        {`${learningMetricsData.fluencyScore}%`}
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </StatCard>
  );
};

export default LearningMetricsSection; 