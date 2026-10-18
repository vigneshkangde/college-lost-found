import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  CheckCircle2,
  Clock,
  Package,
  ExternalLink
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import StatusBadge from '../components/StatusBadge';

export default function AdminDashboard() {
  const { items, claims, updateItemStatus, updateClaimStatus, currentUser, switchUserRole } = useItems();
  const [activeTab, setActiveTab] = useState('claims'); // 'claims' | 'inventory'
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Stats calculation
  const totalItems = items.length;
  const foundCount = items.filter((i) => i.type === 'found').length;
  const pendingClaimsCount = claims.filter((c) => c.status.includes('Review')).length;
  const returnedCount = items.filter((i) => i.status === 'returned' || i.status === 'claimed').length;

  const handleApproveClaim = (claim) => {
    updateClaimStatus(
      claim.id,
      'Approved - Ready for Pickup',
      'Authorized by Campus Safety. Pick up at Admin Building Room 104 with Student ID.'
    );
    updateItemStatus(claim.itemId, 'claimed');
  };

  const handleRejectClaim = (claim) => {
    updateClaimStatus(
      claim.id,
      'Claim Rejected - Insufficient Proof',
      'Proof details provided did not match item characteristics. Please contact security desk.'
    );
  };

  const filteredInventory = items.filter((item) => {
    if (selectedStatusFilter !== 'all' && item.status !== selectedStatusFilter) {
      return false;
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.reporterName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Campus Safety & Security Custody Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator Lost & Found Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Supervise custody vault, evaluate student claim proofs, and audit campus storage facilities.
          </p>
        </div>

        {/* Quick Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Logged in:</span>
          <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-200">
            {currentUser?.name}
          </span>
          {currentUser?.role !== 'admin' && (
            <button
              onClick={() => switchUserRole('admin')}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              (Switch to Admin Mode)
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total In Directory</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalItems}</p>
          <p className="text-xs text-slate-500 mt-1">Active items logged on campus</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Pending Claims</span>
          </p>
          <p className="text-3xl font-extrabold text-amber-600 mt-1">{pendingClaimsCount}</p>
          <p className="text-xs text-slate-500 mt-1">Requiring ownership review</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Found In Custody</span>
          </p>
          <p className="text-3xl font-extrabold text-emerald-700 mt-1">{foundCount}</p>
          <p className="text-xs text-slate-500 mt-1">Held at lockers / service desks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Items Restored</span>
          </p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-1">{returnedCount}</p>
          <p className="text-xs text-slate-500 mt-1">Reunited with students</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('claims')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'claims'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Claim Verification Queue ({claims.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'inventory'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Master Campus Inventory ({items.length})</span>
        </button>
      </div>

      {/* Tab 1: Claims Queue */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <p>Evaluating ownership evidence submitted by students.</p>
            <span className="font-semibold">{claims.length} total claims recorded</span>
          </div>

          <div className="space-y-4">
            {claims.map((claim) => {
              const isUnderReview = claim.status.includes('Review');

              return (
                <div
                  key={claim.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-mono text-slate-400">
                        Claim #{claim.id} • Submitted: {claim.claimDate}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {claim.itemTitle}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 self-start">
                      {claim.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 block font-bold text-[10px] uppercase">Claimant Student</span>
                      <p className="font-semibold text-slate-900 mt-0.5">{claim.claimantName}</p>
                      <p className="text-slate-500">{claim.claimantEmail}</p>
                      <p className="font-mono text-indigo-600 mt-1">ID: {claim.studentId}</p>
                    </div>

                    <div className="md:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 block font-bold text-[10px] uppercase">Submitted Ownership Proof</span>
                      <p className="text-slate-800 italic mt-0.5 leading-relaxed">
                        &ldquo;{claim.proofDescription}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Actions for Security Staff */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      to={`/items/${claim.itemId}`}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Inspect Target Item Record</span>
                    </Link>

                    {isUnderReview ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRejectClaim(claim)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                        >
                          Reject Claim
                        </button>
                        <button
                          onClick={() => handleApproveClaim(claim)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                        >
                          Approve & Authorize Pickup
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">
                        Resolution logged by Security Staff
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Master Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {/* Table Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-80">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by title, location, or reporter..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 self-end text-xs">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-700"
              >
                <option value="all">All Item Statuses</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
                <option value="claimed">Claimed</option>
                <option value="returned">Returned / Closed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Case & Item</th>
                    <th className="py-3.5 px-4">Type / Status</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Date Logged</th>
                    <th className="py-3.5 px-4">Reporter</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <Link to={`/items/${item.id}`} className="font-bold text-slate-900 hover:text-indigo-600">
                              {item.title}
                            </Link>
                            <p className="text-[11px] text-slate-400 font-mono">#{item.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusBadge status={item.status} size="sm" />
                      </td>

                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-700">
                        {item.location}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {item.date}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        <p className="font-medium text-slate-900">{item.reporterName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{item.studentId}</p>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                        <Link
                          to={`/items/${item.id}`}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium inline-block"
                        >
                          Inspect
                        </Link>
                        {item.status !== 'returned' && (
                          <button
                            onClick={() => updateItemStatus(item.id, 'returned')}
                            className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-medium"
                          >
                            Close Case
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
