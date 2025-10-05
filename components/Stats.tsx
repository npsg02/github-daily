interface StatsProps {
  count: number;
  lastUpdated: string;
}

export default function Stats({ count, lastUpdated }: StatsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-6 text-[#586069]">
      <span>
        <span className="font-semibold text-[#24292e]">{count}</span> repositories found
      </span>
      <span className="text-sm">
        Last updated: <span className="font-medium">{lastUpdated}</span>
      </span>
    </div>
  );
}
