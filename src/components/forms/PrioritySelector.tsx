import React from 'react';
import type { TicketPriority } from '../../types';


interface PrioritySelectorProps {
  value: TicketPriority;
  onChange: (priority: TicketPriority) => void;
}

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({ value, onChange }) => {
  const priorities: {
    key: TicketPriority;
    label: string;
    selectedClass: string;
  }[] = [
    {
      key: 'critical',
      label: 'Critical',
      selectedClass: 'border-critical bg-critical-bg text-critical-text',
    },
    {
      key: 'high',
      label: 'High',
      selectedClass: 'border-warning bg-warning-bg text-warning-text',
    },
    {
      key: 'normal',
      label: 'Normal',
      selectedClass: 'border-info bg-info-bg text-info-text',
    },
    {
      key: 'low',
      label: 'Low',
      selectedClass: 'border-success bg-success-bg text-success-text',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Select ticket priority">
      {priorities.map((p) => {
        const isSelected = value === p.key;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onChange(p.key)}
            className={`py-3 px-4 rounded-[6px] border text-center font-medium transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
              isSelected
                ? `${p.selectedClass} border-2 font-semibold shadow-sm`
                : 'border-border-custom bg-surface hover:bg-bg text-text-secondary'
            }`}
            role="radio"
            aria-checked={isSelected}
            aria-label={`${p.label} Priority`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
};
