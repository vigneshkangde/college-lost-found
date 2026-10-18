import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  GraduationCap,
  Menu,
  X,
  AlertCircle,
  PlusCircle,
  LogIn
} from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
      isActive
        ? 'text-indigo-600 bg-indigo-50 font-semibold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'text-indigo-600 bg-indigo-50 font-semibold'
        : 'text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-lg leading-tight tracking-tight block">
                College <span className="text-indigo-600">Lost &amp; Found</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                Campus Recovery Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/browse" className={navLinkClass}>
              Browse
            </NavLink>
            <NavLink to="/report-lost" className={navLinkClass}>
              Report Lost
            </NavLink>
            <NavLink to="/report-found" className={navLinkClass}>
              Report Found
            </NavLink>
            <NavLink to="/my-reports" className={navLinkClass}>
              My Reports
            </NavLink>
            <NavLink to="/my-claims" className={navLinkClass}>
              My Claims
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Button
              to="/report-lost"
              variant="outlineLost"
              size="sm"
              icon={AlertCircle}
            >
              Report Lost
            </Button>

            <Button
              to="/report-found"
              variant="found"
              size="sm"
              icon={PlusCircle}
            >
              Report Found
            </Button>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors ml-1"
            >
              <LogIn className="w-4 h-4 text-slate-400" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              to="/report-lost"
              variant="outlineLost"
              size="sm"
              className="text-xs px-2.5 py-1.5"
            >
              Report
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/browse"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Browse
            </NavLink>
            <NavLink
              to="/report-lost"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Report Lost
            </NavLink>
            <NavLink
              to="/report-found"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Report Found
            </NavLink>
            <NavLink
              to="/my-reports"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              My Reports
            </NavLink>
            <NavLink
              to="/my-claims"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              My Claims
            </NavLink>
            <NavLink
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Admin
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Login
            </NavLink>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Button
              to="/report-lost"
              variant="outlineLost"
              size="md"
              fullWidth
              onClick={() => setMobileMenuOpen(false)}
              icon={AlertCircle}
            >
              Report Lost
            </Button>
            <Button
              to="/report-found"
              variant="found"
              size="md"
              fullWidth
              onClick={() => setMobileMenuOpen(false)}
              icon={PlusCircle}
            >
              Report Found
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
