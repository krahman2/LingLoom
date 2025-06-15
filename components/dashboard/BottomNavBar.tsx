import React from 'react';
import { BarChart2, Zap, User } from 'lucide-react';
import Link from 'next/link';

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/50 backdrop-blur-sm border-t border-gray-800 z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <Link href="/progress" className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
          <BarChart2 className="h-6 w-6 mb-1" />
          <span className="text-xs">Progress</span>
        </Link>
        <button className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
          <Zap className="h-6 w-6 mb-1 text-yellow-400" />
          <span className="text-xs">14 Day Streak</span>
        </button>
        <Link href="/profile" className="flex flex-col items-center text-gray-300 hover:text-white transition-colors">
          <User className="h-6 w-6 mb-1" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar; 