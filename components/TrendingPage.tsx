'use client';

import { useState, useEffect, useCallback } from 'react';
import { Repository } from '@/types';
import Header from './Header';
import Controls from './Controls';
import Stats from './Stats';
import RepositoryList from './RepositoryList';
import Footer from './Footer';

export default function TrendingPage() {
  const [currentPeriod, setCurrentPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [allRepositories, setAllRepositories] = useState<Repository[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('-');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      // Use basePath for production GitHub Pages deployment
      const basePath = process.env.NODE_ENV === 'production' ? '/github-daily' : '';
      const response = await fetch(`${basePath}/data/${currentPeriod}/latest.json`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setAllRepositories(data.repositories || []);
      setLastUpdated(data.date || '-');
      
      // Extract all languages
      const uniqueLanguages = new Set<string>();
      data.repositories.forEach((repo: Repository) => {
        if (repo.language) {
          uniqueLanguages.add(repo.language);
        }
      });
      setLanguages(Array.from(uniqueLanguages).sort());
      
    } catch (err) {
      console.error('Error loading data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [currentPeriod]);

  const filterRepositories = useCallback(() => {
    const filtered = allRepositories.filter(repo => {
      // Search filter
      const matchesSearch = !searchTerm || 
        (repo.name && repo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Language filter
      const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;
      
      return matchesSearch && matchesLanguage;
    });
    
    setFilteredRepositories(filtered);
  }, [allRepositories, searchTerm, selectedLanguage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    filterRepositories();
  }, [filterRepositories]);

  const handlePeriodChange = (period: 'daily' | 'weekly' | 'monthly') => {
    setCurrentPeriod(period);
    setSearchTerm('');
    setSelectedLanguage('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-5 py-8">
        <Controls
          currentPeriod={currentPeriod}
          onPeriodChange={handlePeriodChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          languages={languages}
        />
        
        <Stats 
          count={filteredRepositories.length} 
          lastUpdated={lastUpdated} 
        />
        
        <RepositoryList
          repositories={filteredRepositories}
          loading={loading}
          error={error}
        />
      </main>
      
      <Footer />
    </div>
  );
}
