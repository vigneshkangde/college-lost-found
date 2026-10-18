import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = 'Search by item name, location, or brand (e.g. AirPods, Hydro Flask, Keys)...',
  className = '',
  size = 'md',
  autoFocus = false
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  const isLg = size === 'lg';

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center w-full transition-shadow rounded-xl bg-white border border-slate-200 shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 ${className}`}
    >
      <div className={`flex items-center justify-center pl-4 text-slate-400 pointer-events-none ${isLg ? 'w-12' : 'w-10'}`}>
        <Search className={isLg ? 'w-5 h-5' : 'w-4 h-4'} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none ${
          isLg ? 'py-4 text-base' : 'py-2.5 text-sm'
        } pr-10`}
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          title="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
