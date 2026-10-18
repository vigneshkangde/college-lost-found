import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ChevronRight, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ItemCard({ item, showMatchBadge = false }) {
  const [imageError, setImageError] = useState(false);

  if (!item) return null;

  const defaultImage =
    'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        <img
          src={imageError || !item.imageUrl ? defaultImage : item.imageUrl}
          alt={item.title}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
          loading="lazy"
        />

        {/* Status Badge in top-left */}
        <div className="absolute top-3 left-3 z-10">
          <StatusBadge status={item.status} size="sm" />
        </div>

        {/* Match notification tag if item has potential match suggestions */}
        {(showMatchBadge || (item.matchedWith && item.matchedWith.length > 0)) && (
          <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
            <Sparkles className="w-3 h-3" />
            <span>Match Found</span>
          </div>
        )}

        {/* Category chip on bottom left of image */}
        <div className="absolute bottom-2.5 left-3 z-10">
          <span className="inline-block text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white rounded">
            {item.categoryName || item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors">
            <Link to={`/items/${item.id}`} className="focus:outline-hidden">
              {item.title}
            </Link>
          </h3>

          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Metadata Details */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{item.location}</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{item.date}</span>
            </div>
            {item.time && (
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3 shrink-0" />
                <span>{item.time}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-1">
          <Link
            to={`/items/${item.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-200 text-slate-700 bg-slate-50/50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
          >
            <span>View Item Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
