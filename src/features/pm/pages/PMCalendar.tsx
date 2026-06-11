import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Topbar } from '../../../components/layout/Topbar';
import { PMCalendarView } from '../components/PMCalendarView';
import { PMCard } from '../components/PMCard';
import { PMChecklist } from '../components/PMChecklist';
import { useAppStore } from '../../../store/useAppStore';
import { RoleGuard } from '../../auth/RoleGuard';
import { PMStatusBadge } from '../components/PMStatusBadge';
import type { PMTask } from '../../../types';
import { 
  IconCalendar, 
  IconList, 
  IconPlus, 
  IconX, 
  IconUser, 
  IconMapPin, 
  IconFileText, 
  IconActivity,
  IconClock,
  IconCheck
} from '@tabler/icons-react';

export const PMCalendar: React.FC = () => {
  const location = useLocation();
  const { 
    pmTasks, 
    addPMTask, 
    reassignPMTask, 
    completePMTask, 
    equipment: assets, 
    teamMembers 
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');
  const [selectedTask, setSelectedTask] = useState<PMTask | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  useEffect(() => {
    if (location.state?.selectedTaskId) {
      const task = pmTasks.find((t) => t.id === location.state.selectedTaskId);
      if (task) {
        setSelectedTask(task);
        setIsDetailModalOpen(true);
      }
    }
  }, [location.state, pmTasks]);

  // New PM Task form state
  const [formAssetId, setFormAssetId] = useState('');
  const [formDate, setFormDate] = useState('2026-06-12T09:00');
  const [formTech, setFormTech] = useState('');
  const [formBranch, setFormBranch] = useState('Siam Square Branch');
  const [formType, setFormType] = useState('Safety & Calibration Audit');
  const [formDesc, setFormDesc] = useState('');

  const branches = [
    'Siam Square Branch',
    'Sukhumvit Branch',
    'Ari Branch',
    'Thonglor Branch',
    'Bangkok Head Office'
  ];

  const handlePlanPMSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find((a) => a.id === formAssetId);
    if (!asset) {
      alert('Please select a valid asset.');
      return;
    }

    addPMTask({
      assetId: asset.id,
      assetName: asset.name,
      type: formType,
      scheduledDate: new Date(formDate).toISOString(),
      assignedTech: formTech || teamMembers[0]?.name || 'Marcus Vance',
      branch: formBranch,
      description: formDesc || `Routine scheduled preventive maintenance for ${asset.name}.`
    });

    // Reset and close
    setFormAssetId('');
    setFormDesc('');
    setIsPlanModalOpen(false);
  };

  const handleCompletePM = (notes: string) => {
    if (!selectedTask) return;

    completePMTask(selectedTask.id, notes);
    
    alert(`Preventive Maintenance job ${selectedTask.id} signed off. Equipment health increased. Notes: "${notes}"`);
    setIsChecklistOpen(false);
    setSelectedTask(null);
  };

  const handleSelectTask = (task: PMTask) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const rightActions = (
    <RoleGuard permission="pm.schedule">
      <button
        onClick={() => {
          if (assets.length > 0) {
            setFormAssetId(assets[0].id);
          }
          if (teamMembers.length > 0) {
            setFormTech(teamMembers[0].name);
          }
          setIsPlanModalOpen(true);
        }}
        className="h-[36px] bg-primary hover:bg-[#086E72] text-white px-4 py-1.5 rounded-[6px] font-semibold text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer"
        aria-label="Create New PM Task Schedule"
      >
        <IconPlus size={16} stroke={2.5} />
        <span>Plan PM</span>
      </button>
    </RoleGuard>
  );

  const formatDateTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title="Preventive Maintenance"
        subtitle="Manage routine services, FDA inspections, compliance checklists, and calendars"
        rightActions={rightActions}
      />

      {/* Tabs Controller */}
      <div className="bg-surface border-b border-border-custom px-4 md:px-6 py-3.5 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 z-10 select-none">
        <div className="flex bg-bg p-0.5 rounded-[8px] border border-border-custom/50">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-[6px] text-[12.5px] font-semibold transition-all cursor-pointer ${activeTab === 'calendar'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
              }`}
          >
            <IconCalendar size={15} />
            <span>Calendar Grid</span>
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-[6px] text-[12.5px] font-semibold transition-all cursor-pointer ${activeTab === 'list'
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
              }`}
          >
            <IconList size={15} />
            <span>List Agenda</span>
          </button>
        </div>

        <div className="text-[12.5px] text-text-secondary flex items-center justify-center sm:justify-start gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-info" />
            <span>{pmTasks.filter(t => t.status === 'scheduled').length} Scheduled</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-critical animate-pulse" />
            <span>{pmTasks.filter(t => t.status === 'overdue').length} Overdue</span>
          </span>
        </div>
      </div>

      {/* Display Panel */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'calendar' ? (
          <PMCalendarView tasks={pmTasks} onSelectTask={handleSelectTask} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pmTasks.map((task) => (
              <PMCard
                key={task.id}
                task={task}
                onClick={() => handleSelectTask(task)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Plan PM Modal */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4 animate-fade-in select-none">
          <div className="w-full max-w-[520px] bg-surface border border-border-custom rounded-[16px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border-custom bg-bg/50 flex justify-between items-center">
              <div>
                <h3 className="text-[16px] font-semibold text-text-primary m-0 flex items-center gap-2">
                  <IconCalendar size={18} className="text-primary" />
                  <span>Plan PM Schedule</span>
                </h3>
                <p className="text-[11px] text-text-secondary m-0 mt-0.5">
                  Schedule routine compliance checks and calibration routines
                </p>
              </div>
              <button 
                onClick={() => setIsPlanModalOpen(false)}
                className="p-1 hover:bg-bg border border-border-custom/50 rounded-[6px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                <IconX size={16} stroke={2.5} />
              </button>
            </div>

            <form onSubmit={handlePlanPMSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-left">
              {/* Asset Select */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.5px]">
                  Select Asset / Equipment *
                </label>
                <select
                  required
                  value={formAssetId}
                  onChange={(e) => setFormAssetId(e.target.value)}
                  className="w-full p-2.5 border border-border-custom rounded-[8px] text-[13px] bg-bg focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="" disabled>-- Select Medical Device --</option>
                  {assets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      [{asset.id}] {asset.name} - {asset.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date & Time */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.5px]">
                    Schedule Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full p-2.5 border border-border-custom rounded-[8px] text-[13px] bg-bg focus:outline-none focus:border-primary cursor-pointer"
                  />
                </div>

                {/* Branch */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.5px]">
                    Target Branch *
                  </label>
                  <select
                    value={formBranch}
                    onChange={(e) => setFormBranch(e.target.value)}
                    className="w-full p-2.5 border border-border-custom rounded-[8px] text-[13px] bg-bg focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {branches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* PM Task Type */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.5px]">
                    PM Task Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder="e.g. Laser Power Check"
                    className="w-full p-2.5 border border-border-custom rounded-[8px] text-[13px] bg-bg focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Assigned Technician */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.5px]">
                    Assign Technician *
                  </label>
                  <select
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    className="w-full p-2.5 border border-border-custom rounded-[8px] text-[13px] bg-bg focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {teamMembers.map((tech) => (
                      <option key={tech.name} value={tech.name}>{tech.name} ({tech.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.5px]">
                  Description / Instruction
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Describe standard calibration parameters, required filters, or safety checklists..."
                  className="w-full p-2.5 border border-border-custom rounded-[8px] text-[13px] bg-bg focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-border-custom/50">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="h-[36px] px-4 border border-border-custom hover:bg-bg rounded-[6px] text-[12.5px] font-semibold text-text-secondary cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[36px] px-5 bg-primary hover:bg-[#086E72] rounded-[6px] text-[12.5px] font-semibold text-white cursor-pointer transition-colors"
                >
                  Schedule PM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PM Task Detail & Action Modal */}
      {isDetailModalOpen && selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4 animate-fade-in select-none">
          <div className="w-full max-w-[480px] bg-surface border border-border-custom rounded-[16px] shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-border-custom bg-bg/50 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-text-hint uppercase tracking-[0.5px] block">
                  Preventive Maintenance Task
                </span>
                <h3 className="text-[15px] font-semibold text-text-primary m-0 mt-0.5 flex items-center gap-2">
                  <span>{selectedTask.id}</span>
                  <PMStatusBadge status={selectedTask.status} size="sm" />
                </h3>
              </div>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 hover:bg-bg border border-border-custom/50 rounded-[6px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                <IconX size={16} stroke={2.5} />
              </button>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-4 text-left overflow-y-auto max-h-[70vh]">
              {/* Asset Box */}
              <div className="bg-bg/60 border border-border-custom/60 rounded-[10px] p-3.5 flex items-center gap-3">
                <div className="p-2 bg-primary-light rounded-[8px] text-primary">
                  <IconActivity size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-bold text-text-primary m-0 leading-tight">
                    {selectedTask.assetName}
                  </h4>
                  <span className="text-[11px] text-text-secondary font-mono mt-0.5 block">
                    Asset ID: {selectedTask.assetId}
                  </span>
                </div>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.5px] flex items-center gap-1">
                    <IconMapPin size={12} className="text-text-hint" />
                    <span>Branch / Branch Location</span>
                  </span>
                  <p className="text-[12.5px] font-medium text-text-primary mt-1 m-0">
                    {selectedTask.branch || 'Main Clinic (Ari)'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.5px] flex items-center gap-1">
                    <IconClock size={12} className="text-text-hint" />
                    <span>Scheduled Date</span>
                  </span>
                  <p className="text-[12.5px] font-medium text-text-primary mt-1 m-0">
                    {formatDateTime(selectedTask.scheduledDate)}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.5px] flex items-center gap-1">
                  <IconFileText size={12} className="text-text-hint" />
                  <span>PM Checklist Type</span>
                </span>
                <p className="text-[12.5px] font-semibold text-primary mt-1 m-0">
                  {selectedTask.type}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.5px]">
                  Description
                </span>
                <p className="text-[12px] text-text-secondary leading-relaxed mt-1 m-0 bg-bg p-2.5 rounded-[8px] border border-border-custom/30">
                  {selectedTask.description}
                </p>
              </div>

              {/* Reassignment System (Only if status is NOT completed) */}
              {selectedTask.status !== 'completed' ? (
                <div className="pt-3 border-t border-border-custom/50 space-y-2">
                  <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-[0.5px] flex items-center gap-1">
                    <IconUser size={13} className="text-primary" />
                    <span>Assign/Dispatch Technician</span>
                  </label>
                  <select
                    value={selectedTask.assignedTech}
                    onChange={(e) => {
                      reassignPMTask(selectedTask.id, e.target.value);
                      // Update local selectedTask reference to reflect immediate change
                      setSelectedTask({ ...selectedTask, assignedTech: e.target.value });
                    }}
                    className="w-full p-2.5 border border-border-custom rounded-[8px] text-[13px] bg-bg focus:outline-none focus:border-primary cursor-pointer font-medium"
                  >
                    {teamMembers.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name} ({t.role})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-text-hint leading-tight">
                    * Reassigning this PM schedule updates the technician's duty agenda instantly.
                  </p>
                </div>
              ) : (
                <div className="pt-3 border-t border-border-custom/50 space-y-2 bg-[#F6FAF7] border border-success/20 rounded-[8px] p-3 text-success">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.5px]">
                    <IconCheck size={14} className="text-success" />
                    <span>Completed Service Notes</span>
                  </div>
                  <p className="text-[12px] italic text-[#396312] m-0 font-medium">
                    "{selectedTask.notes || 'Routine PM completed with no issues reported.'}"
                  </p>
                  <div className="text-[10px] text-success/70 font-semibold">
                    Assigned Technician: {selectedTask.assignedTech}
                  </div>
                </div>
              )}

              {/* Action Rows */}
              <div className="flex justify-end gap-3 pt-3 border-t border-border-custom/50">
                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="h-[36px] px-4 border border-border-custom hover:bg-bg rounded-[6px] text-[12.5px] font-semibold text-text-secondary cursor-pointer transition-colors"
                >
                  Close
                </button>
                {selectedTask.status !== 'completed' && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      setIsChecklistOpen(true);
                    }}
                    className="h-[36px] px-4 bg-success hover:bg-[#2C520C] rounded-[6px] text-[12.5px] font-semibold text-white cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <span>Execute Checklist</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checklist execution Modal */}
      {isChecklistOpen && selectedTask && (
        <PMChecklist
          assetName={selectedTask.assetName}
          assetId={selectedTask.assetId}
          onClose={() => {
            setIsChecklistOpen(false);
            setSelectedTask(null);
          }}
          onComplete={handleCompletePM}
        />
      )}
    </div>
  );
};
