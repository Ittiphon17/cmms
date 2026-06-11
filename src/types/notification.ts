export type NotificationType = 'new_work_order' | 'assignment' | 'status_change' | 'overdue_sla' | 'pm_reminder' | 'comment_added';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  targetId?: string; // target ID (e.g. WorkOrder ID)
  createdAt: string; // ISO datetime
  read: boolean;
}
