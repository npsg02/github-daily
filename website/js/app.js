// GitHub Trending App
class TrendingApp {
    constructor() {
        this.currentPeriod = 'daily';
        this.allRepositories = [];
        this.filteredRepositories = [];
        this.languages = new Set();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadData();
    }
    
    setupEventListeners() {
        // Period buttons
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changePeriod(e.target.dataset.period);
            });
        });
        
        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.filterRepositories();
        });
        
        // Language filter
        const languageFilter = document.getElementById('languageFilter');
        languageFilter.addEventListener('change', () => {
            this.filterRepositories();
        });
    }
    
    changePeriod(period) {
        this.currentPeriod = period;
        
        // Update button states
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.period === period) {
                btn.classList.add('active');
            }
        });
        
        // Reset filters
        document.getElementById('searchInput').value = '';
        document.getElementById('languageFilter').value = '';
        
        this.loadData();
    }
    
    async loadData() {
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const repositories = document.getElementById('repositories');
        
        loading.style.display = 'block';
        error.style.display = 'none';
        repositories.innerHTML = '';
        
        try {
            // Determine the correct path based on whether we're in a subdirectory or not
            const basePath = window.location.pathname.includes('/website/') ? '../data' : './data';
            const response = await fetch(`${basePath}/${this.currentPeriod}/latest.json`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const data = await response.json();
            this.allRepositories = data.repositories || [];
            
            // Update last updated date
            document.getElementById('lastUpdated').textContent = data.date || '-';
            
            // Extract all languages
            this.extractLanguages();
            this.populateLanguageFilter();
            
            // Display repositories
            this.filterRepositories();
            
        } catch (err) {
            console.error('Error loading data:', err);
            error.style.display = 'block';
        } finally {
            loading.style.display = 'none';
        }
    }
    
    extractLanguages() {
        this.languages = new Set();
        this.allRepositories.forEach(repo => {
            if (repo.language) {
                this.languages.add(repo.language);
            }
        });
    }
    
    populateLanguageFilter() {
        const select = document.getElementById('languageFilter');
        const currentValue = select.value;
        
        // Clear existing options except the first one
        select.innerHTML = '<option value="">All Languages</option>';
        
        // Add language options
        Array.from(this.languages).sort().forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang;
            select.appendChild(option);
        });
        
        // Restore selection if possible
        if (currentValue && this.languages.has(currentValue)) {
            select.value = currentValue;
        }
    }
    
    filterRepositories() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const selectedLanguage = document.getElementById('languageFilter').value;
        
        this.filteredRepositories = this.allRepositories.filter(repo => {
            // Search filter
            const matchesSearch = !searchTerm || 
                (repo.name && repo.name.toLowerCase().includes(searchTerm)) ||
                (repo.description && repo.description.toLowerCase().includes(searchTerm));
            
            // Language filter
            const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;
            
            return matchesSearch && matchesLanguage;
        });
        
        this.renderRepositories();
    }
    
    renderRepositories() {
        const container = document.getElementById('repositories');
        const repoCount = document.getElementById('repoCount');
        
        repoCount.textContent = this.filteredRepositories.length;
        
        if (this.filteredRepositories.length === 0) {
            container.innerHTML = '<div class="loading">No repositories found matching your criteria.</div>';
            return;
        }
        
        container.innerHTML = this.filteredRepositories.map(repo => 
            this.createRepoCard(repo)
        ).join('');
    }
    
    createRepoCard(repo) {
        const languageColor = this.getLanguageColor(repo.language);
        const languageHtml = repo.language ? `
            <div class="meta-item">
                <span class="language-dot" style="background-color: ${languageColor}"></span>
                <span>${repo.language}</span>
            </div>
        ` : '';
        
        const starsHtml = repo.stars_today ? `
            <div class="meta-item stars-today">
                ⭐ ${repo.stars_today} stars today
            </div>
        ` : '';
        
        return `
            <div class="repo-card">
                <div class="repo-header">
                    <div class="repo-name">
                        <a href="${repo.url || '#'}" target="_blank" rel="noopener noreferrer">
                            ${this.escapeHtml(repo.name || 'Unknown')}
                        </a>
                    </div>
                </div>
                ${repo.description ? `
                    <div class="repo-description">
                        ${this.escapeHtml(repo.description)}
                    </div>
                ` : ''}
                <div class="repo-meta">
                    ${languageHtml}
                    ${starsHtml}
                </div>
            </div>
        `;
    }
    
    getLanguageColor(language) {
        // Common language colors (simplified)
        const colors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'Java': '#b07219',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Ruby': '#701516',
            'PHP': '#4F5D95',
            'C++': '#f34b7d',
            'C': '#555555',
            'C#': '#178600',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33',
            'Dart': '#00B4AB',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Shell': '#89e051',
            'Vue': '#41b883',
            'Jupyter Notebook': '#DA5B0B',
        };
        
        return colors[language] || '#8257e5';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TrendingApp();
});
