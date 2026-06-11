export type WorkOrderStatus = 'open' | 'assigned' | 'in_progress' | 'waiting_part' | 'completed' | 'closed' | 'cancelled';
export type WorkOrderPriority = 'critical' | 'high' | 'normal' | 'low';

export interface WorkOrderChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface WorkOrderTimelineItem {
  id: string;
  action: string;
  by: string;
  time: string; // ISO date-time
  color?: string; // 'critical' | 'warning' | 'success' | 'info' etc.
}

export interface WorkOrder {
  id: string;           // "WO-2847" or "TK-2847"
  title: string;
  description: string;
  assetId: string;
  assetName: string;
  location: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assignedTo: string;
  category: string;
  openedAt: string;     // ISO DateTime
  updatedAt: string;     // ISO DateTime
  slaDeadline: string;  // ISO DateTime
  completedAt?: string; // ISO DateTime
  closedAt?: string;    // ISO DateTime
  progress: number;     // 0-100
  checklist: WorkOrderChecklistItem[];
  timeline: WorkOrderTimelineItem[];
}
