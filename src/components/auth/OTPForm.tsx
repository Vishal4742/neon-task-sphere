
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { sendOtp, verifyOtp } from '@/api/auth';
import { ArrowLeft, Mail, Smartphone } from 'lucide-react';

interface OTPFormProps {
  email: string;
  phone?: string;
  onBack: () => void;
  isSignUp?: boolean;
}

export const OTPForm: React.FC<OTPFormProps> = ({ email, phone, onBack, isSignUp = false }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  // Only email OTP is supported now
  const otpMethod = 'email';

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      toast.success('Successfully verified!');
      // Optionally call onBack or redirect
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };


  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await sendOtp(email);
      toast.success('Verification code sent to your email!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || 'Failed to resend code');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <Card className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter the 6-digit code sent to your {otpMethod}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OTP Method Selection */}
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={'default'}
              className="flex-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30"
              disabled
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="bg-white/5 border-white/10 text-white" />
                <InputOTPSlot index={1} className="bg-white/5 border-white/10 text-white" />
                <InputOTPSlot index={2} className="bg-white/5 border-white/10 text-white" />
                <InputOTPSlot index={3} className="bg-white/5 border-white/10 text-white" />
                <InputOTPSlot index={4} className="bg-white/5 border-white/10 text-white" />
                <InputOTPSlot index={5} className="bg-white/5 border-white/10 text-white" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerifyOTP}
            disabled={loading || otp.length !== 6}
            className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-white border border-cyan-500/30"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>

          {/* Resend Code */}
          <div className="text-center space-y-2">
            <p className="text-slate-400 text-sm">Didn't receive the code?</p>
            <Button
              onClick={handleResendOTP}
              disabled={resendLoading}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
            >
              {resendLoading ? 'Sending...' : 'Resend Code'}
            </Button>
          </div>

          {/* Back Button */}
          <Button
            onClick={onBack}
            variant="ghost"
            className="w-full text-slate-400 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
