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
    <div className="flex flex-wrap gap-4 mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
      <div className="flex gap-2">
        <button
          onClick={() => onPeriodChange('daily')}
          className={`px-6 py-3 rounded-xl font-semibold text-[15px] transition-all duration-300 border-2 transform hover:scale-105 ${
            currentPeriod === 'daily'
              ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-transparent shadow-lg'
              : 'bg-white text-gray-700 border-[#e1e4e8] hover:border-[#667eea] hover:text-[#667eea] hover:shadow-md'
          }`}
        >
          📅 Daily
        </button>
        <button
          onClick={() => onPeriodChange('weekly')}
          className={`px-6 py-3 rounded-xl font-semibold text-[15px] transition-all duration-300 border-2 transform hover:scale-105 ${
            currentPeriod === 'weekly'
              ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-transparent shadow-lg'
              : 'bg-white text-gray-700 border-[#e1e4e8] hover:border-[#667eea] hover:text-[#667eea] hover:shadow-md'
          }`}
        >
          📊 Weekly
        </button>
        <button
          onClick={() => onPeriodChange('monthly')}
          className={`px-6 py-3 rounded-xl font-semibold text-[15px] transition-all duration-300 border-2 transform hover:scale-105 ${
            currentPeriod === 'monthly'
              ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-transparent shadow-lg'
              : 'bg-white text-gray-700 border-[#e1e4e8] hover:border-[#667eea] hover:text-[#667eea] hover:shadow-md'
          }`}
        >
          📈 Monthly
        </button>
      </div>
      
      <div className="flex-1 min-w-[250px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Search repositories..."
          className="w-full px-5 py-3 border-2 border-[#e1e4e8] rounded-xl text-[15px] focus:outline-none focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/20 transition-all duration-300 bg-white"
        />
      </div>
      
      <div className="min-w-[200px]">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-5 py-3 border-2 border-[#e1e4e8] rounded-xl text-[15px] focus:outline-none focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/20 transition-all duration-300 bg-white cursor-pointer"
        >
          <option value="">🌐 All Languages</option>
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
