import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// --- MOCK DATA ---
const INITIAL_RESUMES = [
  {
    id: "1",
    title: "Software Engineer - Google",
    lastUpdated: "2 hours ago",
    thumbnail: "bg-blue-50",
    isLocked: false,
  },
  {
    id: "2",
    title: "Product Manager Role",
    lastUpdated: "2 days ago",
    thumbnail: "bg-violet-50",
    isLocked: true,
  },
  {
    id: "3",
    title: "Creative Designer",
    lastUpdated: "1 week ago",
    thumbnail: "bg-pink-50",
    isLocked: false,
  },
];

// --- SUB-COMPONENTS ---

const ActionMenu = ({ resume, activeMenuId, setActiveMenuId, onRename, onDuplicate, onLock, onDelete }) => {
  if (activeMenuId !== resume.id) return null;

  return (
    <div 
      className="absolute right-0 top-8 z-50 w-48 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 animate-fadeIn origin-top-right overflow-hidden border border-gray-100"
      onClick={(e) => e.stopPropagation()} 
    >
      <div className="py-1">
        <button
          onClick={(e) => onRename(e, resume)}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 gap-2"
        >
          <i className="fa-solid fa-pen w-4 text-gray-400"></i> Rename
        </button>
        <button
          onClick={() => onDuplicate(resume)}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 gap-2"
        >
          <i className="fa-regular fa-copy w-4 text-gray-400"></i> Duplicate
        </button>
        <button
          onClick={() => onLock(resume.id)}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 gap-2"
        >
          <i className={`fa-solid ${resume.isLocked ? 'fa-lock-open' : 'fa-lock'} w-4 text-gray-400`}></i> 
          {resume.isLocked ? "Unlock" : "Lock"}
        </button>
        <button
          onClick={() => { alert(`Exporting ${resume.title}...`); setActiveMenuId(null); }}
          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 gap-2"
        >
          <i className="fa-solid fa-download w-4 text-gray-400"></i> Export PDF
        </button>
        <div className="border-t border-gray-100 my-1"></div>
        <button
          onClick={() => onDelete(resume.id)}
          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 gap-2"
        >
          <i className="fa-solid fa-trash w-4 text-red-400"></i> Delete
        </button>
      </div>
    </div>
  );
};

const UploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [fileType, setFileType] = useState("pdf"); // 'pdf' | 'docx'
  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle' | 'validating' | 'success' | 'error'
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const fileInputRef = useRef(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setUploadStatus("idle");
      setUploadFile(null);
      setUploadMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadStatus("idle");
      setUploadMessage("");
    }
  };

  const handleValidateAndUpload = () => {
    if (!uploadFile) return;
    setUploadStatus("validating");
    
    // Simulate validation delay
    setTimeout(() => {
      const isValidSize = uploadFile.size < 5 * 1024 * 1024; // 5MB limit
      const isValidType = 
        (fileType === "pdf" && uploadFile.type === "application/pdf") ||
        (fileType === "docx" && (uploadFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || uploadFile.name.endsWith(".docx")));

      if (!isValidSize) {
        setUploadStatus("error");
        setUploadMessage("File size exceeds 5MB limit.");
      } else if (!isValidType) {
        setUploadStatus("error");
        setUploadMessage(`Invalid file type. Please upload a ${fileType.toUpperCase()} file.`);
      } else {
        setUploadStatus("success");
        setUploadMessage("File validated successfully! Importing...");
        
        setTimeout(() => {
          onUploadSuccess(uploadFile);
        }, 1500);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slideUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Import Resume</h3>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setFileType("pdf")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                fileType === "pdf" ? "border-violet-600 bg-violet-50 text-violet-700" : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              <i className="fa-solid fa-file-pdf text-2xl"></i>
              <span className="font-semibold text-sm">PDF Document</span>
            </button>
            <button 
              onClick={() => setFileType("docx")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                fileType === "docx" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              <i className="fa-solid fa-file-word text-2xl"></i>
              <span className="font-semibold text-sm">Word Document</span>
            </button>
          </div>

          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              uploadStatus === 'error' ? 'border-red-300 bg-red-50' : 
              uploadStatus === 'success' ? 'border-green-300 bg-green-50' : 
              'border-gray-300 hover:border-violet-400 hover:bg-gray-50'
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) {
                setUploadFile(e.dataTransfer.files[0]);
                setUploadStatus("idle");
                setUploadMessage("");
              }
            }}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept={fileType === "pdf" ? ".pdf" : ".docx, .doc"}
              onChange={handleFileSelect} 
            />
            
            {uploadStatus === 'validating' ? (
              <div className="flex flex-col items-center animate-pulse">
                <i className="fa-solid fa-circle-notch fa-spin text-4xl text-violet-500 mb-3"></i>
                <p className="text-violet-700 font-medium">Validating file...</p>
              </div>
            ) : uploadStatus === 'success' ? (
              <div className="flex flex-col items-center animate-bounce">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fa-solid fa-check text-2xl text-green-600"></i>
                </div>
                <p className="text-green-700 font-bold">{uploadMessage}</p>
              </div>
            ) : uploadStatus === 'error' ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fa-solid fa-triangle-exclamation text-2xl text-red-600"></i>
                </div>
                <p className="text-red-700 font-medium mb-2">{uploadMessage}</p>
                <button onClick={() => setUploadStatus("idle")} className="text-sm text-red-500 hover:underline">Try Again</button>
              </div>
            ) : uploadFile ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fa-solid fa-file-lines text-2xl text-violet-600"></i>
                </div>
                <p className="font-semibold text-gray-900 mb-1 truncate max-w-[200px]">{uploadFile.name}</p>
                <p className="text-sm text-gray-500 mb-4">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <button onClick={() => setUploadFile(null)} className="text-sm text-red-500 hover:text-red-700 font-medium">Remove</button>
              </div>
            ) : (
              <div className="flex flex-col items-center cursor-pointer" onClick={() => fileInputRef.current.click()}>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fa-solid fa-cloud-arrow-up text-2xl text-gray-400"></i>
                </div>
                <p className="font-medium text-gray-900 mb-1">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">Maximum file size 5MB</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 pt-0 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleValidateAndUpload}
            disabled={!uploadFile || uploadStatus === 'validating' || uploadStatus === 'success'}
            className={`px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition-all flex items-center gap-2 ${
              !uploadFile || uploadStatus === 'validating' || uploadStatus === 'success'
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-violet-600 hover:bg-violet-700 active:scale-95"
            }`}
          >
            {uploadStatus === 'validating' ? 'Checking...' : uploadStatus === 'success' ? 'Importing...' : 'Validate & Import'}
            {(!uploadStatus || uploadStatus === 'idle' || uploadStatus === 'error') && <i className="fa-solid fa-arrow-right"></i>}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState(INITIAL_RESUMES);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [renamingId, setRenamingId] = useState(null);
  const [tempName, setTempName] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // --- EFFECT: Load Icons ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/331595806a.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // --- EFFECT: Close menus ---
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // --- ACTIONS ---

  const handleCreateNew = () => navigate("/resume-builder?new=true");
  const handleEditResume = (id) => navigate(`/resume-builder?id=${id}`);

  const handleUploadSuccess = (file) => {
    const newResume = {
      id: Date.now().toString(),
      title: file.name.split('.')[0] || "Imported Resume",
      lastUpdated: "Just now",
      thumbnail: "bg-green-50",
      isLocked: false,
    };
    setResumes([newResume, ...resumes]);
    setShowUploadModal(false);
  };

  const handleDuplicate = (resume) => {
    const newResume = {
      ...resume,
      id: Date.now().toString(),
      title: `${resume.title} (Copy)`,
      lastUpdated: "Just now",
      isLocked: false,
    };
    setResumes([newResume, ...resumes]);
    setActiveMenuId(null);
  };

  const handleLock = (id) => {
    setResumes(resumes.map(r => r.id === id ? { ...r, isLocked: !r.isLocked } : r));
    setActiveMenuId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) {
      setResumes(resumes.filter(r => r.id !== id));
    }
    setActiveMenuId(null);
  };

  const startRenaming = (e, resume) => {
    e.stopPropagation();
    setRenamingId(resume.id);
    setTempName(resume.title);
    setActiveMenuId(null);
  };

  const saveRename = () => {
    if (tempName.trim()) {
      setResumes(resumes.map(r => r.id === renamingId ? { ...r, title: tempName } : r));
    }
    setRenamingId(null);
  };

  const filteredResumes = resumes.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
      <div className="w-full max-w-7xl mx-auto min-h-[80vh]">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and edit your resume collection</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative group w-full sm:w-auto">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors"></i>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-10 py-2 border border-gray-200 bg-white rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent w-full sm:w-64 transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <div className="text-sm font-medium text-gray-500">
            {filteredResumes.length} {filteredResumes.length === 1 ? 'Resume' : 'Resumes'}
          </div>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              title="Grid View"
              aria-label="Grid View"
            >
              <i className="fa-solid fa-border-all"></i>
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              title="List View"
              aria-label="List View"
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            
            {/* Create New Card */}
            <div 
              onClick={handleCreateNew}
              className="group relative flex flex-col items-center justify-center min-h-[340px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-violet-50 hover:border-violet-300 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white group-hover:bg-violet-100 flex items-center justify-center shadow-sm mb-4 transition-colors">
                <i className="fa-solid fa-plus text-2xl text-gray-400 group-hover:text-violet-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 group-hover:text-violet-700">Create New Resume</h3>
              <p className="text-sm text-gray-400 mt-2">Start from scratch</p>
            </div>

            {/* Upload Card */}
            <div 
              onClick={() => setShowUploadModal(true)}
              className="group relative flex flex-col items-center justify-center min-h-[340px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white group-hover:bg-blue-100 flex items-center justify-center shadow-sm mb-4 transition-colors">
                <i className="fa-solid fa-upload text-2xl text-gray-400 group-hover:text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 group-hover:text-blue-700">Upload Resume</h3>
              <p className="text-sm text-gray-400 mt-2">Import from PDF/Word</p>
            </div>

            {/* Existing Resumes */}
            {filteredResumes.map((resume) => (
              <div 
                key={resume.id} 
                className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-violet-200 transition-all flex flex-col"
              >
                {/* Thumbnail */}
                <div className={`h-48 w-full relative rounded-t-xl overflow-hidden ${resume.thumbnail} flex items-end justify-center pt-6 px-6`}>
                   <div className="w-full h-full bg-white shadow-xl rounded-t-sm p-3 space-y-2 opacity-90 transform translate-y-2 transition-transform group-hover:-translate-y-1">
                      <div className="flex items-center gap-3 border-b border-gray-100 pb-2 mb-2">
                         <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                         <div className="flex-1 space-y-1">
                            <div className="w-3/4 h-2 bg-gray-300 rounded-full"></div>
                            <div className="w-1/2 h-1.5 bg-gray-200 rounded-full"></div>
                         </div>
                      </div>
                      <div className="space-y-1.5">
                         <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                         <div className="w-5/6 h-1.5 bg-gray-100 rounded-full"></div>
                         <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
                      </div>
                   </div>
                   <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <button onClick={() => handleEditResume(resume.id)} className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                   </div>
                   {resume.isLocked && (
                     <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-500 px-2 py-1 rounded text-[10px] font-bold shadow-sm uppercase tracking-wide flex items-center gap-1">
                       <i className="fa-solid fa-lock"></i> Locked
                     </div>
                   )}
                </div>

                {/* Info Area */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white rounded-b-xl relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 pr-3">
                      {renamingId === resume.id ? (
                        <input 
                          autoFocus
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onBlur={saveRename}
                          onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                          className="w-full border-b-2 border-violet-500 focus:outline-none text-base font-semibold text-gray-900 pb-0.5"
                        />
                      ) : (
                        <h3 className="text-base font-semibold text-gray-900 truncate cursor-pointer hover:text-violet-600 transition-colors" onClick={() => handleEditResume(resume.id)} title={resume.title}>
                          {resume.title}
                        </h3>
                      )}
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        Edited {resume.lastUpdated}
                      </p>
                    </div>
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === resume.id ? null : resume.id); }}
                        className={`w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ${activeMenuId === resume.id ? 'bg-gray-100 text-gray-900' : ''}`}
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ActionMenu resume={resume} activeMenuId={activeMenuId} setActiveMenuId={setActiveMenuId} onRename={startRenaming} onDuplicate={handleDuplicate} onLock={handleLock} onDelete={handleDelete} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === "list" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden pb-20">
            <div className="divide-y divide-gray-100">
              
              {/* Create New Row */}
              <div onClick={handleCreateNew} className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer group transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-violet-100 text-gray-400 group-hover:text-violet-600 transition-colors">
                  <i className="fa-solid fa-plus"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-violet-700">Create New Resume</h3>
                  <p className="text-xs text-gray-500">Start from scratch</p>
                </div>
              </div>

              {/* Upload Row */}
              <div onClick={() => setShowUploadModal(true)} className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer group transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 text-gray-400 group-hover:text-blue-600 transition-colors">
                  <i className="fa-solid fa-upload"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">Upload Resume</h3>
                  <p className="text-xs text-gray-500">Import from PDF/Word</p>
                </div>
              </div>

              {/* Resume Rows */}
              {filteredResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 hover:bg-gray-50 group transition-colors relative">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-14 rounded border border-gray-200 ${resume.thumbnail} relative flex-shrink-0 overflow-hidden`}>
                       {resume.isLocked && (
                         <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                           <i className="fa-solid fa-lock text-white text-[10px] drop-shadow-md"></i>
                         </div>
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {renamingId === resume.id ? (
                        <input 
                          autoFocus
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onBlur={saveRename}
                          onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                          className="border-b border-violet-500 focus:outline-none text-sm font-semibold text-gray-900 pb-0.5"
                        />
                      ) : (
                        <h3 className="font-semibold text-gray-900 truncate text-sm">{resume.title}</h3>
                      )}
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        Edited {resume.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleEditResume(resume.id)} className="text-xs font-medium text-gray-500 hover:text-violet-600 px-3 py-1.5 rounded-lg transition-colors hidden sm:block border border-gray-200 hover:border-violet-200 bg-white">
                      Open
                    </button>
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === resume.id ? null : resume.id); }}
                        className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors ${activeMenuId === resume.id ? 'bg-gray-200 text-gray-900' : ''}`}
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ActionMenu resume={resume} activeMenuId={activeMenuId} setActiveMenuId={setActiveMenuId} onRename={startRenaming} onDuplicate={handleDuplicate} onLock={handleLock} onDelete={handleDelete} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredResumes.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 mt-6">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 text-2xl">
              <i className="fa-regular fa-folder-open"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No resumes found</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto mt-2 text-sm">We couldn't find any resumes matching your search.</p>
            <button onClick={() => setSearchQuery("")} className="text-violet-600 hover:text-violet-700 font-medium text-sm">Clear Search</button>
          </div>
        )}

        <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} onUploadSuccess={handleUploadSuccess} />

      </div>
  );
}