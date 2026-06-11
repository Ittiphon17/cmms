import React from 'react';

interface AssetHealthScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export const AssetHealthScore: React.FC<AssetHealthScoreProps> = ({ score, size = 'md' }) => {
  const getScoreColor = (val: number) => {
    if (val >= 85) return 'text-success stroke-success';
    if (val >= 70) return 'text-primary stroke-primary';
    if (val >= 50) return 'text-warning stroke-warning';
    return 'text-critical stroke-critical';
  };

  const getScoreBg = (val: number) => {
    if (val >= 85) return 'bg-success-bg text-success-text';
    if (val >= 70) return 'bg-primary-light text-primary-dark';
    if (val >= 50) return 'bg-warning-bg text-warning-text';
    return 'bg-critical-bg text-critical-text';
  };

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 font-semibold text-[12px] px-2 py-0.5 rounded-[4px] ${getScoreBg(score)}`}>
        <span>Health:</span>
        <span className="font-bold">{score}%</span>
      </span>
    );
  }

  // Circular gauge for medium/large sizes
  const strokeWidth = size === 'lg' ? 6 : 4;
  const radius = size === 'lg' ? 36 : 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex items-center justify-center">
        <svg className={`transform -rotate-90 ${size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'}`}>
          {/* Background circle */}
          <circle
            cx={size === 'lg' ? 40 : 28}
            cy={size === 'lg' ? 40 : 28}
            r={radius}
            className="stroke-[#E2E8F0] fill-none"
            strokeWidth={strokeWidth}
          />
          {/* Foreground circle */}
          <circle
            cx={size === 'lg' ? 40 : 28}
            cy={size === 'lg' ? 40 : 28}
            r={radius}
            className={`fill-none transition-all duration-500 ease-out ${getScoreColor(score)}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className={`absolute font-bold ${size === 'lg' ? 'text-[16px]' : 'text-[12px]'} text-text-primary`}>
          {score}
        </span>
      </div>
      <div>
        <h4 className="text-[12px] font-semibold text-text-secondary m-0 leading-none">Health Index</h4>
        <p className="text-[11px] text-text-hint m-0 mt-1 leading-none font-medium">
          {score >= 85 ? 'Excellent Uptime' : score >= 70 ? 'Satisfactory' : score >= 50 ? 'Needs Checkup' : 'Critical Hazard'}
        </p>
      </div>
    </div>
  );
};
