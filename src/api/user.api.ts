import type { TeamMember } from '../types';
import { mockTeamMembers } from '../data/mock';

export const userApi = {
  getTechnicians: async (): Promise<TeamMember[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTeamMembers;
  },
};
