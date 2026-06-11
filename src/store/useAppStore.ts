import { create } from 'zustand';
import type { Ticket, TeamMember, Equipment, TimelineItem, UserRole, WorkOrder } from '../types';
import { mockTeamMembers } from '../data/mock';
import { seedMockData } from '../api/mockDataSeeder';

// Ensure data is seeded
seedMockData();

const getStoredAssets = (): Equipment[] => {
  return JSON.parse(localStorage.getItem('cf_assets') || '[]');
};

const getStoredWorkOrders = (): Ticket[] => {
  const wos: WorkOrder[] = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
  return wos.map((w) => ({
    ...w,
    equipment: w.assetName, // legacy field compatibility
  })) as unknown as Ticket[];
};

const buildChecklistsMap = (tickets: Ticket[]) => {
  return tickets.reduce((acc, t) => {
    acc[t.id] = t.checklist || [];
    return acc;
  }, {} as Record<string, any[]>);
};

const buildTimelineMap = (tickets: Ticket[]) => {
  return tickets.reduce((acc, t) => {
    acc[t.id] = t.timeline || [];
    return acc;
  }, {} as Record<string, any[]>);
};

interface AppStore {
  isAuthenticated: boolean;
  userRole: UserRole;
  tickets: Ticket[];
  teamMembers: TeamMember[];
  equipment: Equipment[];
  timeline: Record<string, TimelineItem[]>;
  checklists: Record<string, any[]>;
  login: () => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  addTicket: (ticket: Omit<Ticket, 'id' | 'openedAt' | 'progress' | 'title' | 'assetName' | 'updatedAt' | 'checklist' | 'timeline'> & { summary?: string }) => void;
  resolveTicket: (id: string) => void;
  updateTicketStatus: (id: string, status: any) => void;
  addTimelineNote: (ticketId: string, action: string, by: string) => void;
  toggleChecklistItem: (ticketId: string, itemId: string) => void;
  refreshFromStorage: () => void;
}

