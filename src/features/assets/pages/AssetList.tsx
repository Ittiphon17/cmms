import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../../components/layout/Topbar';
import { AssetCard } from '../components/AssetCard';
import { useAppStore } from '../../../store/useAppStore';
import { RoleGuard } from '../../auth/RoleGuard';
import { IconSearch, IconFilter, IconPlus, IconX } from '@tabler/icons-react';

export const AssetList: React.FC = () => {
  const navigate = useNavigate();
  const equipment = useAppStore((state) => state.equipment);
  const teamMembers = useAppStore((state) => state.teamMembers);
  const addAsset = useAppStore((state) => state.addAsset);

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Register asset modal/slide-over state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Form states for registration
  const [formName, setFormName] = useState('');
  const [formDept, setFormDept] = useState('Facial Contouring');
  const [formId, setFormId] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formManufacturer, setFormManufacturer] = useState('');
  const [formSerial, setFormSerial] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formStatus, setFormStatus] = useState<'operational' | 'pending' | 'maintenance' | 'critical'>('operational');
  const [formTech, setFormTech] = useState('');
  const [formPurchaseDate, setFormPurchaseDate] = useState('');
  const [formLastService, setFormLastService] = useState('');
  const [formNextService, setFormNextService] = useState('');
  const [formUptime, setFormUptime] = useState('99.0');
  const [formHealthScore, setFormHealthScore] = useState('95');

  // Departments list
  const departments = ['All', 'Facial Contouring', 'Skincare', 'Body Firming'];

  // Status list
  const statuses = ['All', 'operational', 'pending', 'maintenance', 'critical'];

  // Helper to generate a suggested ID based on department selection
  const generateSuggestedId = (dept: string) => {
    let prefix = 'EQ-GEN';
    if (dept === 'Facial Contouring') prefix = 'EQ-FC';
    else if (dept === 'Skincare') prefix = 'EQ-SC';
    else if (dept === 'Body Firming') prefix = 'EQ-BF';

    const count = equipment.filter((eq) => eq.id.startsWith(prefix)).length;
    const nextNum = String(count + 1).padStart(3, '0');
    return `${prefix}-${nextNum}`;
  };

  // Reset form and set auto-suggested ID on modal open
  useEffect(() => {
    if (isRegisterOpen) {
      setFormName('');
      setFormDept('Facial Contouring');
      setFormModel('');
      setFormManufacturer('');
      setFormSerial('');
      setFormLocation('');
      setFormStatus('operational');
      setFormTech(teamMembers[0]?.name || 'Marcus Vance');
      setFormPurchaseDate(new Date().toISOString().split('T')[0]);
      setFormLastService(new Date().toISOString().split('T')[0]);
      setFormNextService(
        new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      );
      setFormUptime('99.0');
      setFormHealthScore('95');

      const initialId = generateSuggestedId('Facial Contouring');
      setFormId(initialId);
    }
  }, [isRegisterOpen, equipment, teamMembers]);

  const handleDeptChange = (dept: string) => {
    setFormDept(dept);
    setFormId(generateSuggestedId(dept));
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAsset = {
      id: formId.trim() || `EQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formName,
      status: formStatus,
      uptime: parseFloat(formUptime) || 100,
      healthScore: parseInt(formHealthScore) || 100,
      lastService: formLastService || new Date().toISOString().split('T')[0],
      nextService: formNextService || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: formLocation,
      department: formDept,
      serialNumber: formSerial,
      model: formModel,
      manufacturer: formManufacturer,
      purchaseDate: formPurchaseDate || new Date().toISOString().split('T')[0],
      assignedTech: formTech,
    };

    addAsset(newAsset);
    setIsRegisterOpen(false);
  };

  // Filtered Equipment List
  const filteredAssets = equipment.filter((eq) => {
    const matchesSearch = 
      eq.name.toLowerCase().includes(search.toLowerCase()) || 
      eq.id.toLowerCase().includes(search.toLowerCase()) ||
      eq.model.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDept === 'All' || eq.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || eq.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const rightActions = (
    <RoleGuard permission="asset.create">
      <button
        onClick={() => setIsRegisterOpen(true)}
        className="h-[36px] bg-primary hover:bg-[#086E72] text-white px-4 py-1.5 rounded-[6px] font-semibold text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer"
        aria-label="Register New Medical Asset"
      >
        <IconPlus size={16} stroke={2.5} />
        <span>Register asset</span>
      </button>
    </RoleGuard>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title="Asset Directory"
        subtitle="Manage and monitor clinical medical equipment and fleet health indices"
        rightActions={rightActions}
      />

      {/* Filter and Search Bar */}
      <div className="bg-surface border-b border-border-custom px-6 py-4 flex flex-col md:flex-row gap-4 justify-between items-center z-10 select-none">
        {/* Search */}
        <div className="relative w-full md:w-[280px]">
          <IconSearch size={16} className="absolute left-3 top-[11px] text-text-hint" />
          <input
            type="text"
            placeholder="Search by equipment, asset ID, or model..."
            className="w-full h-[38px] pl-9 pr-3 border border-border-custom rounded-[6px] text-[13.5px] bg-bg focus:outline-none focus:border-primary transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <IconFilter size={14} className="text-text-secondary flex-shrink-0" />
            <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-[0.3px]">Dept:</span>
            <select
              className="flex-1 sm:flex-none h-[38px] px-3 border border-border-custom rounded-[6px] text-[13px] text-text-primary bg-bg focus:outline-none focus:border-primary font-medium"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-[0.3px]">Status:</span>
            <select
              className="flex-1 sm:flex-none h-[38px] px-3 border border-border-custom rounded-[6px] text-[13px] text-text-primary bg-bg focus:outline-none focus:border-primary font-medium uppercase"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'ALL STATUSES' : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onClick={() => navigate(`/assets/${asset.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <h3 className="text-[16px] font-semibold text-text-primary m-0">No Assets Found</h3>
            <p className="text-[13px] text-text-secondary mt-1 max-w-[280px]">
              No medical equipment matched your search filters. Try adjusting your query or category filters.
            </p>
          </div>
        )}
      </div>

      {/* Register Asset Slide-over Drawer */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsRegisterOpen(false)}
            className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-[2px] transition-opacity duration-300"
          />
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-[540px] h-full bg-surface shadow-2xl border-l border-border-custom flex flex-col z-10 animate-slide-left text-left">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-custom bg-white">
              <div>
                <h2 className="text-[16px] font-bold text-text-primary m-0">Register New Medical Asset</h2>
                <p className="text-[12px] text-text-secondary mt-0.5 m-0">Add a medical machine to the active clinical fleet</p>
              </div>
              <button 
                onClick={() => setIsRegisterOpen(false)}
                className="p-1.5 hover:bg-bg rounded-[6px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleRegisterSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 bg-white">
              <div className="grid grid-cols-2 gap-4">
                {/* Name (Full width) */}
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Equipment / Machine Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HIFU 7D machine"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                
                {/* Department */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Department *
                  </label>
                  <select
                    required
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formDept}
                    onChange={(e) => handleDeptChange(e.target.value)}
                  >
                    <option value="Facial Contouring">Facial Contouring</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Body Firming">Body Firming</option>
                  </select>
                </div>
                
                {/* Asset ID */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5 flex items-center justify-between">
                    <span>Asset Tag ID *</span>
                    <span className="text-[10px] text-primary lowercase font-normal">auto-generated</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EQ-FC-004"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-mono font-medium"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                  />
                </div>
                
                {/* Model */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Model Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ultraformer III"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                  />
                </div>
                
                {/* Manufacturer */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Manufacturer *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Classys"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formManufacturer}
                    onChange={(e) => setFormManufacturer(e.target.value)}
                  />
                </div>
                
                {/* Serial Number */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Serial Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HF-7D-2026A"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-mono font-medium"
                    value={formSerial}
                    onChange={(e) => setFormSerial(e.target.value)}
                  />
                </div>
                
                {/* Location */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Location / Room *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Facial Care Room A"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                  />
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Initial Status *
                  </label>
                  <select
                    required
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                  >
                    <option value="operational">Operational</option>
                    <option value="pending">Pending</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                {/* Assigned Tech */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Assigned Technician *
                  </label>
                  <select
                    required
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                  >
                    {teamMembers.map((tech) => (
                      <option key={tech.name} value={tech.name}>
                        {tech.name} ({tech.role.split(' ')[0]})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Purchase Date */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Purchase Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formPurchaseDate}
                    onChange={(e) => setFormPurchaseDate(e.target.value)}
                  />
                </div>
                
                {/* Last Service Date */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Last Service Date
                  </label>
                  <input
                    type="date"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formLastService}
                    onChange={(e) => setFormLastService(e.target.value)}
                  />
                </div>
                
                {/* Next Service Date */}
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Next Scheduled PM
                  </label>
                  <input
                    type="date"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formNextService}
                    onChange={(e) => setFormNextService(e.target.value)}
                  />
                </div>
                
                {/* Uptime (%) */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Target Uptime (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formUptime}
                    onChange={(e) => setFormUptime(e.target.value)}
                  />
                </div>
                
                {/* Health Score */}
                <div>
                  <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] mb-1.5">
                    Initial Health Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary transition-all font-medium"
                    value={formHealthScore}
                    onChange={(e) => setFormHealthScore(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-border-custom/60">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="h-[38px] border border-border-custom hover:bg-bg text-text-primary px-4 py-2 rounded-[6px] font-semibold text-[13px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[38px] bg-primary hover:bg-[#086E72] text-white px-5 py-2 rounded-[6px] font-semibold text-[13px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

