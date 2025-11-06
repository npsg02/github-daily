interface StatsProps {
  count: number;
  lastUpdated: string;
}

export default function Stats({ count, lastUpdated }: StatsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          {count}
        </span>
        <span className="text-[#586069] font-medium">repositories found</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-[#586069]">
        <span className="text-lg">📅</span>
        <span>Last updated:</span>
        <span className="font-semibold text-[#24292e] px-3 py-1 bg-gray-100 rounded-full">
          {lastUpdated}
        </span>
      </div>
    </div>
  );
}
