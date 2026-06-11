import { create } from 'zustand';
import type { AppNotification } from '../types';

interface NotificationStore {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: 'n-1',
      type: 'new_work_order',
      title: 'New PM Scheduled',
      message: 'Preventive maintenance work order assigned to you for GE Signa 3T MRI Scanner.',
      targetId: 'TK-2847',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
      read: false,
    },
    {
      id: 'n-2',
      type: 'status_change',
      title: 'Work Order Updated',
      message: 'Work Order TK-9582 (Philips Tempus LS) status changed to IN_PROGRESS.',
      targetId: 'TK-9582',
      createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(), // 2 hrs ago
      read: true,
    },
    {
      id: 'n-3',
      type: 'overdue_sla',
      title: 'SLA Overdue Alert',
      message: 'Helium temperature warning ticket TK-2847 has breached its SLA response window.',
      targetId: 'TK-2847',
      createdAt: new Date(Date.now() - 240 * 60 * 1000).toISOString(), // 4 hrs ago
      read: false,
    },
  ],
  unreadCount: 2,

  addNotification: (newNotif) => set((state) => {
    const notification: AppNotification = {
      ...newNotif,
      id: `n-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated = [notification, ...state.notifications];
    return {
      notifications: updated,
      unreadCount: updated.filter((n) => !n.read).length,
    };
  }),

  markAsRead: (id) => set((state) => {
    const updated = state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    return {
      notifications: updated,
      unreadCount: updated.filter((n) => !n.read).length,
    };
  }),

  markAllAsRead: () => set((state) => {
    const updated = state.notifications.map((n) => ({ ...n, read: true }));
    return {
      notifications: updated,
      unreadCount: 0,
    };
  }),

  clearNotifications: () => set({
    notifications: [],
    unreadCount: 0,
  }),
}));
