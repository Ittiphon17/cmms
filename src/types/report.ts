export interface UptimeData {
  day: string;
  uptime: number;
}

export interface WeeklyTicketVolume {
  day: string;
  count: number;
}

export interface StatusBreakdown {
  name: string;
  value: number;
  color: string;
}

export interface FacilityMetrics {
  meanUptime: number;
  totalWorkOrders: number;
  avgResolutionTimeHours: number;
  mtbfHours: number;
}
