import React from 'react';
import { Milestone } from 'lucide-react';

const LearningJourneyTimeline = () => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Milestone /> Learning Journey Timeline</h2>
      <p className="text-gray-400">A horizontal, scroll-snapping milestone ladder will be here.</p>
    </div>
  );
};

export default LearningJourneyTimeline; 