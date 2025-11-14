export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] text-white py-16 text-center shadow-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeInUp">
          🔥 GitHub Trending Projects
        </h1>
        <p className="text-xl md:text-2xl opacity-95 font-light animate-fadeInUp animation-delay-100">
          Discover the hottest repositories on GitHub
        </p>
        <div className="mt-6 flex justify-center gap-2 animate-fadeInUp animation-delay-200">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            Updated Daily
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            25+ Repos
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            Multiple Languages
          </span>
        </div>
      </div>
    </header>
  );
}
