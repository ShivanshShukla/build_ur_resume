import React from "react";
import Navbar from "./home/navbar"
import Footer from "./home/footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 relative selection:bg-violet-200 selection:text-violet-900">
      
      {/* Premium Background Mesh Gradient */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-200/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[120px]" />
      </div>

      {/* Glassmorphism Navbar Wrapper */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {children}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}