import React from 'react';
import {
  LayoutGrid,
  Laptop,
  CreditCard,
  Briefcase,
  BookOpen,
  Shirt,
  Package
} from 'lucide-react';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/dummyItems';

const ICON_MAP = {
  Grid: LayoutGrid,
  LayoutGrid,
  Laptop,
  CreditCard,
  Briefcase,
  BookOpen,
  Shirt,
  Package
};

export default function CategoryFilter({
  categories = DEFAULT_CATEGORIES,
  selectedCategory = 'all',
  onSelectCategory,
  categoryCounts = {},
  variant = 'pills', // 'pills' | 'cards'
  showAllOption = true
}) {
  // Add 'All' category option if requested for filter bar
  const displayCategories = showAllOption
    ? [{ id: 'all', name: 'All Categories', icon: 'LayoutGrid' }, ...categories]
    : categories;

  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Package;
          const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase() || selectedCategory === cat.id;
          const count = categoryCounts[cat.name] ?? cat.itemCount ?? 0;

          return (
            <button
              key={cat.id || cat.name}
              type="button"
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
              className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs text-slate-700'
              }`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm leading-snug line-clamp-1">{cat.name}</h4>
                {cat.description && (
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                )}
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{count} {count === 1 ? 'item' : 'items'}</span>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // Pill variant
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {displayCategories.map((cat) => {
        const Icon = ICON_MAP[cat.icon] || Package;
        const isAll = cat.id === 'all';
        const isSelected = isAll
          ? selectedCategory === 'all'
          : selectedCategory.toLowerCase() === cat.name.toLowerCase() || selectedCategory === cat.id;

        const count = isAll
          ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
          : (categoryCounts[cat.name] ?? cat.itemCount);

        return (
          <button
            key={cat.id || cat.name}
            type="button"
            onClick={() => onSelectCategory && onSelectCategory(isAll ? 'all' : cat.name)}
            className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{cat.name}</span>
            {count !== undefined && count > 0 && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? 'bg-indigo-700 text-indigo-100'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
