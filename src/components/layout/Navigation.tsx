
import React from 'react';
import { Calendar, Clock, Archive, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Clock, label: 'Dashboard', path: '/' },
    { icon: Zap, label: 'Events', path: '/events' },
    { icon: Calendar, label: 'Reminders', path: '/reminders' },
    { icon: Archive, label: 'Archive', path: '/archive' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-3">
        <div className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
