export type Language = 'pt' | 'en';

export interface Project {
  id: string;
  number: string;
  title: {
    pt: string;
    en: string;
  };
  subtitle: {
    pt: string;
    en: string;
  };
  category: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  problem: {
    pt: string;
    en: string;
  };
  solution: {
    pt: string;
    en: string;
  };
  highlights: {
    pt: string[];
    en: string[];
  };
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  hasInteractiveDemo?: 'quanto-valia' | 'progresso-cargas' | 'cesta-basica' | 'macro-monitor';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
