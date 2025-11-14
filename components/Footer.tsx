export default function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-[#e1e4e8] text-center text-[#586069] bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5">
        <div className="mb-4">
          <p className="text-base font-medium">
            ⚡ Data updated daily via GitHub Actions
          </p>
        </div>
        <div className="flex justify-center gap-6 text-sm">
          <a
            href="https://github.com/npsg02/github-daily"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0366d6] hover:text-[#0256c7] transition-colors duration-200 font-medium hover:underline underline-offset-4"
          >
            📦 View Source
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="https://github.com/trending"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0366d6] hover:text-[#0256c7] transition-colors duration-200 font-medium hover:underline underline-offset-4"
          >
            🔥 GitHub Trending
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Made with ❤️ for the open source community
        </p>
      </div>
    </footer>
  );
}
