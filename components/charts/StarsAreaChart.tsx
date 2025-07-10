'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { MetricRow } from '../../lib/types';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface Props {
  data: MetricRow[];
  isLoading?: boolean;
}

export default function StarsAreaChart({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/20">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-4" />
        <div className="h-64 bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => format(new Date(d.date), 'MMM dd')),
    datasets: [
      {
        label: 'Stars',
        data: data.map((d) => d.stars),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245,158,11,0.1)',
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: '#F59E0B',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#6B7280', font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#F3F4F6' },
        border: { display: false },
        ticks: { color: '#6B7280', font: { size: 12 } },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#F59E0B',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/20">
      <h3 className="text-lg font-semibold mb-4">Stars Growth</h3>
      <div className="h-64">
        <Line
          data={chartData}
          options={options}
          role="img"
          aria-label="Area chart showing stars growth over time"
        />
      </div>
    </div>
  );
}
