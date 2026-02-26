export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  photo?: string;
  photoShape?: 'square' | 'circle';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  description: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface Interest {
  id: string;
  title: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  achievements: Achievement[];
  interests: Interest[];
  layout?: {
    main: string[];
    sidebar: string[];
  };
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'premium' | 'editorial' | 'modern-minimalist' | 'arctic-frost' | 'desert-rose';

export type FontType = 'helvetica' | 'georgia' | 'inter' | 'playfair' | 'poppins' | 'roboto' | 'lora' | 'calibri' | 'arial' | 'cambria' | 'garamond' | 'sourcesans' | 'merriweather';
