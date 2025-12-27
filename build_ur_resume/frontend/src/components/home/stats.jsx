import React from "react";

export default function Stats() {
  return (
    <section className="bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left">
          
          <div className="border-l-4 border-violet-500 pl-6">
            <div className="text-5xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-400">Resumes Generated</div>
          </div>

          <div className="border-l-4 border-violet-500 pl-6">
            <div className="text-5xl font-bold text-white mb-2">85%</div>
            <div className="text-gray-400">Interview Success Rate</div>
          </div>

          <div className="border-l-4 border-violet-500 pl-6">
            <div className="text-5xl font-bold text-white mb-2">20M+</div>
            <div className="text-gray-400">Jobs Applied For</div>
          </div>

        </div>
      </div>
    </section>
  );
}