
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { EventsGrid } from '@/components/events/EventsGrid';
import { EventsBubbles } from '@/components/events/EventsBubbles';

const Events = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Events Manager
            </h1>
            <p className="text-slate-400 text-lg">
              Organize your events with style
            </p>
          </div>
          
          <div className="space-y-12">
            <EventsGrid />
            <EventsBubbles />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Events;
