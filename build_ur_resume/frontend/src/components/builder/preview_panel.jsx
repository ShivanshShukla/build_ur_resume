import React, { useRef } from "react";
import Toolbar from "./toolbar";
import { getSectionIcon } from "./common/icons";

export default function PreviewPanel({ resumeData, design, zoom, setZoom }) {
  const previewRef = useRef(null);

  return (
    <div className="relative group/preview h-full">
        
        {/* Floating Toolbar */}
        <Toolbar zoom={zoom} setZoom={setZoom} onDownload={() => window.print()} />

        <div className="sticky top-0 h-full flex items-start justify-center overflow-auto custom-scrollbar pt-8 pb-32">
          <div 
            id="resume-preview"
            ref={previewRef}
            className={`bg-white shadow-2xl transition-all duration-300 origin-top text-gray-800 ${design.font}`}
            style={{ 
              width: '210mm', 
              minHeight: '297mm', 
              padding: design.spacing === 'compact' ? '10mm' : design.spacing === 'spacious' ? '25mm' : '15mm 20mm',
              transform: `scale(${zoom})`,
              marginBottom: '100px'
            }}
          >
            {/* PREVIEW HEADER */}
            <header 
              id="preview-section-personal" 
              className={`mb-6 ${design.template === 'modern' ? 'border-l-4 pl-6' : design.template === 'classic' ? 'text-center border-b-2 pb-6' : 'border-b pb-4'}`}
              style={{ borderColor: design.color }}
            >
              <h1 
                className="text-4xl font-bold text-gray-900 uppercase tracking-tight mb-2"
                style={{ color: design.template === 'minimal' ? '#111' : design.color }}
              >
                {resumeData.personal.firstName} {resumeData.personal.lastName}
              </h1>
              <p className="text-xl text-gray-600 font-medium mb-4">{resumeData.personal.role}</p>
              
              <div className={`flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 ${design.template === 'classic' ? 'justify-center' : ''}`}>
                {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                {resumeData.personal.phone && <span>• {resumeData.personal.phone}</span>}
                {resumeData.personal.city && <span>• {resumeData.personal.city}</span>}
                {resumeData.personal.profiles.filter(p => p.isVisible).map((p, i) => (
                  <span key={i}>• <a href={`https://${p.url}`} className="hover:underline" style={{ color: design.color }}>{p.network}</a></span>
                ))}
              </div>
            </header>

            {/* PREVIEW SECTIONS */}
            {resumeData.sections.filter(s => s.isVisible).map(section => (
              <section key={section.id} id={`preview-section-${section.id}`} className="mb-6">
                <h2 
                  className={`text-sm font-bold uppercase tracking-wider mb-3 ${design.template === 'modern' ? 'flex items-center gap-2' : 'border-b pb-1'}`}
                  style={{ color: design.color, borderColor: design.template !== 'modern' ? '#e5e7eb' : 'transparent' }}
                >
                  {design.template === 'modern' && <i className={`${getSectionIcon(section.id)} opacity-80`}></i>}
                  {section.title}
                </h2>

                {/* Rich Text */}
                {section.type === "richtext" && (
                  <div className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                )}

                {/* Tags */}
                {section.type === "tags" && section.content && (
                  <div className="flex flex-wrap gap-2">
                    {section.content.split(',').map((tag, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* List Items */}
                {section.type === "list" && (
                  <div className={`space-y-${design.spacing === 'compact' ? '3' : '5'}`}>
                    {section.items.filter(i => i.isVisible).map(item => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-gray-900 text-md">{item.title}</h3>
                          <span className="text-sm text-gray-500 font-medium whitespace-nowrap ml-4">{item.date}</span>
                        </div>
                        {item.subtitle && (
                          <div className="font-medium text-sm mb-1.5" style={{ color: design.color }}>
                            {item.subtitle}
                          </div>
                        )}
                        {item.description && (
                          <div className="text-sm text-gray-700 leading-relaxed pl-1" dangerouslySetInnerHTML={{ __html: item.description }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
    </div>
  );
}