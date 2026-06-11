import type { AppNotification } from '../types';

export const notificationApi = {
  getNotifications: async (): Promise<AppNotification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    // In production, this would make an HTTP request.
    // For now, the Zustand store `notificationStore.ts` handles the local state.
    return [];
  },
};
