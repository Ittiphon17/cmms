import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'teal' | 'red' | 'green' | 'amber';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = 'teal' }) => {
  const colorMap = {
    teal: 'bg-primary',
    red: 'bg-critical',
    green: 'bg-success',
    amber: 'bg-warning',
  };

  const fillClass = colorMap[color] || 'bg-primary';
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div 
      className="w-full bg-border-custom rounded-full h-[5px] overflow-hidden"
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${clampedValue}%`}
    >
      <div
        className={`h-full ${fillClass} transition-all duration-300 ease-out`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};
