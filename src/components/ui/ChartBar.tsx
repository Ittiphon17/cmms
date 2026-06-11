import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartBarProps {
  data: any[];
  xKey?: string;
  yKey?: string;
  unit?: string;
}

export const ChartBar: React.FC<ChartBarProps> = ({
  data,
  xKey = 'day',
  yKey = 'value',
  unit = '',
}) => {
  return (
    <div className="w-full h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
          barSize={18}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--color-border-custom)"
          />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 11, fontWeight: 500 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 11, fontWeight: 500 }}
            domain={[0, 'auto']}
          />
          <Tooltip
            cursor={{ fill: 'rgba(13, 133, 138, 0.04)' }}
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-custom)',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              fontSize: '12px',
              padding: '6px 10px',
            }}
            labelStyle={{ fontWeight: 600, color: 'var(--color-text-primary)' }}
            itemStyle={{ color: 'var(--color-primary)', padding: 0 }}
            formatter={(value: any) => [`${value}${unit}`, 'Value']}
          />
          <Bar
            dataKey={yKey}
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
            background={{ fill: 'var(--color-primary-light)', radius: 4 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
