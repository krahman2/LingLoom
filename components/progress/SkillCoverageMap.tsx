import React from 'react';
import { PieChart, GitBranch } from 'lucide-react';

const SkillCoverageMap = () => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><PieChart /> Skill Coverage Map</h2>
      <p className="text-gray-400">Donut rings and heat-maps showing skill distribution and strength will be here.</p>
    </div>
  );
};

export default SkillCoverageMap; 