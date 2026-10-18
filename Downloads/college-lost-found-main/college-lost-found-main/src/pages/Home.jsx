import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Search,
  FileEdit,
  Users,
  CheckCircle2,
  Compass,
  RotateCcw
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import ItemCard from '../components/ItemCard';
import CategoryCard from '../components/CategoryCard';
import CategoryFilter from '../components/CategoryFilter';
import SectionHeader from '../components/SectionHeader';
import { DUMMY_ITEMS, CATEGORIES, HOW_IT_WORKS_STEPS } from '../data/dummyItems';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all'); // 'all' | 'lost' | 'found'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | category name

  // Real-time search redirection or filtering
  const handleSearchSubmit = (query) => {
    if (query && query.trim()) {
      navigate(`/browse?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  // Compute category counts for dummy items
  const categoryCounts = useMemo(() => {
    const counts = {};
    DUMMY_ITEMS.forEach((item) => {
      const cat = item.category || 'Other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter items based on status, category, and live search term
  const filteredItems = useMemo(() => {
    return DUMMY_ITEMS.filter((item) => {
      // Status filter
      if (activeStatusFilter !== 'all' && item.status !== activeStatusFilter) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all') {
        const itemCat = (item.category || '').toLowerCase();
        const targetCat = selectedCategory.toLowerCase();
        if (itemCat !== targetCat) return false;
      }
      // Search term filter (if user types in hero search bar)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [activeStatusFilter, selectedCategory, searchQuery]);

  const resetFilters = () => {
    setActiveStatusFilter('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Campus Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Campus Belongings Recovery Portal</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Lost something on campus?
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Find lost belongings, report items you&apos;ve found, and help return them to their owners.
            </p>

            {/* Search Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
              <SearchBar
                size="lg"
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={handleSearchSubmit}
                onClear={() => setSearchQuery('')}
                placeholder="Search lost or found items (e.g., Wireless Earbuds, Water Bottle, Keys)..."
              />
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2.5 text-xs text-slate-500">
                <span className="font-medium text-slate-400">Quick searches:</span>
                {['Earbuds', 'Water Bottle', 'Calculator', 'Backpack', 'ID Card', 'Keys'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                    }}
                    className="hover:text-indigo-600 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                to="/report-lost"
                variant="lost"
                size="lg"
                icon={AlertCircle}
                className="w-full sm:w-auto shadow-sm"
              >
                Report Lost Item
              </Button>

              <Button
                to="/report-found"
                variant="found"
                size="lg"
                icon={PlusCircle}
                className="w-full sm:w-auto shadow-sm"
              >
                Report Found Item
              </Button>

              <Button
                to="/browse"
                variant="outline"
                size="lg"
                icon={Compass}
                className="w-full sm:w-auto"
              >
                Browse All Items
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Recent Items Section with Category Filters */}
      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="Campus Feed"
          title="Recent Lost &amp; Found Items"
          subtitle="Recently submitted reports from students across lecture halls, dining commons, and campus facilities."
          action={
            <Button
              to="/browse"
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
            >
              View Full Directory
            </Button>
          }
        />

        {/* Filters Bar: Status Tabs + Category Filter Pills */}
        <div className="space-y-4 mb-6">
          {/* Status Tabs (All, Lost, Found) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveStatusFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeStatusFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All Statuses ({DUMMY_ITEMS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveStatusFilter('lost')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeStatusFilter === 'lost'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Lost ({DUMMY_ITEMS.filter((i) => i.status === 'lost').length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveStatusFilter('found')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeStatusFilter === 'found'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Found ({DUMMY_ITEMS.filter((i) => i.status === 'found').length})</span>
              </button>
            </div>

            {(activeStatusFilter !== 'all' || selectedCategory !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Filter By Category
            </p>
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
              variant="pills"
              showAllOption={true}
            />
          </div>
        </div>

        {/* Reusable ItemCard Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-3">
            <p className="text-slate-700 font-semibold text-base">No items match the selected filter</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try switching categories, clearing search terms, or view all items in the campus repository.
            </p>
            <div className="pt-2">
              <Button onClick={resetFilters} variant="outline" size="sm">
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Button to="/browse" variant="outline" fullWidth size="md" icon={ArrowRight} iconPosition="right">
            Browse All Items
          </Button>
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="Campus Categories"
          title="Explore Items By Category"
          subtitle="Quickly locate misplaced belongings or report items organized by category."
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 4. How It Works Section (Report → Find a Match → Connect → Return) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            kicker="Four Simple Steps"
            title="How It Works"
            subtitle="Built to connect campus finders and owners transparently through four structured steps."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const iconMap = {
                FileEdit,
                Search,
                Users,
                CheckCircle2
              };
              const StepIcon = iconMap[step.icon] || CheckCircle2;

              return (
                <div
                  key={idx}
                  className="relative bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xl font-bold text-slate-300">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs text-indigo-600 font-semibold gap-1">
                    <span>Step {step.step}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Campus Security Safe Zones Banner */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-md">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-md">
              Campus Safety Partnership
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Found a valuable item on campus?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Log it into the portal and surrender high-value electronics, wallets, or keys to Campus Security in Administration Building Room 104 for safe custody.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button to="/report-found" variant="found" size="md" icon={PlusCircle}>
                Report Found Item
              </Button>
              <Button to="/browse" variant="outline" size="md" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
                Browse Directory
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
