/**
 * Definisi tipe data untuk Musyami Portfolio (Task 4)
 * Setiap model data memiliki `id` dan `order` sesuai spesifikasi AGENTS.md.
 */

// --- Model Pendidikan (Education) ---
export interface Education {
  id: string;
  order: number;
  title: string;
  major: string;
  period: string;
  description: string;
}

// --- Model Pengalaman (Experience) ---
export interface Experience {
  id: string;
  order: number;
  title: string;
  organization: string;
  startDate: string;
  endDate: string | null;
  period: string; // Tampilan periode, mis. "Sep 2025 – sekarang"
  description: string;
  bullets: string[];
  imageUrl?: string;
  // Properti pendukung tema kartu remi
  emoji?: string;
  rank?: string;
  suit?: string;
  isCurrent?: boolean;
}

// --- Model Keterampilan (Skill) ---
export interface Skill {
  id: string;
  order: number;
  name: string;
  description: string;
  level: number; // Skala 0 - 100
  iconUrl?: string;
  iconKey?: string; // Kunci ikon (mis. 'd:html5' atau 's:ros')
  category: string;
  suit?: string;
}

export interface SkillCategoryGroup {
  category: string;
  suit: string;
  skills: Skill[];
}

// --- Model Proyek (Project) ---
export interface ProjectButton {
  label: string;
  url: string;
}

export type ProjectCategory = 'Web' | 'Robotik' | 'Desain' | 'UI/UX' | string;

export interface Project {
  id: string;
  order: number;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  date: string;
  imageUrl?: string;
  caseStudy: string;
  buttons: ProjectButton[];
  // Properti pendukung tema kartu remi
  rank?: string;
  suit?: string;
}

// --- Model Prestasi / Penghargaan (Achievement) ---
export interface Achievement {
  id: string;
  order: number;
  title: string;
  organizer: string;
  date: string;
  description: string;
  bullets: string[];
  imageUrl?: string;
  emoji?: string;
  rank?: string;
  suit?: string;
}

// --- Model Artikel Blog (BlogPost) ---
export interface BlogPost {
  id: string;
  order: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverUrl?: string;
  emoji?: string;
  content: string[]; // Kumpulan paragraf artikel
}

// --- Model Media Sosial (Social) ---
export interface Social {
  id: string;
  order: number;
  name: string;
  handle: string;
  url: string;
  logoUrl?: string;
  iconSvg?: string;
  color: string;
}

// --- Profil / Data Diri ---
export interface Profile {
  name: string;
  nickname: string;
  title: string;
  tagline: string;
  about: string;
  avatarUrl?: string;
}

// --- Kumpulan Seluruh Data Cadangan (Fallback Data) ---
export interface PortfolioData {
  profile: Profile;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  blogPosts: BlogPost[];
  socials: Social[];
}
