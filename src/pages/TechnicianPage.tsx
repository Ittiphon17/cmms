import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../components/layout/Topbar';
import { MetricCard } from '../components/ui/MetricCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAppStore } from '../store/useAppStore';
import { IconCalendarEvent } from '@tabler/icons-react';


export const TechnicianPage: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, teamMembers, pmTasks } = useAppStore();

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

  // Get active tickets for Marcus Vance
  const activeTickets = tickets
    .filter((t) => t.assignedTo === 'Marcus Vance' && (t.status as any) !== 'resolved' && (t.status as any) !== 'completed' && (t.status as any) !== 'closed');

  // Get active PM tasks for Marcus Vance
  const activePMs = pmTasks
    .filter((p) => p.assignedTech === 'Marcus Vance' && p.status !== 'completed');

  // Combine them into a single list
  const combinedQueue = [
    ...activeTickets.map((t) => ({
      id: t.id,
      title: t.title,
      equipment: t.equipment,
      location: t.location,
      priority: t.priority,
      progress: t.progress,
      isPM: false,
      scheduledDate: t.openedAt,
    })),
    ...activePMs.map((p) => ({
      id: p.id,
      title: p.type,
      equipment: p.assetName,
      location: p.branch,
      priority: p.status === 'overdue' ? 'critical' : 'normal',
      progress: 0,
      isPM: true,
      scheduledDate: p.scheduledDate,
    })),
  ];

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
      onClick={() => navigate('/pm')}
      className="h-[36px] border border-border-custom hover:bg-bg text-text-primary px-3.5 py-1.5 rounded-[6px] font-semibold text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer"
      aria-label="View Schedule Calendar"
    >
      <IconCalendarEvent size={16} stroke={1.8} />
      <span>PM Calendar</span>
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
          <MetricCard label="Active Queue" value={combinedQueue.length} color="red" />
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
              {combinedQueue.length > 0 ? (
                combinedQueue.map((item) => {
                  const borderClass = item.isPM 
                    ? (item.priority === 'critical' ? 'border-l-[4px] border-l-critical animate-pulse' : 'border-l-[4px] border-l-primary') 
                    : (borderAccentMap[item.priority] || borderAccentMap.normal);
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.isPM) {
                          navigate('/pm', { state: { selectedTaskId: item.id } });
                        } else {
                          navigate(`/tickets/${item.id}`);
                        }
                      }}
                      className={`w-full text-left bg-bg hover:bg-[#EDF4F4] transition-colors p-4 rounded-[8px] border border-border-custom/40 flex flex-col gap-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${borderClass}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-[4px] border border-primary/10">
                            {item.id}
                          </span>
                          {item.isPM && (
                            <span className="text-[10px] font-bold text-success bg-success-bg border border-success/15 px-1.5 py-0.5 rounded-[4px] uppercase tracking-[0.3px]">
                              Preventive Maintenance
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] truncate max-w-[150px]">
                          {item.location}
                        </span>
                      </div>

                      <h4 className="text-[14px] font-semibold text-text-primary m-0 truncate">
                        {item.equipment}
                      </h4>

                      {item.isPM ? (
                        <div className="flex justify-between items-center text-[12.5px] text-text-secondary mt-1">
                          <span className="font-semibold text-primary">{item.title}</span>
                          <span className="text-[11px] text-text-hint">
                            Scheduled: {new Date(item.scheduledDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1.5 mt-1">
                          <div className="flex items-center justify-between text-[12px] text-text-secondary">
                            <span>Diagnostic Progress</span>
                            <span className="font-semibold text-text-primary">{item.progress}%</span>
                          </div>
                          <ProgressBar value={item.progress} color={item.priority === 'critical' ? 'red' : 'teal'} />
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="text-center text-text-secondary py-10">
                  No active tickets or PM tasks assigned to you today. Great work!
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
