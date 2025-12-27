
export const Icons = {
  Eye: () => <i className="fa-solid fa-eye"></i>,
  EyeOff: () => <i className="fa-solid fa-eye-slash"></i>,
  Trash: () => <i className="fa-solid fa-trash"></i>,
  Plus: () => <i className="fa-solid fa-plus"></i>,
  Edit: () => <i className="fa-solid fa-pen-to-square"></i>,
  Drag: () => <i className="fa-solid fa-grip-vertical"></i>,
  GripLines: () => <i className="fa-solid fa-grip-lines"></i>,
  Bold: () => <i className="fa-solid fa-bold"></i>,
  Italic: () => <i className="fa-solid fa-italic"></i>,
  Underline: () => <i className="fa-solid fa-underline"></i>,
  List: () => <i className="fa-solid fa-list-ul"></i>,
  Close: () => <i className="fa-solid fa-xmark"></i>,
  ChevronDown: ({ className }) => <i className={`fa-solid fa-angle-down ${className}`}></i>,
  Link: () => <i className="fa-solid fa-link"></i>,
  Check: () => <i className="fa-solid fa-check"></i>,
  FilePdf: () => <i className="fa-regular fa-file-pdf"></i>,
  User: () => <i className="fa-regular fa-user"></i>,
  
  // Section Icons
  Summary: () => <i className="fa-solid fa-align-left"></i>,
  Experience: () => <i className="fa-solid fa-briefcase"></i>,
  Education: () => <i className="fa-solid fa-graduation-cap"></i>,
  Skills: () => <i className="fa-solid fa-lightbulb"></i>,
  Projects: () => <i className="fa-solid fa-diagram-project"></i>,
  Awards: () => <i className="fa-solid fa-trophy"></i>,
  Certificates: () => <i className="fa-solid fa-certificate"></i>,
  Languages: () => <i className="fa-solid fa-language"></i>,
  Custom: () => <i className="fa-solid fa-layer-group"></i>,
};

export const getSectionIcon = (id) => {
  switch (id) {
    case 'summary': return 'fa-solid fa-align-left';
    case 'experience': return 'fa-solid fa-briefcase';
    case 'education': return 'fa-solid fa-graduation-cap';
    case 'skills': return 'fa-solid fa-lightbulb';
    case 'projects': return 'fa-solid fa-diagram-project';
    case 'awards': return 'fa-solid fa-trophy';
    case 'certificates': return 'fa-solid fa-certificate';
    case 'languages': return 'fa-solid fa-language';
    default: return 'fa-solid fa-layer-group';
  }
};