import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookmarkCheck,
  Building2,
  Clock,
  ShieldCheck,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';

export default function MyClaims() {
  const { claims, currentUser } = useItems();

  const getStatusBadge = (status) => {
    if (status.includes('Approved')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{status}</span>
        </span>
      );
    }
    if (status.includes('Review')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="w-3.5 h-3.5" />
          <span>{status}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        <span>{status}</span>
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <SectionHeader
        kicker="Student Verification Portal"
        title="My Item Claims"
        subtitle={`Track proof-of-ownership requests submitted under student account: ${currentUser?.studentId}`}
        action={
          <Button to="/browse?type=found" variant="outline" size="sm" icon={ExternalLink}>
            Browse Found Items
          </Button>
        }
      />

      {/* Info notification */}
      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3 text-xs text-indigo-900">
        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">How Claim Verification Works:</p>
          <p className="text-indigo-800 leading-relaxed mt-0.5">
            When you claim an item, campus safety or the finder reviews your submitted proof. Once approved, you will receive custody locker details or safe zone pickup coordinates.
          </p>
        </div>
      </div>

      {/* Claims List */}
      {claims.length > 0 ? (
        <div className="space-y-5">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400">
                    Claim ID: #{claim.id} • Submitted: {claim.claimDate}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {claim.itemTitle}
                  </h3>
                </div>

                <div>
                  {getStatusBadge(claim.status)}
                </div>
              </div>

              {/* Claim Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Proof Submitted */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Ownership Proof Description Submitted
                  </span>
                  <p className="text-slate-700 italic leading-relaxed">
                    &ldquo;{claim.proofDescription}&rdquo;
                  </p>
                </div>

                {/* Pickup Instructions */}
                <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                    Current Action / Pickup Instructions
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {claim.pickupInstructions}
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Requirement: Bring physical college ID card matching <span className="font-mono">{claim.studentId}</span>.
                  </p>
                </div>
              </div>

              {/* Footer action */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Verified by University Lost & Found Protocol</span>
                </span>
                <Link
                  to={`/items/${claim.itemId}`}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                >
                  <span>View Original Item Case</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No active claims found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            If you see your misplaced belonging in the campus directory, open its details and click &ldquo;Claim This Item&rdquo;.
          </p>
          <div className="flex justify-center pt-2">
            <Button to="/browse?type=found" variant="primary" size="sm">
              Explore Found Belongings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
