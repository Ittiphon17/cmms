import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBell, IconChevronLeft, IconShield, IconMenu2 } from '@tabler/icons-react';
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
  const { userRole, setUserRole, setMobileSidebarOpen } = useAppStore();
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
  };

  return (
    <>
      <header className="min-h-[60px] md:h-[60px] bg-surface border-b border-border-custom px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between py-2.5 md:py-0 flex-shrink-0 z-20 select-none gap-2.5 md:gap-0">
        {/* Row 1: Left Title block & Mobile Bell */}
        <div className="flex items-center justify-between w-full md:w-auto min-w-0">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            {/* Hamburger Menu button for mobile */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 hover:bg-bg rounded-[6px] border border-border-custom text-text-secondary hover:text-text-primary transition-colors cursor-pointer md:hidden flex-shrink-0"
              aria-label="Open sidebar"
            >
              <IconMenu2 size={16} stroke={2.5} />
            </button>

            {backLink && (
              <button
                onClick={() => navigate(backLink)}
                className="p-1.5 hover:bg-bg rounded-[6px] border border-border-custom text-text-secondary hover:text-text-primary transition-colors cursor-pointer flex-shrink-0"
                aria-label="Go back"
              >
                <IconChevronLeft size={16} stroke={2.5} />
              </button>
            )}
            
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[16px] md:text-[18px] font-semibold text-text-primary leading-tight m-0 truncate">
                  {title}
                </h2>
                {badge && <div className="flex-shrink-0">{badge}</div>}
              </div>
              <p className="text-[11px] md:text-[12px] text-text-secondary m-0 leading-tight mt-0.5 truncate">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Mobile Bell Button (only visible on mobile) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 hover:bg-bg rounded-full text-text-secondary hover:text-text-primary transition-colors cursor-pointer md:hidden flex-shrink-0"
            aria-label="Open notifications center"
          >
            <IconBell size={20} stroke={1.8} />
            <NotificationBadge count={unreadCount} />
          </button>
        </div>

        {/* Row 2: RBAC selector, Actions, Desktop Bell */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3.5 flex-shrink-0">
          {/* RBAC Role Switcher */}
          <div className="flex items-center gap-1.5 bg-bg border border-border-custom rounded-[6px] px-2.5 py-1.5 text-[12px] font-semibold text-text-secondary flex-shrink-0">
            <IconShield size={14} className="text-primary flex-shrink-0" />
            <span className="hidden sm:inline text-text-secondary">Role:</span>
            <select
              className="bg-transparent border-none outline-none font-semibold text-text-primary cursor-pointer pr-1 text-[12px]"
              value={userRole}
              onChange={handleRoleChange}
              aria-label="Switch User Role"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="technician">Technician</option>
              <option value="requester">Requester</option>
            </select>
          </div>

          {/* Page-specific actions */}
          {rightActions && <div className="flex items-center gap-2 flex-shrink-0">{rightActions}</div>}

          {/* Desktop Bell Icon (only visible on desktop) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 hover:bg-bg rounded-full text-text-secondary hover:text-text-primary transition-colors cursor-pointer hidden md:block flex-shrink-0"
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