export const useAppStore = create<AppStore>((set) => {
  const initialTickets = getStoredWorkOrders();
  const initialAssets = getStoredAssets();

  return {
    isAuthenticated: localStorage.getItem('cf_authenticated') === 'true',
    userRole: 'admin', // default for easy testing of RBAC features
    tickets: initialTickets,
    teamMembers: mockTeamMembers,
    equipment: initialAssets,
    timeline: buildTimelineMap(initialTickets),
    checklists: buildChecklistsMap(initialTickets),

    login: () => {
      localStorage.setItem('cf_authenticated', 'true');
      set({ isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('cf_authenticated');
      set({ isAuthenticated: false });
    },
    setUserRole: (role) => set({ userRole: role }),

    refreshFromStorage: () => {
      const tks = getStoredWorkOrders();
      const eqs = getStoredAssets();
      set({
        tickets: tks,
        equipment: eqs,
        timeline: buildTimelineMap(tks),
        checklists: buildChecklistsMap(tks),
      });
    },

    addTicket: (newTicketData) => set(() => {
      const newId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toISOString();
      
      const wos = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
      const newWo = {
        id: newId,
        title: newTicketData.summary || `Maintenance Request for ${newTicketData.equipment}`,
        description: newTicketData.description,
        assetId: newTicketData.assetId,
        assetName: newTicketData.equipment,
        location: newTicketData.location,
        status: 'assigned', // default state when submitted & assigned
        priority: newTicketData.priority,
        assignedTo: newTicketData.assignedTo,
        category: newTicketData.category,
        openedAt: now,
        updatedAt: now,
        slaDeadline: newTicketData.slaDeadline,
        progress: 0,
        checklist: [
          { id: 'chk-1', text: 'Verify sensor signals and electrical power levels', checked: false },
          { id: 'chk-2', text: 'Clean and inspect outer casing and connection ports', checked: false },
          { id: 'chk-3', text: 'Perform diagnostics self-test run', checked: false },
          { id: 'chk-4', text: 'Sign off calibration protocol and record log entry', checked: false }
        ],
        timeline: [
          {
            id: `t-created-${Date.now()}`,
            action: `Work Order created & assigned to ${newTicketData.assignedTo}`,
            by: 'System',
            time: now,
            color: 'info'
          }
        ]
      };

      wos.unshift(newWo);
      localStorage.setItem('cf_workorders', JSON.stringify(wos));
      
      // Update asset status
      const assets = JSON.parse(localStorage.getItem('cf_assets') || '[]');
      const updatedAssets = assets.map((eq: any) => {
        if (eq.id === newTicketData.assetId) {
          return {
            ...eq,
            status: newTicketData.priority === 'critical' ? 'critical' : 'pending',
            workOrderCount: (eq.workOrderCount || 0) + 1,
          };
        }
        return eq;
      });
      localStorage.setItem('cf_assets', JSON.stringify(updatedAssets));

      const updatedTickets = getStoredWorkOrders();
      return {
        tickets: updatedTickets,
        equipment: updatedAssets,
        timeline: buildTimelineMap(updatedTickets),
        checklists: buildChecklistsMap(updatedTickets),
      };
    }),

    resolveTicket: (id) => set(() => {
      const wos = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
      const idx = wos.findIndex((w: any) => w.id === id);
      if (idx === -1) return {};

      wos[idx].status = 'completed';
      wos[idx].updatedAt = new Date().toISOString();
      wos[idx].completedAt = new Date().toISOString();
      wos[idx].progress = 100;
      wos[idx].checklist = wos[idx].checklist.map((c: any) => ({ ...c, checked: true }));
      wos[idx].timeline.push({
        id: `t-res-${Date.now()}`,
        action: 'Work Order marked as COMPLETED',
        by: 'Marcus Vance',
        time: new Date().toISOString(),
        color: 'success',
      });

      localStorage.setItem('cf_workorders', JSON.stringify(wos));

      // Update asset status to operational
      const assets = JSON.parse(localStorage.getItem('cf_assets') || '[]');
      const updatedAssets = assets.map((eq: any) => {
        if (eq.id === wos[idx].assetId) {
          return { ...eq, status: 'operational' };
        }
        return eq;
      });
      localStorage.setItem('cf_assets', JSON.stringify(updatedAssets));

      const updatedTickets = getStoredWorkOrders();
      return {
        tickets: updatedTickets,
        equipment: updatedAssets,
        timeline: buildTimelineMap(updatedTickets),
        checklists: buildChecklistsMap(updatedTickets),
      };
    }),

    updateTicketStatus: (id, status) => set(() => {
      const wos = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
      const idx = wos.findIndex((w: any) => w.id === id);
      if (idx === -1) return {};

      wos[idx].status = status;
      wos[idx].updatedAt = new Date().toISOString();
      
      let color = 'warning';
      if (status === 'completed' || status === 'closed') {
        color = 'success';
        wos[idx].progress = 100;
        wos[idx].checklist = wos[idx].checklist.map((c: any) => ({ ...c, checked: true }));
      }
      wos[idx].timeline.push({
        id: `t-status-${Date.now()}`,
        action: `Status updated to ${status.toUpperCase().replace('_', ' ')}`,
        by: 'Marcus Vance',
        time: new Date().toISOString(),
        color,
      });

      localStorage.setItem('cf_workorders', JSON.stringify(wos));

      // Update asset status
      const assets = JSON.parse(localStorage.getItem('cf_assets') || '[]');
      const updatedAssets = assets.map((eq: any) => {
        if (eq.id === wos[idx].assetId) {
          let eqStatus = eq.status;
          if (status === 'completed' || status === 'closed') eqStatus = 'operational';
          else if (status === 'in_progress') eqStatus = 'maintenance';
          else if (status === 'waiting_part') eqStatus = 'pending';
          return { ...eq, status: eqStatus };
        }
        return eq;
      });
      localStorage.setItem('cf_assets', JSON.stringify(updatedAssets));

      const updatedTickets = getStoredWorkOrders();
      return {
        tickets: updatedTickets,
        equipment: updatedAssets,
        timeline: buildTimelineMap(updatedTickets),
        checklists: buildChecklistsMap(updatedTickets),
      };
    }),

    addTimelineNote: (ticketId, action, by) => set(() => {
      const wos = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
      const idx = wos.findIndex((w: any) => w.id === ticketId);
      if (idx === -1) return {};

      wos[idx].timeline.push({
        id: `t-note-${Date.now()}`,
        action,
        by,
        time: new Date().toISOString(),
        color: 'info',
      });
      wos[idx].updatedAt = new Date().toISOString();

      localStorage.setItem('cf_workorders', JSON.stringify(wos));
      
      const updatedTickets = getStoredWorkOrders();
      return {
        tickets: updatedTickets,
        timeline: buildTimelineMap(updatedTickets),
      };
    }),

    toggleChecklistItem: (ticketId, itemId) => set(() => {
      const wos = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
      const idx = wos.findIndex((w: any) => w.id === ticketId);
      if (idx === -1) return {};

      wos[idx].checklist = wos[idx].checklist.map((item: any) => {
        if (item.id === itemId) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });

      const checkedCount = wos[idx].checklist.filter((c: any) => c.checked).length;
      const totalCount = wos[idx].checklist.length;
      wos[idx].progress = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
      wos[idx].updatedAt = new Date().toISOString();

      localStorage.setItem('cf_workorders', JSON.stringify(wos));

      const updatedTickets = getStoredWorkOrders();
      return {
        tickets: updatedTickets,
        checklists: buildChecklistsMap(updatedTickets),
      };
    }),
  };
});
