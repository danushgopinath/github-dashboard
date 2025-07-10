import { MetricRow } from './types';

export const DEFAULT_REPO = 'danushgopinath/cp-leetcode-solutions';

const BASE = (process.env.NEXT_PUBLIC_METRICS_URL ?? '').replace(/\/$/, ''); 

export async function fetchMetrics(
  repo: string = DEFAULT_REPO,
  days: number = 30,
): Promise<MetricRow[]> {
  if (!BASE) {
    console.warn('[metrics] NEXT_PUBLIC_METRICS_URL not set → using mock data');
    return generateMockData(days);
  }

  const url = `${BASE}?repo=${encodeURIComponent(repo)}&days=${days}`;

  try {
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as unknown;
    if (!Array.isArray(json)) throw new Error('Invalid payload');
    return json as MetricRow[];
  } catch (err) {
    console.warn('[metrics] fetch failed → mock data', err);
    return generateMockData(days);
  }
}

function generateMockData(days: number): MetricRow[] {
  const langs = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'];
  const today = new Date();
  return Array.from({ length: days }).map((_, idx) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (days - 1 - idx));
    return {
      date: d.toISOString().slice(0, 10),
      commits: rand(1, 15),
      forks: rand(10, 14),
      open_issues: rand(2, 9),
      stars: rand(50, 70),
      top_lang: langs[rand(0, langs.length - 1)],
      watchers: rand(15, 25),
      size_kb: rand(5000, 6000),
    };
  });
}

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
