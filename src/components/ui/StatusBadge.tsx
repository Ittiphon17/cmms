import React from 'react';
import type { TicketStatus } from '../../types';

interface StatusBadgeProps {
  status: TicketStatus;
  size?: 'sm' | 'default';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'default' }) => {
  const statusConfig: Record<
    TicketStatus,
    { bg: string; text: string; label: string }
  > = {
    // New WorkOrder Status Flow
    open: {
      bg: 'bg-primary-light',
      text: 'text-primary-dark font-semibold',
      label: 'Open',
    },
    assigned: {
      bg: 'bg-info-bg',
      text: 'text-info-text font-semibold',
      label: 'Assigned',
    },
    in_progress: {
      bg: 'bg-warning-bg',
      text: 'text-warning-text font-semibold',
      label: 'In Progress',
    },
    waiting_part: {
      bg: 'bg-orange-100',
      text: 'text-orange-800 font-semibold',
      label: 'Waiting Part',
    },
    completed: {
      bg: 'bg-success-bg',
      text: 'text-success-text font-semibold',
      label: 'Completed',
    },
    closed: {
      bg: 'bg-success-bg',
      text: 'text-success-text font-semibold',
      label: 'Closed',
    },
    cancelled: {
      bg: 'bg-gray-100',
      text: 'text-gray-500 font-semibold',
      label: 'Cancelled',
    },

    // Legacy Ticket Statuses
    critical: {
      bg: 'bg-critical-bg',
      text: 'text-critical-text font-semibold',
      label: 'Critical',
    },
    pending: {
      bg: 'bg-warning-bg',
      text: 'text-warning-text font-semibold',
      label: 'Pending',
    },
    maintenance: {
      bg: 'bg-info-bg',
      text: 'text-info-text font-semibold',
      label: 'Maintenance',
    },
    operational: {
      bg: 'bg-success-bg',
      text: 'text-success-text font-semibold',
      label: 'Operational',
    },
    resolved: {
      bg: 'bg-success-bg',
      text: 'text-success-text font-semibold',
      label: 'Resolved',
    },
  };

  const config = statusConfig[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: status,
  };

  const sizeClass = size === 'sm' ? 'text-[12px] px-2 py-0.5' : 'text-[13px] px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-[6px] border border-black/5 ${config.bg} ${config.text} ${sizeClass}`}
      style={{ letterSpacing: '0.2px' }}
      aria-label={`Status: ${config.label}`}
    >
      {config.label}
    </span>
  );
};
