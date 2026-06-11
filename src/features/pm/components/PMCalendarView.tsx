import React, { useState } from 'react';
import type { PMTask } from '../../../types';
import { PMStatusBadge } from './PMStatusBadge';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface PMCalendarViewProps {
  tasks: PMTask[];
  onSelectTask: (task: PMTask) => void;
}

export const PMCalendarView: React.FC<PMCalendarViewProps> = ({ tasks, onSelectTask }) => {
  // Focus on June 2026
  const year = 2026;
  const month = 5; // 0-indexed, so June is 5
  const monthName = 'June 2026';

  const [selectedDay, setSelectedDay] = useState<number | null>(11); // default to June 11, 2026

  // June 2026 starts on a Monday (day 1 of week)
  const totalDays = 30;
  const firstDayIndex = 0; // Monday-first index: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6

  const daysGrid: Array<number | null> = [];
  
  // Fill leading empty days
  for (let i = 0; i < firstDayIndex; i++) {
    daysGrid.push(null);
  }

  // Fill calendar days
  for (let d = 1; d <= totalDays; d++) {
    daysGrid.push(d);
  }

  const getDayTasks = (day: number) => {
    return tasks.filter((t) => {
      const date = new Date(t.scheduledDate);
      return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    });
  };

  const activeDayTasks = selectedDay ? getDayTasks(selectedDay) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
      
      {/* Calendar Grid (8 Columns on Large Screens) */}
      <div className="lg:col-span-8 bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold text-text-primary m-0">
            {monthName}
          </h3>
          
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-bg border border-border-custom text-text-hint rounded-[6px] cursor-not-allowed">
              <IconChevronLeft size={14} stroke={2.5} />
            </button>
            <button className="p-1.5 hover:bg-bg border border-border-custom text-text-hint rounded-[6px] cursor-not-allowed">
              <IconChevronRight size={14} stroke={2.5} />
            </button>
          </div>
        </div>

        {/* Days of Week Headers */}
        <div className="grid grid-cols-7 text-center border-b border-border-custom pb-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.5px]">
          <div><span className="hidden sm:inline">Mon</span><span className="sm:hidden">M</span></div>
          <div><span className="hidden sm:inline">Tue</span><span className="sm:hidden">T</span></div>
          <div><span className="hidden sm:inline">Wed</span><span className="sm:hidden">W</span></div>
          <div><span className="hidden sm:inline">Thu</span><span className="sm:hidden">T</span></div>
          <div><span className="hidden sm:inline">Fri</span><span className="sm:hidden">F</span></div>
          <div><span className="hidden sm:inline">Sat</span><span className="sm:hidden">S</span></div>
          <div><span className="hidden sm:inline">Sun</span><span className="sm:hidden">S</span></div>
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 mt-2">
          {daysGrid.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="aspect-square bg-transparent" />;
            }

            const dayTasks = getDayTasks(day);
            const isSelected = selectedDay === day;
            const hasOverdue = dayTasks.some((t) => t.status === 'overdue');
            const hasScheduled = dayTasks.some((t) => t.status === 'scheduled');
            const hasCompleted = dayTasks.some((t) => t.status === 'completed');

            return (
              <button
                key={`day-${day}`}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square p-1 rounded-[8px] border flex flex-col justify-between items-start transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-primary/10 border-primary text-primary-dark font-bold' 
                    : 'bg-surface border-border-custom/40 hover:bg-bg text-text-primary'
                }`}
              >
                <span className="text-[12px]">{day}</span>
                
                {/* Dots container */}
                <div className="flex gap-1 mt-1 w-full justify-end">
                  {hasOverdue && <span className="w-1.5 h-1.5 rounded-full bg-critical animate-pulse" title="Overdue PM" />}
                  {hasScheduled && <span className="w-1.5 h-1.5 rounded-full bg-info" title="Scheduled PM" />}
                  {hasCompleted && <span className="w-1.5 h-1.5 rounded-full bg-success" title="Completed PM" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda panel (4 Columns) */}
      <div className="lg:col-span-4 bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col h-full">
        <h3 className="text-[15px] font-semibold text-text-primary mb-3 m-0">
          Agenda: June {selectedDay}, 2026
        </h3>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {activeDayTasks.length > 0 ? (
            activeDayTasks.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectTask(t)}
                className="w-full p-3.5 border border-border-custom bg-bg hover:bg-[#EDF4F4] hover:border-primary/20 rounded-[8px] text-left cursor-pointer transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.5px]">
                    {t.type}
                  </span>
                  <PMStatusBadge status={t.status} size="sm" />
                </div>
                
                <h4 className="text-[12.5px] font-semibold text-text-primary m-0 leading-snug">
                  {t.assetName}
                </h4>
                
                <p className="text-[11px] text-text-secondary leading-normal m-0 line-clamp-2">
                  {t.description}
                </p>

                <div className="flex items-center justify-between text-[10.5px] text-text-hint mt-1 pt-1 border-t border-border-custom/40">
                  <span>Assigned: {t.assignedTech}</span>
                  <span className="font-mono text-primary">{t.assetId}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center text-text-hint">
              <span className="text-[12px]">No planned PM jobs on this date.</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
