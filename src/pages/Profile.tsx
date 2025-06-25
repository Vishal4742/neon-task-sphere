import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { authAPI } from '@/api';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { User, Camera } from 'lucide-react';

interface Profile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    if (authLoading) return;
    let currentUser = user;
    if (!currentUser) {
      try {
        const stored = localStorage.getItem('user');
        if (stored) currentUser = JSON.parse(stored);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    if (!currentUser || !currentUser._id) {
      setError('You must be logged in to view your profile.');
      setProfile(null);
      return;
    }
    setError('');
    setLoading(true);
    authAPI.getProfile()
      .then((data) => {
        setProfile(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          bio: data.bio || '',
        });
      })
      .catch((err) => {
        setError(err?.response?.data?.message || 'Error loading profile');
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await authAPI.updateProfile(formData);
      toast.success('Profile updated successfully!');
      authAPI.getProfile().then(setProfile);
    } catch (error: any) {
      toast.error('Error updating profile: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;
  if (!profile) return null;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Profile</h1>
            <p className="text-slate-400 text-lg">Manage your account settings</p>
          </div>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
              <CardDescription className="text-slate-400">
                Update your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xl">
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              {/* Email (Read-only) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input
                  value={user?.email || ''}
                  disabled
                  className="bg-white/5 border-white/10 text-slate-400"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="bg-white/5 border-white/10 text-white placeholder-slate-400"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                  className="bg-white/5 border-white/10 text-white placeholder-slate-400"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself"
                  className="bg-white/5 border-white/10 text-white placeholder-slate-400 min-h-[100px]"
                />
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-white border border-cyan-500/30"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
