import React from "react";
import { Icons } from "./common/icons";

export default function Toolbar({ zoom, setZoom, onDownload }) {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 bg-gray-900/90 backdrop-blur-md text-white px-6 py-2.5 rounded-full shadow-xl flex items-center gap-5 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover/preview:translate-y-0">
       <div className="flex items-center gap-3">
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="hover:text-violet-300 transition-colors" title="Zoom Out">
            <i className="fa-solid fa-magnifying-glass-minus"></i>
          </button>
          <span className="text-xs font-mono w-8 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="hover:text-violet-300 transition-colors" title="Zoom In">
            <i className="fa-solid fa-magnifying-glass-plus"></i>
          </button>
          <button onClick={() => setZoom(1)} className="hover:text-violet-300 transition-colors ml-1" title="Reset Zoom">
            <i className="fa-solid fa-compress"></i>
          </button>
       </div>
       <div className="w-px h-4 bg-gray-600"></div>
       <button onClick={onDownload} className="hover:text-green-400 transition-colors flex items-center gap-2" title="Quick Download">
          <Icons.FilePdf /> <span className="text-xs font-bold uppercase tracking-wide">Save PDF</span>
       </button>
    </div>
  );
}