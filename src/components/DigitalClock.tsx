import React, { useEffect, useState } from "react";

const pad = (n: number) => n.toString().padStart(2, "0");

export const DigitalClock: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return (
    <div className="text-6xl font-mono text-white drop-shadow-lg tracking-widest">
      {hours}:{minutes}:{seconds}
    </div>
  );
}; 