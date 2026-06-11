import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  color: 'red' | 'amber' | 'green' | 'teal';
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, color }) => {
  const colorMap = {
    red: 'text-critical',
    amber: 'text-warning',
    green: 'text-success',
    teal: 'text-primary',
  };

  const textColorClass = colorMap[color] || 'text-text-primary';

  return (
    <div className="bg-surface border border-border-custom rounded-[10px] p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.06)] min-h-[96px]">
      <div 
        className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase"
        style={{ letterSpacing: '0.5px' }}
      >
        {label}
      </div>
      <div className={`text-[26px] font-semibold ${textColorClass} mt-2 leading-none`}>
        {value}
      </div>
    </div>
  );
};
