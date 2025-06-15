import React from 'react';
import { Settings } from 'lucide-react';

const LearningPreferencesCard = () => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Settings /> Learning Preferences</h2>
      <p className="text-gray-400">Settings for daily goals, reminders, and languages will be here.</p>
    </div>
  );
};
export default LearningPreferencesCard; 