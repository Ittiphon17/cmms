import React from 'react';
import type { AssetStatus } from '../../../types';

interface AssetStatusBadgeProps {
  status: AssetStatus;
  size?: 'sm' | 'md';
}

export const AssetStatusBadge: React.FC<AssetStatusBadgeProps> = ({ status, size = 'md' }) => {
  const styles: Record<AssetStatus, { bg: string; text: string; border: string; label: string }> = {
    operational: {
      bg: 'bg-success-bg',
      text: 'text-success-text font-bold',
      border: 'border-success/15',
      label: 'Operational',
    },
    pending: {
      bg: 'bg-warning-bg',
      text: 'text-warning-text font-bold',
      border: 'border-warning/15',
      label: 'Pending Review',
    },
    maintenance: {
      bg: 'bg-info-bg',
      text: 'text-info-text font-bold',
      border: 'border-info/15',
      label: 'In Service',
    },
    critical: {
      bg: 'bg-critical-bg',
      text: 'text-critical-text font-bold',
      border: 'border-critical/15',
      label: 'Critical / Offline',
    },
  };

  const current = styles[status] || styles.operational;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10.5px]' : 'px-2.5 py-1 text-[12px]';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[4px] border ${padding} ${current.bg} ${current.text} ${current.border} uppercase tracking-[0.3px]`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'operational' ? 'bg-success' :
        status === 'pending' ? 'bg-warning' :
        status === 'maintenance' ? 'bg-info' : 'bg-critical animate-pulse'
      }`} />
      <span>{current.label}</span>
    </span>
  );
};
