import { useState, useEffect } from 'react';
import type { Resume, TemplateType, FontType } from './types';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import TemplateSelector from './components/TemplateSelector';

const STORAGE_KEY = 'resume-builder-data';

const defaultResume: Resume = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    photo: undefined,
    photoShape: 'circle',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  achievements: [],
  interests: [],
  layout: {
    main: ['summary', 'experience', 'education'],
    sidebar: ['skills', 'languages', 'achievements', 'certifications', 'interests', 'projects']
  },
};

function loadResume(): Resume {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      // Ensure new fields exist for backwards compatibility
      return {
        ...defaultResume,
        ...data,
        languages: data.languages || [],
        certifications: data.certifications || [],
        achievements: data.achievements || [],
        interests: data.interests || [],
        layout: data.layout || defaultResume.layout,
      };
    }
  } catch (e) {
    console.error('Failed to load resume:', e);
  }
  // Return default with sample data for first-time users
  return {
    personalInfo: {
      name: 'Your Name',
      email: 'your@email.com',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    achievements: [],
    interests: [],
    layout: {
      main: ['summary', 'experience', 'education'],
      sidebar: ['skills', 'languages', 'achievements', 'certifications', 'interests', 'projects']
    },
  };
}

function saveResume(resume: Resume) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  } catch (e) {
    console.error('Failed to save resume:', e);
  }
}

function App() {
  const [resume, setResume] = useState<Resume>(loadResume);
  const [template, setTemplate] = useState<TemplateType>('editorial');
  const [font, setFont] = useState<FontType>('helvetica');
  const [panelHidden, setPanelHidden] = useState(false);

  // Auto-save on changes
  useEffect(() => {
    saveResume(resume);
  }, [resume]);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.personalInfo.name || 'my-resume'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setResume(imported);
      } catch (err) {
        alert('Invalid resume file');
      }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    if (confirm('Clear all resume data? This cannot be undone.')) {
      setResume(defaultResume);
    }
  };

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar - Editor */}
      <div className={`
        border-r border-slate-700 overflow-y-auto print:hidden transition-all duration-300
        ${panelHidden ? 'w-0 hidden' : 'w-1/2'}
      `}>
        <div className="p-4 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-blue-400">Resume Builder</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setPanelHidden(true)}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
                title="Hide panel to see full preview"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                Hide
              </button>
              <TemplateSelector template={template} onTemplateChange={setTemplate} font={font} onFontChange={setFont} />
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </button>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <button
              onClick={handleExport}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
            >
              Export JSON
            </button>
            <label className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition-colors cursor-pointer">
              Import JSON
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={handleClear}
              className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
        <Sidebar resume={resume} onChange={setResume} />
      </div>

      {/* Preview */}
      <div id="resume-preview" className={`overflow-y-auto print:w-full print:h-auto print:overflow-visible transition-all duration-300 ${panelHidden ? 'w-full' : 'w-1/2'}`}>
        <div className={`${panelHidden ? 'sticky top-0 z-20 bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center gap-3' : 'hidden'}`}>
          <button
            onClick={() => setPanelHidden(false)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
            title="Show configuration panel"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 0l-7 7 7 7" />
            </svg>
            Show Config
          </button>
          <span className="text-slate-400 text-sm">Configuration hidden - Preview fullscreen</span>
        </div>
        <Preview resume={resume} template={template} font={font} />
      </div>
    </div>
  );
}

export default App;