/**
 * Technology Ecosystem Data
 * NOTE: Only technologies specified in the master prompt are included below.
 * Remove any technology not genuinely utilized by the studio before final launch.
 */

export interface TechCategory {
  title: string;
  items: string[];
}

export const TECH_ECOSYSTEM: Record<string, string[]> = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express', 'Python', 'FastAPI'],
  'AI & Data': ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'Scikit-learn'],
  Mobile: ['React Native', 'Android'],
  'Cloud & Infra': ['AWS', 'Google Cloud', 'Docker', 'CI/CD', 'Firebase', 'Supabase'],
  Databases: ['PostgreSQL', 'MongoDB', 'MySQL'],
};

