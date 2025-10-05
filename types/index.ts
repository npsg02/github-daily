export interface Repository {
  name: string;
  url: string;
  description?: string;
  language?: string;
  stars_today?: string;
}

export interface TrendingData {
  date: string;
  period: string;
  count: number;
  repositories: Repository[];
}
