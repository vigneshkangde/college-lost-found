import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, AlertCircle, PlusCircle, Search } from 'lucide-react';
import { useItems } from '../context/ItemContext';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import CategoryFilter from '../components/CategoryFilter';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import { CAMPUS_LOCATIONS } from '../data/mockData';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items } = useItems();

  // URL queries as single source of truth
  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedType = searchParams.get('type') || 'all'; // 'all' | 'lost' | 'found' | 'claimed'
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const setSearchQuery = (val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val) next.set('search', val);
      else next.delete('search');
      return next;
    });
  };

  const setSelectedCategory = (val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val && val !== 'all') next.set('category', val);
      else next.delete('category');
      return next;
    });
  };

  const setSelectedType = (val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val && val !== 'all') next.set('type', val);
      else next.delete('type');
      return next;
    });
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    return items.reduce((acc, item) => {
      const cat = item.category || 'Other';
      const catName = item.categoryName || cat;
      acc[cat] = (acc[cat] || 0) + 1;
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    }, {});
  }, [items]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = item.title.toLowerCase().includes(query);
          const matchesDesc = item.description?.toLowerCase().includes(query);
          const matchesLoc = item.location?.toLowerCase().includes(query);
          const matchesCategory = item.categoryName?.toLowerCase().includes(query);
          if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesCategory) {
            return false;
          }
        }

        // Type filter (lost / found / claimed)
        if (selectedType !== 'all') {
          if (selectedType === 'claimed') {
            if (item.status !== 'claimed') return false;
          } else if (item.type !== selectedType) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'all') {
          const matchCat =
            item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
            item.categoryName?.toLowerCase() === selectedCategory.toLowerCase();
          if (!matchCat) return false;
        }

        // Location filter
        if (selectedLocation !== 'all' && item.location !== selectedLocation) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [items, searchQuery, selectedType, selectedCategory, selectedLocation, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedLocation('all');
    setSortBy('newest');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'all' ||
    selectedType !== 'all' ||
    selectedLocation !== 'all';

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <SectionHeader
          kicker="Campus Directory"
          title="Browse Lost & Found Items"
          subtitle="Explore all active lost and found reports across the university campus."
          action={
            <div className="flex items-center gap-2">
              <Button to="/report-lost" variant="outlineLost" size="sm" icon={AlertCircle}>
                Report Lost
              </Button>
              <Button to="/report-found" variant="found" size="sm" icon={PlusCircle}>
                Report Found
              </Button>
            </div>
          }
        />

        {/* Search Bar */}
        <div className="max-w-3xl mt-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search items by name, campus location, or description..."
          />
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4">
        {/* Status / Type pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('lost')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedType === 'lost'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
              <span>Lost Items</span>
            </button>
            <button
              onClick={() => setSelectedType('found')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedType === 'found'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              <span>Found Items</span>
            </button>
            <button
              onClick={() => setSelectedType('claimed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedType === 'claimed'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              <span>Claimed</span>
            </button>
          </div>

          {/* Location & Sorting Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Campus Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Campus Locations</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="newest">Sort: Newest Date</option>
              <option value="oldest">Sort: Oldest Date</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-2.5 py-2 rounded-lg transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="pt-2">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
            variant="pills"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <p>
          Showing <strong className="text-slate-900 font-semibold">{filteredItems.length}</strong> items
          {searchQuery && (
            <span> matching &ldquo;<span className="text-indigo-600 font-medium">{searchQuery}</span>&rdquo;</span>
          )}
        </p>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No items match your criteria</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Try adjusting your search keywords, clearing category filters, or log a new report so other students can find your item.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            <Button onClick={handleClearFilters} variant="outline" size="sm">
              Clear Filters
            </Button>
            <Button to="/report-lost" variant="primary" size="sm">
              Report Lost Item
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
