import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { EventsGrid } from '@/components/events/EventsGrid';
import { EventsBubbles } from '@/components/events/EventsBubbles';

const Events = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Clean header section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-3">
              Events
            </h1>
            <p className="text-slate-400 text-lg">
              Organize and manage your events with style
            </p>
          </div>
          
          <div className="space-y-16 animate-fade-in-up">
            <EventsGrid />
            <EventsBubbles />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Events;
