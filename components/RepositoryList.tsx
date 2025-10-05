import { Repository } from '@/types';
import RepositoryCard from './RepositoryCard';

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  error: boolean;
}

export default function RepositoryList({ repositories, loading, error }: RepositoryListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#586069]">
        <div className="w-12 h-12 border-4 border-[#e1e4e8] border-t-[#0366d6] rounded-full animate-spin mb-4"></div>
        <p>Loading trending repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg text-center">
        Failed to load data. Please try again later.
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-20 text-[#586069]">
        No repositories found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {repositories.map((repo, index) => (
        <RepositoryCard key={`${repo.name}-${index}`} repository={repo} />
      ))}
    </div>
  );
}
