
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import { AppLayout } from '@/components/layout/AppLayout';
import { CleanClock } from '@/components/dashboard/CleanClock';
import { Button } from '@/components/ui/button';
import { LogOut, Calendar, Zap, Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Sign Out */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Neon Task Manager
              </h1>
              <p className="text-slate-400 text-lg">
                Welcome back, {user.email}
              </p>
            </div>
            <Button
              onClick={signOut}
              variant="ghost"
              className="text-slate-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Clean Clock Display */}
          <CleanClock />

          {/* Quick Actions */}
          <div className="flex justify-center space-x-6 mt-12">
            <Button
              onClick={() => navigate('/events')}
              className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-400 border border-cyan-500/30"
            >
              <Zap className="w-5 h-5 mr-2" />
              Manage Events
            </Button>
            <Button
              onClick={() => navigate('/reminders')}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-400 border border-purple-500/30"
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Calendar
            </Button>
            <Button
              onClick={() => navigate('/archive')}
              className="bg-gradient-to-r from-slate-500/20 to-gray-500/20 hover:from-slate-500/30 hover:to-gray-500/30 text-slate-400 border border-slate-500/30"
            >
              <Archive className="w-5 h-5 mr-2" />
              View Archive
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
