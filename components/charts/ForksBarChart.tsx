'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { MetricRow } from '../../lib/types';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data: MetricRow[];
  isLoading?: boolean;
}

export default function ForksBarChart({ data, isLoading }: Props) {
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
        label: 'Forks',
        data: data.map((d) => d.forks),
        backgroundColor: 'rgba(16,185,129,0.8)',
        borderColor: '#10B981',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        borderColor: '#10B981',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/20">
      <h3 className="text-lg font-semibold mb-4">Repository Forks</h3>
      <div className="h-64">
        <Bar
          data={chartData}
          options={options}
          role="img"
          aria-label="Bar chart showing repository forks over time"
        />
      </div>
    </div>
  );
}
