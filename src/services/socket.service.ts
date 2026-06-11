import { useNotificationStore } from '../store/notificationStore';
import type { NotificationType } from '../types';

type SocketCallback = (data: any) => void;

class SocketService {
  private listeners: Record<string, SocketCallback[]> = {};
  private intervalId: any = null;

  connect() {
    console.log('[Socket] Connected to real-time telemetry stream');
    this.startMockAlerts();
  }

  disconnect() {
    console.log('[Socket] Disconnected');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  on(event: string, callback: SocketCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: SocketCallback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }

  emit(event: string, data: any) {
    console.log(`[Socket] Emit event: ${event}`, data);
  }

  private trigger(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(data));
    }
  }

  private startMockAlerts() {
    // Generate a simulated telemetry or staff notification alert every 45 seconds
    const alertTemplates = [
      {
        type: 'new_work_order' as NotificationType,
        title: 'New Work Order Assigned',
        message: 'Critical Work Order WO-5928 created: Philips Tempus LS Defibrillator is offline.',
        targetId: 'TK-9582',
      },
      {
        type: 'status_change' as NotificationType,
        title: 'Work Order Completed',
        message: 'Technician Elena Rostova marked WO-4839 (Baxter Infusion Pump) as COMPLETED.',
        targetId: 'TK-4839',
      },
      {
        type: 'overdue_sla' as NotificationType,
        title: 'SLA Overdue Escalation',
        message: 'Warning: Dräger Evita Ventilator WO-1204 is within 30 minutes of SLA breach!',
        targetId: 'TK-1204',
      },
      {
        type: 'pm_reminder' as NotificationType,
        title: 'Preventive Maintenance Reminder',
        message: 'Scheduled PM for Olympus CV-190 Endoscopy Tower is due in 2 days.',
        targetId: 'TK-5512',
      },
      {
        type: 'comment_added' as NotificationType,
        title: 'Comment Added',
        message: 'Marcus Vance added a maintenance note on GE Signa MRI: "Cryostat coolant recharge arrived."',
        targetId: 'TK-2847',
      },
    ];

    // Run first alert 15 seconds after connect, then every 45s
    setTimeout(() => {
      this.triggerAlert(alertTemplates);
    }, 15000);

    this.intervalId = setInterval(() => {
      this.triggerAlert(alertTemplates);
    }, 45000);
  }

  private triggerAlert(templates: Array<{ type: NotificationType; title: string; message: string; targetId: string }>) {
    const randomAlert = templates[Math.floor(Math.random() * templates.length)];
    
    // 1. Add notification to Zustand store
    useNotificationStore.getState().addNotification({
      type: randomAlert.type,
      title: randomAlert.title,
      message: randomAlert.message,
      targetId: randomAlert.targetId,
    });

    // 2. Trigger local socket listeners
    this.trigger('notification', randomAlert);
    
    // 3. Dispatch global DOM Event to show user-friendly in-app toast overlays
    const customEvent = new CustomEvent('cf_notification', { detail: randomAlert });
    window.dispatchEvent(customEvent);
  }
}

export const socketService = new SocketService();
