import React from 'react';
import { Globe, Hash, TrendingUp, MapPin } from 'lucide-react';

const DiscoveryTabs = () => {
  return (
    <div className="w-full bg-black/20 p-2 rounded-lg mb-4 max-w-2xl">
      <div className="flex justify-around items-center text-sm">
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-primary bg-primary/10">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">Languages</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-400 hover:text-white">
          <Hash className="h-4 w-4" />
          <span className="hidden sm:inline">Tags</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-400 hover:text-white">
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">Trending</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-400 hover:text-white">
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline">Near Me</span>
        </button>
      </div>
    </div>
  );
};

export default DiscoveryTabs; 