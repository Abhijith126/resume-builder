import React from 'react';
import type { Resume, TemplateType, FontType } from '../types';

interface Props {
  resume: Resume;
  template: TemplateType;
  font: FontType;
}

const fontConfig: Record<FontType, { display: string; body: string; url: string }> = {
  helvetica: {
    display: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    body: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    url: '',
  },
  georgia: {
    display: "'Georgia', serif",
    body: "'Georgia', serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=Georgia&display=swap");',
  },
  inter: {
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");',
  },
  playfair: {
    display: "'Playfair Display', serif",
    body: "'Playfair Display', serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap");',
  },
  poppins: {
    display: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");',
  },
  roboto: {
    display: "'Roboto', sans-serif",
    body: "'Roboto', sans-serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");',
  },
  lora: {
    display: "'Lora', serif",
    body: "'Lora', serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&display=swap");',
  },
  calibri: {
    display: "'Calibri', 'Segoe UI', sans-serif",
    body: "'Calibri', 'Segoe UI', sans-serif",
    url: '',
  },
  arial: {
    display: "'Arial', Helvetica, sans-serif",
    body: "'Arial', Helvetica, sans-serif",
    url: '',
  },
  cambria: {
    display: "'Cambria', 'Georgia', serif",
    body: "'Cambria', 'Georgia', serif",
    url: '',
  },
  garamond: {
    display: "'EB Garamond', serif",
    body: "'EB Garamond', serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap");',
  },
  sourcesans: {
    display: "'Source Sans Pro', sans-serif",
    body: "'Source Sans Pro', sans-serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap");',
  },
  merriweather: {
    display: "'Merriweather', serif",
    body: "'Merriweather', serif",
    url: '@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap");',
  },
};

export default function Preview({ resume, font }: Props) {
  return <PremiumTemplate resume={resume} font={font} />;
}


