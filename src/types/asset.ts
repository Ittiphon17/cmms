export type AssetStatus = 'operational' | 'pending' | 'maintenance' | 'critical';

export interface Asset {
  id: string;
  name: string;
  status: AssetStatus;
  uptime: number;
  healthScore: number; // 0 to 100
  lastService: string; // ISO Date string
  nextService: string; // ISO Date string
  location: string;
  department: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  purchaseDate: string;
  workOrderCount: number;
  ticketCount?: number; // legacy compatibility alias
  assignedTech: string;
}
