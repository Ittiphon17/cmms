import type { WorkOrderStatus, WorkOrderPriority, WorkOrder, WorkOrderTimelineItem } from './workorder';
import type { Asset } from './asset';

export * from './user';
export * from './asset';
export * from './workorder';
export * from './notification';
export * from './report';
export * from './pm';

// Backwards compatibility mappings for smooth migration
export type TicketStatus = WorkOrderStatus | 'critical' | 'pending' | 'maintenance' | 'operational' | 'resolved';
export type TicketPriority = WorkOrderPriority;

export interface Ticket extends WorkOrder {
  equipment: string; // legacy mapping to assetName
}

export type Equipment = Asset;
export type TimelineItem = WorkOrderTimelineItem;
