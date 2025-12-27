import React from 'react';

export default function InputGroup({ label, type = "text", value, onChange, placeholder, className = "", required = false, ...props }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all placeholder-slate-400"
        {...props}
      />
    </div>
  );
}