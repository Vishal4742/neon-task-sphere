
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { HolographicCalendar } from '@/components/reminders/HolographicCalendar';
import { RemindersList } from '@/components/reminders/RemindersList';

const Reminders = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Reminders Calendar
            </h1>
            <p className="text-slate-400 text-lg">
              Never forget important moments
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <HolographicCalendar />
            </div>
            <div className="lg:col-span-1">
              <RemindersList />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reminders;
