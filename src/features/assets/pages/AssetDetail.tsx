import React from 'react';
import { useParams } from 'react-router-dom';
import { Topbar } from '../../../components/layout/Topbar';
import { AssetStatusBadge } from '../components/AssetStatusBadge';
import { AssetHealthScore } from '../components/AssetHealthScore';
import { AssetTimeline } from '../components/AssetTimeline';
import { AssetMaintenanceHistory } from '../components/AssetMaintenanceHistory';
import { useAppStore } from '../../../store/useAppStore';
import { IconCpu, IconTag } from '@tabler/icons-react';

export const AssetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const equipment = useAppStore((state) => state.equipment);

  const asset = equipment.find((eq) => eq.id === id);

  if (!asset) {
    return (
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title="Asset Not Found" subtitle="Error finding equipment specs" backLink="/assets" />
        <div className="p-6 text-center text-text-secondary">
          The requested equipment ID "{id}" could not be found in the database.
        </div>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title={asset.name}
        subtitle={`${asset.department} Department · ${asset.location}`}
        backLink="/assets"
        badge={<AssetStatusBadge status={asset.status} size="sm" />}
      />

      {/* Page Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Asset Specifications */}
          <div className="lg:col-span-6 space-y-6">
            {/* Health and telemetry summary */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-between">
              <AssetHealthScore score={asset.healthScore} size="lg" />
              
              <div className="text-right">
                <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px]">Equipment Uptime</span>
                <h4 className="text-[28px] font-bold text-success mt-1 m-0 leading-none">
                  {asset.uptime}%
                </h4>
                <p className="text-[11px] text-text-hint mt-1.5 m-0 leading-none">Target: 98.0%</p>
              </div>
            </div>

            {/* Asset Specs details */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-5">
              <h3 className="text-[15px] font-semibold text-text-primary m-0 flex items-center gap-1.5 pb-3 border-b border-border-custom/50">
                <IconCpu size={16} className="text-primary" />
                <span>Asset Technical Specifications</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-[14px]">
                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Manufacturer
                  </div>
                  <div className="text-text-primary font-medium">
                    {asset.manufacturer}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Model Name
                  </div>
                  <div className="text-text-primary font-medium">
                    {asset.model}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Serial Number
                  </div>
                  <div className="text-text-primary font-mono font-medium truncate">
                    {asset.serialNumber}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Asset Tag ID
                  </div>
                  <div className="text-primary font-mono font-semibold">
                    {asset.id}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Purchase Date
                  </div>
                  <div className="text-text-primary font-medium">
                    {formatDate(asset.purchaseDate)}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Assigned Technician
                  </div>
                  <div className="text-text-primary font-medium">
                    {asset.assignedTech}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Last Maintenance
                  </div>
                  <div className="text-text-primary font-medium">
                    {formatDate(asset.lastService)}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Next Scheduled PM
                  </div>
                  <div className="text-text-primary font-medium">
                    {formatDate(asset.nextService)}
                  </div>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="pt-4 border-t border-border-custom/50 flex flex-wrap gap-2">
                <span className="text-[11.5px] bg-primary-light text-primary-dark font-medium px-2.5 py-0.5 rounded-[4px] border border-primary/10 flex items-center gap-1">
                  <IconTag size={12} />
                  <span>Clinical Device</span>
                </span>
                <span className="text-[11.5px] bg-info-bg text-info-text font-medium px-2.5 py-0.5 rounded-[4px] border border-info/10">
                  Class II Medical
                </span>
                <span className="text-[11.5px] bg-bg border border-border-custom text-text-secondary font-medium px-2.5 py-0.5 rounded-[4px]">
                  FDA Compliant
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Maintenance History & System Logs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Telemetry Logs */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <AssetTimeline assetId={asset.id} />
            </div>

            {/* Maintenance History */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <AssetMaintenanceHistory assetId={asset.id} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
