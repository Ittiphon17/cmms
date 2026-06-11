import type { Ticket, TeamMember, Equipment, TimelineItem } from '../types';

export const mockTickets: Ticket[] = [
  {
    id: 'TK-2847',
    equipment: 'Ultra F (Ultra HIFU) machine',
    assetId: 'EQ-FC-002',
    location: 'Therapy Room 3',
    status: 'critical',
    priority: 'critical',
    assignedTo: 'Marcus Vance',
    category: 'Hardware Failure',
    openedAt: '2026-06-10T08:30:00Z',
    slaDeadline: '2026-06-10T12:30:00Z', // Overdue SLA (before June 11, 2026)
    description: 'System reporting transducer crystal array overheating warnings and power fluctuations during activation. Transducer coupling gel sensor error.',
    progress: 45
  },
  {
    id: 'TK-9582',
    equipment: 'RF 5D machine',
    assetId: 'EQ-FC-003',
    location: 'VIP Treatment Suite',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Elena Rostova',
    category: 'Power Supply',
    openedAt: '2026-06-11T07:15:00Z',
    slaDeadline: '2026-06-11T15:15:00Z',
    description: 'RF handpiece electrode pins showing wear and intermittent contact warning on control screen. Electrode replacement recommended.',
    progress: 15
  },
  {
    id: 'TK-1204',
    equipment: 'Q-Switch Laser machine',
    assetId: 'EQ-SC-001',
    location: 'Laser Room 1',
    status: 'maintenance',
    priority: 'normal',
    assignedTo: 'Sarah Chen',
    category: 'Routine PM',
    openedAt: '2026-06-11T06:00:00Z',
    slaDeadline: '2026-06-12T06:00:00Z',
    description: 'Scheduled 6-month calibration and laser output power verification. Check handpiece fiber condition and flashlamp trigger voltage.',
    progress: 75
  },
  {
    id: 'TK-4839',
    equipment: 'Diode Laser machine',
    assetId: 'EQ-SC-002',
    location: 'Laser Room 2',
    status: 'operational',
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
    equipment: 'Supersonic Vitamin Infusion machine',
    assetId: 'EQ-SC-003',
    location: 'Skin Treatment Bed 4',
    status: 'resolved',
    priority: 'normal',
    assignedTo: 'Marcus Vance',
    category: 'Calibration',
    openedAt: '2026-06-10T09:00:00Z',
    slaDeadline: '2026-06-11T09:00:00Z',
    description: 'Ultrasound head transducer recalibrated. Signal amplifier output adjusted and safety limit switch verified.',
    progress: 100
  },
  {
    id: 'TK-7721',
    equipment: 'HIFU 7D machine',
    assetId: 'EQ-FC-001',
    location: 'Facial Care Room A',
    status: 'critical',
    priority: 'critical',
    assignedTo: 'Marcus Vance',
    category: 'Hardware Failure',
    openedAt: '2026-06-11T09:45:00Z',
    slaDeadline: '2026-06-11T13:45:00Z',
    description: 'High frequency transducer array output error. Calibration failed. Red-tagged unit.',
    progress: 30
  },
  {
    id: 'TK-5512',
    equipment: 'BIOLIGHT Light Therapy machine',
    assetId: 'EQ-SC-004',
    location: 'Therapy Room 5',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Sarah Chen',
    category: 'Optical Alignment',
    openedAt: '2026-06-11T10:15:00Z',
    slaDeadline: '2026-06-11T18:15:00Z',
    description: 'LED blue-light diode array failing to illuminate. Power panel driver failure. Intermittent flickering.',
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
    id: 'EQ-FC-001',
    name: 'HIFU 7D machine',
    uptime: 99.4,
    lastService: '2026-05-10',
    ticketCount: 1,
    status: 'operational',
    assignedTech: 'Elena Rostova'
  },
  {
    id: 'EQ-FC-002',
    name: 'Ultra F (Ultra HIFU) machine',
    uptime: 94.2,
    lastService: '2026-05-15',
    ticketCount: 14,
    status: 'critical',
    assignedTech: 'Marcus Vance'
  },
  {
    id: 'EQ-FC-003',
    name: 'RF 5D machine',
    uptime: 98.1,
    lastService: '2026-06-01',
    ticketCount: 8,
    status: 'pending',
    assignedTech: 'Elena Rostova'
  },
  {
    id: 'EQ-SC-001',
    name: 'Q-Switch Laser machine',
    uptime: 97.8,
    lastService: '2026-06-05',
    ticketCount: 12,
    status: 'maintenance',
    assignedTech: 'Sarah Chen'
  },
  {
    id: 'EQ-SC-002',
    name: 'Diode Laser machine',
    uptime: 99.6,
    lastService: '2026-05-20',
    ticketCount: 3,
    status: 'operational',
    assignedTech: 'Elena Rostova'
  },
  {
    id: 'EQ-SC-003',
    name: 'Supersonic Vitamin Infusion machine',
    uptime: 98.9,
    lastService: '2026-06-09',
    ticketCount: 5,
    status: 'operational',
    assignedTech: 'Marcus Vance'
  },
  {
    id: 'EQ-SC-004',
    name: 'BIOLIGHT Light Therapy machine',
    uptime: 99.7,
    lastService: '2026-06-02',
    ticketCount: 1,
    status: 'operational',
    assignedTech: 'Sarah Chen'
  },
  {
    id: 'EQ-BF-001',
    name: 'G5 Fat Reduction Massage machine',
    uptime: 98.0,
    lastService: '2026-05-25',
    ticketCount: 0,
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
