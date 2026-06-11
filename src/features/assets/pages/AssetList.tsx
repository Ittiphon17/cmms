import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../../components/layout/Topbar';
import { AssetCard } from '../components/AssetCard';
import { useAppStore } from '../../../store/useAppStore';
import { RoleGuard } from '../../auth/RoleGuard';
import { IconSearch, IconFilter, IconPlus } from '@tabler/icons-react';


export const AssetList: React.FC = () => {
  const navigate = useNavigate();
  const equipment = useAppStore((state) => state.equipment);

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Departments list
  const departments = ['All', 'Radiology', 'Cardiology', 'ICU', 'Pediatrics'];

  // Status list
  const statuses = ['All', 'operational', 'pending', 'maintenance', 'critical'];

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

  const handleRegisterAsset = () => {
    alert('Create Asset Modal/Page is under construction. Initial clinical asset fleet is seeded.');
  };

  const rightActions = (
    <RoleGuard permission="asset.create">
      <button
        onClick={handleRegisterAsset}
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
    </div>
  );
};
