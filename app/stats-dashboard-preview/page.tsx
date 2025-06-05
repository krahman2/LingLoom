'use client';

import StatsDashboard from '@/components/ui/StatsDashboard';

export default function StatsDashboardPreviewPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-100">Your Progress Dashboard</h1>
        <StatsDashboard />
      </main>
    </div>
  );
} 