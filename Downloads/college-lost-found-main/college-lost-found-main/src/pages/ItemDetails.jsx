import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Mail,
  ShieldCheck,
  Sparkles,
  Share2,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import ItemCard from '../components/ItemCard';
import ClaimModal from '../components/ClaimModal';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, getMatchSuggestions } = useItems();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const item = getItemById(id);

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Item Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The item report you are looking for does not exist or may have been archived by campus administrators.
        </p>
        <Button to="/browse" variant="primary" size="md">
          Back to Browse Items
        </Button>
      </div>
    );
  }

  const matchSuggestions = getMatchSuggestions(item);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isLost = item.type === 'lost';
  const isFound = item.type === 'found';
  const isClaimed = item.status === 'claimed';

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Navigation Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to previous page</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Item'}</span>
          </button>
        </div>
      </div>

      {/* Main Item Card Layout */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Media / Image Column */}
          <div className="lg:col-span-5 bg-slate-100 relative min-h-[320px] lg:min-h-[460px] flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[420px] w-full object-cover rounded-xl shadow-xs"
            />
            <div className="absolute top-4 left-4">
              <StatusBadge status={item.status} size="md" />
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-xs px-2.5 py-1 rounded">
                Category: {item.categoryName || item.category}
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400">
                  Case ID: #{item.id}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {item.title}
                </h1>
              </div>

              {/* Status Alert if Claimed */}
              {isClaimed && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>This item has a claim pending verification or has been safely restored.</span>
                </div>
              )}

              {/* Location & Time info box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Campus Location</span>
                    <span className="font-semibold text-slate-800">{item.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Time Logged</span>
                    <span className="font-semibold text-slate-800">
                      {item.date} {item.time ? `• ${item.time}` : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Storage Custody Location */}
              {item.storageLocation && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-xs">
                  <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">Custody Location:</span>{' '}
                    <span>{item.storageLocation}</span>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Item Description
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Distinctive Marks / Verification hints */}
              {item.distinctiveMarks && (
                <div className="space-y-1.5 p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/70">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Distinctive Marks & Unique Traits</span>
                  </h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {item.distinctiveMarks}
                  </p>
                </div>
              )}

              {/* Reporter Info */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reported by: <strong className="text-slate-800">{item.reporterName}</strong></span>
                  {item.studentId && (
                    <span className="font-mono text-slate-400">({item.studentId})</span>
                  )}
                </div>
                <a
                  href={`mailto:${item.contactEmail}?subject=Campus Lost %26 Found Inquiry for ${encodeURIComponent(item.title)}`}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Reporter</span>
                </a>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              {isFound && !isClaimed && (
                <Button
                  onClick={() => setIsClaimModalOpen(true)}
                  variant="primary"
                  size="lg"
                  icon={ShieldCheck}
                  className="w-full sm:w-auto"
                >
                  Claim This Item
                </Button>
              )}

              {isLost && (
                <Button
                  to={`/report-found?matchFor=${item.id}`}
                  variant="found"
                  size="lg"
                  icon={CheckCircle2}
                  className="w-full sm:w-auto"
                >
                  I Found This Item!
                </Button>
              )}

              <Button
                to="/browse"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Browse Similar Items
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Possible Match Suggestions Section */}
      <section className="pt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Possible Match Suggestions
            </h2>
            <p className="text-xs text-slate-500">
              Cross-referenced from student reports in the same category ({item.categoryName}).
            </p>
          </div>
        </div>

        {matchSuggestions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchSuggestions.map((match) => (
              <ItemCard key={match.id} item={match} showMatchBadge={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <p className="text-sm font-medium text-slate-700">
              No direct candidate matches found yet.
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Our automated matching runs continuously as new lost and found submissions are reported across campus.
            </p>
          </div>
        )}
      </section>

      {/* Claim Modal */}
      <ClaimModal
        item={item}
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        onSuccess={() => setIsClaimModalOpen(false)}
      />
    </div>
  );
}
