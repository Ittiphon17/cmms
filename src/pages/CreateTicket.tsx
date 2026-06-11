import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../components/layout/Topbar';
import { PrioritySelector } from '../components/forms/PrioritySelector';
import { AssetSelector } from '../components/forms/AssetSelector';
import { useAppStore } from '../store/useAppStore';
import type { TicketPriority } from '../types';


export const CreateTicket: React.FC = () => {
  const navigate = useNavigate();
  const { equipment, teamMembers, addTicket } = useAppStore();

  // Form states
  const [selectedEqId, setSelectedEqId] = useState('');
  const [assetId, setAssetId] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('normal');
  
  const [category, setCategory] = useState('Hardware Failure');
  const [assignedTo, setAssignedTo] = useState('Marcus Vance');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  // Prefill details when equipment is selected
  useEffect(() => {
    if (selectedEqId) {
      const eq = equipment.find((e) => e.id === selectedEqId);
      if (eq) {
        setAssetId(eq.id);
        // Find a matching ticket location or set general location based on name
        const locationMap: Record<string, string> = {
          'EQ-FC-001': 'Facial Care Room A',
          'EQ-FC-002': 'Therapy Room 3',
          'EQ-FC-003': 'VIP Treatment Suite',
          'EQ-SC-001': 'Laser Room 1',
          'EQ-SC-002': 'Laser Room 2',
          'EQ-SC-003': 'Skin Treatment Bed 4',
          'EQ-SC-004': 'Therapy Room 5',
          'EQ-BF-001': 'Body Contouring Room B',
        };
        setLocation(locationMap[eq.id] || 'General Ward');
      }
    }
  }, [selectedEqId, equipment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eqName = equipment.find((e) => e.id === selectedEqId)?.name || 'Unknown Equipment';

    // Calculate SLA Deadline based on priority
    const now = new Date();
    let hoursToAdd = 24;
    if (priority === 'critical') hoursToAdd = 4;
    else if (priority === 'high') hoursToAdd = 8;
    else if (priority === 'low') hoursToAdd = 72;
    
    const slaDate = new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000);

    // Call store action
    addTicket({
      equipment: eqName,
      assetId: assetId || 'EQ-GENERIC',
      location: location || 'General Ward',
      status: (priority === 'critical' ? 'critical' : 'pending') as any,
      priority,
      assignedTo,
      category,
      description: `${summary}. ${description}`.trim(),
      slaDeadline: slaDate.toISOString(),
    });

    // Redirect to /tickets/2847 as per prompt requirement
    navigate('/tickets/2847');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title="Create Ticket"
        subtitle="Submit a new biomedical equipment maintenance request"
        backLink="/dashboard"
      />

      {/* Page Content (Scrollable form) */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Equipment & Priority details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Equipment Details Card */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-4">
              <h3 className="text-[16px] font-semibold text-text-primary m-0">
                Equipment Details
              </h3>

              <div>
                <label 
                  htmlFor="equipment-select" 
                  className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
                >
                  Select Asset
                </label>
                <AssetSelector
                  equipment={equipment}
                  selectedEqId={selectedEqId}
                  onSelectEqId={setSelectedEqId}
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="asset-id" 
                  className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
                >
                  Asset ID
                </label>
                <input
                  id="asset-id"
                  type="text"
                  required
                  readOnly
                  placeholder="Asset ID will auto-populate"
                  className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[14px] text-text-secondary bg-[#F1F5F9] cursor-not-allowed focus:outline-none"
                  value={assetId}
                />
              </div>

              <div>
                <label 
                  htmlFor="location" 
                  className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
                >
                  Location / Room
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  placeholder="e.g. ICU - Bed 4"
                  className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[14px] text-text-primary bg-bg focus:outline-none focus:border-primary"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Priority Selector Card */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-4">
              <div>
                <h3 className="text-[16px] font-semibold text-text-primary m-0">
                  Priority Urgency
                </h3>
                <p className="text-[12px] text-text-secondary mt-1 m-0">
                  Critical priority enforces a 4-hour SLA response.
                </p>
              </div>
              <PrioritySelector value={priority} onChange={setPriority} />
            </div>

          </div>

          {/* Right Column - Core description & assignment details */}
          <div className="lg:col-span-7 bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-[16px] font-semibold text-text-primary m-0">
                Ticket Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="category" 
                    className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[14px] text-text-primary bg-bg focus:outline-none focus:border-primary"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Hardware Failure</option>
                    <option>Power Supply</option>
                    <option>Routine PM</option>
                    <option>Software Issue</option>
                    <option>Calibration</option>
                    <option>Electrical Safety Check</option>
                  </select>
                </div>

                <div>
                  <label 
                    htmlFor="assigned-tech" 
                    className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
                  >
                    Assign to Technician
                  </label>
                  <select
                    id="assigned-tech"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[14px] text-text-primary bg-bg focus:outline-none focus:border-primary"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  >
                    {teamMembers.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name} ({m.role.split(' ')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label 
                  htmlFor="summary" 
                  className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
                >
                  Summary / Short Title
                </label>
                <input
                  id="summary"
                  type="text"
                  required
                  placeholder="e.g. Helium pressure warning sensor alert"
                  className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[14px] text-text-primary bg-bg focus:outline-none focus:border-primary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div>
                <label 
                  htmlFor="details" 
                  className="block text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-1.5"
                >
                  Detailed Description & Troubleshooting Notes
                </label>
                <textarea
                  id="details"
                  rows={5}
                  required
                  placeholder="Provide clinical context, error codes showing on unit, patient status impact, and any troubleshooting attempts made..."
                  className="w-full p-3 border border-border-custom rounded-[6px] text-[14px] text-text-primary bg-bg focus:outline-none focus:border-primary resize-y"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-custom/60">
              <button
                type="button"
                onClick={handleCancel}
                className="h-[38px] border border-border-custom hover:bg-bg text-text-primary px-4 py-2 rounded-[6px] font-semibold text-[13px] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-[38px] bg-primary hover:bg-[#086E72] text-white px-5 py-2 rounded-[6px] font-semibold text-[13px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                Submit ticket
              </button>
            </div>

          </div>

        </div>
      </form>
    </div>
  );
};
