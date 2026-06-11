import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAppStore } from '../../store/useAppStore';

export const AppShell: React.FC = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      {/* Sidebar - fixed width 210px */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Render page-specific content including page-specific Topbars */}
        <Outlet />
      </main>
    </div>
  );
};
