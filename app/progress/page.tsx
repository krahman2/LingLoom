'use client';
import React from 'react';
import LearningJourneyTimeline from '@/components/progress/LearningJourneyTimeline';
import SkillCoverageMap from '@/components/progress/SkillCoverageMap';
import WeeklyTrendCards from '@/components/progress/WeeklyTrendCards';
import GoalTracker from '@/components/progress/GoalTracker';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
        <div className="absolute top-4 left-4 z-10">
            <Link href="/dashboard">
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-black/50 p-2 rounded-md">
                    <ArrowLeft className="h-5 w-5" />
                    Back to Dashboard
                </button>
            </Link>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col gap-6 pt-16">
            <h1 className="text-4xl font-extrabold text-center mb-4">Your Progress 📈</h1>
            <LearningJourneyTimeline />
            <SkillCoverageMap />
            <WeeklyTrendCards />
            <GoalTracker />
        </div>
    </div>
  );
} 