'use client';

import { Brain, BookOpen, CheckSquare, Percent, Hash } from 'lucide-react';

interface LearningMetricsProps {
  stats: {
    totalWordsLearned: number;
    wordsByOption: string;
    grammarRulesCompleted: number;
    lessonsCompleted: number;
    fluencyScore: number;
  };
}

const StatCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType }>> = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-col">
      <div className="flex items-center text-gray-400 mb-1.5">
        <Icon className="w-3 h-3 mr-2" />
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <div className="text-lg font-bold text-white">{children}</div>
    </div>
  );
};

export default function LearningMetricsSection({ stats }: LearningMetricsProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
      <div className="flex items-center mb-4">
        <Brain className="w-5 h-5 text-purple-400 mr-2" />
        <h2 className="text-lg font-semibold text-white">Learning Metrics</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatCard title="Total Words Learned" icon={Hash}>
          {stats.totalWordsLearned}
          <p className="text-xs text-gray-500 mt-1 font-normal">{stats.wordsByOption}</p>
        </StatCard>
        <StatCard title="Grammar Rules Completed" icon={CheckSquare}>
          {stats.grammarRulesCompleted}
        </StatCard>
        <StatCard title="Lessons Completed" icon={BookOpen}>
          {stats.lessonsCompleted}
        </StatCard>
        <StatCard title="Fluency Score" icon={Percent}>
          {stats.fluencyScore}%
        </StatCard>
      </div>
    </div>
  );
} 