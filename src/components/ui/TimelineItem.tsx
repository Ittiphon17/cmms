import React from 'react';

interface TimelineItemProps {
  action: string;
  by: string;
  time: string;
  color?: 'critical' | 'warning' | 'success' | 'info';
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  action,
  by,
  time,
  color = 'info',
}) => {
  const colorMap = {
    critical: {
      dot: 'bg-critical',
      circle: 'bg-critical-bg',
    },
    warning: {
      dot: 'bg-warning',
      circle: 'bg-warning-bg',
    },
    success: {
      dot: 'bg-success',
      circle: 'bg-success-bg',
    },
    info: {
      dot: 'bg-info',
      circle: 'bg-info-bg',
    },
  };

  const currentColors = colorMap[color] || colorMap.info;

  // Format Date nicely
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="flex gap-4 relative pb-5 last:pb-0">
      {/* Timeline track (drawn behind the dot) */}
      <div className="absolute top-6 left-[10px] bottom-0 w-[1px] bg-border-custom last:hidden" />

      {/* Circle & dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center ${currentColors.circle} border border-black/5`}>
          <div className={`w-[8px] h-[8px] rounded-full ${currentColors.dot}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-text-primary leading-tight">
          {action}
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-text-secondary">
          <span>By {by}</span>
          <span className="text-text-hint font-light">•</span>
          <span>{formatDate(time)}</span>
        </div>
      </div>
    </div>
  );
};
