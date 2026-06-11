import React from 'react';

interface AvatarProps {
  initials: string;
  color?: 'primary' | 'red' | 'amber' | 'green' | 'blue';
  size?: 'sm' | 'md'; // sm: 30px, md: 36px
}

export const Avatar: React.FC<AvatarProps> = ({ initials, color = 'primary', size = 'md' }) => {
  const colorMap = {
    primary: {
      bg: 'bg-primary-light',
      text: 'text-primary-dark',
    },
    red: {
      bg: 'bg-critical-bg',
      text: 'text-critical-text',
    },
    amber: {
      bg: 'bg-warning-bg',
      text: 'text-warning-text',
    },
    green: {
      bg: 'bg-success-bg',
      text: 'text-success-text',
    },
    blue: {
      bg: 'bg-info-bg',
      text: 'text-info-text',
    },
  };

  const { bg, text } = colorMap[color] || colorMap.primary;
  const sizeClass = size === 'sm' ? 'w-[30px] h-[30px] text-[12px]' : 'w-[36px] h-[36px] text-[13px]';

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold select-none border border-black/5 ${bg} ${text} ${sizeClass}`}
      aria-label={`Avatar for initials ${initials}`}
    >
      {initials}
    </div>
  );
};
