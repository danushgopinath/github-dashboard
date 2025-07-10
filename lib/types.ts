export type MetricRow = {
  date: string;
  commits: number;
  forks: number;
  open_issues: number;
  stars: number;
  top_lang: string;
  watchers: number;
  size_kb: number;
};

export type DateRange = {
  days: number;
  label: string;
};
