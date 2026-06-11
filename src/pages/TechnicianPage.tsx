import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../components/layout/Topbar';
import { MetricCard } from '../components/ui/MetricCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAppStore } from '../store/useAppStore';
import { IconCalendarEvent } from '@tabler/icons-react';


export const TechnicianPage: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, teamMembers } = useAppStore();

  // Find Marcus Vance (the active technician)
  const techStats = teamMembers.find((m) => m.name === 'Marcus Vance') || {
    name: 'Marcus Vance',
    role: 'Lead Biomedical Engineer',
    activeTickets: 3,
    completedToday: 2,
    avgCloseTime: '2.4 hrs',
    onTimeRate: 94.5,
    rating: 4.8,
  };

  // Get active queue for Marcus Vance
  const activeQueue = tickets
    .filter((t) => t.assignedTo === 'Marcus Vance' && (t.status as any) !== 'resolved' && (t.status as any) !== 'completed' && (t.status as any) !== 'closed')
    .slice(0, 3);

  // Get completed tickets for Marcus Vance
  const completedQueue = tickets
    .filter((t) => t.assignedTo === 'Marcus Vance' && ((t.status as any) === 'resolved' || (t.status as any) === 'completed' || (t.status as any) === 'closed'))
    .slice(0, 3);

  // Border accents mapping
  const borderAccentMap: Record<string, string> = {
    critical: 'border-l-[4px] border-l-critical',
    high: 'border-l-[4px] border-l-warning',
    normal: 'border-l-[4px] border-l-info',
    low: 'border-l-[4px] border-l-success',
    pending: 'border-l-[4px] border-l-warning',
    maintenance: 'border-l-[4px] border-l-info',
    operational: 'border-l-[4px] border-l-success',
    resolved: 'border-l-[4px] border-l-success',
  };

  const rightActions = (
    <button
      onClick={() => alert('Biomedical calendar schedule loaded.')}
      className="h-[36px] border border-border-custom hover:bg-bg text-text-primary px-3.5 py-1.5 rounded-[6px] font-semibold text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer"
      aria-label="View Schedule Calendar"
    >
      <IconCalendarEvent size={16} stroke={1.8} />
      <span>Schedule</span>
    </button>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title="My Work"
        subtitle={`${techStats.name} · ${techStats.role}`}
        rightActions={rightActions}
      />

      {/* Page Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Metric Grid (3 columns) */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Technician Queue Stats">
          <MetricCard label="Active Queue" value={activeQueue.length} color="red" />
          <MetricCard label="Completed Today" value={techStats.completedToday} color="green" />
          <MetricCard label="Avg Close Time" value={techStats.avgCloseTime} color="teal" />
        </section>

        {/* 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Active Queue */}
          <section className="lg:col-span-7 bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col" aria-label="Active Queue">
            <h3 className="text-[16px] font-semibold text-text-primary mb-4 m-0">
              Active Queue
            </h3>

            <div className="flex-1 space-y-4">
              {activeQueue.length > 0 ? (
                activeQueue.map((ticket) => {
                  const borderClass = borderAccentMap[ticket.priority] || borderAccentMap.normal;
                  const progressValue = ticket.progress || 0;
                  
                  return (
                    <button
                      key={ticket.id}
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                      className={`w-full text-left bg-bg hover:bg-[#EDF4F4] transition-colors p-4 rounded-[8px] border border-border-custom/40 flex flex-col gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${borderClass}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-[4px] border border-primary/10">
                          {ticket.id}
                        </span>
                        <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px]">
                          {ticket.location}
                        </span>
                      </div>

                      <h4 className="text-[14px] font-semibold text-text-primary m-0 truncate">
                        {ticket.equipment}
                      </h4>

                      <div className="space-y-1.5 mt-1">
                        <div className="flex items-center justify-between text-[12px] text-text-secondary">
                          <span>Diagnostic Progress</span>
                          <span className="font-semibold text-text-primary">{progressValue}%</span>
                        </div>
                        <ProgressBar value={progressValue} color={ticket.priority === 'critical' ? 'red' : 'teal'} />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center text-text-secondary py-10">
                  No active tickets assigned to you today. Great work!
                </div>
              )}
            </div>
          </section>

          {/* Right Column: Completed Today & Performance */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Completed Today Card */}
            <section className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" aria-label="Completed Today">
              <h3 className="text-[16px] font-semibold text-text-primary mb-4 m-0">
                Completed Today
              </h3>
              
              <div className="space-y-3">
                {completedQueue.length > 0 ? (
                  completedQueue.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                      className="w-full text-left p-3 rounded-[8px] border border-border-custom bg-bg hover:bg-[#EDF4F4] transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-text-hint">
                            {ticket.id}
                          </span>
                          <h4 className="text-[13px] font-medium text-text-primary truncate m-0 leading-tight">
                            {ticket.equipment}
                          </h4>
                        </div>
                        <p className="text-[11px] text-text-secondary m-0 leading-none mt-1">
                          Resolved: 10:45 AM
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-success bg-success-bg px-2 py-0.5 rounded-[4px] border border-success/15 uppercase flex-shrink-0">
                        OK
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-[13px] text-text-secondary text-center py-4 m-0">
                    No tickets completed yet today.
                  </p>
                )}
              </div>
            </section>

            {/* Performance Stat Tiles */}
            <section className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" aria-label="Weekly Performance Summary">
              <h3 className="text-[16px] font-semibold text-text-primary mb-4 m-0">
                Performance This Week
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-bg p-3 rounded-[8px] border border-border-custom/50 text-center flex flex-col justify-center">
                  <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-[0.3px]">
                    Closed
                  </span>
                  <span className="text-[18px] font-semibold text-primary mt-1 leading-none">
                    12
                  </span>
                </div>

                <div className="bg-bg p-3 rounded-[8px] border border-border-custom/50 text-center flex flex-col justify-center">
                  <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-[0.3px]">
                    On-Time
                  </span>
                  <span className="text-[18px] font-semibold text-success mt-1 leading-none">
                    {techStats.onTimeRate}%
                  </span>
                </div>

                <div className="bg-bg p-3 rounded-[8px] border border-border-custom/50 text-center flex flex-col justify-center">
                  <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-[0.3px]">
                    Rating
                  </span>
                  <span className="text-[18px] font-semibold text-primary mt-1 leading-none">
                    {techStats.rating}/5
                  </span>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
};
