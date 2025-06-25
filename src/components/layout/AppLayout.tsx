import React from 'react';
import { Navigation } from './Navigation';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    {/* Glassy background overlay */}
    <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl z-0 pointer-events-none" />
    <header className="h-16 flex items-center px-6 bg-white/20 backdrop-blur-lg border-b border-white/20 shadow-xl sticky top-0 z-40">
      <span className="text-2xl font-bold text-white tracking-wide font-display">MultiTask</span>
      <div className="ml-auto flex items-center gap-4">
        {/* User avatar or quick actions here */}
      </div>
    </header>
    <div className="flex flex-1 relative z-10">
      <Navigation />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </div>
);
