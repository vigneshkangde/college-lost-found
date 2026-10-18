import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
      {/* Top Campus Assistance Bar */}
      <div className="border-b border-slate-800 bg-slate-950/70 py-6 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Need urgent help recovering a campus item?</p>
              <p className="text-xs text-slate-400">Campus safety officers can assist at the Main Campus Security Station.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span>(555) 019-4400</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Security Desk: Open 24/7</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                College <span className="text-indigo-400">Lost &amp; Found</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A centralized campus lost and found service connecting students, faculty, and campus security to recover misplaced belongings safely and responsibly.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Student Affairs &amp; Campus Security, Administration Building Room 104</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>lostandfound@college.edu</span>
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-white transition-colors">Browse Items</Link>
              </li>
              <li>
                <Link to="/report-lost" className="hover:text-white transition-colors">Report Lost Item</Link>
              </li>
              <li>
                <Link to="/report-found" className="hover:text-white transition-colors">Report Found Item</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Student Login</Link>
              </li>
            </ul>
          </div>

          {/* Portal Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Student Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/my-reports" className="hover:text-white transition-colors">My Reports</Link>
              </li>
              <li>
                <Link to="/my-claims" className="hover:text-white transition-colors">My Claims</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">Admin Console</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">Register Account</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 College Lost &amp; Found. All rights reserved.</p>
          <p className="text-slate-400">
            Official University Campus Lost &amp; Found System
          </p>
        </div>
      </div>
    </footer>
  );
}
