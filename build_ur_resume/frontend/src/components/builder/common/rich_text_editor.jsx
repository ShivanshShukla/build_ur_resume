import React, { useRef } from "react";

export default function RichTextEditor({ value, onChange, label }) {
  const contentEditableRef = useRef(null);
  
  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (contentEditableRef.current) onChange(contentEditableRef.current.innerHTML);
  };

  const ToolbarButton = ({ cmd, arg, icon, title }) => (
    <button
      onClick={() => execCmd(cmd, arg)}
      className="w-7 h-7 flex items-center justify-center rounded hover:bg-violet-50 hover:text-violet-600 text-gray-600 transition-colors"
      title={title}
    >
      <i className={icon}></i>
    </button>
  );

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-violet-500 focus-within:border-violet-500 transition-all bg-white">
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
          <ToolbarButton cmd="bold" icon="fa-solid fa-bold" title="Bold" />
          <ToolbarButton cmd="italic" icon="fa-solid fa-italic" title="Italic" />
          <ToolbarButton cmd="underline" icon="fa-solid fa-underline" title="Underline" />
          <ToolbarButton cmd="strikeThrough" icon="fa-solid fa-strikethrough" title="Strikethrough" />
          
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          
          <ToolbarButton cmd="justifyLeft" icon="fa-solid fa-align-left" title="Align Left" />
          <ToolbarButton cmd="justifyCenter" icon="fa-solid fa-align-center" title="Align Center" />
          <ToolbarButton cmd="justifyRight" icon="fa-solid fa-align-right" title="Align Right" />
          
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          
          <ToolbarButton cmd="insertUnorderedList" icon="fa-solid fa-list-ul" title="Bullet List" />
          <ToolbarButton cmd="insertOrderedList" icon="fa-solid fa-list-ol" title="Numbered List" />
          
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          
          <ToolbarButton cmd="undo" icon="fa-solid fa-rotate-left" title="Undo" />
          <ToolbarButton cmd="redo" icon="fa-solid fa-rotate-right" title="Redo" />
        </div>

        <div
          ref={contentEditableRef}
          className="p-3 min-h-[100px] text-sm text-gray-900 focus:outline-none"
          contentEditable
          dangerouslySetInnerHTML={{ __html: value }}
          onBlur={(e) => onChange(e.target.innerHTML)}
        />
      </div>
    </div>
  );
}