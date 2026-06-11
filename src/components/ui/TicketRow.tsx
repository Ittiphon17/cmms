import React from 'react';
import type { TicketStatus } from '../../types';
import { StatusBadge } from './StatusBadge';

interface TicketRowProps {
  id: string;
  equipment: string;
  status: TicketStatus;
  onClick: () => void;
}

export const TicketRow: React.FC<TicketRowProps> = ({ id, equipment, status, onClick }) => {
  const dotColorMap: Record<TicketStatus, string> = {
    // New WorkOrder Statuses
    open: 'bg-primary',
    assigned: 'bg-info',
    in_progress: 'bg-warning',
    waiting_part: 'bg-orange-500',
    completed: 'bg-success',
    closed: 'bg-success',
    cancelled: 'bg-gray-400',

    // Legacy Statuses
    critical: 'bg-critical',
    pending: 'bg-warning',
    maintenance: 'bg-info',
    operational: 'bg-success',
    resolved: 'bg-success',
  };

  const dotColor = dotColorMap[status] || 'bg-text-secondary';

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3.5 bg-bg border border-border-custom/50 hover:bg-[#EDF4F4] transition-colors rounded-[8px] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 mb-2"
      aria-label={`Ticket ${id} for ${equipment}, status is ${status}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-[12px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-[4px] border border-primary/10">
          {id}
        </span>
        <span className="text-[14px] font-medium text-text-primary truncate max-w-[280px] md:max-w-[450px]">
          {equipment}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className={`w-2 h-2 rounded-full ${dotColor}`} aria-hidden="true" />
        <StatusBadge status={status} size="sm" />
      </div>
    </button>
  );
};
