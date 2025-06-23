
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bell } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'urgent' | 'normal' | 'low';
}

export const HolographicCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Doctor appointment',
      date: '2024-01-15',
      time: '14:00',
      type: 'urgent'
    },
    {
      id: '2',
      title: 'Birthday party',
      date: '2024-01-20',
      time: '19:00',
      type: 'normal'
    }
  ]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const today = new Date();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getRemindersForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return reminders.filter(reminder => reminder.date === dateStr);
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-500/30 border-red-400';
      case 'normal': return 'bg-cyan-500/30 border-cyan-400';
      case 'low': return 'bg-green-500/30 border-green-400';
      default: return 'bg-purple-500/30 border-purple-400';
    }
  };

  return (
    <div className="relative">
      {/* Holographic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl animate-pulse" />
      
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-slate-400 font-semibold p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} className="h-20" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isToday = today.getDate() === day && 
                           today.getMonth() === currentDate.getMonth() && 
                           today.getFullYear() === currentDate.getFullYear();
            const dayReminders = getRemindersForDate(day);

            return (
              <div
                key={day}
                className={`relative h-20 p-2 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isToday 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400 shadow-lg shadow-cyan-500/25' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-white font-semibold">{day}</div>
                
                {/* Reminder indicators */}
                <div className="absolute bottom-1 left-1 right-1 space-y-1">
                  {dayReminders.slice(0, 2).map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`w-full h-1 rounded-full ${getReminderColor(reminder.type)}`}
                    />
                  ))}
                  {dayReminders.length > 2 && (
                    <div className="text-xs text-cyan-400 text-center">
                      +{dayReminders.length - 2}
                    </div>
                  )}
                </div>

                {/* Holographic effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 hover:from-cyan-500/10 hover:to-purple-500/10 rounded-xl transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-400" />
            <span className="text-slate-400 text-sm">Urgent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500/30 border border-cyan-400" />
            <span className="text-slate-400 text-sm">Normal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-400" />
            <span className="text-slate-400 text-sm">Low Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
};
