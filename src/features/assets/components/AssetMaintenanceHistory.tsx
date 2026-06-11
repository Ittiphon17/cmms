import React from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { IconCalendar, IconChevronRight } from '@tabler/icons-react';

interface AssetMaintenanceHistoryProps {
  assetId: string;
}

export const AssetMaintenanceHistory: React.FC<AssetMaintenanceHistoryProps> = ({ assetId }) => {
  const navigate = useNavigate();
  const tickets = useAppStore((state) => state.tickets);
  
  // Filter work orders associated with this specific asset
  const history = tickets.filter((t) => t.assetId === assetId);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-text-primary m-0">
          Work Orders & PM History
        </h3>
        <span className="text-[12px] text-text-secondary">
          {history.length} records total
        </span>
      </div>

      <div className="space-y-2.5">
        {history.length > 0 ? (
          history.map((wo) => (
            <button
              key={wo.id}
              onClick={() => navigate(`/tickets/${wo.id}`)}
              className="w-full p-4 border border-border-custom bg-surface hover:bg-bg/40 rounded-[8px] flex items-center justify-between text-left cursor-pointer transition-colors group"
            >
              <div className="min-w-0 pr-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-[4px] border border-primary/10">
                    {wo.id}
                  </span>
                  <StatusBadge status={wo.status} size="sm" />
                </div>
                
                <h4 className="text-[13px] font-semibold text-text-primary truncate m-0">
                  {wo.title}
                </h4>
                
                <div className="flex items-center gap-3 text-[11px] text-text-secondary">
                  <span className="flex items-center gap-1">
                    <IconCalendar size={12} className="text-text-hint" />
                    <span>Opened: {formatDate(wo.openedAt)}</span>
                  </span>
                  
                  <span>Assigned to: <span className="font-semibold text-text-primary">{wo.assignedTo}</span></span>
                </div>
              </div>

              <div className="p-1 rounded-[4px] group-hover:text-primary transition-colors text-text-hint">
                <IconChevronRight size={16} stroke={2.5} />
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-text-secondary py-6 border border-dashed border-border-custom rounded-[8px] bg-bg/25">
            No work order history recorded for this asset.
          </div>
        )}
      </div>
    </div>
  );
};
