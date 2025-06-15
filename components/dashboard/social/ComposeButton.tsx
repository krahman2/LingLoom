import React from 'react';
import { Plus } from 'lucide-react';

const ComposeButton = () => {
  return (
    <button className="fixed bottom-24 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 z-50">
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default ComposeButton; 