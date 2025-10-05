# 🔥 GitHub Trending Daily

Automatically crawl and archive GitHub trending repositories daily, weekly, and monthly. View the trending projects on a beautiful, SEO-optimized Next.js website.

## Features

- 🤖 **Automated Crawling**: GitHub Actions workflow runs daily to fetch trending repositories
- 📊 **Multiple Periods**: Track daily, weekly, and monthly trending projects
- 🔍 **Search & Filter**: Search repositories by name/description and filter by programming language
- 🎨 **Modern UI**: Built with Next.js and Tailwind CSS for optimal performance
- 🚀 **SEO Optimized**: Metadata, Open Graph tags, and semantic HTML for better discoverability
- 📦 **Data Archive**: Historical data stored as JSON files in the repository
- ⚡ **Static Export**: Fast, reliable deployment on GitHub Pages

## Live Website

Visit the website to explore trending GitHub projects: [https://npsg02.github.io/github-daily/](https://npsg02.github.io/github-daily/)

![GitHub Trending Daily Homepage](https://github.com/user-attachments/assets/7bbeaa09-a191-478d-80b7-10e1cd88bf8e)

## How It Works

1. **GitHub Actions Workflow** (`.github/workflows/crawl.yml`):
   - Runs daily at 00:00 UTC (can also be triggered manually)
   - Executes the Python crawler script
   - Commits and pushes updated data to the repository

2. **Python Crawler** (`scripts/crawl_trending.py`):
   - Fetches trending repositories from GitHub for daily, weekly, and monthly periods
   - Parses HTML to extract repository information
   - Saves data as JSON files with timestamps

3. **Next.js Website**:
   - Built with Next.js 15 and Tailwind CSS
   - Server-side rendering with static export for optimal performance
   - SEO optimized with metadata and Open Graph tags
   - Responsive design for mobile and desktop
   - Real-time search and filtering capabilities

4. **CI/CD Pipeline** (`.github/workflows/pages.yml`):
   - Automatically builds and deploys the Next.js site on every push
   - Copies data directory to the build output
   - Deploys to GitHub Pages

## Data Structure

```
data/
├── daily/
│   ├── YYYY-MM-DD.json
│   └── latest.json
├── weekly/
│   ├── YYYY-MM-DD.json
│   └── latest.json
└── monthly/
    ├── YYYY-MM-DD.json
    └── latest.json
```

Each JSON file contains:
```json
{
  "date": "2024-01-01",
  "period": "daily",
  "count": 25,
  "repositories": [
    {
      "name": "owner/repo-name",
      "url": "https://github.com/owner/repo-name",
      "description": "Repository description",
      "language": "Python",
      "stars_today": "123"
    }
  ]
}
```

## Local Development

### Running the Crawler

```bash
# Make script executable
chmod +x scripts/crawl_trending.py

# Run the crawler
python3 scripts/crawl_trending.py
```

### Running the Next.js Website Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

The development server will be available at `http://localhost:3000`.

## Manual Workflow Trigger

You can manually trigger the crawling workflow:

1. Go to the "Actions" tab in the GitHub repository
2. Select "Crawl GitHub Trending" workflow
3. Click "Run workflow"

## Technologies Used

- **Python 3**: Web crawling with standard library (urllib, HTMLParser)
- **Next.js 15**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **GitHub Actions**: CI/CD automation
- **GitHub Pages**: Website hosting

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - feel free to use this project for your own purposes.