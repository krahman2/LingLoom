'use client';

import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { StatCard } from './StatCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const insightsData = {
    retentionScores: [
      { category: "Vocabulary (Ch 1)", score: 92 },
      { category: "Verb Tense", score: 78 },
      { category: "Cultural Phrases", score: 85 },
    ],
    skillStrengths: [
        { subject: 'Reading', A: 80, fullMark: 100 },
        { subject: 'Writing', A: 65, fullMark: 100 },
        { subject: 'Listening', A: 90, fullMark: 100 },
        { subject: 'Speaking', A: 75, fullMark: 100 },
        { subject: 'Grammar', A: 70, fullMark: 100 },
        { subject: 'Culture', A: 95, fullMark: 100 },
    ]
};

const PersonalInsightsSection = () => {
  return (
    <StatCard title="Personal Insights" icon={BrainCircuit} accentColor="text-purple-400">
        <div className="space-y-4">
            <p className="text-xs text-gray-400 text-center mb-2">Skill Strengths</p>
            <ResponsiveContainer width="100%" height={200}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={insightsData.skillStrengths}>
                    <PolarGrid stroke="#4B5563" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#D1D5DB', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Skills" dataKey="A" stroke="#A78BFA" fill="#8B5CF6" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            
            <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Retention Scores</h4>
                <div className="space-y-2">
                {insightsData.retentionScores.map(item => (
                    <div key={item.category} className="text-xs">
                        <div className="flex justify-between text-gray-300 mb-1">
                            <span>{item.category}</span>
                            <span className={`${item.score > 80 ? 'text-green-400' : item.score > 60 ? 'text-yellow-400' : 'text-red-400'} font-semibold`}>
                                {item.score}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                                className={`${item.score > 80 ? 'bg-green-500' : item.score > 60 ? 'bg-yellow-500' : 'bg-red-500'} h-1.5 rounded-full`}
                                style={{ width: `${item.score}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </StatCard>
  );
};

export default PersonalInsightsSection; 