
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  description?: string;
}

export const EventsGrid: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: '2024-01-15',
      time: '14:00',
      location: 'Conference Room A',
      description: 'Weekly team sync'
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: '2024-01-20',
      time: '17:00',
      description: 'Final submission'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event: Event = {
        id: Date.now().toString(),
        ...newEvent
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', time: '', location: '', description: '' });
      setIsAdding(false);
    }
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-cyan-400">Organized Events</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                <button
                  onClick={() => removeEvent(event.id)}
                  className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300 transition-all duration-300"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-300">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{event.time}</span>
                </div>

                {event.location && (
                  <div className="flex items-center space-x-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-pink-400" />
                    <span>{event.location}</span>
                  </div>
                )}

                {event.description && (
                  <p className="text-slate-400 text-sm mt-3">{event.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {isAdding && (
          <div className="backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-2xl p-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-cyan-500/50 focus:outline-none"
                />
                
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-cyan-500/50 focus:outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Location (optional)"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none"
              />

              <textarea
                placeholder="Description (optional)"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none resize-none"
                rows={3}
              />

              <div className="flex space-x-3">
                <button
                  onClick={addEvent}
                  className="flex-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 px-4 py-2 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
                >
                  Add Event
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
