import React, { useEffect, useState } from "react";
import { DigitalClock } from "./DigitalClock";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const started = localStorage.getItem('hasStarted');
    setShowButton(!started);
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem('hasStarted', 'true');
    setShowButton(false);
    navigate("/events");
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-12 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center drop-shadow-lg font-display">
          MultiTask
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 text-center max-w-2xl">
          Organize your life, events, and reminders with a touch of neon magic.
        </p>
        <DigitalClock />
        {showButton && (
          <Button
            className="mt-10 px-8 py-4 text-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        )}
      </div>
    </section>
  );
}; 