interface ControlsProps {
  currentPeriod: 'daily' | 'weekly' | 'monthly';
  onPeriodChange: (period: 'daily' | 'weekly' | 'monthly') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  languages: string[];
}

export default function Controls({
  currentPeriod,
  onPeriodChange,
  searchTerm,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  languages,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex gap-2">
        <button
          onClick={() => onPeriodChange('daily')}
          className={`px-5 py-2.5 rounded-md font-medium text-[15px] transition-all border-2 ${
            currentPeriod === 'daily'
              ? 'bg-[#0366d6] text-white border-[#0366d6]'
              : 'bg-white text-gray-700 border-[#e1e4e8] hover:border-[#0366d6] hover:text-[#0366d6]'
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => onPeriodChange('weekly')}
          className={`px-5 py-2.5 rounded-md font-medium text-[15px] transition-all border-2 ${
            currentPeriod === 'weekly'
              ? 'bg-[#0366d6] text-white border-[#0366d6]'
              : 'bg-white text-gray-700 border-[#e1e4e8] hover:border-[#0366d6] hover:text-[#0366d6]'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => onPeriodChange('monthly')}
          className={`px-5 py-2.5 rounded-md font-medium text-[15px] transition-all border-2 ${
            currentPeriod === 'monthly'
              ? 'bg-[#0366d6] text-white border-[#0366d6]'
              : 'bg-white text-gray-700 border-[#e1e4e8] hover:border-[#0366d6] hover:text-[#0366d6]'
          }`}
        >
          Monthly
        </button>
      </div>
      
      <div className="flex-1 min-w-[250px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search repositories..."
          className="w-full px-4 py-2.5 border-2 border-[#e1e4e8] rounded-md text-[15px] focus:outline-none focus:border-[#0366d6]"
        />
      </div>
      
      <div className="min-w-[200px]">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-[#e1e4e8] rounded-md text-[15px] focus:outline-none focus:border-[#0366d6] bg-white"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
