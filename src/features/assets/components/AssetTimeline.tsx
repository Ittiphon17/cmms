import React from 'react';
import { IconSettings, IconAlertTriangle, IconActivity, IconInfoCircle } from '@tabler/icons-react';

interface TimelineEvent {
  id: string;
  action: string;
  by: string;
  time: string;
  type: 'telemetry' | 'status' | 'alert' | 'info';
}

interface AssetTimelineProps {
  assetId: string;
}

export const AssetTimeline: React.FC<AssetTimelineProps> = ({ assetId: _assetId }) => {
  // Mock asset events
  const events: TimelineEvent[] = [
    {
      id: 'evt-1',
      action: 'Periodic Calibration Telemetry Completed',
      by: 'Telemetry System',
      time: '2026-06-09T08:00:00Z',
      type: 'telemetry',
    },
    {
      id: 'evt-2',
      action: 'Liquid Helium Pressure Threshold Check Passed',
      by: 'Sensor Probe HL-3',
      time: '2026-06-08T14:30:00Z',
      type: 'info',
    },
    {
      id: 'evt-3',
      action: 'Power Rail Micro-voltage Warning Resolved',
      by: 'Elena Rostova',
      time: '2026-06-01T11:15:00Z',
      type: 'status',
    },
    {
      id: 'evt-4',
      action: 'Emergency Temperature Rise Fault Triggered',
      by: 'System Alert Engine',
      time: '2026-05-15T09:40:00Z',
      type: 'alert',
    },
  ];

  const getIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'alert':
        return <IconAlertTriangle size={14} className="text-critical" />;
      case 'telemetry':
        return <IconActivity size={14} className="text-primary" />;
      case 'status':
        return <IconSettings size={14} className="text-warning" />;
      default:
        return <IconInfoCircle size={14} className="text-info" />;
    }
  };

  const getBorderColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'alert': return 'border-critical/20 bg-critical-bg/20';
      case 'telemetry': return 'border-primary/20 bg-primary-light/40';
      case 'status': return 'border-warning/20 bg-warning-bg/20';
      default: return 'border-info/20 bg-info-bg/20';
    }
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-[15px] font-semibold text-text-primary mb-3 m-0">
        Asset Telemetry & System Logs
      </h3>

      <div className="relative pl-6 border-l border-border-custom/80 space-y-4 ml-3">
        {events.map((evt) => (
          <div key={evt.id} className="relative">
            {/* Left Dot Icon Indicator */}
            <span className={`absolute -left-[33px] top-1 w-6 h-6 rounded-full border flex items-center justify-center shadow-sm ${getBorderColor(evt.type)}`}>
              {getIcon(evt.type)}
            </span>

            <div>
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-[13px] font-semibold text-text-primary m-0">
                  {evt.action}
                </h4>
                <span className="text-[10px] text-text-hint font-medium uppercase">
                  {formatDate(evt.time)}
                </span>
              </div>
              <p className="text-[11px] text-text-secondary m-0 mt-0.5 leading-none">
                Log entry by: <span className="font-semibold text-text-primary">{evt.by}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
