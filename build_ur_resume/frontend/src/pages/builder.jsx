import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditorPanel from "../components/builder/editor_panel";
import DesignPanel from "../components/builder/design_panel";
import PreviewPanel from "../components/builder/preview_panel";
import Modal from "../components/builder/common/modal";
import RichTextEditor from "../components/builder/common/rich_text_editor";
import InputGroup from "../components/builder/common/input_group";
import { Icons } from "../components/builder/common/icons";

export default function Builder() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'design'
  const [activeSection, setActiveSection] = useState("personal");
  const [zoom, setZoom] = useState(1);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'personal', 'section-edit', 'item-edit'
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  // Design Config - Defaulting to Teal theme
  const [design, setDesign] = useState({
    color: "#0d9488", // Teal-600
    font: "font-sans",
    template: "modern", 
    spacing: "normal"
  });

  // Resume Data
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: "Alex", lastName: "Morgan", email: "alex.morgan@example.com", phone: "+1 (555) 123-4567", role: "Product Designer", city: "San Francisco, CA", summary: "Creative and detail-oriented Product Designer with 5+ years of experience...",
      profiles: [{ network: "LinkedIn", url: "linkedin.com/in/alexmorgan", isVisible: true }]
    },
    sections: [
      { id: "summary", title: "Professional Summary", type: "richtext", isVisible: true, content: "<b>Creative and detail-oriented Product Designer</b> with 5+ years of experience..." },
      { id: "experience", title: "Work Experience", type: "list", isVisible: true, items: [
          { id: 1, title: "Senior UI/UX Designer", subtitle: "TechFlow Inc.", date: "2021-03 - Present", description: "Led redesign of core product...", isVisible: true },
          { id: 2, title: "Product Designer", subtitle: "Creative Studio", date: "2018-06 - 2021-02", description: "Collaborated with cross-functional teams...", isVisible: true }
      ]},
      { id: "education", title: "Education", type: "list", isVisible: true, items: [
          { id: 1, title: "B.A. in Architecture", subtitle: "UC Berkeley", date: "2014 - 2018", description: "Graduated with Honors.", isVisible: true }
      ]},
      { id: "skills", title: "Skills", type: "tags", isVisible: true, content: "Figma, React, Prototyping, HTML/CSS" },
      { id: "projects", title: "Projects", type: "list", isVisible: true, items: [] },
    ]
  });

  // --- EFFECT: Load Icons ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/331595806a.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // --- ACTIONS ---
  const handleOpenModal = (type, sectionId = null, item = null) => {
    setModalType(type);
    setCurrentSectionId(sectionId);
    if (type === 'item-edit') {
        setCurrentItem(item || { id: Date.now(), title: "", subtitle: "", date: "", description: "", isVisible: true });
    }
    setModalOpen(true);
  };

  const handleSaveModal = () => {
    if (modalType === 'item-edit') {
      setResumeData(prev => {
        const newSections = [...prev.sections];
        const secIndex = newSections.findIndex(s => s.id === currentSectionId);
        const section = newSections[secIndex];
        
        if (currentItem.id) {
            const itemIndex = section.items.findIndex(i => i.id === currentItem.id);
            if (itemIndex > -1) { 
                section.items[itemIndex] = currentItem; 
            } else { 
                section.items.push(currentItem); 
            }
        }
        return { ...prev, sections: newSections };
      });
    }
    setModalOpen(false);
  };

  // --- HELPER FOR MODAL TITLE ---
  const getModalTitle = () => {
      if (modalType === 'personal') return "Edit Personal Details";
      if (modalType === 'section-edit') {
          const sec = resumeData.sections.find(s => s.id === currentSectionId);
          return `Edit ${sec ? sec.title : 'Section'}`;
      }
      if (modalType === 'item-edit') return currentItem && currentItem.title ? "Edit Item" : "Add New Item";
      return "";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 flex flex-col">
      
      {/* TOP BAR */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors">
              <i className="fa-solid fa-arrow-left text-lg"></i>
            </Link>
            <div>
                <h1 className="text-base font-bold text-slate-900">Untitled Resume</h1>
                <p className="text-xs text-slate-500">Last saved just now</p>
            </div>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => setActiveTab("editor")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "editor" ? "bg-white shadow-sm text-teal-700" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Icons.Edit /> Editor
            </button>
            <button 
              onClick={() => setActiveTab("design")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "design" ? "bg-white shadow-sm text-teal-700" : "text-slate-500 hover:text-slate-700"}`}
            >
              <i className="fa-solid fa-paintbrush"></i> Design
            </button>
          </div>

          <button onClick={() => window.print()} className="px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-teal-600 transition-all shadow-md flex items-center gap-2">
            <Icons.FilePdf /> Download
          </button>
        </div>
      </div>

      <div className="flex-1 mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start h-full">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 h-full">
            {activeTab === "editor" ? (
              <EditorPanel 
                resumeData={resumeData}
                setResumeData={setResumeData}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onOpenModal={handleOpenModal}
              />
            ) : (
              <DesignPanel 
                design={design} 
                setDesign={setDesign} 
              />
            )}
          </div>

          {/* ================= RIGHT COLUMN: PREVIEW ================= */}
          <div className="lg:col-span-7 h-full">
            <PreviewPanel 
              resumeData={resumeData} 
              design={design} 
              zoom={zoom} 
              setZoom={setZoom} 
            />
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      
      {/* 1. PERSONAL MODAL */}
      <Modal isOpen={modalOpen && modalType === 'personal'} onClose={() => setModalOpen(false)} title="Edit Personal Details" actions={<button onClick={() => setModalOpen(false)} className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-sm">Done</button>}>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <InputGroup label="First Name" name="firstName" value={resumeData.personal.firstName} onChange={(e) => setResumeData(prev => ({...prev, personal: {...prev.personal, firstName: e.target.value}}))} />
            <InputGroup label="Last Name" name="lastName" value={resumeData.personal.lastName} onChange={(e) => setResumeData(prev => ({...prev, personal: {...prev.personal, lastName: e.target.value}}))} />
          </div>
          <InputGroup label="Role Title" name="role" value={resumeData.personal.role} onChange={(e) => setResumeData(prev => ({...prev, personal: {...prev.personal, role: e.target.value}}))} />
          <InputGroup label="Email" name="email" value={resumeData.personal.email} onChange={(e) => setResumeData(prev => ({...prev, personal: {...prev.personal, email: e.target.value}}))} />
          <InputGroup label="Phone" name="phone" value={resumeData.personal.phone} onChange={(e) => setResumeData(prev => ({...prev, personal: {...prev.personal, phone: e.target.value}}))} />
          <InputGroup label="Location" name="city" value={resumeData.personal.city} onChange={(e) => setResumeData(prev => ({...prev, personal: {...prev.personal, city: e.target.value}}))} />
          <InputGroup label="Professional Summary" multiline name="summary" value={resumeData.personal.summary} onChange={(e) => setResumeData(prev => ({...prev, personal: {...prev.personal, summary: e.target.value}}))} />
        </div>
      </Modal>

      {/* 2. SECTION CONTENT MODAL */}
      <Modal isOpen={modalOpen && modalType === 'section-edit'} onClose={() => setModalOpen(false)} title={getModalTitle()} actions={<button onClick={() => setModalOpen(false)} className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-sm">Save Changes</button>}>
        {currentSectionId && (
          <div className="py-2">
             {resumeData.sections.find(s => s.id === currentSectionId)?.type === 'richtext' ? (
                <RichTextEditor label="Content" value={resumeData.sections.find(s => s.id === currentSectionId)?.content} onChange={(val) => { setResumeData(prev => ({ ...prev, sections: prev.sections.map(s => s.id === currentSectionId ? {...s, content: val} : s) })) }} />
             ) : (
                <InputGroup label="Tags (comma separated)" multiline value={resumeData.sections.find(s => s.id === currentSectionId)?.content} onChange={(e) => { setResumeData(prev => ({ ...prev, sections: prev.sections.map(s => s.id === currentSectionId ? {...s, content: e.target.value} : s) })) }} />
             )}
          </div>
        )}
      </Modal>

      {/* 3. ITEM EDIT MODAL */}
      <Modal isOpen={modalOpen && modalType === 'item-edit'} onClose={() => setModalOpen(false)} title={getModalTitle()} actions={<><button onClick={() => setModalOpen(false)} className="text-slate-600 px-4 py-2 hover:bg-slate-100 rounded-lg font-medium">Cancel</button><button onClick={handleSaveModal} className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors shadow-sm">Save Item</button></>}>
        {currentItem && (
          <div className="space-y-5 py-2">
            <InputGroup label="Title / Role / Degree" value={currentItem.title} onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})} />
            <InputGroup label="Subtitle / Company / School" value={currentItem.subtitle} onChange={(e) => setCurrentItem({...currentItem, subtitle: e.target.value})} />
            <InputGroup label="Date / Duration" value={currentItem.date} onChange={(e) => setCurrentItem({...currentItem, date: e.target.value})} />
            <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Description</label><RichTextEditor value={currentItem.description} onChange={(val) => setCurrentItem({...currentItem, description: val})} /></div>
          </div>
        )}
      </Modal>

    </div>
  );
}