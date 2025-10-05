# Next.js Migration - Deployment Guide

## What Changed

The website has been successfully migrated from static HTML/CSS/JS to a modern Next.js application with Tailwind CSS.

## Key Changes

1. **Technology Stack**
   - Next.js 15 with TypeScript
   - Tailwind CSS for styling
   - React 19 for UI components
   - Static export for GitHub Pages

2. **Project Structure**
   ```
   /
   ├── app/                 # Next.js app directory
   │   ├── layout.tsx      # Root layout with SEO metadata
   │   ├── page.tsx        # Home page
   │   └── globals.css     # Global styles
   ├── components/         # React components
   │   ├── TrendingPage.tsx
   │   ├── Header.tsx
   │   ├── Controls.tsx
   │   ├── Stats.tsx
   │   ├── RepositoryList.tsx
   │   ├── RepositoryCard.tsx
   │   └── Footer.tsx
   ├── types/              # TypeScript types
   ├── data/               # JSON data files (unchanged)
   ├── public/             # Static assets
   └── out/                # Build output (gitignored)
   ```

3. **GitHub Actions Workflow**
   - Updated `.github/workflows/pages.yml` to build Next.js
   - Installs Node.js 20 and npm dependencies
   - Runs `npm run build` to create static export
   - Copies `data/` directory to `out/` directory
   - Deploys to GitHub Pages

## Deployment

The deployment is fully automated via GitHub Actions:

1. Push to `main` branch triggers the workflow
2. Next.js site is built and exported to `out/` directory
3. Data files are copied to the build output
4. Everything is deployed to GitHub Pages

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# The build output will be in the `out/` directory
```

## SEO Improvements

The new site includes:
- Meta description and keywords
- Open Graph tags for social media sharing
- Twitter card metadata
- Semantic HTML structure
- Optimized performance with static export

## Backward Compatibility

- The old `website/` directory is still present but no longer used
- All data files remain in the same location and format
- The Python crawler continues to work without changes
- API endpoint paths remain the same (`/data/{period}/latest.json`)

## Website URL

After deployment, the site will be available at:
- **https://npsg02.github.io/github-daily/**

Note: The URL changed from `/github-daily/website/` to `/github-daily/` (root level).

## Maintenance

The website requires no maintenance beyond what was already in place:
- Daily crawler runs continue to update data files
- No build process required for data updates
- GitHub Actions automatically rebuilds and deploys on push to main
