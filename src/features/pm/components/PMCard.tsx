import React from 'react';
import { PMStatusBadge } from './PMStatusBadge';
import type { PMStatus } from './PMStatusBadge';
import { IconCalendar, IconUser, IconChevronRight } from '@tabler/icons-react';

export interface PMTask {
  id: string;
  assetId: string;
  assetName: string;
  type: string;
  status: PMStatus;
  scheduledDate: string;
  assignedTech: string;
  description: string;
}

interface PMCardProps {
  task: PMTask;
  onClick: () => void;
}

export const PMCard: React.FC<PMCardProps> = ({ task, onClick }) => {
  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div 
      onClick={onClick}
      className="bg-surface border border-border-custom hover:border-primary/40 rounded-[12px] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(13,133,138,0.08)] flex flex-col gap-3 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.5px]">
            {task.type}
          </span>
          <h4 className="text-[13.5px] font-semibold text-text-primary group-hover:text-primary transition-colors truncate m-0 mt-0.5">
            {task.assetName}
          </h4>
          <span className="text-[10.5px] font-mono text-text-hint">
            {task.assetId}
          </span>
        </div>
        <PMStatusBadge status={task.status} size="sm" />
      </div>

      <div className="flex items-center justify-between text-[11.5px] text-text-secondary pt-2 border-t border-border-custom/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <IconCalendar size={12} className="text-text-hint" />
            <span>{formatDate(task.scheduledDate)}</span>
          </span>
          <span className="flex items-center gap-1">
            <IconUser size={12} className="text-text-hint" />
            <span className="truncate max-w-[80px]">{task.assignedTech}</span>
          </span>
        </div>
        
        <div className="p-1 rounded-[4px] group-hover:text-primary transition-colors text-text-hint">
          <IconChevronRight size={14} stroke={2.5} />
        </div>
      </div>
    </div>
  );
};
