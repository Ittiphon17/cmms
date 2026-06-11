import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconClipboardList,
  IconChartBar,
  IconPlus,
  IconLogout,
  IconCpu,
  IconCalendar,
  IconX,
} from '@tabler/icons-react';
import { Avatar } from '../ui/Avatar';
import { useAppStore } from '../../store/useAppStore';

export const Sidebar: React.FC = () => {
  const logout = useAppStore((state) => state.logout);
  const isMobileSidebarOpen = useAppStore((state) => state.isMobileSidebarOpen);
  const setMobileSidebarOpen = useAppStore((state) => state.setMobileSidebarOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileSidebarOpen(false);
    navigate('/login');
  };

  const navSections = [
    {
      title: 'MAINTENANCE',
      items: [
        {
          label: 'Dashboard',
          to: '/dashboard',
          icon: IconLayoutDashboard,
        },
        {
          label: 'My Work',
          to: '/my-work',
          icon: IconClipboardList,
        },
        {
          label: 'Assets',
          to: '/assets',
          icon: IconCpu,
        },
        {
          label: 'PM Schedule',
          to: '/pm',
          icon: IconCalendar,
        },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        {
          label: 'Reports',
          to: '/reports',
          icon: IconChartBar,
        },
      ],
    },
    {
      title: 'ACTIONS',
      items: [
        {
          label: 'New Work Order',
          to: '/tickets/new',
          icon: IconPlus,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 md:hidden animate-fade-in"
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 w-[210px] h-screen bg-primary flex flex-col justify-between text-white flex-shrink-0 select-none transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0 z-50 shadow-2xl' : '-translate-x-full md:translate-x-0 z-30'}
      `}>
        {/* Brand / Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Teal Icon Mark */}
            <div className="w-7 h-7 rounded-[6px] bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-lg leading-none">CF</span>
            </div>
            <div>
              <h1 className="text-[15px] font-semibold tracking-wide leading-tight text-white m-0">
                CareFlow CMMS
              </h1>
              <p className="text-[9px] text-white/60 tracking-wider uppercase font-medium m-0 leading-none mt-0.5">
                Medical Equipment
              </p>
            </div>
          </div>
          
          {/* Close button for mobile drawer */}
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-[6px] md:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <h3 
                className="px-2 text-[10px] font-semibold tracking-wider text-white/40 uppercase"
                style={{ letterSpacing: '0.5px' }}
              >
                {section.title}
              </h3>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-[13px] font-medium transition-colors hover:bg-white/10 ${
                        isActive ? 'bg-white/18 text-white' : 'text-white/85'
                      }`
                    }
                  >
                    <item.icon size={18} stroke={1.5} className="flex-shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-primary-dark/20 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar initials="MV" color="primary" size="sm" />
            <div className="min-w-0">
              <h4 className="text-[12px] font-semibold text-white truncate m-0 leading-tight">
                Marcus Vance
              </h4>
              <p className="text-[10px] text-white/65 truncate m-0 leading-none mt-0.5">
                Lead Biomed
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer"
            aria-label="Sign out"
          >
            <IconLogout size={14} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
