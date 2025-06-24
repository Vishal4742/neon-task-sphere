
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OTPForm } from './OTPForm';
import { toast } from 'sonner';
import { LogIn, UserPlus, Mail, Smartphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [useOTP, setUseOTP] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (useOTP) {
        // Use OTP authentication
        if (phone) {
          const { error } = await supabase.auth.signInWithOtp({
            phone,
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.auth.signInWithOtp({
            email,
          });
          if (error) throw error;
        }
        setShowOTP(true);
        toast.success(`Verification code sent to your ${phone ? 'phone' : 'email'}!`);
      } else {
        // Use traditional email/password authentication
        if (isSignUp) {
          await signUp(email, password);
          toast.success('Account created! Please check your email to verify your account.');
        } else {
          await signIn(email, password);
          toast.success('Welcome back!');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (showOTP) {
    return (
      <OTPForm
        email={email}
        phone={phone}
        onBack={() => setShowOTP(false)}
        isSignUp={isSignUp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <Card className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Neon Task Manager
          </CardTitle>
          <CardDescription className="text-slate-400">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Authentication Method Toggle */}
          <div className="flex space-x-2 mb-6">
            <Button
              type="button"
              variant={!useOTP ? 'default' : 'outline'}
              onClick={() => setUseOTP(false)}
              className={`flex-1 ${!useOTP 
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Password
            </Button>
            <Button
              type="button"
              variant={useOTP ? 'default' : 'outline'}
              onClick={() => setUseOTP(true)}
              className={`flex-1 ${useOTP 
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              OTP
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder-slate-400"
              />
            </div>

            {/* Phone Input (OTP only) */}
            {useOTP && (
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder-slate-400"
                />
              </div>
            )}

            {/* Password Input (Password auth only) */}
            {!useOTP && (
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-slate-400"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-white border border-cyan-500/30"
            >
              {loading ? (
                'Loading...'
              ) : (
                <>
                  {useOTP ? (
                    <Mail className="w-4 h-4 mr-2" />
                  ) : isSignUp ? (
                    <UserPlus className="w-4 h-4 mr-2" />
                  ) : (
                    <LogIn className="w-4 h-4 mr-2" />
                  )}
                  {useOTP ? 'Send Code' : isSignUp ? 'Sign Up' : 'Sign In'}
                </>
              )}
            </Button>
          </form>
          
          {!useOTP && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
