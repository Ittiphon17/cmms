import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Topbar } from '../components/layout/Topbar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { TimelineItem } from '../components/ui/TimelineItem';
import { useAppStore } from '../store/useAppStore';
import { IconCheck } from '@tabler/icons-react';

export const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets, timeline, checklists, resolveTicket, addTimelineNote, toggleChecklistItem } = useAppStore();

  const [noteText, setNoteText] = useState('');

  // Find the current ticket
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return (
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title="Ticket Not Found" subtitle="Error finding ticket record" backLink="/dashboard" />
        <div className="p-6 text-center text-text-secondary">
          The requested ticket ID "{id}" could not be found in the database.
        </div>
      </div>
    );
  }

  // Check if SLA deadline is overdue
  const isOverdue = new Date(ticket.slaDeadline) < new Date() && (ticket.status as any) !== 'resolved' && (ticket.status as any) !== 'completed' && (ticket.status as any) !== 'closed';

  // Get checklist items for this ticket (fallback if none stored)
  const checklist = checklists[ticket.id] || [
    { id: 'chk-1', text: 'Verify helium pressure levels and temperature monitors', checked: true },
    { id: 'chk-2', text: 'Inspect cryostat vent valves and safety burst discs', checked: true },
    { id: 'chk-3', text: 'Run rf transmitter calibration tests', checked: false },
    { id: 'chk-4', text: 'Measure gradient coil impedance and insulation resistance', checked: false },
    { id: 'chk-5', text: 'Document helium boil-off rate and log calibration logbook', checked: false }
  ];

  // Get timeline for this ticket
  const ticketTimeline = timeline[ticket.id] || [];

  const handleResolve = () => {
    resolveTicket(ticket.id);
    navigate('/dashboard');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    addTimelineNote(ticket.id, noteText, 'Marcus Vance');
    setNoteText('');
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  // Topbar action buttons
  const rightActions = (ticket.status as any) !== 'resolved' && (ticket.status as any) !== 'completed' && (ticket.status as any) !== 'closed' && (
    <button
      onClick={handleResolve}
      className="h-[36px] bg-primary hover:bg-[#086E72] text-white px-4 py-1.5 rounded-[6px] font-semibold text-[13px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      aria-label="Mark Ticket as Resolved"
    >
      Resolve
    </button>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Topbar */}
      <Topbar
        title={ticket.id}
        subtitle={`${ticket.equipment} · ${ticket.location}`}
        backLink="/dashboard"
        badge={<StatusBadge status={ticket.status} size="sm" />}
        rightActions={rightActions}
      />

      {/* Page Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Details Card & Checklist */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Details Card */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <h3 className="text-[16px] font-semibold text-text-primary mb-4 m-0">
                Ticket Details
              </h3>

              {/* 2x3 Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[14px]">
                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Opened
                  </div>
                  <div className="text-text-primary font-medium">
                    {formatDate(ticket.openedAt)}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Assigned to
                  </div>
                  <div className="text-text-primary font-medium">
                    {ticket.assignedTo}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Category
                  </div>
                  <div className="text-text-primary font-medium">
                    {ticket.category}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Asset ID
                  </div>
                  <div className="text-text-primary font-mono font-medium">
                    {ticket.assetId}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    Last Service
                  </div>
                  <div className="text-text-primary font-medium">
                    May 15, 2026
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-0.5">
                    SLA Deadline
                  </div>
                  <div className={`font-semibold ${isOverdue ? 'text-critical' : 'text-text-primary'}`}>
                    {formatDate(ticket.slaDeadline)} {isOverdue && '(OVERDUE)'}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-5 border-border-custom" />

              {/* Description */}
              <div>
                <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-2">
                  Description
                </div>
                <p className="text-[14px] text-text-primary leading-relaxed m-0">
                  {ticket.description}
                </p>
              </div>

              {/* Divider */}
              <hr className="my-5 border-border-custom" />

              {/* Tag Pills */}
              <div>
                <div className="text-[11px] font-semibold text-text-secondary tracking-[0.5px] uppercase mb-2">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[12px] bg-primary-light text-primary-dark font-medium px-2.5 py-0.5 rounded-[4px] border border-primary/10">
                    Biomedical
                  </span>
                  <span className="text-[12px] bg-info-bg text-info-text font-medium px-2.5 py-0.5 rounded-[4px] border border-info/10">
                    {ticket.category}
                  </span>
                  <span className={`text-[12px] font-medium px-2.5 py-0.5 rounded-[4px] border uppercase ${
                    ticket.priority === 'critical'
                      ? 'bg-critical-bg text-critical-text border-critical/15'
                      : ticket.priority === 'high'
                      ? 'bg-warning-bg text-warning-text border-warning/15'
                      : 'bg-bg text-text-secondary border-border-custom'
                  }`}>
                    Priority: {ticket.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Card */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-semibold text-text-primary m-0">
                    Diagnostics Checklist
                  </h3>
                  <p className="text-[12px] text-text-secondary m-0 mt-0.5">
                    Complete tasks to update resolution progress
                  </p>
                </div>
                <span className="text-[13px] font-semibold text-primary bg-primary-light px-2.5 py-0.5 rounded-[4px] border border-primary/10">
                  {ticket.progress || 0}% Done
                </span>
              </div>

              {/* Checklist items */}
              <div className="space-y-2.5">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklistItem(ticket.id, item.id)}
                    className="w-full flex items-start gap-3 p-3 bg-bg border border-border-custom/50 hover:bg-[#EDF4F4] transition-colors rounded-[8px] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  >
                    {item.checked ? (
                      <div className="w-[18px] h-[18px] rounded-[4px] bg-primary flex items-center justify-center text-white mt-0.5 flex-shrink-0">
                        <IconCheck size={13} stroke={3} />
                      </div>
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-[4px] border border-border-custom bg-surface mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-[13.5px] leading-snug font-medium transition-all ${
                      item.checked ? 'line-through text-text-secondary' : 'text-text-primary'
                    }`}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Timeline & Notes */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Timeline Card */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <h3 className="text-[16px] font-semibold text-text-primary mb-4 m-0">
                Ticket Activity Logs
              </h3>

              <div className="space-y-1">
                {ticketTimeline.length > 0 ? (
                  ticketTimeline.map((item) => (
                    <TimelineItem
                      key={item.id}
                      action={item.action}
                      by={item.by}
                      time={item.time}
                      color={item.color as any}
                    />
                  ))
                ) : (
                  <p className="text-[13px] text-text-secondary py-3 text-center">
                    No activity logs recorded yet.
                  </p>
                )}
              </div>
            </div>

            {/* Add Note Card */}
            <div className="bg-surface border border-border-custom rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <h3 className="text-[16px] font-semibold text-text-primary mb-3 m-0">
                Add Maintenance Note
              </h3>
              
              <form onSubmit={handleAddNote} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  placeholder="Type troubleshooting notes, updates, or instructions..."
                  className="w-full p-2.5 border border-border-custom rounded-[6px] text-[13.5px] text-text-primary bg-bg focus:outline-none focus:border-primary resize-y"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="h-[36px] bg-primary hover:bg-[#086E72] text-white px-4 py-1.5 rounded-[6px] font-semibold text-[13px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  >
                    Add note
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
