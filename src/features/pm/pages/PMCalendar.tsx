import React, { useState } from 'react';
import { Topbar } from '../../../components/layout/Topbar';
import { PMCalendarView } from '../components/PMCalendarView';
import { PMCard } from '../components/PMCard';
import type { PMTask } from '../components/PMCard';
import { PMChecklist } from '../components/PMChecklist';
import { useAppStore } from '../../../store/useAppStore';
import { RoleGuard } from '../../auth/RoleGuard';
import { IconCalendar, IconList, IconPlus } from '@tabler/icons-react';

export const PMCalendar: React.FC = () => {


  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');
  const [selectedTask, setSelectedTask] = useState<PMTask | null>(null);

  // Initial list of preventive maintenance scheduled tasks for June 2026
  const [pmTasks, setPmTasks] = useState<PMTask[]>([
    {
      id: 'PM-101',
      assetId: 'EQ-FC-002',
      assetName: 'Ultra F (Ultra HIFU) machine',
      type: 'Transducer Calibration',
      status: 'scheduled',
      scheduledDate: '2026-06-18T09:00:00Z',
      assignedTech: 'Marcus Vance',
      description: 'Scheduled semi-annual high-intensity ultrasound transducer calibration and coupling verification.',
    },
    {
      id: 'PM-102',
      assetId: 'EQ-FC-003',
      assetName: 'RF 5D machine',
      type: 'Handpiece Verification',
      status: 'overdue',
      scheduledDate: '2026-06-10T10:00:00Z',
      assignedTech: 'Elena Rostova',
      description: 'Annual electrical safety test, RF handpiece electrode pins check, and impedance feedback testing.',
    },
    {
      id: 'PM-103',
      assetId: 'EQ-SC-001',
      assetName: 'Q-Switch Laser machine',
      type: 'Laser Power Output Check',
      status: 'scheduled',
      scheduledDate: '2026-06-11T08:00:00Z',
      assignedTech: 'Sarah Chen',
      description: 'Scheduled Q-switch flashlamp trigger voltage test and alignment of guide beam optic path.',
    },
    {
      id: 'PM-104',
      assetId: 'EQ-SC-002',
      assetName: 'Diode Laser machine',
      type: 'Cooling System Audit',
      status: 'scheduled',
      scheduledDate: '2026-06-12T14:00:00Z',
      assignedTech: 'Elena Rostova',
      description: 'Standard diode laser chill-tip thermoelectric cooling check and chiller water level verification.',
    },
    {
      id: 'PM-105',
      assetId: 'EQ-SC-003',
      assetName: 'Supersonic Vitamin Infusion machine',
      type: 'Transducer Head Test',
      status: 'completed',
      scheduledDate: '2026-06-05T09:00:00Z',
      assignedTech: 'Marcus Vance',
      description: 'Perform ultrasound transducer head integrity checks, clean probe contact, and run frequency validation sweep.',
    },
  ]);

  const handleCompletePM = (notes: string) => {
    if (!selectedTask) return;

    // 1. Update status locally
    setPmTasks(
      pmTasks.map((t) => (t.id === selectedTask.id ? { ...t, status: 'completed' } : t))
    );

    // 2. Reflect in global asset registry health score
    const assets = JSON.parse(localStorage.getItem('cf_assets') || '[]');
    const updated = assets.map((eq: any) => {
      if (eq.id === selectedTask.assetId) {
        return {
          ...eq,
          status: 'operational',
          healthScore: Math.min(eq.healthScore + 10, 100), // boost health score upon PM compliance check
          lastService: new Date().toISOString().split('T')[0],
        };
      }
      return eq;
    });
    localStorage.setItem('cf_assets', JSON.stringify(updated));

    // Refresh store to sync assets list
    useAppStore.getState().refreshFromStorage();

    alert(`Preventive Maintenance job ${selectedTask.id} signed off. Equipment health increased. Notes: "${notes}"`);
    setSelectedTask(null);
  };

  const handlePlanPM = () => {
    alert('Plan PM Schedule modal loaded. Standard templates are compliant.');
  };

  const rightActions = (
    <RoleGuard permission="pm.schedule">
      <button
        onClick={handlePlanPM}
        className="h-[36px] bg-primary hover:bg-[#086E72] text-white px-4 py-1.5 rounded-[6px] font-semibold text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer"
        aria-label="Create New PM Task Schedule"
      >
        <IconPlus size={16} stroke={2.5} />
        <span>Plan PM</span>
      </button>
    </RoleGuard>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title="Preventive Maintenance"
        subtitle="Manage routine services, FDA inspections, compliance checklists, and calendars"
        rightActions={rightActions}
      />

      {/* Tabs Controller */}
      <div className="bg-surface border-b border-border-custom px-6 py-3.5 flex justify-between items-center z-10 select-none">
        <div className="flex bg-bg p-0.5 rounded-[8px] border border-border-custom/50">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[6px] text-[12.5px] font-semibold transition-all cursor-pointer ${activeTab === 'calendar'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
              }`}
          >
            <IconCalendar size={15} />
            <span>Calendar Grid</span>
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[6px] text-[12.5px] font-semibold transition-all cursor-pointer ${activeTab === 'list'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
              }`}
          >
            <IconList size={15} />
            <span>List Agenda</span>
          </button>
        </div>

        <div className="text-[12.5px] text-text-secondary flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-info" />
            <span>{pmTasks.filter(t => t.status === 'scheduled').length} Scheduled</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-critical" />
            <span>{pmTasks.filter(t => t.status === 'overdue').length} Overdue</span>
          </span>
        </div>
      </div>

      {/* Display Panel */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'calendar' ? (
          <PMCalendarView tasks={pmTasks} onSelectTask={setSelectedTask} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pmTasks.map((task) => (
              <PMCard
                key={task.id}
                task={task}
                onClick={() => setSelectedTask(task)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Checklist execution Modal */}
      {selectedTask && (
        <PMChecklist
          assetName={selectedTask.assetName}
          assetId={selectedTask.assetId}
          onClose={() => setSelectedTask(null)}
          onComplete={handleCompletePM}
        />
      )}
    </div>
  );
};
