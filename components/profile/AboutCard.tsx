import React from 'react';
import { Info } from 'lucide-react';

const AboutCard = () => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Info /> About & Links</h2>
      <p className="text-gray-400">User bio and social links will be here.</p>
    </div>
  );
};
export default AboutCard; 