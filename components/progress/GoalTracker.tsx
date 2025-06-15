import React from 'react';
import { Target } from 'lucide-react';

const GoalTracker = () => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Target /> Goal Tracker</h2>
      <p className="text-gray-400">A tracker for custom weekly goals with progress bars will be here.</p>
    </div>
  );
};

export default GoalTracker; 