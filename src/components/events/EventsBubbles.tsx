
import React, { useState, useEffect } from 'react';
import { Plus, Clock } from 'lucide-react';

interface UnorganizedEvent {
  id: string;
  title: string;
  x: number;
  y: number;
  color: string;
}

export const EventsBubbles: React.FC = () => {
  const [events, setEvents] = useState<UnorganizedEvent[]>([
    {
      id: '1',
      title: 'Call mom',
      x: 20,
      y: 20,
      color: 'from-cyan-500/30 to-blue-500/30'
    },
    {
      id: '2',
      title: 'Buy groceries',
      x: 60,
      y: 40,
      color: 'from-purple-500/30 to-pink-500/30'
    },
    {
      id: '3',
      title: 'Read book',
      x: 30,
      y: 70,
      color: 'from-green-500/30 to-emerald-500/30'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  const colors = [
    'from-cyan-500/30 to-blue-500/30',
    'from-purple-500/30 to-pink-500/30',
    'from-green-500/30 to-emerald-500/30',
    'from-orange-500/30 to-red-500/30',
    'from-indigo-500/30 to-purple-500/30',
    'from-teal-500/30 to-cyan-500/30'
  ];

  const addEvent = () => {
    if (newEventTitle.trim()) {
      const newEvent: UnorganizedEvent = {
        id: Date.now().toString(),
        title: newEventTitle.trim(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setIsAdding(false);
    }
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const moveEvent = (id: string, newX: number, newY: number) => {
    setEvents(events.map(event => 
      event.id === id 
        ? { ...event, x: Math.max(5, Math.min(90, newX)), y: Math.max(5, Math.min(90, newY)) }
        : event
    ));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-purple-400">Unorganized Events</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl h-96 overflow-hidden">
        {/* Floating bubbles container */}
        <div className="relative w-full h-full">
          {events.map((event) => (
            <div
              key={event.id}
              className={`absolute group cursor-move`}
              style={{
                left: `${event.x}%`,
                top: `${event.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              draggable
              onDragEnd={(e) => {
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                if (rect) {
                  const newX = ((e.clientX - rect.left) / rect.width) * 100;
                  const newY = ((e.clientY - rect.top) / rect.height) * 100;
                  moveEvent(event.id, newX, newY);
                }
              }}
            >
              <div className={`relative bg-gradient-to-r ${event.color} backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 hover:scale-110 transition-all duration-300 animate-pulse`}>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">{event.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEvent(event.id);
                    }}
                    className="text-white/70 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2"
                  >
                    ×
                  </button>
                </div>
                
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${event.color} rounded-full blur-lg opacity-50 -z-10`} />
              </div>
            </div>
          ))}

          {/* Add new event bubble */}
          {isAdding && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-purple-500/50 rounded-full px-4 py-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addEvent()}
                    onBlur={addEvent}
                    placeholder="Event title..."
                    className="bg-transparent text-white placeholder-white/70 outline-none text-sm"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {events.length === 0 && !isAdding && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-slate-500 text-lg">No unorganized events yet</p>
          </div>
        )}
      </div>

      <p className="text-slate-400 text-sm mt-2 text-center">
        Drag bubbles around to organize your unscheduled events
      </p>
    </div>
  );
};
