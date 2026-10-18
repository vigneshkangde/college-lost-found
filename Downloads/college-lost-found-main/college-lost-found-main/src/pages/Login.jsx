import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Lock,
  Mail,
  Shield,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const { switchUserRole } = useItems();
  const [email, setEmail] = useState('alex.smith@college.edu');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/browse');
    }, 500);
  };

  const handleDemoStudent = () => {
    switchUserRole('student');
    navigate('/browse');
  };

  const handleDemoAdmin = () => {
    switchUserRole('admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Portal Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Use your college credentials to report and claim lost belongings
          </p>
        </div>

        {/* Demo Quick Logins */}
        <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 text-xs space-y-2.5">
          <p className="font-semibold text-indigo-900 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>Frontend Preview: 1-Click Demo Profiles</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoStudent}
              className="py-2 px-3 rounded-lg bg-white border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors text-center shadow-2xs"
            >
              Sign In as Student
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="py-2 px-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors text-center shadow-2xs"
            >
              Sign In as Admin
            </button>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              University Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student.name@college.edu"
                className="w-full text-sm pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset is simulated for frontend preview.'); }} className="text-xs text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Remember this campus device</span>
            </label>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              disabled={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              {isLoading ? 'Signing In...' : 'Sign In to Portal'}
            </Button>
          </div>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500">
          First year student or new to campus?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
            Register for CampusFound account
          </Link>
        </p>
      </div>
    </div>
  );
}
