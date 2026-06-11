import type { PMStatus } from '../features/pm/components/PMStatusBadge';

export interface PMTask {
  id: string;
  assetId: string;
  assetName: string;
  type: string;
  status: PMStatus;
  scheduledDate: string;
  assignedTech: string;
  description: string;
  branch: string;
  notes?: string;
}
