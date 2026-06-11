import type { WorkOrder, WorkOrderStatus } from '../types';
import { seedMockData } from './mockDataSeeder';

seedMockData();

export const workorderApi = {
  getWorkOrders: async (): Promise<WorkOrder[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return JSON.parse(localStorage.getItem('cf_workorders') || '[]');
  },

  getWorkOrderById: async (id: string): Promise<WorkOrder | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const wos: WorkOrder[] = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
    return wos.find((w) => w.id === id) || null;
  },

  createWorkOrder: async (wo: Omit<WorkOrder, 'id' | 'openedAt' | 'updatedAt' | 'progress' | 'checklist' | 'timeline'>): Promise<WorkOrder> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const wos: WorkOrder[] = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
    
    // Assign a new ID matching old format if needed, else new format
    const newId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newWo: WorkOrder = {
      ...wo,
      id: newId,
      openedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      checklist: [
        { id: 'chk-1', text: 'Inspect and clean electrical connections', checked: false },
        { id: 'chk-2', text: 'Verify sensor calibration parameters', checked: false },
        { id: 'chk-3', text: 'Run self-test diagnostic routines', checked: false },
        { id: 'chk-4', text: 'Document final validation results', checked: false },
      ],
      timeline: [
        {
          id: `t-created-${Date.now()}`,
          action: `Work Order created by ${wo.assignedTo || 'System'}`,
          by: 'System',
          time: new Date().toISOString(),
          color: 'info',
        },
      ],
    };

    wos.unshift(newWo);
    localStorage.setItem('cf_workorders', JSON.stringify(wos));
    return newWo;
  },

  updateWorkOrderStatus: async (id: string, status: WorkOrderStatus): Promise<WorkOrder> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const wos: WorkOrder[] = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
    const idx = wos.findIndex((w) => w.id === id);
    if (idx === -1) throw new Error('Work Order not found');

    wos[idx].status = status;
    wos[idx].updatedAt = new Date().toISOString();
    wos[idx].timeline.push({
      id: `t-status-${Date.now()}`,
      action: `Status updated to ${status.toUpperCase().replace('_', ' ')}`,
      by: 'Marcus Vance',
      time: new Date().toISOString(),
      color: status === 'completed' || status === 'closed' ? 'success' : 'warning',
    });

    if (status === 'completed') {
      wos[idx].completedAt = new Date().toISOString();
      wos[idx].progress = 100;
      wos[idx].checklist = wos[idx].checklist.map(c => ({ ...c, checked: true }));
    } else if (status === 'closed') {
      wos[idx].closedAt = new Date().toISOString();
    }

    localStorage.setItem('cf_workorders', JSON.stringify(wos));
    return wos[idx];
  },

  addWorkOrderTimelineNote: async (id: string, action: string, by: string): Promise<WorkOrder> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const wos: WorkOrder[] = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
    const idx = wos.findIndex((w) => w.id === id);
    if (idx === -1) throw new Error('Work Order not found');

    wos[idx].timeline.push({
      id: `t-note-${Date.now()}`,
      action,
      by,
      time: new Date().toISOString(),
      color: 'info',
    });
    wos[idx].updatedAt = new Date().toISOString();

    localStorage.setItem('cf_workorders', JSON.stringify(wos));
    return wos[idx];
  },

  toggleWorkOrderChecklistItem: async (id: string, itemId: string): Promise<WorkOrder> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const wos: WorkOrder[] = JSON.parse(localStorage.getItem('cf_workorders') || '[]');
    const idx = wos.findIndex((w) => w.id === id);
    if (idx === -1) throw new Error('Work Order not found');

    wos[idx].checklist = wos[idx].checklist.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    const checkedCount = wos[idx].checklist.filter(c => c.checked).length;
    const totalCount = wos[idx].checklist.length;
    wos[idx].progress = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 100;
    wos[idx].updatedAt = new Date().toISOString();

    localStorage.setItem('cf_workorders', JSON.stringify(wos));
    return wos[idx];
  },
};
