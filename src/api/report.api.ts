import { mockUptimeData, mockWeeklyTicketsData, mockStatusBreakdown } from '../data/mock';
import type { UptimeData, WeeklyTicketVolume, StatusBreakdown, FacilityMetrics } from '../types';

export const reportApi = {
  getUptimeData: async (): Promise<UptimeData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockUptimeData;
  },
  getWeeklyTicketVolume: async (): Promise<WeeklyTicketVolume[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockWeeklyTicketsData;
  },
  getStatusBreakdown: async (): Promise<StatusBreakdown[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockStatusBreakdown;
  },
  getFacilityMetrics: async (): Promise<FacilityMetrics> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      meanUptime: 98.1,
      totalWorkOrders: 173,
      avgResolutionTimeHours: 3.1,
      mtbfHours: 184,
    };
  },
};
