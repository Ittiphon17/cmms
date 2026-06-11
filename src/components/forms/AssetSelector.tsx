import React, { useState, useEffect, useRef } from 'react';
import { IconSearch, IconChevronDown, IconX, IconMapPin } from '@tabler/icons-react';
import type { Equipment } from '../../types';

interface AssetSelectorProps {
  equipment: Equipment[];
  selectedEqId: string;
  onSelectEqId: (id: string) => void;
  required?: boolean;
}

export const AssetSelector: React.FC<AssetSelectorProps> = ({
  equipment,
  selectedEqId,
  onSelectEqId,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedAsset = equipment.find((eq) => eq.id === selectedEqId);

  // Filter assets based on search query
  const filteredAssets = equipment.filter((eq) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      eq.name.toLowerCase().includes(query) ||
      eq.id.toLowerCase().includes(query) ||
      eq.location.toLowerCase().includes(query) ||
      (eq.department && eq.department.toLowerCase().includes(query))
    );
  });

  // Limit displayed items for high performance (e.g. max 100 items)
  const MAX_DISPLAYED = 100;
  const displayedAssets = filteredAssets.slice(0, MAX_DISPLAYED);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlighted index when query or open state changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchQuery, isOpen]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure input is rendered and visible
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearchQuery('');
  };

  const handleSelect = (eq: Equipment) => {
    onSelectEqId(eq.id);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev + 1;
          return next >= displayedAssets.length ? 0 : next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? displayedAssets.length - 1 : next;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < displayedAssets.length) {
          handleSelect(displayedAssets[highlightedIndex]);
        } else if (displayedAssets.length > 0) {
          handleSelect(displayedAssets[0]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        // Let natural tab order happen, close dropdown
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Scroll highlighted item into view if necessary
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[highlightedIndex] as HTMLElement;
      if (activeEl) {
        const listEl = listRef.current;
        const activeTop = activeEl.offsetTop;
        const activeBottom = activeTop + activeEl.offsetHeight;
        const listScrollTop = listEl.scrollTop;
        const listHeight = listEl.clientHeight;

        if (activeBottom > listScrollTop + listHeight) {
          listEl.scrollTop = activeBottom - listHeight;
        } else if (activeTop < listScrollTop) {
          listEl.scrollTop = activeTop;
        }
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-full" ref={containerRef} onKeyDown={handleKeyDown}>
      {/* Hidden input for HTML5 validation/forms */}
      <input
        type="hidden"
        name="equipmentId"
        value={selectedEqId}
        required={required}
      />

      {/* Selector Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
        className={`w-full h-[38px] px-3 border border-border-custom rounded-[6px] text-[14px] bg-bg flex items-center justify-between text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
          isOpen ? 'border-primary ring-2 ring-primary/10 bg-surface' : 'hover:border-slate-400'
        }`}
      >
        {selectedAsset ? (
          <div className="flex items-center justify-between w-full pr-1.5 min-w-0">
            <span className="font-medium text-text-primary truncate">
              {selectedAsset.name}
            </span>
            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-mono font-medium text-text-secondary bg-[#E2E8F0]/50 border border-border-custom/50 rounded shrink-0">
              {selectedAsset.id}
            </span>
          </div>
        ) : (
          <span className="text-text-hint">-- Choose Equipment --</span>
        )}
        <IconChevronDown
          className={`w-4 h-4 text-text-secondary transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* Dropdown Container */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 z-[999] bg-surface border border-border-custom rounded-[8px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col animate-fade-in w-full">
          {/* Search Box */}
          <div className="relative border-b border-border-custom shrink-0">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              className="w-full h-[38px] pl-9 pr-9 text-[13px] bg-bg/50 focus:bg-surface text-text-primary placeholder:text-text-hint focus:outline-none transition-all"
              placeholder="Search by name, ID, location, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search equipment"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-0.5 rounded-full hover:bg-bg transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <IconX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Asset List */}
          <div
            ref={listRef}
            role="listbox"
            className="overflow-y-auto max-h-[260px] divide-y divide-border-custom/30 select-none"
          >
            {displayedAssets.length > 0 ? (
              displayedAssets.map((eq, idx) => {
                const isSelected = eq.id === selectedEqId;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    key={eq.id}
                    onClick={() => handleSelect(eq)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-primary-light/60 font-medium'
                        : isHighlighted
                        ? 'bg-primary-light/30'
                        : 'hover:bg-bg/40'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-text-primary truncate">
                          {eq.name}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-text-secondary bg-slate-100 border border-slate-200/60 px-1.5 py-0.2 rounded shrink-0">
                          {eq.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-text-secondary min-w-0">
                        <IconMapPin className="w-3 h-3 text-text-hint shrink-0" />
                        <span className="truncate">{eq.location}</span>
                        {eq.department && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="truncate">{eq.department}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          eq.status === 'critical'
                            ? 'bg-critical'
                            : eq.status === 'maintenance'
                            ? 'bg-info'
                            : eq.status === 'pending'
                            ? 'bg-warning'
                            : 'bg-success'
                        }`}
                      />
                      <span className="text-[11px] font-semibold capitalize text-text-secondary">
                        {eq.status}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-8 px-4 text-center text-text-hint text-[13px] flex flex-col items-center gap-1.5">
                <span className="font-medium">No assets found</span>
                <span className="text-[11px] text-text-secondary max-w-[200px]">
                  Try adjusting your search terms or view existing inventory.
                </span>
              </div>
            )}
          </div>

          {/* Footer Info if list is capped */}
          {filteredAssets.length > MAX_DISPLAYED && (
            <div className="px-3 py-1.5 bg-bg/50 border-t border-border-custom text-[10px] text-text-secondary text-center shrink-0">
              Showing first {MAX_DISPLAYED} of {filteredAssets.length} matching assets.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
