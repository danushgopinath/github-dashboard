'use client';

interface Props {
  title: string;
  value: number | string;
  icon: string;
  trend?: number;
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  /* helper to prettify big numbers */
  const fmt = (n: number | string) =>
    typeof n === 'number'
      ? n >= 1_000_000
        ? `${(n / 1_000_000).toFixed(1)}M`
        : n >= 1_000
        ? `${(n / 1_000).toFixed(1)}K`
        : n.toString()
      : n;

  return (
    <div className="card p-6 hover:shadow-xl hover:-translate-y-0.5 transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-semibold">{fmt(value)}</p>
            {trend !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  trend > 0
                    ? 'text-green-700 bg-green-100'
                    : trend < 0
                    ? 'text-red-700 bg-red-100'
                    : 'text-gray-600 bg-gray-100'
                }`}
              >
                {trend > 0 ? '+' : ''}
                {trend}%
              </span>
            )}
          </div>
        </div>
        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
          <i className={`${icon} text-purple-600 text-xl`} />
        </div>
      </div>
    </div>
  );
}
