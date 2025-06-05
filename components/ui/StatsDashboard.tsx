'use client';

// Removed useState as it's no longer needed for an internal carousel
import LearningMetricsSection from './stats/LearningMetricsSection';
import TimeBasedStatsSection from './stats/TimeBasedStatsSection';
import ConsistencyReviewSection from './stats/ConsistencyReviewSection';
import GamificationAchievementsSection from './stats/GamificationAchievementsSection';
import PersonalInsightsSection from './stats/PersonalInsightsSection';
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

export default function StatsDashboard() {
  // Removed activeIndex, sections array, and ActiveSection logic

  return (
    <div className="w-full">
      {/* <h2 className="text-3xl font-bold text-center mb-8 text-white">Your Progress Dashboard</h2> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
        <div className="flex flex-col gap-6">
          <div className="flex-1 flex items-start justify-center">
            <LearningMetricsSection stats={placeholderStats.learningMetrics} />
          </div>
          <div className="flex-1 flex items-start justify-center">
            <TimeBasedStatsSection stats={placeholderStats.timeBasedStats} />
          </div>
        </div>

        <div className="flex flex-col gap-0">
          <div className="flex-1 flex items-start justify-center">
            <ConsistencyReviewSection stats={placeholderStats.consistencyReview} />
          </div>
          <div className="flex-1 flex items-start justify-center">
            <GamificationAchievementsSection stats={placeholderStats.gamification} />
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col">
          <div className="flex-1 flex items-start justify-center">
            <PersonalInsightsSection stats={placeholderStats.personalInsights} />
          </div>
        </div>
      </div>
    </div>
  );
} 