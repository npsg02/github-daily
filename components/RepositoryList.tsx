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
      <div className="flex flex-col items-center justify-center py-24 text-[#586069]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#e1e4e8] border-t-[#667eea] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#764ba2] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="mt-6 text-lg font-medium">Loading trending repositories...</p>
        <p className="text-sm text-gray-400 mt-2">This won&apos;t take long ✨</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-800 px-8 py-6 rounded-2xl text-center shadow-lg">
        <div className="text-4xl mb-3">⚠️</div>
        <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600">Failed to load data. Please try again later.</p>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-24 px-6">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-[#24292e] mb-2">No repositories found</h3>
        <p className="text-[#586069]">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {repositories.map((repo, index) => (
        <RepositoryCard key={`${repo.name}-${index}`} repository={repo} />
      ))}
    </div>
  );
}
