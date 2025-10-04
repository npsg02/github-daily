#!/usr/bin/env python3
"""
GitHub Trending Crawler
Crawls GitHub trending repositories and saves them to JSON files.
"""

import json
import os
import sys
from datetime import datetime
from typing import List, Dict
import urllib.request
import urllib.error
from html.parser import HTMLParser


class TrendingParser(HTMLParser):
    """Parser for GitHub trending page"""
    
    def __init__(self):
        super().__init__()
        self.repositories = []
        self.current_repo = {}
        self.in_repo_name = False
        self.in_description = False
        self.in_language = False
        self.in_stars = False
        self.in_forks = False
        self.current_data = []
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        # Repository name and link
        if tag == 'h2' and any(c for k, c in attrs if k == 'class' and 'h3' in c and 'lh-condensed' in c):
            self.in_repo_name = True
            self.current_data = []
            
        if tag == 'a' and self.in_repo_name:
            href = attrs_dict.get('href', '')
            if href.startswith('/') and href.count('/') >= 2:
                self.current_repo['url'] = f"https://github.com{href}"
                
        # Description
        if tag == 'p' and any(c for k, c in attrs if k == 'class' and 'col-9' in c):
            self.in_description = True
            self.current_data = []
            
        # Language
        if tag == 'span' and any(c for k, c in attrs if k == 'itemprop' and c == 'programmingLanguage'):
            self.in_language = True
            self.current_data = []
            
        # Stars today
        if tag == 'span' and any(c for k, c in attrs if k == 'class' and 'float-sm-right' in c):
            self.in_stars = True
            self.current_data = []
    
    def handle_endtag(self, tag):
        if tag == 'h2' and self.in_repo_name:
            self.in_repo_name = False
            name = ''.join(self.current_data).strip()
            # Clean up the name
            name = ' '.join(name.split())
            if name:
                self.current_repo['name'] = name
                
        if tag == 'p' and self.in_description:
            self.in_description = False
            desc = ''.join(self.current_data).strip()
            if desc:
                self.current_repo['description'] = desc
                
        if tag == 'span' and self.in_language:
            self.in_language = False
            lang = ''.join(self.current_data).strip()
            if lang:
                self.current_repo['language'] = lang
                
        if tag == 'span' and self.in_stars:
            self.in_stars = False
            stars_text = ''.join(self.current_data).strip()
            if stars_text:
                self.current_repo['stars_today'] = stars_text
                
        # When we have enough data, save the repository
        if tag == 'article' and self.current_repo.get('name'):
            self.repositories.append(self.current_repo.copy())
            self.current_repo = {}
    
    def handle_data(self, data):
        if self.in_repo_name or self.in_description or self.in_language or self.in_stars:
            self.current_data.append(data)


def fetch_trending(period: str = 'daily') -> List[Dict]:
    """
    Fetch trending repositories from GitHub.
    
    Args:
        period: 'daily', 'weekly', or 'monthly'
        
    Returns:
        List of repository dictionaries
    """
    period_param = '' if period == 'daily' else f'?since={period}'
    url = f'https://github.com/trending{period_param}'
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as response:
            html = response.read().decode('utf-8')
            
        parser = TrendingParser()
        parser.feed(html)
        
        return parser.repositories
        
    except urllib.error.URLError as e:
        print(f"Error fetching trending: {e}", file=sys.stderr)
        return []
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        return []


def save_trending_data(repositories: List[Dict], period: str, data_dir: str):
    """Save trending data to JSON file"""
    if not repositories:
        print(f"No repositories found for {period}")
        return
        
    # Create filename with date
    date_str = datetime.now().strftime('%Y-%m-%d')
    filepath = os.path.join(data_dir, period, f'{date_str}.json')
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    # Add metadata
    data = {
        'date': date_str,
        'period': period,
        'count': len(repositories),
        'repositories': repositories
    }
    
    # Save to file
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(repositories)} repositories to {filepath}")
    
    # Also update the latest file
    latest_path = os.path.join(data_dir, period, 'latest.json')
    with open(latest_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Updated {latest_path}")


def main():
    """Main function"""
    # Get the repository root directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    data_dir = os.path.join(repo_root, 'data')
    
    periods = ['daily', 'weekly', 'monthly']
    
    for period in periods:
        print(f"\nFetching {period} trending repositories...")
        repositories = fetch_trending(period)
        
        if repositories:
            save_trending_data(repositories, period, data_dir)
        else:
            print(f"Failed to fetch {period} trending repositories")
    
    print("\nCrawling completed!")


if __name__ == '__main__':
    main()
