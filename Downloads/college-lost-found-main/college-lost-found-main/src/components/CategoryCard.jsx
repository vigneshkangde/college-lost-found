import React from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop,
  CreditCard,
  Briefcase,
  BookOpen,
  Shirt,
  Package,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  Laptop,
  CreditCard,
  Briefcase,
  BookOpen,
  Shirt,
  Package
};

export default function CategoryCard({ category }) {
  if (!category) return null;

  const IconComponent = ICON_MAP[category.icon] || Package;

  return (
    <Link
      to={`/browse?category=${encodeURIComponent(category.name)}`}
      className="group relative flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all duration-200 text-left focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
    >
      <div>
        <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
          <IconComponent className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {category.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>{category.itemCount || 0} items</span>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}
