
import React from 'react';
import { TimeBlock } from './TimeBlock';

export const HourlyTimeline: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const currentHour = new Date().getHours();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {hours.map((hour, index) => (
          <TimeBlock
            key={hour}
            hour={hour}
            isCurrentHour={index === currentHour}
          />
        ))}
      </div>
    </div>
  );
};
