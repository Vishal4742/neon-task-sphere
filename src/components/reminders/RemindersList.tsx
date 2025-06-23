
import React, { useState } from 'react';
import { Bell, Plus, Clock, AlertTriangle } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'urgent' | 'normal' | 'low';
  description?: string;
}

export const RemindersList: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Doctor appointment',
      date: '2024-01-15',
      time: '14:00',
      type: 'urgent',
      description: 'Annual checkup'
    },
    {
      id: '2',
      title: 'Birthday party',
      date: '2024-01-20',
      time: '19:00',
      type: 'normal',
      description: 'Sarah\'s birthday celebration'
    },
    {
      id: '3',
      title: 'Water plants',
      date: '2024-01-16',
      time: '09:00',
      type: 'low'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    date: '',
    time: '',
    type: 'normal' as 'urgent' | 'normal' | 'low',
    description: ''
  });

  const addReminder = () => {
    if (newReminder.title && newReminder.date && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        ...newReminder
      };
      setReminders([...reminders, reminder]);
      setNewReminder({ title: '', date: '', time: '', type: 'normal', description: '' });
      setIsAdding(false);
    }
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'normal': return <Bell className="w-4 h-4 text-cyan-400" />;
      case 'low': return <Clock className="w-4 h-4 text-green-400" />;
      default: return <Bell className="w-4 h-4 text-purple-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'from-red-500/20 to-red-600/20 border-red-400/30';
      case 'normal': return 'from-cyan-500/20 to-cyan-600/20 border-cyan-400/30';
      case 'low': return 'from-green-500/20 to-green-600/20 border-green-400/30';
      default: return 'from-purple-500/20 to-purple-600/20 border-purple-400/30';
    }
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Upcoming Reminders</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedReminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`relative group backdrop-blur-xl bg-gradient-to-r ${getTypeColor(reminder.type)} border rounded-2xl p-4 hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getTypeIcon(reminder.type)}
                <h4 className="text-white font-semibold">{reminder.title}</h4>
              </div>
              <button
                onClick={() => removeReminder(reminder.id)}
                className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300 transition-all duration-300"
              >
                ×
              </button>
            </div>

            <div className="text-slate-300 text-sm space-y-1">
              <div>{reminder.date} at {reminder.time}</div>
              {reminder.description && (
                <div className="text-slate-400">{reminder.description}</div>
              )}
            </div>

            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${getTypeColor(reminder.type)} rounded-2xl blur-lg opacity-50 -z-10`} />
          </div>
        ))}

        {isAdding && (
          <div className="backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-2xl p-4">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Reminder title"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-500/50 focus:outline-none"
                />
                <input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-500/50 focus:outline-none"
                />
              </div>

              <select
                value={newReminder.type}
                onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as 'urgent' | 'normal' | 'low' })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-cyan-500/50 focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>

              <textarea
                placeholder="Description (optional)"
                value={newReminder.description}
                onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none resize-none"
                rows={2}
              />

              <div className="flex space-x-2">
                <button
                  onClick={addReminder}
                  className="flex-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 px-3 py-2 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {reminders.length === 0 && !isAdding && (
        <div className="text-center py-8 text-slate-500">
          <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No reminders yet</p>
        </div>
      )}
    </div>
  );
};
