
import React, { useState } from 'react';
import { Plus, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      y: 25,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: '2',
      title: 'Buy groceries',
      x: 65,
      y: 45,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: '3',
      title: 'Read book',
      x: 35,
      y: 70,
      color: 'from-green-400 to-green-600'
    },
    {
      id: '4',
      title: 'Plan weekend',
      x: 75,
      y: 20,
      color: 'from-orange-400 to-orange-600'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');

  const colors = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600'
  ];

  const addEvent = () => {
    if (newEventTitle.trim()) {
      const newEvent: UnorganizedEvent = {
        id: Date.now().toString(),
        title: newEventTitle.trim(),
        x: Math.random() * 70 + 15,
        y: Math.random() * 60 + 20,
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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Quick Ideas</h2>
          <p className="text-slate-400">Drag and drop to organize your thoughts</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          variant="outline"
          className="bg-transparent border-slate-400 text-slate-300 hover:bg-white hover:text-slate-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Idea
        </Button>
      </div>

      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl h-80 overflow-hidden">
        {/* Floating bubbles container */}
        <div className="relative w-full h-full">
          {events.map((event) => (
            <div
              key={event.id}
              className="absolute group cursor-move"
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
              <div className={`relative bg-gradient-to-r ${event.color} rounded-full px-4 py-2 shadow-lg hover:scale-110 transition-all duration-300 border border-white/20`}>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-white" />
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {event.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEvent(event.id);
                    }}
                    className="text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add new event bubble */}
          {isAdding && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-slate-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addEvent()}
                    onBlur={addEvent}
                    placeholder="Enter idea..."
                    className="bg-transparent text-slate-900 placeholder-slate-500 outline-none text-sm w-32"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {events.length === 0 && !isAdding && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Clock className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-400 text-lg">No ideas yet</p>
              <p className="text-slate-500 text-sm">Click "Add Idea" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
