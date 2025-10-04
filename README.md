# 🔥 GitHub Trending Daily

Automatically crawl and archive GitHub trending repositories daily, weekly, and monthly. View the trending projects on a beautiful, searchable website.

## Features

- 🤖 **Automated Crawling**: GitHub Actions workflow runs daily to fetch trending repositories
- 📊 **Multiple Periods**: Track daily, weekly, and monthly trending projects
- 🔍 **Search & Filter**: Search repositories by name/description and filter by programming language
- 🎨 **Clean UI**: Modern, responsive design for browsing trending projects
- 📦 **Data Archive**: Historical data stored as JSON files in the repository

## Live Website

Visit the website to explore trending GitHub projects: [https://npsg02.github.io/github-daily/website/](https://npsg02.github.io/github-daily/website/)

## How It Works

1. **GitHub Actions Workflow** (`.github/workflows/crawl.yml`):
   - Runs daily at 00:00 UTC (can also be triggered manually)
   - Executes the Python crawler script
   - Commits and pushes updated data to the repository

2. **Python Crawler** (`scripts/crawl_trending.py`):
   - Fetches trending repositories from GitHub for daily, weekly, and monthly periods
   - Parses HTML to extract repository information
   - Saves data as JSON files with timestamps

3. **Static Website** (`website/`):
   - Pure HTML/CSS/JavaScript (no build step required)
   - Loads data from JSON files
   - Provides search and filtering capabilities
   - Responsive design for mobile and desktop

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

### Viewing the Website Locally

```bash
# Serve the website directory
cd website
python3 -m http.server 8000

# Open http://localhost:8000 in your browser
```

## Manual Workflow Trigger

You can manually trigger the crawling workflow:

1. Go to the "Actions" tab in the GitHub repository
2. Select "Crawl GitHub Trending" workflow
3. Click "Run workflow"

## Technologies Used

- **Python 3**: Web crawling with standard library (urllib, HTMLParser)
- **GitHub Actions**: CI/CD automation
- **HTML/CSS/JavaScript**: Frontend website
- **GitHub Pages**: Website hosting

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - feel free to use this project for your own purposes.