function PremiumTemplate({ resume, font }: { resume: Resume; font: FontType }) {
  // Proficiency level dots
  const getProficiencyDots = (level: string) => {
    const levels: Record<string, number> = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      fluent: 5,
    };
    const count = levels[level] || 2;
    return Array.from({ length: 5 }, (_, i) => i < count);
  };
  
  const fontStyle = fontConfig[font];

  return (
    <div className="h-[297mm] flex justify-center bg-slate-100">
      <style>{`
        ${fontStyle.url}
        #resume-doc { font-family: ${fontStyle.body} !important; }
        #resume-doc * { font-family: ${fontStyle.body} !important; }
        .premium-display { font-family: ${fontStyle.display}; font-weight: 700; letter-spacing: 0; }
      `}</style>
      <div id="resume-doc" className="w-[210mm] bg-white shadow-2xl" style={{ minHeight: '297mm' }}>
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-8 pt-4 pb-4">
          <div className="flex gap-6 items-start mb-4 justify-between">
            {/* Name and Contact Info */}
            <div className="flex-1">
              <h1 className="premium-display text-4xl font-black tracking-tight mb-1">
                {resume.personalInfo.name || 'Your Name'}
              </h1>
              <div className="h-0.5 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mb-3"></div>
              <div className="flex flex-wrap gap-4 text-xs">
                {resume.personalInfo.email && (
                  <a href={`mailto:${resume.personalInfo.email}`} className="flex items-center gap-1 hover:text-blue-300 transition-colors">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{resume.personalInfo.email}</span>
                  </a>
                )}
                {resume.personalInfo.phone && (
                  <a href={`tel:${resume.personalInfo.phone}`} className="flex items-center gap-1 hover:text-blue-300 transition-colors">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{resume.personalInfo.phone}</span>
                  </a>
                )}
                {resume.personalInfo.location && (
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{resume.personalInfo.location}</span>
                  </div>
                )}
              </div>
              {(resume.personalInfo.website || resume.personalInfo.linkedin) && (
                <div className="flex gap-4 text-xs mt-2">
                  {resume.personalInfo.website && (
                    <a href={resume.personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>{resume.personalInfo.website}</span>
                    </a>
                  )}
                  {resume.personalInfo.linkedin && (
                    <a href={resume.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z" />
                      </svg>
                      <span>{resume.personalInfo.linkedin}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
            
            {/* Profile Photo Section - Right Side */}
            <div className="flex-shrink-0">
              {resume.personalInfo.photo ? (
                <img 
                  src={resume.personalInfo.photo} 
                  alt={resume.personalInfo.name}
                  className={`w-28 h-28 object-center flex-shrink-0 border-2 border-blue-400 ${
                    resume.personalInfo.photoShape === 'square' ? '' : 'rounded-full'
                  }`}
                  style={{ aspectRatio: '1/1' }}
                />
              ) : (
                <div className={`w-28 h-28 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center border-2 border-blue-400 flex-shrink-0 ${
                  resume.personalInfo.photoShape === 'square' ? '' : 'rounded-full'
                }`}>
                  <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Two Column Layout rendered from layout */}
        <div className="grid grid-cols-5 gap-6 px-8 py-4">
          {/* Main Content - Left side (3 columns) */}
          <div className="col-span-3 space-y-6">
            {(resume.layout?.main || ['summary', 'experience', 'education']).map((sectionId) => (
              <React.Fragment key={sectionId}>
                {sectionId === 'summary' && resume.summary && (
                  <section>
                    <h2 className="premium-display text-sm font-black uppercase tracking-widest text-slate-900 mb-3 border-b-2 border-slate-900 pb-2">
                      Professional Summary
                    </h2>
                    <p className="text-slate-700 leading-relaxed text-xs">{resume.summary}</p>
                  </section>
                )}

                {sectionId === 'experience' && resume.experience.length > 0 && (
                  <section>
                    <h2 className="premium-display text-sm font-black uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-slate-900 pb-2">
                      Experience
                    </h2>
                    <div className="space-y-5">
                      {resume.experience.map((exp, idx) => (
                        <div key={exp.id} className={idx !== resume.experience.length - 1 ? 'pb-4 border-b border-dashed border-gray-300' : ''}>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-slate-900 text-sm">{exp.title}</h3>
                            <span className="font-semibold text-slate-500 px-2 py-0.5 rounded flex items-center gap-1" style={{ fontSize: '10px' }}>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {exp.startDate} - {exp.endDate || 'Present'}
                            </span>
                          </div>
                          <p className="text-xs text-blue-600 font-semibold mb-1">
                            {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                          </p>
                          {exp.description && (
                            <ul className="text-xs text-slate-600 space-y-0.5">
                              {exp.description.split('\n').filter(Boolean).map((line, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-slate-400 font-bold">▸</span>
                                  <span>{line}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {sectionId === 'education' && resume.education.length > 0 && (
                  <section>
                    <h2 className="premium-display text-sm font-black uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-slate-900 pb-2">
                      Education
                    </h2>
                    <div className="space-y-3">
                      {resume.education.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                            {edu.startDate && edu.endDate && (
                              <span className="font-semibold text-slate-500 px-2 py-0.5 rounded flex items-center gap-1 flex-shrink-0 whitespace-nowrap" style={{ fontSize: '10px' }}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {edu.startDate} - {edu.endDate}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-blue-600 font-semibold">{edu.institution}</p>
                            {edu.gpa && <p className="text-xs text-slate-600 font-semibold">GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Sidebar - Right side (2 columns) */}
          <div className="col-span-2 space-y-4 bg-gradient-to-b from-slate-50 to-slate-100 p-4 rounded-lg">
            {(resume.layout?.sidebar || ['skills', 'languages', 'achievements', 'certifications', 'interests', 'projects']).map((sectionId) => (
              <React.Fragment key={sectionId}>
                {sectionId === 'languages' && resume.languages.length > 0 && (
                  <section>
                    <h3 className="premium-display text-xs font-black uppercase tracking-widest text-slate-900 mb-2 border-b-2 border-blue-500 pb-1">
                      🌐 Languages
                    </h3>
                    <div className="space-y-2">
                      {resume.languages.map((lang) => (
                        <div key={lang.id} className="flex items-center justify-between">
                          <span className="text-xs text-slate-900 font-semibold">{lang.name}</span>
                          <div className="flex gap-0.5">
                            {getProficiencyDots(lang.proficiency).map((filled, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  filled ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {sectionId === 'skills' && resume.skills.length > 0 && (
                  <section>
                    <h3 className="premium-display text-xs font-black uppercase tracking-widest text-slate-900 mb-2 border-b-2 border-blue-500 pb-1">
                      ⚡ Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill, i) => (
                        <span key={i} className="text-xs text-slate-700 border-b-2 border-slate-300 pb-0.5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {sectionId === 'achievements' && resume.achievements.length > 0 && (
                  <section>
                    <h3 className="premium-display text-xs font-black uppercase tracking-widest text-slate-900 mb-2 border-b-2 border-blue-500 pb-1">
                      ✦ Achievements
                    </h3>
                    <div className="space-y-2">
                      {resume.achievements.map((ach) => (
                        <div key={ach.id}>
                          <p className="text-xs font-semibold text-slate-900">{ach.title}</p>
                          <p className="text-xs text-slate-600 leading-tight">{ach.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {sectionId === 'certifications' && resume.certifications.length > 0 && (
                  <section>
                    <h3 className="premium-display text-xs font-black uppercase tracking-widest text-slate-900 mb-2 border-b-2 border-blue-500 pb-1">
                      📜 Certifications
                    </h3>
                    <div className="space-y-2">
                      {resume.certifications.map((cert, idx) => (
                        <div key={cert.id} className={idx !== resume.certifications.length - 1 ? 'pb-1 border-b border-dashed border-gray-300' : ''}>
                          <p className="text-xs font-semibold text-slate-900">{cert.title}</p>
                          <p className="text-xs text-blue-600">{cert.issuer}</p>
                          {cert.date && <p className="text-xs text-slate-500">{cert.date}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {sectionId === 'interests' && resume.interests.length > 0 && (
                  <section>
                    <h3 className="premium-display text-xs font-black uppercase tracking-widest text-slate-900 mb-2 border-b-2 border-blue-500 pb-1">
                      ♦ Interests
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {resume.interests.map((interest) => (
                        <span key={interest.id} className="text-xs text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                          {interest.title}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {sectionId === 'projects' && resume.projects.length > 0 && (
                  <section>
                    <h3 className="premium-display text-xs font-black uppercase tracking-widest text-slate-900 mb-2 border-b-2 border-blue-500 pb-1">
                      🚀 Projects
                    </h3>
                    <div className="space-y-2">
                      {resume.projects.map((project, idx) => (
                        <div key={project.id} className={idx !== resume.projects.length - 1 ? 'pb-1 border-b border-dashed border-gray-300' : ''}>
                          <p className="text-xs font-semibold text-slate-900">{project.name}</p>
                          {project.technologies && (
                            <p className="text-xs text-blue-600 mb-1">{project.technologies}</p>
                          )}
                          <p className="text-xs text-slate-600 leading-tight">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


