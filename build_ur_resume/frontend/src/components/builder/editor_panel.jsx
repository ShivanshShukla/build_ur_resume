import React from "react";
import { Icons, getSectionIcon } from "./common/Icons";
import InputGroup from "./common/input_group";

// --- LOCAL SECTION MENU ---
const LocalSectionMenu = ({ onEdit, onToggle, onDelete, isVisible, type }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
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
        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 py-1 overflow-hidden animate-fadeIn">
          {type !== 'list' && (
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); onEdit(); }}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <i className="fa-solid fa-pen-to-square text-slate-400 w-4"></i> Edit Content
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); onToggle(); }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <i className={`fa-solid ${isVisible ? 'fa-eye-slash' : 'fa-eye'} text-slate-400 w-4`}></i>
            {isVisible ? 'Hide Section' : 'Show Section'}
          </button>
          <div className="h-px bg-slate-100 my-1"></div>
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
};

export default function EditorPanel({
  resumeData,
  setResumeData,
  activeSection,
  setActiveSection,
  onOpenModal
}) {

  // --- HANDLERS ---
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };

  const handleProfileChange = (index, field, value) => {
    const newProfiles = [...resumeData.personal.profiles];
    newProfiles[index][field] = value;
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, profiles: newProfiles } }));
  };

  const addProfile = () => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, profiles: [...prev.personal.profiles, { network: "", url: "", isVisible: true }] }
    }));
  };

  const deleteProfile = (index) => {
    const newProfiles = [...resumeData.personal.profiles];
    newProfiles.splice(index, 1);
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, profiles: newProfiles } }));
  };

  const toggleVisibility = (sectionId, itemId = null) => {
    setResumeData(prev => {
      const newSections = [...prev.sections];
      const sec = newSections.find(s => s.id === sectionId);
      if (itemId) {
        const item = sec.items.find(i => i.id === itemId);
        item.isVisible = !item.isVisible;
      } else {
        sec.isVisible = !sec.isVisible;
      }
      return { ...prev, sections: newSections };
    });
  };

  const deleteSection = (sectionId) => {
    if (!window.confirm("Delete this entire section?")) return;
    setResumeData(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== sectionId) }));
  };

  const deleteItem = (sectionId, itemId) => {
    if (!window.confirm("Delete this item?")) return;
    setResumeData(prev => {
      const newSections = prev.sections.map(s => {
        if (s.id !== sectionId) return s;
        return { ...s, items: s.items.filter(i => i.id !== itemId) };
      });
      return { ...prev, sections: newSections };
    });
  };

  const addCustomSection = () => {
    const title = prompt("Section Title:");
    if (!title) return;
    setResumeData(prev => ({
      ...prev,
      sections: [...prev.sections, { id: title.toLowerCase().replace(/\s/g, '-') + Date.now(), title, type: 'list', isVisible: true, items: [] }]
    }));
  };

  const handleSectionDragStart = (e, index) => { e.dataTransfer.setData("sectionIndex", index); e.dataTransfer.effectAllowed = "move"; };
  const handleSectionDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("sectionIndex");
    if (!draggedIndex) return;
    const newSections = [...resumeData.sections];
    const draggedSection = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedSection);
    setResumeData(prev => ({ ...prev, sections: newSections }));
  };

  const handleItemDragStart = (e, sectionId, itemIndex) => { e.dataTransfer.setData("itemData", JSON.stringify({ sectionId, itemIndex })); e.stopPropagation(); };
  const handleItemDrop = (e, sectionId, itemIndex) => {
    e.preventDefault(); e.stopPropagation();
    const data = JSON.parse(e.dataTransfer.getData("itemData"));
    if (!data || data.sectionId !== sectionId) return;
    const newSections = [...resumeData.sections];
    const section = newSections.find(s => s.id === sectionId);
    const items = [...section.items];
    const movedItem = items[data.itemIndex];
    items.splice(data.itemIndex, 1);
    items.splice(itemIndex, 0, movedItem);
    section.items = items;
    setResumeData(prev => ({ ...prev, sections: newSections }));
  };

  return (
    <div className="space-y-4 h-full overflow-y-auto pr-3 custom-scrollbar pb-32">

      {/* 1. PERSONAL DETAILS CARD */}
      <div
        id="editor-section-personal"
        className={`group bg-white rounded-2xl border transition-all duration-300 ${activeSection === 'personal' ? 'border-teal-500 shadow-md ring-1 ring-teal-100' : 'border-slate-200 hover:border-teal-300'}`}
      >
        <div
          className="flex items-center justify-between p-5 cursor-pointer"
          onClick={() => setActiveSection(activeSection === 'personal' ? null : 'personal')}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors ${activeSection === 'personal' ? 'bg-teal-600 text-white shadow-teal-200' : 'bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600'}`}>
              <Icons.User />
            </div>
            <div>
              <h3 className={`font-bold text-base ${activeSection === 'personal' ? 'text-slate-900' : 'text-slate-700'}`}>Personal Details</h3>
              <p className="text-xs text-slate-400 font-medium">Name, Contact, Location</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Edit Button with more spacing to prevent clash */}
            <button
              onClick={(e) => { e.stopPropagation(); onOpenModal('personal'); }}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              title="Edit Personal Details"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <Icons.ChevronDown className={`text-slate-300 transition-transform duration-300 ${activeSection === 'personal' ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {activeSection === 'personal' && (
          <div className="px-5 pb-6 pt-2 animate-fadeIn border-t border-slate-50">
            {/* Quick Preview of key data */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</span>
                <div className="text-slate-700 truncate">{resumeData.personal.email || "Not set"}</div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</span>
                <div className="text-slate-700 truncate">{resumeData.personal.phone || "Not set"}</div>
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onOpenModal('personal'); }} className="w-full py-2 text-sm font-bold text-teal-600 border border-teal-100 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
              Edit Full Details
            </button>
          </div>
        )}
      </div>

      {/* 2. SOCIAL PROFILES CARD (Independent Section) */}
      <div
        id="editor-section-profiles"
        className={`group bg-white rounded-2xl border transition-all duration-300 ${activeSection === 'profiles' ? 'border-teal-500 shadow-md ring-1 ring-teal-100' : 'border-slate-200 hover:border-teal-300'}`}
      >
        <div
          className="flex items-center justify-between p-5 cursor-pointer"
          onClick={() => setActiveSection(activeSection === 'profiles' ? null : 'profiles')}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors ${activeSection === 'profiles' ? 'bg-teal-600 text-white shadow-teal-200' : 'bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600'}`}>
              <i className="fa-solid fa-share-nodes"></i>
            </div>
            <div>
              <h3 className={`font-bold text-base ${activeSection === 'profiles' ? 'text-slate-900' : 'text-slate-700'}`}>Social Profiles</h3>
              <p className="text-xs text-slate-400 font-medium">LinkedIn, Portfolio, GitHub</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8"></div> {/* Spacer to align with other cards */}
            <Icons.ChevronDown className={`text-slate-300 transition-transform duration-300 ${activeSection === 'profiles' ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {activeSection === 'profiles' && (
          <div className="px-5 pb-6 pt-2 animate-fadeIn border-t border-slate-50">
            <div className="space-y-3 pt-2">
              {resumeData.personal.profiles.map((p, i) => (
                <div key={i} className="flex gap-3 items-center group/item">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-slate-300 bg-slate-50 rounded-lg group-hover/item:text-teal-500 transition-colors"><Icons.Link /></div>

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all placeholder-slate-400"
                      value={p.network}
                      onChange={(e) => handleProfileChange(i, 'network', e.target.value)}
                      placeholder="Network (e.g. LinkedIn)"
                    />
                    <input
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:bg-white focus:border-teal-500 focus:outline-none transition-all placeholder-slate-400"
                      value={p.url}
                      onChange={(e) => handleProfileChange(i, 'url', e.target.value)}
                      placeholder="URL (e.g. linkedin.com/in/me)"
                    />
                  </div>

                  <button onClick={() => deleteProfile(i)} className="text-slate-300 hover:text-red-500 p-2 transition-colors rounded-md hover:bg-red-50"><Icons.Trash /></button>
                </div>
              ))}

              <button
                onClick={addProfile}
                className="w-full py-2.5 mt-2 border-2 border-dashed border-teal-100 text-teal-600 font-bold rounded-xl hover:bg-teal-50 hover:border-teal-200 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Icons.Plus /> Add New Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. DYNAMIC SECTIONS LIST */}
      <div className="space-y-3">
        {resumeData.sections.map((section, index) => (
          <div
            key={section.id}
            id={`editor-section-${section.id}`}
            draggable
            onDragStart={(e) => handleSectionDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleSectionDrop(e, index)}
            className={`group bg-white rounded-2xl border transition-all duration-300 ${activeSection === section.id ? 'border-teal-500 shadow-md ring-1 ring-teal-100' : 'border-slate-200 hover:border-teal-300'}`}
          >
            <div
              className="flex items-center justify-between p-5 cursor-pointer"
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            >
              <div className="flex items-center gap-4">
                <div className="cursor-move text-slate-200 hover:text-slate-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <Icons.Drag />
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors ${activeSection === section.id ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600'}`}>
                  <i className={getSectionIcon(section.id)}></i>
                </div>
                <h3 className={`font-bold text-base ${activeSection === section.id ? 'text-slate-900' : 'text-slate-700'}`}>{section.title}</h3>
              </div>

              <div className="flex items-center gap-1">
                {/* Local Menu Component usage */}
                <LocalSectionMenu
                  isVisible={section.isVisible}
                  onToggle={() => toggleVisibility(section.id)}
                  onDelete={() => deleteSection(section.id)}
                  onEdit={() => onOpenModal('section-edit', section.id)}
                  type={section.type}
                />
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icons.ChevronDown className={`text-slate-300 transition-transform duration-300 ${activeSection === section.id ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>

            {activeSection === section.id && (
              <div className="p-5 pt-0 animate-fadeIn border-t border-slate-50">

                {/* List Items */}
                {section.type === 'list' && (
                  <div className="space-y-2 pt-3">
                    {section.items.map((item, i) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleItemDragStart(e, section.id, i)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleItemDrop(e, section.id, i)}
                        className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-teal-200 hover:shadow-md transition-all group/item cursor-pointer"
                        onClick={() => onOpenModal('item-edit', section.id, item)}
                      >
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="w-1 h-8 bg-slate-200 rounded-full group-hover/item:bg-teal-400 transition-colors"></div>
                          <div className="truncate">
                            <div className="text-sm font-bold text-slate-800 truncate">{item.title || "(No Title)"}</div>
                            <div className="text-xs text-slate-500 truncate">{item.subtitle}</div>
                          </div>
                        </div>
                        <div className="text-slate-300 group-hover/item:text-teal-500 transition-colors">
                          <Icons.Edit />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => onOpenModal('item-edit', section.id)}
                      className="w-full py-3 mt-3 text-sm font-bold text-teal-600 border-2 border-dashed border-teal-100 rounded-xl hover:bg-teal-50 hover:border-teal-200 transition-all flex items-center justify-center gap-2"
                    >
                      <Icons.Plus /> Add New Item
                    </button>
                  </div>
                )}

                {/* Rich Text / Tags Preview */}
                {section.type !== 'list' && (
                  <div
                    className="p-4 mt-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 hover:bg-white hover:border-teal-300 cursor-pointer transition-all"
                    onClick={() => onOpenModal('section-edit', section.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Content Preview</span>
                      <Icons.Edit />
                    </div>
                    <div className="line-clamp-3 opacity-80" dangerouslySetInnerHTML={{ __html: section.content || "Click to add content..." }} />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={addCustomSection} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-slate-400 hover:text-slate-700 hover:bg-white transition-all flex items-center justify-center gap-2 mt-4 shadow-sm">
        <Icons.Plus /> Add Custom Section
      </button>

    </div>
  );
}