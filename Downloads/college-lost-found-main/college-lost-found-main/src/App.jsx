import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ItemProvider } from './context/ItemContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import ItemDetails from './pages/ItemDetails';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';
import Login from './pages/Login';
import Register from './pages/Register';
import MyReports from './pages/MyReports';
import MyClaims from './pages/MyClaims';
import AdminDashboard from './pages/AdminDashboard';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ItemProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/items/:id" element={<ItemDetails />} />
              <Route path="/report-lost" element={<ReportLost />} />
              <Route path="/report-found" element={<ReportFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-reports" element={<MyReports />} />
              <Route path="/my-claims" element={<MyClaims />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Fallback route to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ItemProvider>
  );
}
