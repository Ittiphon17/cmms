import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../../../store/notificationStore';
import { NotificationItem } from './NotificationItem';
import { IconX, IconChecks, IconNotification } from '@tabler/icons-react';


interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNotificationClick = (targetId?: string) => {
    if (targetId) {
      // Navigate to work order page (legacy tickets path is maintained /tickets/:id)
      navigate(`/tickets/${targetId}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px] flex justify-end animate-fade-in">
      <div 
        ref={drawerRef}
        className="w-full max-w-[380px] h-full bg-surface border-l border-border-custom shadow-2xl flex flex-col justify-between animate-slide-left"
        role="dialog"
        aria-modal="true"
        aria-label="Notification Center"
      >
        {/* Header */}
        <div className="p-4 border-b border-border-custom flex items-center justify-between bg-bg/50">
          <div>
            <h3 className="text-[15px] font-semibold text-text-primary m-0 flex items-center gap-1.5">
              <span>Notification Center</span>
              {unreadCount > 0 && (
                <span className="bg-critical-bg text-critical-text border border-critical/15 text-[10.5px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </h3>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary hover:bg-bg rounded-[6px] transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <IconX size={16} stroke={2.5} />
          </button>
        </div>

        {/* Action Panel */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 border-b border-border-custom/50 flex items-center justify-between text-[11px] bg-bg/20">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 font-semibold text-primary hover:text-primary-dark cursor-pointer transition-colors"
            >
              <IconChecks size={14} />
              <span>Mark all as read</span>
            </button>
            
            <button
              onClick={clearNotifications}
              className="font-semibold text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Notification List (Scrollable) */}
        <div className="flex-1 overflow-y-auto divide-y divide-border-custom/40">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkRead={markAsRead}
                onClick={handleNotificationClick}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-bg border border-border-custom/50 flex items-center justify-center text-text-hint mb-3">
                <IconNotification size={22} stroke={1.5} />
              </div>
              <h4 className="text-[13.5px] font-semibold text-text-primary m-0">No notifications</h4>
              <p className="text-[11.5px] text-text-secondary mt-1 max-w-[200px]">
                You're all caught up! Real-time alerts will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-custom bg-bg/40 text-center">
          <p className="text-[10.5px] text-text-secondary m-0">
            Connected to CareFlow Telemetry SSE Stream
          </p>
        </div>
      </div>
    </div>
  );
};
