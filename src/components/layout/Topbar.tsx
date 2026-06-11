import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBell, IconChevronLeft, IconShield } from '@tabler/icons-react';
import { useAppStore } from '../../store/useAppStore';
import { useNotificationStore } from '../../store/notificationStore';
import { NotificationBadge } from '../../features/notifications/components/NotificationBadge';
import { NotificationDrawer } from '../../features/notifications/components/NotificationDrawer';
import type { UserRole } from '../../types';

interface TopbarProps {
  title: string;
  subtitle: string;
  backLink?: string;
  badge?: React.ReactNode;
  rightActions?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({
  title,
  subtitle,
  backLink,
  badge,
  rightActions,
}) => {
  const navigate = useNavigate();
  const { userRole, setUserRole } = useAppStore();
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
  };

  return (
    <>
      <header className="h-[60px] bg-surface border-b border-border-custom px-6 flex items-center justify-between flex-shrink-0 z-20 select-none">
        {/* Left section: Title & Subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          {backLink && (
            <button
              onClick={() => navigate(backLink)}
              className="p-1.5 hover:bg-bg rounded-[6px] border border-border-custom text-text-secondary hover:text-text-primary transition-colors cursor-pointer mr-1"
              aria-label="Go back"
            >
              <IconChevronLeft size={16} stroke={2.5} />
            </button>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[18px] font-semibold text-text-primary leading-tight m-0 truncate">
                {title}
              </h2>
              {badge && <div className="flex-shrink-0">{badge}</div>}
            </div>
            <p className="text-[12px] text-text-secondary m-0 leading-tight mt-0.5 truncate">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right section: RBAC selector, Notifications, Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* RBAC Role Switcher */}
          <div className="flex items-center gap-1.5 bg-bg border border-border-custom rounded-[6px] px-2.5 py-1.5 text-[12px] font-semibold text-text-secondary">
            <IconShield size={14} className="text-primary flex-shrink-0" />
            <select
              className="bg-transparent border-none outline-none font-semibold text-text-primary cursor-pointer pr-1"
              value={userRole}
              onChange={handleRoleChange}
              aria-label="Switch User Role"
            >
              <option value="admin">Role: Admin</option>
              <option value="manager">Role: Manager</option>
              <option value="technician">Role: Technician</option>
              <option value="requester">Role: Requester</option>
            </select>
          </div>

          {/* Page-specific actions */}
          {rightActions && <div className="flex items-center gap-3">{rightActions}</div>}

          {/* Bell Icon with Badge */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 hover:bg-bg rounded-full text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Open notifications center"
          >
            <IconBell size={20} stroke={1.8} />
            <NotificationBadge count={unreadCount} />
          </button>
        </div>
      </header>

      {/* Slide-over Drawer Panel */}
      <NotificationDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />
    </>
  );
};
