
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ArchivePanel } from '@/components/archive/ArchivePanel';

const Archive = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Archive Vault
            </h1>
            <p className="text-slate-400 text-lg">
              Frozen memories and completed tasks
            </p>
          </div>
          
          <ArchivePanel />
        </div>
      </div>
    </AppLayout>
  );
};

export default Archive;
