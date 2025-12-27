import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 font-sans transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
               <div className="h-10 w-10 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200/50 group-hover:shadow-teal-300/50 transition-all">
                 <span className="text-white font-extrabold text-xl font-serif italic">R</span>
               </div>
               <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                 Resume<span className="text-teal-600 dark:text-teal-400">Forge</span>
               </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Join our newsletter to stay up to date on features and releases.
            </p>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-teal-500 dark:focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-lg bg-slate-900 dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 hover:bg-teal-600 dark:hover:bg-slate-200 transition-colors shadow-md"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                By subscribing you agree to our <Link to="/privacy" className="underline hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Privacy Policy</Link>.
              </p>
            </form>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/resume-builder" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Resume Builder</Link></li>
              <li><Link to="/templates" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Templates</Link></li>
              <li><Link to="/pricing" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Pricing</Link></li>
              <li><Link to="/reviews" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Follow us</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
                  <i className="fa-brands fa-facebook text-lg w-5 text-center text-slate-400 dark:text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"></i>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
                  <i className="fa-brands fa-instagram text-lg w-5 text-center text-slate-400 dark:text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"></i>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
                  <i className="fa-brands fa-x-twitter text-lg w-5 text-center text-slate-400 dark:text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"></i>
                  <span>X (Twitter)</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
                  <i className="fa-brands fa-linkedin text-lg w-5 text-center text-slate-400 dark:text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"></i>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
                  <i className="fa-brands fa-youtube text-lg w-5 text-center text-slate-400 dark:text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"></i>
                  <span>Youtube</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400 dark:text-slate-500">© {new Date().getFullYear()} ResumeForge. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/privacy" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}