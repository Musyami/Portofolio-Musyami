/**
 * Client API untuk mengambil data dari REST API Fastify.
 * Jika API gagal / timeout, otomatis fallback ke data cadangan (fallback-data).
 */

import type {
  Education,
  Experience,
  Skill,
  Project,
  Achievement,
  BlogPost,
  Social,
  Profile,
} from './types';
import {
  EDU,
  EXP,
  SKL,
  PRJ,
  ACHV,
  BLG,
  SOC,
  PROFILE_DATA,
} from './fallback-data';

// URL dasar API, bisa diatur via env. Kosong = langsung pakai fallback.
const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

// Timeout fetch (ms)
const TIMEOUT_MS = 5000;

/** Status koneksi API — dipakai oleh ApiBanner */
let _apiOffline = false;
export function isApiOffline(): boolean {
  return _apiOffline;
}

/**
 * Fetch helper dengan timeout.
 * Mengembalikan data JSON atau null jika gagal.
 */
async function apiFetch<T>(path: string): Promise<T | null> {
  if (!BASE) {
    _apiOffline = true;
    return null;
  }
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(`${BASE}${path}`, {
      signal: controller.signal,
      next: { revalidate: 60 }, // cache ISR 60 detik
    });
    clearTimeout(timer);

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    _apiOffline = true;
    return null;
  }
}

// --- Fungsi pengambil data per section ---

export async function getProfile(): Promise<Profile> {
  const data = await apiFetch<Profile>('/profile');
  return data ?? PROFILE_DATA;
}

export async function getEducation(): Promise<Education[]> {
  const data = await apiFetch<Education[]>('/education');
  return data ?? EDU;
}

export async function getExperience(): Promise<Experience[]> {
  const data = await apiFetch<Experience[]>('/experience');
  return data ?? EXP;
}

export async function getSkills(): Promise<Skill[]> {
  const data = await apiFetch<Skill[]>('/skills');
  return data ?? SKL;
}

export async function getProjects(): Promise<Project[]> {
  const data = await apiFetch<Project[]>('/projects');
  return data ?? PRJ;
}

export async function getAchievements(): Promise<Achievement[]> {
  const data = await apiFetch<Achievement[]>('/achievements');
  return data ?? ACHV;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await apiFetch<BlogPost[]>('/blog');
  return data ?? BLG;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  // Coba ambil semua blog lalu cari by slug
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getSocials(): Promise<Social[]> {
  const data = await apiFetch<Social[]>('/socials');
  return data ?? SOC;
}
