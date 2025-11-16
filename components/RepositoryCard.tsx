import { Repository } from '@/types';

interface RepositoryCardProps {
  repository: Repository;
}

const getLanguageColor = (language?: string): string => {
  const colors: Record<string, string> = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'Dart': '#00B4AB',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Vue': '#41b883',
    'Jupyter Notebook': '#DA5B0B',
  };
  
  return language ? (colors[language] || '#8257e5') : '#8257e5';
};

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  const languageColor = getLanguageColor(repository.language);

  return (
    <div className="bg-white p-6 rounded-xl border border-[#e1e4e8] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animate-fadeInUp">
      <div className="mb-3">
        <a
          href={repository.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold text-[#0366d6] hover:text-[#0256c7] transition-colors duration-200 group-hover:underline decoration-2 underline-offset-4"
        >
          {repository.name || 'Unknown'}
        </a>
      </div>
      
      {repository.description && (
        <p className="text-[#586069] mb-4 leading-relaxed line-clamp-3">
          {repository.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-4 items-center text-sm text-[#586069]">
        {repository.language && (
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full transition-colors duration-200 hover:bg-gray-100">
            <span
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: languageColor }}
            ></span>
            <span className="font-medium">{repository.language}</span>
          </div>
        )}
        
        {repository.stars_today && (
          <div className="flex items-center gap-1.5 text-[#28a745] font-semibold px-3 py-1 bg-green-50 rounded-full">
            <span className="text-base">⭐</span>
            <span>{repository.stars_today} stars today</span>
          </div>
        )}
      </div>
    </div>
  );
}
