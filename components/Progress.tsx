'use client';

import React from 'react';

interface GradientProgressProps {
  value: number;
  max?: number;
  height?: string;
}

const Progress: React.FC<GradientProgressProps> = ({
  value,
  max = 100,
  height = '20px',
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="relative w-full rounded-full bg-gray-700 overflow-hidden" style={{ height }}>
      {/* رنگ گرادیانی */}
      <div
        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
        style={{
          width:"100%",
          backgroundImage:
            'linear-gradient(to right, #3b82f6, #22c55e, #eab308, #ef4444, #a855f7, #f43f5e)',
        }}
      />

      {/* دایره سفید روی نوار */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border border-gray-300 shadow-lg transition-all duration-500"
        style={{
          left: `calc(${percentage}% - 12px)`,
        }}
      />
    </div>
  );
};

export default Progress;
