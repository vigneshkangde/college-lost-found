import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  AlertCircle,
  PlusCircle,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import SectionHeader from '../components/SectionHeader';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';

export default function MyReports() {
  const { items, updateItemStatus, currentUser, getMatchSuggestions } = useItems();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'lost' | 'found'

  // Items reported by current user or mock student Alex Smith
  const myItems = items.filter(
    (item) =>
      item.contactEmail === currentUser?.email ||
      item.reporterName === currentUser?.name ||
      item.studentId === currentUser?.studentId ||
      item.id === 'item-101' // Alex's demo item
  );

  const filteredItems = myItems.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const handleMarkResolved = (itemId) => {
    updateItemStatus(itemId, 'returned');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <SectionHeader
        kicker="Student Dashboard"
        title="My Reported Items"
        subtitle={`Viewing reports submitted under ${currentUser?.name} (${currentUser?.studentId})`}
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

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All My Submissions ({myItems.length})
        </button>
        <button
          onClick={() => setActiveTab('lost')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'lost'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Lost Items ({myItems.filter((i) => i.type === 'lost').length})
        </button>
        <button
          onClick={() => setActiveTab('found')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'found'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Found Items ({myItems.filter((i) => i.type === 'found').length})
        </button>
      </div>

      {/* Reports List */}
      {filteredItems.length > 0 ? (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const matches = getMatchSuggestions(item);
            const isResolved = item.status === 'returned';

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:border-slate-300"
              >
                {/* Left Item Meta */}
                <div className="flex items-start gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={item.status} size="sm" />
                      <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {item.categoryName || item.category}
                      </span>
                      {matches.length > 0 && !isResolved && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>{matches.length} Match Suggestion Available</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      <Link to={`/items/${item.id}`} className="hover:text-indigo-600">
                        {item.title}
                      </Link>
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 self-start md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
                  <Button
                    to={`/items/${item.id}`}
                    variant="outline"
                    size="sm"
                    icon={ExternalLink}
                  >
                    View Item
                  </Button>

                  {!isResolved && (
                    <button
                      onClick={() => handleMarkResolved(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      title="Mark item as restored"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  )}

                  {isResolved && (
                    <span className="text-xs text-emerald-600 font-semibold px-2 py-1 bg-emerald-50 rounded">
                      Case Closed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No reports logged under this filter</h3>
          <p className="text-xs text-slate-500">
            Have you misplaced something recently or spotted an abandoned bag on campus?
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <Button to="/report-lost" variant="primary" size="sm">
              Log Lost Item
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
