'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { MetricRow } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: MetricRow[];
  isLoading?: boolean;
}

export default function LanguagePieChart({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/20">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-4" />
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  const counts = data.reduce<Record<string, number>>((acc, r) => {
    acc[r.top_lang] = (acc[r.top_lang] ?? 0) + 1;
    return acc;
  }, {});

  const colors = [
    '#A855F7',
    '#EC4899',
    '#F59E0B',
    '#10B981',
    '#3B82F6',
    '#8B5CF6',
    '#F97316',
  ];

  const chartData = {
    labels: Object.keys(counts),
    datasets: [
      {
        data: Object.values(counts),
        backgroundColor: colors.slice(0, Object.keys(counts).length),
        borderColor: '#fff',
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#374151',
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#A855F7',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (ctx: any) => {
            const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const pct = ((ctx.parsed as number) / total) * 100;
            return `${ctx.label}: ${pct.toFixed(1)}%`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/20">
      <h3 className="text-lg font-semibold mb-4">Language Distribution</h3>
      <div className="h-64">
        <Pie
          data={chartData}
          options={options}
          role="img"
          aria-label="Pie chart showing programming language distribution"
        />
      </div>
    </div>
  );
}
