export type UserRole = 'admin' | 'manager' | 'technician' | 'requester';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  initials: string;
  department?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  activeTickets: number;
  completedToday: number;
  avgCloseTime: string;
  onTimeRate: number;
  rating: number;
}
