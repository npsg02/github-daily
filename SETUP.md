# Setup Guide for GitHub Trending Daily

This guide will help you get the GitHub Trending Daily project fully operational.

## Step 1: Enable GitHub Pages

To make the website publicly accessible:

1. Go to your repository on GitHub: https://github.com/npsg02/github-daily
2. Click on **Settings** (top navigation)
3. Click on **Pages** (left sidebar under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
5. Click **Save**

The Pages workflow will automatically build the Next.js site and deploy it. After a few minutes, your website will be live at:
**https://npsg02.github.io/github-daily/**

## Step 2: Verify the Crawl Workflow

The crawler is configured to run automatically every day at 00:00 UTC. To verify it's working:

1. Go to the **Actions** tab in your repository
2. You should see the "Crawl GitHub Trending" workflow
3. You can manually trigger it by:
   - Clicking on "Crawl GitHub Trending" workflow
   - Clicking the "Run workflow" button
   - Selecting the branch and clicking "Run workflow"

## Step 3: Check the Data

After the first crawl runs, you should see:
- New JSON files in `data/daily/`, `data/weekly/`, and `data/monthly/`
- A new commit from `github-actions[bot]` with the message "Update trending repositories - YYYY-MM-DD"

## Manual Testing

### Test the Crawler Locally

```bash
# Make the script executable
chmod +x scripts/crawl_trending.py

# Run the crawler
python3 scripts/crawl_trending.py
```

### Test the Website Locally

```bash
# Install dependencies
npm install

# Run the Next.js development server
npm run dev

# Open your browser to:
# http://localhost:3000
```

## Troubleshooting

### Crawler Not Running

If the crawler doesn't run automatically:
1. Check that the workflow file is in `.github/workflows/crawl.yml`
2. Ensure the repository has "Actions" enabled (Settings → Actions → General)
3. Verify the workflow has "Read and write permissions" (Settings → Actions → General → Workflow permissions)

### Website Not Showing Data

If the website shows "Failed to load data":
1. Check that data files exist in `data/daily/latest.json`, etc.
2. Run the crawler manually to generate initial data
3. Verify the GitHub Pages deployment was successful (Actions tab)

### Rate Limiting

GitHub may rate-limit requests to the trending page. If you see errors:
1. The crawler will log errors but continue with other periods
2. Wait a few hours and try again
3. The daily automated run should work fine with normal usage

## Features

✅ **Daily Automated Crawling** - Runs at 00:00 UTC every day
✅ **Historical Data** - All crawls are saved with timestamps
✅ **Search & Filter** - Find repos by name, description, or language
✅ **Period Switching** - View daily, weekly, or monthly trends
✅ **Responsive Design** - Works on desktop and mobile

## Next Steps

- Monitor the Actions tab for successful crawl runs
- Visit your GitHub Pages site to see the trending repositories
- Star some of the trending repos you find interesting!
- Share your site with others

Enjoy discovering trending GitHub projects! 🔥
