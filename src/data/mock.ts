import type { Ticket, TeamMember, Equipment, TimelineItem } from '../types';

export const mockTickets: Ticket[] = [
  {
    id: 'TK-2847',
    equipment: 'GE Signa 3T MRI Scanner',
    assetId: 'EQ-MRI-8822',
    location: 'Imaging Center - Room 3',
    status: 'critical',
    priority: 'critical',
    assignedTo: 'Marcus Vance',
    category: 'Hardware Failure',
    openedAt: '2026-06-10T08:30:00Z',
    slaDeadline: '2026-06-10T12:30:00Z', // Overdue SLA (before June 11, 2026)
    description: 'Liquid helium level has dropped below critical threshold. System reporting gradient coil temperature warnings and automatic shutdown will trigger if pressure increases further.',
    progress: 45
  },
  {
    id: 'TK-9582',
    equipment: 'Philips Tempus LS Defibrillator',
    assetId: 'EQ-DEF-1049',
    location: 'Emergency Department - ER-B',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Elena Rostova',
    category: 'Power Supply',
    openedAt: '2026-06-11T07:15:00Z',
    slaDeadline: '2026-06-11T15:15:00Z',
    description: 'Battery failing to hold charge for more than 10 minutes. Requires immediate replacement of internal cell pack and recalibration of discharge sequence.',
    progress: 15
  },
  {
    id: 'TK-1204',
    equipment: 'Dräger Evita V500 Ventilator',
    assetId: 'EQ-VEN-5021',
    location: 'Intensive Care Unit - Bed 14',
    status: 'maintenance',
    priority: 'normal',
    assignedTo: 'Sarah Chen',
    category: 'Routine PM',
    openedAt: '2026-06-11T06:00:00Z',
    slaDeadline: '2026-06-12T06:00:00Z',
    description: 'Scheduled 6-month preventative maintenance and filter exchange. Check oxygen sensor voltage and pressure sensors deviation.',
    progress: 75
  },
  {
    id: 'TK-4839',
    equipment: 'Baxter Sigma Spectrum Infusion Pump',
    assetId: 'EQ-INF-3304',
    location: 'Pediatrics Ward - Room 204',
    status: 'operational', // Wait, the ticket could be operational status? The prompt says StatusBadge supports: critical|warning|maintenance|pending|operational|resolved
    priority: 'low',
    assignedTo: 'Elena Rostova',
    category: 'Software Issue',
    openedAt: '2026-06-10T14:20:00Z',
    slaDeadline: '2026-06-11T14:20:00Z',
    description: 'Error code 402 showing on startup. Cleared with system reset but needs software patch verification to prevent recurrence.',
    progress: 100
  },
  {
    id: 'TK-3394',
    equipment: 'Mindray BeneVision N22 Patient Monitor',
    assetId: 'EQ-MON-0284',
    location: 'Cardiac Care Unit - CCU-4',
    status: 'resolved',
    priority: 'normal',
    assignedTo: 'Marcus Vance',
    category: 'Calibration',
    openedAt: '2026-06-10T09:00:00Z',
    slaDeadline: '2026-06-11T09:00:00Z',
    description: 'ECG module reporting incorrect waveforms. Recalibrated signal amplifier and verified with simulator. Replaced lead wires.',
    progress: 100
  },
  {
    id: 'TK-7721',
    equipment: 'Zoll X Series Monitor/Defibrillator',
    assetId: 'EQ-DEF-8820',
    location: 'Ambulance Unit 4',
    status: 'critical',
    priority: 'critical',
    assignedTo: 'Marcus Vance',
    category: 'Hardware Failure',
    openedAt: '2026-06-11T09:45:00Z',
    slaDeadline: '2026-06-11T13:45:00Z',
    description: 'Pacing function disabled due to internal relays failure. Defibrillator fails self-test. Red-tagged unit.',
    progress: 30
  },
  {
    id: 'TK-5512',
    equipment: 'Olympus CV-190 Endoscopy Tower',
    assetId: 'EQ-END-4491',
    location: 'Endoscopy Suite - Room A',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Sarah Chen',
    category: 'Optical Alignment',
    openedAt: '2026-06-11T10:15:00Z',
    slaDeadline: '2026-06-11T18:15:00Z',
    description: 'Light source flickering periodically. Video feed shows chromatic aberration. Needs fiber optic guide inspection.',
    progress: 20
  }
] as any;

