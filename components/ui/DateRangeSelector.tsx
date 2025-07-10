'use client';

import { DateRange } from '../../lib/types';

interface Props {
  selectedRange: number;
  onRangeChange: (d: number) => void;
  isLoading?: boolean;
}

const RANGES: DateRange[] = [
  { days: 7, label: '7 Days' },
  { days: 14, label: '14 Days' },
  { days: 30, label: '30 Days' },
];

export default function DateRangeSelector({
  selectedRange,
  onRangeChange,
  isLoading,
}: Props) {
  return (
    <div className="flex gap-5">
      {RANGES.map(({ days, label }) => {
        const active = selectedRange === days;
        return (
          <button
            key={days}
            disabled={isLoading}
            onClick={() => onRangeChange(days)}
            className={`
              rounded-xl px-8 py-2.5 text-base font-semibold font-[Montserrat] tracking-wide
              border border-transparent transition-colors
              ${active ? 'bg-purple-500 text-white shadow-lg'
                       : 'bg-white text-gray-800 hover:bg-purple-100'}
              focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
              ${isLoading && 'opacity-50 cursor-not-allowed'}
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
