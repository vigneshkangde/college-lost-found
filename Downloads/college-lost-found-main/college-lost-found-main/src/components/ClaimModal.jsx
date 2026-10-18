import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';
import Button from './Button';
import { useItems } from '../context/ItemContext';

export default function ClaimModal({ item, isOpen, onClose, onSuccess }) {
  const { claimItem, currentUser } = useItems();
  const [proofDescription, setProofDescription] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proofDescription.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      claimItem(item.id, {
        proofDescription,
        pickupZone: item.storageLocation || 'Campus Security Center - Locker #14',
        claimantName: currentUser?.name,
        claimantEmail: currentUser?.email,
        studentId: currentUser?.studentId
      });
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Claim Verification Request
              </h3>
              <p className="text-xs text-slate-500">
                Official ownership verification protocol
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Claim Submitted Successfully!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your ownership proof has been routed to the campus custody desk. You can track status under <strong>My Claims</strong>.
              </p>
              <div className="pt-4 flex justify-center">
                <Button onClick={onClose} variant="primary" size="md">
                  Done & Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Item summary banner */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500 uppercase font-semibold">
                    Target Item
                  </p>
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    Found at: {item.location}
                  </p>
                </div>
              </div>

              {/* Claimant info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Claimant</span>
                  <span className="font-semibold text-slate-800">{currentUser?.name}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Student ID</span>
                  <span className="font-mono text-indigo-600 font-semibold">{currentUser?.studentId}</span>
                </div>
              </div>

              {/* Ownership Proof Question */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Proof of Ownership Details <span className="text-rose-500">*</span>
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  Please describe hidden identifying marks, stickers, serial numbers, wallpapers, contents, or purchase invoice details not shown publicly.
                </p>
                <textarea
                  required
                  rows={3}
                  value={proofDescription}
                  onChange={(e) => setProofDescription(e.target.value)}
                  placeholder="e.g. 'Has my initials S.K. engraved on the back clip, lock screen is a photo of campus quad, serial number starts with A203...'"
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Handover Notice */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-900 text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Fraudulent claims violate the Student Code of Conduct and will be reported to Campus Judicial Affairs. You must present matching physical student ID during in-person pickup.
                </p>
              </div>

              {/* Agreement Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-700 pt-1">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                />
                <span className="text-[11px]">
                  I certify that I am the legal owner of this item and agree to verify my identity upon pickup.
                </span>
              </label>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!agreedToTerms || !proofDescription.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Submitting Claim...' : 'Submit Claim Request'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
