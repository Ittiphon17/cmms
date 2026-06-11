import React from 'react';
import type { Asset } from '../../../types';
import { AssetStatusBadge } from './AssetStatusBadge';
import { AssetHealthScore } from './AssetHealthScore';
import { IconMapPin, IconChevronRight, IconActivity } from '@tabler/icons-react';

interface AssetCardProps {
  asset: Asset;
  onClick: () => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-surface border border-border-custom hover:border-primary/40 rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(13,133,138,0.08)] flex flex-col justify-between gap-4 transition-all cursor-pointer group"
    >
      {/* Header Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors truncate m-0">
              {asset.name}
            </h3>
            <p className="text-[11px] font-mono text-text-secondary mt-0.5 m-0">
              {asset.id} · {asset.model}
            </p>
          </div>
          <AssetStatusBadge status={asset.status} size="sm" />
        </div>
      </div>

      {/* Health Gauge & Uptime */}
      <div className="grid grid-cols-2 gap-4 py-1 border-t border-b border-border-custom/50">
        <AssetHealthScore score={asset.healthScore} size="sm" />
        
        <div className="flex flex-col justify-center text-right">
          <span className="text-[11px] font-semibold text-text-secondary m-0 leading-none">Uptime</span>
          <span className="text-[15px] font-bold text-success mt-1.5 leading-none">
            {asset.uptime}%
          </span>
        </div>
      </div>

      {/* Location, Active WOs, and Action button */}
      <div className="flex items-center justify-between text-[12.5px] text-text-secondary mt-1">
        <div className="flex items-center gap-1 min-w-0">
          <IconMapPin size={14} className="text-text-hint flex-shrink-0" />
          <span className="truncate">{asset.location}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="font-semibold text-primary-dark bg-primary-light px-2 py-0.5 rounded-[4px] border border-primary/10 flex items-center gap-1 text-[11px]">
            <IconActivity size={12} />
            <span>{asset.workOrderCount} requests</span>
          </span>
          
          <div className="p-1 rounded-[4px] hover:bg-bg text-text-secondary group-hover:text-primary transition-all">
            <IconChevronRight size={16} stroke={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
};
