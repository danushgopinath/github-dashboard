'use client';

import { useState, useEffect } from 'react';
import { fetchMetrics, DEFAULT_REPO } from '../lib/api';
import { MetricRow } from '../lib/types';

import StatCard from '../components/ui/StatCard';
import DateRangeSelector from '../components/ui/DateRangeSelector';

import CommitsLineChart from '../components/charts/CommitsLineChart';
import LanguagePieChart from '../components/charts/LanguagePieChart';
import StarsAreaChart from '../components/charts/StarsAreaChart';
import ForksBarChart from '../components/charts/ForksBarChart';
import IssuesWatchersChart from '../components/charts/IssuesWatchersChart';
import RepoSizeChart from '../components/charts/RepoSizeChart';

export default function Home() {
  const [metrics, setMetrics] = useState<MetricRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<7 | 14 | 30>(30);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMetrics(DEFAULT_REPO, selectedRange);
        if (!cancelled) setMetrics(data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [selectedRange]);

  const latest = metrics.at(-1);
  const totalCommits = metrics.reduce((s, r) => s + r.commits, 0);

  const trend = (key: keyof MetricRow) => {
    if (metrics.length < 2) return 0;
    const now = metrics.at(-1)![key] as number;
    const prev = metrics.at(-2)![key] as number;
    return prev ? Math.round(((now - prev) / prev) * 100) : 0;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-lg shadow-purple-100/50 border border-purple-100/20 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-center mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={() => location.reload()}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {/* header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-12 bg-purple-500 rounded-full" />
            <div>
              <h1 className="text-3xl font-bold">GitHub Portfolio Analytics</h1>
              <p className="text-gray-600">
                Repository:{' '}
                <span className="font-medium text-purple-600">
                  {DEFAULT_REPO}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              Tracking repository metrics and development trends
            </p>
            <DateRangeSelector
              selectedRange={selectedRange}
              onRangeChange={(d) => setSelectedRange(d as 7 | 14 | 30)}
              isLoading={isLoading}
            />
          </div>
        </header>

        {/* KPI grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Commits"
            value={totalCommits}
            icon="ri-git-commit-line"
            trend={trend('commits')}
            isLoading={isLoading}
          />
          <StatCard
            title="Stars"
            value={latest?.stars ?? 0}
            icon="ri-star-line"
            trend={trend('stars')}
            isLoading={isLoading}
          />
          <StatCard
            title="Forks"
            value={latest?.forks ?? 0}
            icon="ri-git-branch-line"
            trend={trend('forks')}
            isLoading={isLoading}
          />
          <StatCard
            title="Watchers"
            value={latest?.watchers ?? 0}
            icon="ri-eye-line"
            trend={trend('watchers')}
            isLoading={isLoading}
          />
          <StatCard
            title="Open Issues"
            value={latest?.open_issues ?? 0}
            icon="ri-error-warning-line"
            trend={trend('open_issues')}
            isLoading={isLoading}
          />
          <StatCard
            title="Repository Size"
            value={`${latest?.size_kb ?? 0} KB`}
            icon="ri-hard-drive-line"
            trend={trend('size_kb')}
            isLoading={isLoading}
          />
        </div>

        {/* charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CommitsLineChart data={metrics} isLoading={isLoading} />
          <LanguagePieChart data={metrics} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <StarsAreaChart data={metrics} isLoading={isLoading} />
          <ForksBarChart data={metrics} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <IssuesWatchersChart data={metrics} isLoading={isLoading} />
          <RepoSizeChart data={metrics} isLoading={isLoading} />
        </div>

        {/* footer */}
        <footer className="mt-12 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-purple-100/50 border border-purple-100/20">
            <p className="text-gray-600">
              Last updated:{' '}
              <span className="font-medium" suppressHydrationWarning>
                {new Date().toLocaleString()}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Data automatically refreshes from your GitHub repository metrics
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
