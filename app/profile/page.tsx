'use client';
import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import QuickStatsRibbon from '@/components/profile/QuickStatsRibbon';
import AboutCard from '@/components/profile/AboutCard';
import LearningPreferencesCard from '@/components/profile/LearningPreferencesCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
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
            <ProfileHeader />
            <div className="pt-12">
                <QuickStatsRibbon />
            </div>
            <AboutCard />
            <LearningPreferencesCard />
        </div>
    </div>
  );
} 