import { useState } from 'react';
import type { Resume } from '../types';
import PersonalInfoSection from './sections/PersonalInfoSection';
import SummarySection from './sections/SummarySection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import LanguagesSection from './sections/LanguagesSection';
import CertificationsSection from './sections/CertificationsSection';
import AchievementsSection from './sections/AchievementsSection';
import InterestsSection from './sections/InterestsSection';
import SectionLayoutManager from './SectionLayoutManager';

interface Props {
  resume: Resume;
  onChange: (resume: Resume) => void;
}

export default function Sidebar({ resume, onChange }: Props) {
  const [activeTab, setActiveTab] = useState<'edit' | 'layout'>('edit');

  const updateLayout = (layout: Resume['layout']) => {
    onChange({ ...resume, layout });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700 px-6 py-4">
        <div className="mb-4">
          <h2 className="text-lg font-black text-white tracking-tight leading-tight">
            Configuration
          </h2>
          <p className="text-xs text-slate-400 mt-1">Edit content and manage layout</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex gap-2 bg-slate-800/30 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('edit')}
            className={`
              flex-1 px-3 py-2 text-xs font-semibold rounded transition-all duration-200
              ${activeTab === 'edit'
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/20'
              }
            `}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`
              flex-1 px-3 py-2 text-xs font-semibold rounded transition-all duration-200
              ${activeTab === 'layout'
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/20'
              }
            `}
          >
            🎯 Layout
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'edit' ? (
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <PersonalInfoSection 
            data={resume.personalInfo} 
            onChange={(personalInfo) => onChange({ ...resume, personalInfo })} 
          />
          <SummarySection 
            data={resume.summary} 
            onChange={(summary) => onChange({ ...resume, summary })} 
          />
          <ExperienceSection 
            data={resume.experience} 
            onChange={(experience) => onChange({ ...resume, experience })} 
          />
          <EducationSection 
            data={resume.education} 
            onChange={(education) => onChange({ ...resume, education })} 
          />
          <LanguagesSection 
            data={resume.languages} 
            onChange={(languages) => onChange({ ...resume, languages })} 
          />
          <SkillsSection 
            data={resume.skills} 
            onChange={(skills) => onChange({ ...resume, skills })} 
          />
          <CertificationsSection 
            data={resume.certifications} 
            onChange={(certifications) => onChange({ ...resume, certifications })} 
          />
          <AchievementsSection 
            data={resume.achievements} 
            onChange={(achievements) => onChange({ ...resume, achievements })} 
          />
          <InterestsSection 
            data={resume.interests} 
            onChange={(interests) => onChange({ ...resume, interests })} 
          />
          <ProjectsSection 
            data={resume.projects} 
            onChange={(projects) => onChange({ ...resume, projects })} 
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <SectionLayoutManager 
            layout={resume.layout || { main: ['summary', 'experience', 'education'], sidebar: ['skills', 'languages', 'achievements', 'certifications', 'interests', 'projects'] }}
            onLayoutChange={updateLayout}
          />
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-950/40 to-slate-950/20 border border-blue-900/30 rounded-xl">
            <h4 className="text-xs font-bold text-blue-300 mb-2 flex items-center gap-2">
              <span className="text-lg">💡</span> Pro Tip
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Drag sections between columns to control layout. Reorder using arrow buttons. Preview updates automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