export const mockTeamMembers: TeamMember[] = [
  {
    name: 'Marcus Vance',
    role: 'Lead Biomedical Engineer',
    initials: 'MV',
    activeTickets: 3,
    completedToday: 2,
    avgCloseTime: '2.4 hrs',
    onTimeRate: 94.5,
    rating: 4.8
  },
  {
    name: 'Elena Rostova',
    role: 'Senior Field Tech',
    initials: 'ER',
    activeTickets: 2,
    completedToday: 3,
    avgCloseTime: '3.1 hrs',
    onTimeRate: 91.2,
    rating: 4.9
  },
  {
    name: 'Sarah Chen',
    role: 'Biomedical Tech II',
    initials: 'SC',
    activeTickets: 2,
    completedToday: 1,
    avgCloseTime: '4.5 hrs',
    onTimeRate: 88.7,
    rating: 4.6
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: 'EQ-MRI-8822',
    name: 'GE Signa 3T MRI Scanner',
    uptime: 94.2,
    lastService: '2026-05-15',
    ticketCount: 14,
    status: 'critical',
    assignedTech: 'Marcus Vance'
  },
  {
    id: 'EQ-DEF-1049',
    name: 'Philips Tempus LS Defibrillator',
    uptime: 99.1,
    lastService: '2026-06-01',
    ticketCount: 8,
    status: 'pending',
    assignedTech: 'Elena Rostova'
  },
  {
    id: 'EQ-VEN-5021',
    name: 'Dräger Evita V500 Ventilator',
    uptime: 97.8,
    lastService: '2026-06-05',
    ticketCount: 12,
    status: 'maintenance',
    assignedTech: 'Sarah Chen'
  },
  {
    id: 'EQ-INF-3304',
    name: 'Baxter Sigma Spectrum Infusion Pump',
    uptime: 99.6,
    lastService: '2026-05-20',
    ticketCount: 3,
    status: 'operational',
    assignedTech: 'Elena Rostova'
  },
  {
    id: 'EQ-MON-0284',
    name: 'Mindray BeneVision N22 Patient Monitor',
    uptime: 98.9,
    lastService: '2026-06-09',
    ticketCount: 5,
    status: 'operational',
    assignedTech: 'Marcus Vance'
  }
] as any;

export const mockUptimeData = [
  { day: 'Mon', uptime: 98.4 },
  { day: 'Tue', uptime: 98.6 },
  { day: 'Wed', uptime: 97.9 },
  { day: 'Thu', uptime: 95.8 }, // Drop due to MRI failure
  { day: 'Fri', uptime: 96.4 },
  { day: 'Sat', uptime: 98.1 },
  { day: 'Sun', uptime: 98.9 }
];

export const mockWeeklyTicketsData = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 9 },
  { day: 'Fri', count: 6 },
  { day: 'Sat', count: 2 },
  { day: 'Sun', count: 3 }
];

export const mockStatusBreakdown = [
  { name: 'Operational', value: 142, color: 'var(--color-success)' },
  { name: 'Pending', value: 18, color: 'var(--color-warning)' },
  { name: 'Critical', value: 5, color: 'var(--color-critical)' }
];

export const mockChecklistItems = [
  { id: 'chk-1', text: 'Verify helium pressure levels and temperature monitors', checked: true },
  { id: 'chk-2', text: 'Inspect cryostat vent valves and safety burst discs', checked: true },
  { id: 'chk-3', text: 'Run rf transmitter calibration tests', checked: false },
  { id: 'chk-4', text: 'Measure gradient coil impedance and insulation resistance', checked: false },
  { id: 'chk-5', text: 'Document helium boil-off rate and log calibration logbook', checked: false }
];

export const mockTimelineItems: Record<string, TimelineItem[]> = {
  'TK-2847': [
    {
      id: 't-1',
      action: 'System reported helium level low warning & pressure spike auto-alert',
      by: 'System Telemetry',
      time: '2026-06-10T08:30:00Z',
      color: 'critical'
    },
    {
      id: 't-2',
      action: 'Ticket dispatched and assigned to Lead Engineer',
      by: 'Dispatch Automated System',
      time: '2026-06-10T08:35:00Z',
      color: 'info'
    },
    {
      id: 't-3',
      action: 'On-site investigation initialized, system placed in offline state',
      by: 'Marcus Vance',
      time: '2026-06-10T09:15:00Z',
      color: 'warning'
    },
    {
      id: 't-4',
      action: 'Helium recharge provider contacted for emergency refill delivery',
      by: 'Marcus Vance',
      time: '2026-06-10T10:45:00Z',
      color: 'info'
    }
  ]
};
