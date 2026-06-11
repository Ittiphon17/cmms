import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DonutSegment {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSegment[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Map segment names to their color hex values/vars
  const colorMap: Record<string, string> = {
    'Operational': 'var(--color-success)',
    'Pending': 'var(--color-warning)',
    'Critical': 'var(--color-critical)',
  };

  return (
    <div className="relative w-full h-[180px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorMap[entry.name] || entry.color || 'var(--color-primary)'}
                stroke="var(--color-surface)"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Centered label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[26px] font-semibold text-text-primary leading-none">
          {total}
        </span>
        <span 
          className="text-[10px] font-semibold text-text-secondary tracking-[0.5px] uppercase mt-1"
          style={{ letterSpacing: '0.5px' }}
        >
          Total Units
        </span>
      </div>
    </div>
  );
};
