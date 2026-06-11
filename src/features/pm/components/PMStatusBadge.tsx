import React from 'react';

export type PMStatus = 'scheduled' | 'overdue' | 'completed';

interface PMStatusBadgeProps {
  status: PMStatus;
  size?: 'sm' | 'md';
}

export const PMStatusBadge: React.FC<PMStatusBadgeProps> = ({ status, size = 'md' }) => {
  const styles: Record<PMStatus, { bg: string; text: string; border: string; label: string }> = {
    scheduled: {
      bg: 'bg-info-bg',
      text: 'text-info-text font-bold',
      border: 'border-info/10',
      label: 'Scheduled',
    },
    overdue: {
      bg: 'bg-critical-bg',
      text: 'text-critical-text font-bold',
      border: 'border-critical/15',
      label: 'Overdue',
    },
    completed: {
      bg: 'bg-success-bg',
      text: 'text-success-text font-bold',
      border: 'border-success/15',
      label: 'Completed',
    },
  };

  const current = styles[status] || styles.scheduled;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11.5px]';

  return (
    <span className={`inline-flex items-center gap-1 rounded-[4px] border ${padding} ${current.bg} ${current.text} ${current.border} uppercase tracking-[0.3px]`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'completed' ? 'bg-success' :
        status === 'scheduled' ? 'bg-info' : 'bg-critical animate-pulse'
      }`} />
      <span>{current.label}</span>
    </span>
  );
};
