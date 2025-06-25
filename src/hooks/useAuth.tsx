import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authAPI } from '@/api';

interface User {
  _id: string;
  name: string;
  email: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: { name: string; email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  sendOtp: (email: string) => Promise<any>;
  verifyOtp: (email: string, otp: string) => Promise<any>;
  createGuestUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and user data on app load
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await authAPI.login({ email, password });
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signUp = async (userData: { name: string; email: string; password: string }) => {
    try {
      const data = await authAPI.register(userData);
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const createGuestUser = async () => {
    try {
      const data = await authAPI.createGuestUser();
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error('❌ Guest user creation error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const sendOtp = async (email: string) => {
    return authAPI.sendOtp(email);
  };

  const verifyOtp = async (email: string, otp: string) => {
    const data = await authAPI.verifyOtp(email, otp);
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      sendOtp,
      verifyOtp,
      createGuestUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
