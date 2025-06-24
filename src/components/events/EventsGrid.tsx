
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      title: 'Product Strategy Meeting',
      date: '2024-01-15',
      time: '14:00',
      location: 'Conference Room A',
      description: 'Quarterly product planning and roadmap discussion'
    },
    {
      id: '2',
      title: 'Design Workshop',
      date: '2024-01-18',
      time: '10:00',
      location: 'Design Studio',
      description: 'Collaborative design thinking session'
    },
    {
      id: '3',
      title: 'Client Presentation',
      date: '2024-01-20',
      time: '15:30',
      description: 'Final project presentation to stakeholders'
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-white">Upcoming Events</h2>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-white text-slate-900 hover:bg-slate-100 font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const dateInfo = formatDate(event.date);
          return (
            <div
              key={event.id}
              className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              {/* Date badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="bg-slate-900 text-white rounded-xl px-3 py-2 text-center min-w-[60px]">
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    {dateInfo.month}
                  </div>
                  <div className="text-xl font-bold">{dateInfo.day}</div>
                  <div className="text-xs text-slate-400 uppercase">
                    {dateInfo.weekday}
                  </div>
                </div>
                <button
                  onClick={() => removeEvent(event.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Event details */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900 leading-tight">
                  {event.title}
                </h3>

                <div className="flex items-center text-slate-600 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{event.time}</span>
                </div>

                {event.location && (
                  <div className="flex items-center text-slate-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                )}

                {event.description && (
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                )}
              </div>

              {/* Action button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Button 
                  variant="ghost" 
                  className="w-full text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                >
                  View Details
                </Button>
              </div>
            </div>
          );
        })}

        {/* Add new event card */}
        {isAdding && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">New Event</h3>
                <button
                  onClick={() => setIsAdding(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:outline-none"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
                />
                
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Location (optional)"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:outline-none"
              />

              <textarea
                placeholder="Description (optional)"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-slate-400 focus:outline-none resize-none"
                rows={3}
              />

              <div className="flex space-x-3">
                <Button
                  onClick={addEvent}
                  className="flex-1 bg-slate-900 text-white hover:bg-slate-800"
                >
                  Create Event
                </Button>
                <Button
                  onClick={() => setIsAdding(false)}
                  variant="outline"
                  className="px-4 text-slate-600 border-slate-200 hover:bg-slate-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
