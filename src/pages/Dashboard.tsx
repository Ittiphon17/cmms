import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Topbar } from '../components/layout/Topbar';
import { MetricCard } from '../components/ui/MetricCard';
import { TicketRow } from '../components/ui/TicketRow';
import { ChartBar } from '../components/ui/ChartBar';
import { Avatar } from '../components/ui/Avatar';
import { useAppStore } from '../store/useAppStore';
import { mockUptimeData } from '../data/mock';
import { IconPlus } from '@tabler/icons-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, teamMembers, equipment } = useAppStore();

  // Calculate Metrics
  const criticalCount = tickets.filter((t) => (t.status as any) === 'critical').length;
  const pendingCount = tickets.filter((t) => (t.status as any) === 'pending').length;
  
  // Equipment uptime percentage calculation (average of mock equipment uptime or static standard)
  const avgUptime = (equipment.reduce((acc, eq) => acc + eq.uptime, 0) / equipment.length).toFixed(1);
  const operationalText = `${avgUptime}%`;

  // Get first 5 tickets to show
  const recentTickets = tickets.slice(0, 5);

  const rightActions = (
    <button
      onClick={() => navigate('/tickets/new')}
      className="h-[36px] bg-primary hover:bg-[#086E72] text-white px-4 py-1.5 rounded-[6px] font-semibold text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      aria-label="Create New Ticket"
    >
      <IconPlus size={16} stroke={2.5} />
      <span>New ticket</span>
    </button>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title="Dashboard"
        subtitle="June 11, 2026 · Saint Jude Medical Center"
        rightActions={rightActions}
      />

      {/* Page Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Metric Grid (4 columns) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Maintenance Metrics">
          <MetricCard label="Critical Alerts" value={criticalCount} color="red" />
          <MetricCard label="Pending Review" value={pendingCount} color="amber" />
          <MetricCard label="Equipment Uptime" value={operationalText} color="green" />
          <MetricCard label="Avg Response" value="2.4 hrs" color="teal" />
        </section>

        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Recent Tickets */}
          <section className="lg:col-span-7 bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col" aria-label="Recent Tickets Queue">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-text-primary m-0">
                Recent Tickets
              </h3>
              <span className="text-[12px] text-text-secondary">
                Showing {recentTickets.length} of {tickets.length} total
              </span>
            </div>
            
            <div className="flex-1 space-y-2">
              {recentTickets.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  id={ticket.id}
                  equipment={ticket.equipment}
                  status={ticket.status}
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                />
              ))}
            </div>
          </section>

          {/* Right Column: stacked charts and teams */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Equipment Uptime Card */}
            <section className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" aria-label="Equipment Uptime Graph">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-semibold text-text-primary m-0">
                  Equipment Uptime
                </h3>
                <span className="text-[11px] font-semibold text-success bg-success-bg px-2 py-0.5 rounded-[4px] border border-success/15 uppercase">
                  Target: 98%
                </span>
              </div>
              <ChartBar data={mockUptimeData} xKey="day" yKey="uptime" unit="%" />
            </section>

            {/* Team Directory Card */}
            <section className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" aria-label="Duty Technicians">
              <h3 className="text-[16px] font-semibold text-text-primary mb-4 m-0">
                Active Duty Team
              </h3>
              <div className="divide-y divide-border-custom/60">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        initials={member.initials}
                        color={
                          member.name.includes('Marcus')
                            ? 'primary'
                            : member.name.includes('Elena')
                            ? 'green'
                            : 'blue'
                        }
                        size="sm"
                      />
                      <div>
                        <h4 className="text-[13px] font-medium text-text-primary m-0 leading-tight">
                          {member.name}
                        </h4>
                        <p className="text-[11px] text-text-secondary m-0 leading-none mt-0.5">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <span className="text-[12px] font-medium px-2 py-0.5 bg-bg border border-border-custom text-text-secondary rounded-[4px]">
                      {member.activeTickets} active
                    </span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};
