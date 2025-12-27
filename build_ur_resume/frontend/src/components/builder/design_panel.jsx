import React from "react";
import { Icons } from "./common/icons";

const FONTS = [
  { name: "Inter (Modern)", class: "font-sans", family: "Inter, sans-serif" },
  { name: "Merriweather (Classic)", class: "font-serif", family: "Merriweather, serif" },
  { name: "Roboto Mono (Tech)", class: "font-mono", family: "'Roboto Mono', monospace" },
];

const COLORS = [
  { name: "Teal", hex: "#0d9488" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Violet", hex: "#7c3aed" },
  { name: "Green", hex: "#059669" },
  { name: "Red", hex: "#dc2626" },
  { name: "Black", hex: "#000000" },
];

const TEMPLATES = [
  { id: "modern", name: "Modern", preview: "border-l-4" },
  { id: "classic", name: "Classic", preview: "text-center" },
  { id: "minimal", name: "Minimal", preview: "border-b" },
];

export default function DesignPanel({ design, setDesign }) {
  return (
    <div className="space-y-6 animate-fadeIn h-full overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Templates */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
          <i className="fa-solid fa-layer-group text-teal-500"></i> Templates
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setDesign({...design, template: t.id})}
              className={`p-4 rounded-xl border-2 text-left transition-all group ${design.template === t.id ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-100' : 'border-slate-100 hover:border-teal-200'}`}
            >
              <div className={`w-full h-24 bg-white mb-3 rounded-lg border border-slate-200 overflow-hidden relative ${t.preview} shadow-sm group-hover:shadow-md transition-shadow`}>
                  <div className="w-full h-2 bg-slate-200 mb-2"></div>
                  <div className="w-2/3 h-1.5 bg-slate-100 mb-2 mx-auto"></div>
                  <div className="p-2 space-y-1">
                    <div className="w-full h-1 bg-slate-100 rounded-full"></div>
                    <div className="w-5/6 h-1 bg-slate-100 rounded-full"></div>
                    <div className="w-full h-1 bg-slate-100 rounded-full"></div>
                  </div>
              </div>
              <span className={`text-sm font-bold ${design.template === t.id ? 'text-teal-700' : 'text-slate-600'}`}>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
           <i className="fa-solid fa-palette text-teal-500"></i> Accent Color
        </h3>
        <div className="flex flex-wrap gap-4">
          {COLORS.map(c => (
            <button
              key={c.name}
              onClick={() => setDesign({...design, color: c.hex})}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${design.color === c.hex ? 'ring-2 ring-offset-2 ring-slate-300' : ''}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            >
              {design.color === c.hex && <i className="fa-solid fa-check text-white text-lg drop-shadow-md"></i>}
            </button>
          ))}
          <label className="w-12 h-12 rounded-full bg-white border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-teal-400 hover:text-teal-600 transition-colors">
            <input type="color" className="opacity-0 w-0 h-0" onChange={(e) => setDesign({...design, color: e.target.value})} />
            <Icons.Plus />
          </label>
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
          <i className="fa-solid fa-font text-teal-500"></i> Typography
        </h3>
        <div className="space-y-3">
          {FONTS.map(f => (
            <button
              key={f.name}
              onClick={() => setDesign({...design, font: f.class})}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${design.font === f.class ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-slate-100 hover:border-teal-200 text-slate-600'}`}
              style={{ fontFamily: f.family }}
            >
              <span className="text-lg">Aa</span>
              <span className="text-sm font-medium opacity-80">{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
          <i className="fa-solid fa-arrows-up-down text-teal-500"></i> Spacing
        </h3>
        <div className="flex gap-3">
          {['compact', 'normal', 'spacious'].map(s => (
            <button
              key={s}
              onClick={() => setDesign({...design, spacing: s})}
              className={`flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all capitalize ${design.spacing === s ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}