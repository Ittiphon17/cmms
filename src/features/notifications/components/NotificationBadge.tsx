import React from 'react';

interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  if (count <= 0) return null;

  return (
    <span 
      className="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] px-1 rounded-full bg-critical border border-white text-white text-[8px] font-bold flex items-center justify-center animate-pulse"
      aria-label={`${count} unread notifications`}
    >
      {count > 9 ? '9+' : count}
    </span>
  );
};
