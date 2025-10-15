export default function Footer() {
  return (
    <footer className="mt-16 py-6 border-t border-[#e1e4e8] text-center text-[#586069] text-sm">
      <div className="max-w-7xl mx-auto px-5">
        <p>
          Data updated daily via GitHub Actions |{' '}
          <a
            href="https://github.com/npsg02/github-daily"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0366d6] hover:underline"
          >
            View Source
          </a>
        </p>
      </div>
    </footer>
  );
}
