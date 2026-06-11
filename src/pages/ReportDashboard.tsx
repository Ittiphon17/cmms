import React, { useState } from 'react';
import { Topbar } from '../components/layout/Topbar';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartBar } from '../components/ui/ChartBar';
import { DonutChart } from '../components/ui/DonutChart';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useAppStore } from '../store/useAppStore';
import { mockWeeklyTicketsData, mockStatusBreakdown } from '../data/mock';
import { IconDownload } from '@tabler/icons-react';

export const ReportDashboard: React.FC = () => {
  const { equipment, tickets } = useAppStore();
  const [period, setPeriod] = useState('This Month');

  // Sort equipment by ticket volume descending
  const sortedEquipment = [...equipment].sort((a, b) => (b.ticketCount ?? b.workOrderCount ?? 0) - (a.ticketCount ?? a.workOrderCount ?? 0));

  // Export PDF simulation
  const handleExport = () => {
    alert('Generating PDF report export. Download will start automatically.');
  };

  const rightActions = (
    <div className="flex items-center gap-2">
      <select
        className="h-[36px] px-3 border border-border-custom rounded-[6px] text-[13px] text-text-primary bg-surface focus:outline-none focus:border-primary cursor-pointer font-medium"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        aria-label="Select report period"
      >
        <option>This Week</option>
        <option>This Month</option>
        <option>Last Quarter</option>
        <option>Year to Date</option>
      </select>

      <button
        onClick={handleExport}
        className="h-[36px] bg-primary hover:bg-[#086E72] text-white px-3.5 py-1.5 rounded-[6px] font-semibold text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer"
        aria-label="Export Report to PDF"
      >
        <IconDownload size={16} stroke={2} />
        <span className="hidden sm:inline">Export PDF</span>
        <span className="sm:hidden">Export</span>
      </button>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title="Reports"
        subtitle={`Saint Jude Medical Center Facility Health · ${period}`}
        rightActions={rightActions}
      />

      {/* Page Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Metric Grid (4 columns) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="System Performance metrics">
          <MetricCard label="Mean Facility Uptime" value="98.1%" color="green" />
          <MetricCard label="Total Tickets Logged" value={tickets.length + 31} color="teal" />
          <MetricCard label="Avg Resolution Time" value="3.1 hrs" color="amber" />
          <MetricCard label="MTBF (Mean Time Between Failures)" value="184 hrs" color="teal" />
        </section>

        {/* 2-Column Section (Charts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Weekly Tickets Bar Chart */}
          <section className="lg:col-span-7 bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" aria-label="Tickets volume chart">
            <h3 className="text-[16px] font-semibold text-text-primary mb-4 m-0">
              Tickets This Week
            </h3>
            <ChartBar data={mockWeeklyTicketsData} xKey="day" yKey="count" />
          </section>

          {/* Right: Donut Chart + Legend */}
          <section className="lg:col-span-5 bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col justify-between" aria-label="Status breakdown chart">
            <h3 className="text-[16px] font-semibold text-text-primary mb-3 m-0">
              Status Breakdown
            </h3>

            <DonutChart data={mockStatusBreakdown} />

            {/* Legend Rows */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border-custom/55 text-center text-[12px]">
              {mockStatusBreakdown.map((item) => {
                const dotColorMap: Record<string, string> = {
                  'Operational': 'bg-success',
                  'Pending': 'bg-warning',
                  'Critical': 'bg-critical',
                };
                const dotColor = dotColorMap[item.name] || 'bg-text-secondary';
                
                return (
                  <div key={item.name} className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                      <span className="font-medium text-text-secondary">{item.name}</span>
                    </div>
                    <span className="text-[14px] font-semibold text-text-primary">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Full-width Section: Data Table */}
        <section className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden" aria-label="Equipment audit list">
          <h3 className="text-[16px] font-semibold text-text-primary mb-4 m-0">
            Top Equipment by Ticket Volume
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse table-layout-fixed" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr className="border-b border-border-custom/75 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px] bg-bg/50">
                  <th className="py-3 px-4 w-[30%]">Equipment</th>
                  <th className="py-3 px-4 w-[12%] text-center">Tickets</th>
                  <th className="py-3 px-4 w-[15%] text-center">Uptime</th>
                  <th className="py-3 px-4 w-[15%]">Last Service</th>
                  <th className="py-3 px-4 w-[18%]">Technician</th>
                  <th className="py-3 px-4 w-[15%]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom/40 text-[13.5px]">
                {sortedEquipment.map((eq) => (
                  <tr key={eq.id} className="hover:bg-bg/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-text-primary truncate">
                      <div className="flex flex-col">
                        <span>{eq.name}</span>
                        <span className="text-[11px] font-mono text-text-secondary mt-0.5">{eq.id}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-primary">
                      {eq.ticketCount ?? eq.workOrderCount ?? 0}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-success">
                      {eq.uptime}%
                    </td>
                    <td className="py-3.5 px-4 text-text-secondary font-medium">
                      {eq.lastService}
                    </td>
                    <td className="py-3.5 px-4 text-text-primary font-medium truncate">
                      {eq.assignedTech}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={eq.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};
