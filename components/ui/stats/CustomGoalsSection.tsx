'use client';

import React from 'react';
import { Target, PlusCircle } from 'lucide-react';
import { StatCard } from './StatCard';

const goals = [
  { text: "Learn 20 new food-related words", completed: true },
  { text: "Watch 30 mins of immersion content (cartoon)", completed: false },
  { text: "Complete 1 grammar lesson on past tense", completed: false },
];

const CustomGoalsSection = () => {
  return (
    <StatCard title="Custom Weekly Goals" icon={Target} accentColor="text-teal-400">
        <div className="space-y-3">
            {goals.map((goal, index) => (
              <div key={index} className="flex items-center">
                <input 
                    type="checkbox" 
                    checked={goal.completed} 
                    readOnly 
                    className="form-checkbox h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded mr-3 focus:ring-primary" 
                />
                <span className={`text-sm ${goal.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {goal.text}
                </span>
              </div>
            ))}
        </div>
        <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-4 w-full justify-center bg-primary/10 p-2 rounded-lg">
            <PlusCircle className="h-4 w-4" />
            Add Goal
        </button>
    </StatCard>
  );
};

export default CustomGoalsSection; 