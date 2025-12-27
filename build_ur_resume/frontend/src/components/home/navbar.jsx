import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  // Initialize Theme
  useEffect(() => {
    // Check local storage or system preference on mount
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const NavItem = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
        ${isActive 
          ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" 
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    // FIX: Added sticky, z-index, background colors, and backdrop-blur to prevent blending
    <nav className="sticky top-0 z-50 w-full px-[5%] py-3 font-sans transition-all duration-300 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300 transform group-hover:scale-105">
            <span className="text-white font-black text-xl font-serif italic relative z-10">R</span>
            <div className="absolute inset-0 rounded-xl bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            Resume<span className="text-teal-600 dark:text-teal-400">Forge</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/resume-builder">Builder</NavItem>
          <NavItem to="/templates">Templates</NavItem>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <i className="fa-solid fa-sun text-lg"></i> : <i className="fa-solid fa-moon text-lg"></i>}
          </button>

          <div className="flex items-center gap-3">
            <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Log in
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {isDarkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {isMobileMenuOpen ? <i className="fa-solid fa-xmark text-lg"></i> : <i className="fa-solid fa-bars text-lg"></i>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl lg:hidden p-6 flex flex-col gap-4 animate-slideDown z-50">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400"><i className="fa-solid fa-house"></i></div>
            <span className="text-base font-semibold text-slate-800 dark:text-slate-200">Home</span>
          </Link>
          <Link to="/resume-builder" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
            <span className="text-base font-semibold text-slate-800 dark:text-slate-200">Builder</span>
          </Link>
          <Link to="/templates" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400"><i className="fa-solid fa-layer-group"></i></div>
            <span className="text-base font-semibold text-slate-800 dark:text-slate-200">Templates</span>
          </Link>
          
          <div className="border-t border-slate-100 dark:border-slate-800 my-2 pt-4 flex flex-col gap-3">
             <Link to="/login" className="w-full justify-center px-5 py-3.5 text-center text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
               Log in
             </Link>
             <Link to="/register" className="w-full justify-center px-5 py-3.5 text-center text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-all">
               Get Started
             </Link>
          </div>
        </div>
      )}
    </nav>
  );
}