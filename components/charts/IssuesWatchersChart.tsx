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
);

interface Props {
  data: MetricRow[];
  isLoading?: boolean;
}

export default function IssuesWatchersChart({ data, isLoading }: Props) {
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
        label: 'Open Issues',
        data: data.map((d) => d.open_issues),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#EF4444',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 3,
        tension: 0.4,
      },
      {
        label: 'Watchers',
        data: data.map((d) => d.watchers),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59,130,246,0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 3,
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
      legend: {
        position: 'top' as const,
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
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/20">
      <h3 className="text-lg font-semibold mb-4">Issues & Watchers</h3>
      <div className="h-64">
        <Line
          data={chartData}
          options={options}
          role="img"
          aria-label="Line chart showing open issues and watchers over time"
        />
      </div>
    </div>
  );
}
