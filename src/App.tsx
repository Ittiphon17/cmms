import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppShell } from './components/layout/AppShell';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CreateTicket } from './pages/CreateTicket';
import { TicketDetail } from './pages/TicketDetail';
import { TechnicianPage } from './pages/TechnicianPage';
import { ReportDashboard } from './pages/ReportDashboard';

// New Feature Modules
import { AssetList } from './features/assets/pages/AssetList';
import { AssetDetail } from './features/assets/pages/AssetDetail';
import { PMCalendar } from './features/pm/pages/PMCalendar';

import { socketService } from './services/socket.service';
import { IconBell, IconX } from '@tabler/icons-react';

const queryClient = new QueryClient();

function ToastContainer() {
  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => {
    // Listen to real-time events from our simulated WebSocket stream
    const handleNotification = (e: Event) => {
      const alertData = (e as CustomEvent).detail;
      const toastId = `toast-${Date.now()}`;
      
      setToasts((prev) => [...prev, { ...alertData, id: toastId }]);

      // Dismiss after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId));
      }, 5000);
    };

    window.addEventListener('cf_notification', handleNotification);

    return () => {
      window.removeEventListener('cf_notification', handleNotification);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-[340px] select-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => {
            if (toast.targetId) {
              window.location.href = `/tickets/${toast.targetId}`;
            }
          }}
          className="p-4 bg-surface border-l-4 border-l-primary border border-border-custom rounded-[8px] shadow-lg flex items-start gap-3 justify-between cursor-pointer hover:shadow-xl transition-all animate-slide-left text-left"
        >
          <div className="min-w-0">
            <h4 className="text-[12.5px] font-bold text-text-primary m-0 flex items-center gap-1.5">
              <IconBell size={14} className="text-primary flex-shrink-0" />
              <span>{toast.title}</span>
            </h4>
            <p className="text-[11px] text-text-secondary leading-snug mt-1.5 m-0 break-words">
              {toast.message}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }}
            className="p-0.5 hover:bg-bg rounded text-text-hint hover:text-text-primary transition-colors cursor-pointer"
          >
            <IconX size={12} stroke={3} />
          </button>
        </div>
      ))}
    </div>
  );
}

function App() {
  useEffect(() => {
    // Initiate WebSocket simulation stream
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Authenticated Routes wrapped in AppShell */}
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Work Orders */}
            <Route path="/tickets/new" element={<CreateTicket />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
            <Route path="/my-work" element={<TechnicianPage />} />
            
            {/* Assets */}
            <Route path="/assets" element={<AssetList />} />
            <Route path="/assets/:id" element={<AssetDetail />} />
            
            {/* PM Calendar */}
            <Route path="/pm" element={<PMCalendar />} />
            
            {/* Analytics */}
            <Route path="/reports" element={<ReportDashboard />} />
          </Route>

          {/* Fallback & Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>

      {/* Floating In-App Real-time Notification Banner Overlay */}
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
