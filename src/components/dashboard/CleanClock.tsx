
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CleanClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Main Clock */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse" />
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Clock className="w-12 h-12 text-cyan-400" />
            <div className="text-6xl md:text-8xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wider">
              {formatTime(time)}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl md:text-2xl text-slate-300 font-light">
              {formatDate(time)}
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Welcome to Your Day
        </h2>
        <p className="text-slate-400 text-base md:text-lg">
          Ready to organize your time with style
        </p>
      </div>
    </div>
  );
};
