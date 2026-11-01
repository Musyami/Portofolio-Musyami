/**
 * Modul penyimpanan data berbasis file JSON di folder DATA_DIR.
 * Otomatis melakukan seed data awal dari folder seeds jika file belum ada.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Direktori data dari environment variable atau default './data'
const DATA_DIR = process.env.DATA_DIR || path.resolve(process.cwd(), 'data');
const SEEDS_DIR = path.resolve(__dirname, '../seeds');

// Pastikan folder data ada
export async function initDb(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const collections = [
    'education',
    'experience',
    'skills',
    'projects',
    'achievements',
    'blog',
    'socials',
    'profile',
  ];

  for (const col of collections) {
    const targetFile = path.join(DATA_DIR, `${col}.json`);
    try {
      await fs.access(targetFile);
    } catch {
      // Salin dari folder seeds jika file belum ada
      const seedFile = path.join(SEEDS_DIR, `${col}.json`);
      try {
        const seedContent = await fs.readFile(seedFile, 'utf-8');
        await fs.writeFile(targetFile, seedContent, 'utf-8');
      } catch (err) {
        console.error(`Gagal menyalin seed data untuk ${col}:`, err);
        // Buat file default kosong
        const emptyData = col === 'profile' ? '{}' : '[]';
        await fs.writeFile(targetFile, emptyData, 'utf-8');
      }
    }
  }

  // File pesan kontak
  const msgFile = path.join(DATA_DIR, 'messages.json');
  try {
    await fs.access(msgFile);
  } catch {
    await fs.writeFile(msgFile, '[]', 'utf-8');
  }
}

// Helper untuk membaca file koleksi
export async function readCollection<T>(collection: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

// Helper untuk menulis file koleksi
export async function writeCollection<T>(collection: string, data: T[]): Promise<void> {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Operasi CRUD Koleksi (Array of items with 'id')
export async function getAll<T>(collection: string): Promise<T[]> {
  const items = await readCollection<T>(collection);
  // Urutkan berdasarkan field 'order' jika ada
  return items.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getById<T extends { id: string }>(
  collection: string,
  id: string
): Promise<T | null> {
  const items = await readCollection<T>(collection);
  const found = items.find((item) => item.id === id);
  return found || null;
}

export async function createItem<T extends { id?: string; order?: number }>(
  collection: string,
  item: T
): Promise<T & { id: string; order: number }> {
  const items = await readCollection<any>(collection);
  const maxOrder = items.reduce((max: number, curr: any) => Math.max(max, curr.order || 0), 0);

  const newItem = {
    ...item,
    id: item.id || `${collection.slice(0, 3)}-${Date.now()}`,
    order: item.order !== undefined ? item.order : maxOrder + 1,
  };

  items.push(newItem);
  await writeCollection(collection, items);
  return newItem;
}

export async function updateItem<T extends { id: string }>(
  collection: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const items = await readCollection<T>(collection);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;

  items[index] = { ...items[index], ...updates, id };
  await writeCollection(collection, items);
  return items[index];
}

export async function deleteItem<T extends { id: string }>(
  collection: string,
  id: string
): Promise<boolean> {
  const items = await readCollection<T>(collection);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;

  await writeCollection(collection, filtered);
  return true;
}

// Operasi untuk data tunggal (seperti profile)
export async function getSingle<T>(collection: string): Promise<T | null> {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function saveSingle<T>(collection: string, data: T): Promise<T> {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  return data;
}
