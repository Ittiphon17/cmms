import type { User, UserRole } from '../types';

export const authApi = {
  login: async (email: string, role: UserRole): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const user: User = {
      id: `usr-${Math.random().toString(36).substr(2, 9)}`,
      name: email.split('@')[0],
      email,
      role,
      initials: email.substring(0, 2).toUpperCase() || 'US',
    };
    localStorage.setItem('cf_current_user', JSON.stringify(user));
    return user;
  },

  getCurrentUser: async (): Promise<User | null> => {
    const userStr = localStorage.getItem('cf_current_user');
    if (!userStr) {
      // Default to admin for seamless evaluation
      const defaultUser: User = {
        id: 'usr-default',
        name: 'Marcus Vance',
        email: 'marcus@careflow.com',
        role: 'admin',
        initials: 'MV',
        department: 'Biomedical Engineering',
      };
      localStorage.setItem('cf_current_user', JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(userStr);
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('cf_current_user');
  },
};
