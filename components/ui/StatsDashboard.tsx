'use client';

import { useState } from 'react';
import LearningMetricsSection from './stats/LearningMetricsSection';
import TimeBasedStatsSection from './stats/TimeBasedStatsSection';
import ConsistencyReviewSection from './stats/ConsistencyReviewSection';
import GamificationAchievementsSection from './stats/GamificationAchievementsSection';
import PersonalInsightsSection from './stats/PersonalInsightsSection';

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
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    { Component: GamificationAchievementsSection, props: { stats: placeholderStats.gamification }, name: "Gamification" },
    { Component: PersonalInsightsSection, props: { stats: placeholderStats.personalInsights }, name: "Personal Insights" },
    { Component: LearningMetricsSection, props: { stats: placeholderStats.learningMetrics }, name: "Learning Metrics" },
    { Component: TimeBasedStatsSection, props: { stats: placeholderStats.timeBasedStats }, name: "Time-Based Stats" },
    { Component: ConsistencyReviewSection, props: { stats: placeholderStats.consistencyReview }, name: "Consistency & Review" },
  ];

  const ActiveSection = sections[activeIndex].Component;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mb-6 min-h-[400px] flex items-center justify-center">
        {/* This div will ensure that there's some space even if a section is small, and centers the content */}
        <ActiveSection {...sections[activeIndex].props} />
      </div>
      <div className="flex space-x-2">
        {sections.map((section, index) => (
          <button
            key={section.name}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${section.name} section`}
            className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary transition-colors
              ${activeIndex === index ? 'bg-primary' : 'bg-gray-600 hover:bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
} 