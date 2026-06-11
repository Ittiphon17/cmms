import React from 'react';
import type { AppNotification } from '../../../types';
import { 
  IconAlertCircle, 
  IconClipboardCheck, 
  IconRefresh, 
  IconCalendarEvent, 
  IconMessage2, 
  IconBell 
} from '@tabler/icons-react';

interface NotificationItemProps {
  notification: AppNotification;
  onMarkRead: (id: string) => void;
  onClick: (targetId?: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkRead,
  onClick
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'overdue_sla':
        return <IconAlertCircle size={16} className="text-critical" />;
      case 'assignment':
      case 'new_work_order':
        return <IconClipboardCheck size={16} className="text-primary" />;
      case 'status_change':
        return <IconRefresh size={16} className="text-warning" />;
      case 'pm_reminder':
        return <IconCalendarEvent size={16} className="text-success" />;
      case 'comment_added':
        return <IconMessage2 size={16} className="text-info" />;
      default:
        return <IconBell size={16} className="text-text-secondary" />;
    }
  };

  const getBgColor = () => {
    if (notification.read) return 'bg-surface hover:bg-bg/40';
    switch (notification.type) {
      case 'overdue_sla': return 'bg-critical-bg/30 hover:bg-critical-bg/50 border-l-2 border-critical';
      case 'pm_reminder': return 'bg-success-bg/30 hover:bg-success-bg/50 border-l-2 border-success';
      case 'status_change': return 'bg-warning-bg/30 hover:bg-warning-bg/50 border-l-2 border-warning';
      default: return 'bg-primary-light/30 hover:bg-primary-light/50 border-l-2 border-primary';
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div 
      className={`p-3.5 border-b border-border-custom/60 flex items-start gap-3 transition-colors cursor-pointer text-left ${getBgColor()}`}
      onClick={() => onClick(notification.targetId)}
    >
      <div className="mt-0.5 p-1.5 rounded-full bg-white border border-border-custom/50 shadow-sm flex-shrink-0">
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className={`text-[12.5px] truncate m-0 ${notification.read ? 'text-text-secondary font-medium' : 'text-text-primary font-semibold'}`}>
            {notification.title}
          </h4>
          <span className="text-[10px] text-text-hint font-medium flex-shrink-0">
            {formatTime(notification.createdAt)}
          </span>
        </div>
        <p className="text-[11.5px] text-text-secondary leading-snug mt-1 m-0 break-words">
          {notification.message}
        </p>

        {!notification.read && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkRead(notification.id);
            }}
            className="text-[10.5px] text-primary hover:text-primary-dark font-semibold mt-2 underline cursor-pointer"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
};
