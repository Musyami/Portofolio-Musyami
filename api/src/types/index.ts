/**
 * Definisi tipe data entitas untuk REST API Fastify Musyami Portfolio.
 */

export interface Education {
  id: string;
  order: number;
  title: string;
  major: string;
  period: string;
  description: string;
}

export interface Experience {
  id: string;
  order: number;
  title: string;
  organization: string;
  startDate: string;
  endDate: string | null;
  period: string;
  description: string;
  bullets: string[];
  imageUrl?: string;
  emoji?: string;
  rank?: string;
  suit?: string;
  isCurrent?: boolean;
}

export interface Skill {
  id: string;
  order: number;
  name: string;
  description: string;
  level: number;
  iconUrl?: string;
  iconKey?: string;
  category: string;
  suit?: string;
}

export interface ProjectButton {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  order: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  date: string;
  imageUrl?: string;
  caseStudy: string;
  buttons: ProjectButton[];
  rank?: string;
  suit?: string;
}

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

export interface BlogPost {
  id: string;
  order: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverUrl?: string;
  emoji?: string;
  content: string[];
}

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

export interface Profile {
  name: string;
  nickname: string;
  title: string;
  tagline: string;
  about: string;
  avatarUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  ip?: string;
}
