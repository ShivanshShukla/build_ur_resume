import React, { useState, useRef, useEffect } from "react";
import { Icons } from "./icons";

export default function SectionMenu({ onEdit, onToggle, onDelete, isVisible, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} 
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-colors"
      >
        <Icons.Edit /> {/* Note: Using 'Edit' icon style for menu trigger or custom vertical dots */}
        {/* OR manually render the dots if Icons.Edit isn't vertical dots */}
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-1 overflow-hidden animate-fadeIn">
          {type !== 'list' && (
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); onEdit(); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <i className="fa-solid fa-pen-to-square text-gray-400 w-4"></i> Edit Content
            </button>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); onToggle(); }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <i className={`fa-solid ${isVisible ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 w-4`}></i> 
            {isVisible ? 'Hide Section' : 'Show Section'}
          </button>
          <div className="h-px bg-gray-100 my-1"></div>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); onDelete(); }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <i className="fa-solid fa-trash text-red-400 w-4"></i> Delete Section
          </button>
        </div>
      )}
    </div>
  );
}