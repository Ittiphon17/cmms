import React, { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';

interface PMChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface PMChecklistProps {
  assetName: string;
  assetId: string;
  onClose: () => void;
  onComplete: (notes: string) => void;
}

export const PMChecklist: React.FC<PMChecklistProps> = ({
  assetName,
  assetId,
  onClose,
  onComplete,
}) => {
  const [checklist, setChecklist] = useState<PMChecklistItem[]>([
    { id: 'chk-1', text: 'Perform visual casing inspection and chassis integrity check', checked: false },
    { id: 'chk-2', text: 'Measure electrical leakage current and verify grounding resistance', checked: false },
    { id: 'chk-3', text: 'Clean internal fan intake ports and exchange ventilation filters', checked: false },
    { id: 'chk-4', text: 'Run manufacturer self-test suite and verify telemetry sensors', checked: false },
    { id: 'chk-5', text: 'Calibrate output signal parameters against reference standard', checked: false },
  ]);

  const [notes, setNotes] = useState('');

  const toggleCheck = (id: string) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const allChecked = checklist.every((item) => item.checked);
  const checkedCount = checklist.filter((item) => item.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allChecked) return;
    onComplete(notes);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px] flex items-center justify-center p-4 animate-fade-in select-none">
      <div 
        className="w-full max-w-[500px] bg-surface border border-border-custom rounded-[12px] shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-border-custom bg-bg/50 flex justify-between items-center">
          <div>
            <h3 className="text-[16px] font-semibold text-text-primary m-0">
              Execute PM Checklist
            </h3>
            <p className="text-[11px] text-text-secondary m-0 mt-0.5">
              {assetName} ({assetId})
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1 hover:bg-bg border border-border-custom/50 rounded-[6px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <IconX size={16} stroke={2.5} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5 flex-1">
          {/* Progress Indicator */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[12px] text-text-secondary font-semibold">
              <span>Inspection Compliance Progress</span>
              <span className="text-primary font-bold">{progressPercent}% Done</span>
            </div>
            
            <div className="w-full h-2 bg-bg rounded-full overflow-hidden border border-border-custom/30">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Boxes */}
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {checklist.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="w-full p-3 bg-bg hover:bg-[#EDF4F4] border border-border-custom/40 rounded-[8px] flex items-start gap-3 text-left cursor-pointer transition-colors"
              >
                {item.checked ? (
                  <div className="w-[18px] h-[18px] rounded-[4px] bg-primary flex items-center justify-center text-white mt-0.5 flex-shrink-0">
                    <IconCheck size={12} stroke={3} />
                  </div>
                ) : (
                  <div className="w-[18px] h-[18px] rounded-[4px] border border-border-custom bg-surface mt-0.5 flex-shrink-0" />
                )}
                
                <span className={`text-[12.5px] font-medium leading-snug ${item.checked ? 'line-through text-text-hint' : 'text-text-primary'}`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>

          {/* Signoff notes */}
          <div className="space-y-1.5">
            <label className="block text-[10.5px] font-semibold text-text-secondary uppercase tracking-[0.5px]">
              Calibration & Validation Notes
            </label>
            <textarea
              rows={3}
              placeholder="Record device parameters, deviation, filter type replaced, and general inspection outcomes..."
              className="w-full p-2.5 border border-border-custom rounded-[6px] text-[13px] bg-bg focus:outline-none focus:border-primary resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Action Row */}
          <div className="flex justify-end gap-3 pt-3 border-t border-border-custom/50">
            <button
              type="button"
              onClick={onClose}
              className="h-[36px] px-4 border border-border-custom hover:bg-bg rounded-[6px] text-[12.5px] font-semibold text-text-secondary cursor-pointer transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!allChecked}
              className={`h-[36px] px-5 rounded-[6px] text-[12.5px] font-semibold text-white transition-all ${
                allChecked 
                  ? 'bg-success hover:bg-[#2C520C] cursor-pointer' 
                  : 'bg-text-hint cursor-not-allowed opacity-60'
              }`}
            >
              Sign off PM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
