'use client';

import { motion } from 'framer-motion'; // Added framer-motion
import LearningMetricsSection from './stats/LearningMetricsSection';
import TimeBasedStatsSection from './stats/TimeBasedStatsSection';
import ConsistencyReviewSection from './stats/ConsistencyReviewSection';
import GamificationAchievementsSection from './stats/GamificationAchievementsSection';
import PersonalInsightsSection from './stats/PersonalInsightsSection';
import CustomGoalsSection from './stats/CustomGoalsSection';
import { cn } from "@/lib/utils"; // Assuming you use shadcn's cn utility

// Placeholder data for demonstration
const placeholderStats = {
  learningMetrics: {
    totalWordsLearned: 1250,
    wordsByOption: "Grouped by Noun, Verb, Adjective",
    grammarRulesCompleted: 45,
    lessonsCompleted: 120,
    fluencyScore: 75,
  },
  timeBasedStats: {
    streak: 14,
    totalPracticeTime: "150 hours",
    immersionTime: "35 hours",
    avgDailyPracticeTime: "45 mins/day",
    avgDailyPracticeTimePeriod: "last 30 days",
  },
  consistencyReview: {
    reviewAccuracyRate: 88,
    timeToMastery: "~3 months",
  },
  gamification: {
    level: 12,
    currentXp: 450,
    xpToNextLevel: 1000,
    badges: ["100 Words Learned", "7-Day Streak", "1 Hour Immersion", "Grammar Guru LVL 1"],
  },
  personalInsights: {
    retentionScores: [
      { category: "Vocabulary (Chapter 1)", score: 92 },
      { category: "Verb Conjugation (Present Tense)", score: 78 },
      { category: "Cultural Phrases", score: 85 },
    ],
    customGoals: [
      { text: "Learn 20 new food-related words", completed: true },
      { text: "Watch 30 mins of immersion content (cartoon)", completed: false },
      { text: "Complete 1 grammar lesson on past tense", completed: false },
    ],
    topStrugglingWords: [
      { word: "Ephemeral", attempts: 10, correct: 3 },
      { word: "Ubiquitous", attempts: 8, correct: 2 },
      { word: "Serendipity", attempts: 12, correct: 5 },
    ]
  }
  // Add more placeholder data as needed for other sections
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // Stagger delay
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)", // Enhanced shadow for dark bg
    transition: { duration: 0.3 }
  }
};

export default function StatsDashboard() {
  return (
    <div className="w-full mt-8 px-4 md:px-6">
      {/* Use flex-row on xl screens with larger-width columns and proper spacing */}
      <section className="flex flex-col xl:flex-row gap-y-6 xl:gap-x-8 xl:justify-center">
        {/* Column 1 - Larger width constraint */}
        <div className="flex-1 xl:max-w-lg flex flex-col gap-4">
          <LearningMetricsSection stats={placeholderStats.learningMetrics} />
          <TimeBasedStatsSection stats={placeholderStats.timeBasedStats} />
        </div>
        {/* Column 2 - Larger width constraint */}
        <div className="flex-1 xl:max-w-lg flex flex-col gap-4">
          <ConsistencyReviewSection stats={placeholderStats.consistencyReview} />
          <GamificationAchievementsSection stats={placeholderStats.gamification} />
        </div>
        {/* Column 3 - Larger width constraint */}
        <div className="flex-1 xl:max-w-lg flex flex-col gap-4">
          <PersonalInsightsSection stats={placeholderStats.personalInsights} />
          {/* Removed duplicate CustomGoalsSection to keep dashboard compact */}
        </div>
      </section>
    </div>
  );
} 