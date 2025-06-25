import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Bell, Archive, User, Home } from 'lucide-react';

export const Navigation: React.FC = () => (
  <nav className="w-20 bg-white/20 backdrop-blur-lg border-r border-white/20 shadow-xl flex flex-col items-center py-8 space-y-8 min-h-screen">
    <NavLink to="/" className={({ isActive }) => `transition-transform duration-200 font-display ${isActive ? 'scale-110 text-cyan-400' : 'text-white hover:text-cyan-400 hover:scale-105'}`} title="Home">
      <Home size={28} />
    </NavLink>
    <NavLink to="/events" className={({ isActive }) => `transition-transform duration-200 font-display ${isActive ? 'scale-110 text-cyan-400' : 'text-white hover:text-cyan-400 hover:scale-105'}`} title="Events">
      <Calendar size={28} />
    </NavLink>
    <NavLink to="/reminders" className={({ isActive }) => `transition-transform duration-200 font-display ${isActive ? 'scale-110 text-cyan-400' : 'text-white hover:text-cyan-400 hover:scale-105'}`} title="Reminders">
      <Bell size={28} />
    </NavLink>
    <NavLink to="/archive" className={({ isActive }) => `transition-transform duration-200 font-display ${isActive ? 'scale-110 text-cyan-400' : 'text-white hover:text-cyan-400 hover:scale-105'}`} title="Archive">
      <Archive size={28} />
    </NavLink>
    <NavLink to="/profile" className={({ isActive }) => `transition-transform duration-200 font-display ${isActive ? 'scale-110 text-cyan-400' : 'text-white hover:text-cyan-400 hover:scale-105'}`} title="Profile">
      <User size={28} />
    </NavLink>
  </nav>
);
