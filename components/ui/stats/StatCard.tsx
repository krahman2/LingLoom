import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  icon: LucideIcon;
  accentColor?: string;
  children: React.ReactNode;
  className?: string;
}

export const StatCard = ({ title, icon: Icon, accentColor = 'text-primary', children, className }: StatCardProps) => {
  return (
    <div className={cn("rounded-2xl border border-gray-800 bg-gray-900/50 p-4 sm:p-5 shadow-lg h-full flex flex-col", className)}>
      <header className="flex items-center gap-3 mb-4">
        <Icon className={cn("h-5 w-5", accentColor)} />
        <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
      </header>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}; 