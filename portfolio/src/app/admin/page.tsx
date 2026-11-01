/**
 * Halaman Admin — tersembunyi dari nav.
 * Login dengan ADMIN_KEY (sessionStorage), lalu CRUD per section.
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminGenericForm, { type FieldDef } from '@/components/AdminGenericForm';

// ============================================================
// Konfigurasi field per section
// ============================================================

const EDUCATION_FIELDS: FieldDef[] = [
  { key: 'title', label: 'Institusi', type: 'text', required: true },
  { key: 'major', label: 'Jurusan', type: 'text', required: true },
  { key: 'period', label: 'Periode', type: 'text', placeholder: '2024 – sekarang' },
  { key: 'description', label: 'Deskripsi', type: 'textarea' },
];

const EXPERIENCE_FIELDS: FieldDef[] = [
  { key: 'title', label: 'Posisi/Jabatan', type: 'text', required: true },
  { key: 'organization', label: 'Organisasi', type: 'text', required: true },
  { key: 'startDate', label: 'Tanggal Mulai', type: 'text', placeholder: 'Sep 2025' },
  { key: 'endDate', label: 'Tanggal Selesai (kosongkan jika masih)', type: 'text' },
  { key: 'period', label: 'Tampilan Periode', type: 'text', placeholder: 'Sep 2025 – sekarang' },
  { key: 'description', label: 'Deskripsi', type: 'textarea' },
  { key: 'bullets', label: 'Poin-poin', type: 'bullets' },
  { key: 'imageUrl', label: 'Gambar', type: 'image' },
  { key: 'emoji', label: 'Emoji', type: 'text', placeholder: '🚢' },
];

const SKILL_FIELDS: FieldDef[] = [
  { key: 'name', label: 'Nama Skill', type: 'text', required: true },
  { key: 'description', label: 'Deskripsi', type: 'text' },
  { key: 'level', label: 'Level (0–100)', type: 'number', min: 0, max: 100 },
  { key: 'category', label: 'Kategori', type: 'select', options: ['Bahasa Pemrograman', 'Framework & Tools', 'Software & Hardware'] },
  { key: 'iconUrl', label: 'URL Ikon', type: 'text', placeholder: 'https://...' },
  { key: 'iconKey', label: 'Icon Key (d:react / s:ros)', type: 'text' },
];

const PROJECT_FIELDS: FieldDef[] = [
  { key: 'title', label: 'Judul Proyek', type: 'text', required: true },
  { key: 'description', label: 'Deskripsi', type: 'textarea', required: true },
  { key: 'tags', label: 'Tags', type: 'tags', placeholder: 'React, TypeScript' },
  { key: 'category', label: 'Kategori', type: 'select', options: ['Web', 'Robotik', 'Desain', 'UI/UX'] },
  { key: 'date', label: 'Tanggal/Periode', type: 'text', placeholder: '2025 – 2026' },
  { key: 'imageUrl', label: 'Gambar Proyek', type: 'image' },
  { key: 'caseStudy', label: 'Case Study', type: 'textarea' },
  { key: 'buttons', label: 'Tombol Link', type: 'buttons' },
];

const ACHIEVEMENT_FIELDS: FieldDef[] = [
  { key: 'title', label: 'Judul Prestasi', type: 'text', required: true },
  { key: 'organizer', label: 'Penyelenggara', type: 'text', required: true },
  { key: 'date', label: 'Tanggal', type: 'text', placeholder: 'Nov 2025' },
  { key: 'description', label: 'Deskripsi', type: 'textarea' },
  { key: 'bullets', label: 'Poin-poin', type: 'bullets' },
  { key: 'imageUrl', label: 'Gambar', type: 'image' },
  { key: 'emoji', label: 'Emoji', type: 'text', placeholder: '🏆' },
];

const BLOG_FIELDS: FieldDef[] = [
  { key: 'title', label: 'Judul Artikel', type: 'text', required: true },
  { key: 'slug', label: 'Slug URL', type: 'text', required: true, placeholder: 'judul-artikel-keren' },
  { key: 'excerpt', label: 'Ringkasan', type: 'textarea' },
  { key: 'date', label: 'Tanggal', type: 'text', placeholder: '12 Okt 2026' },
  { key: 'coverUrl', label: 'Gambar Cover', type: 'image' },
  { key: 'emoji', label: 'Emoji', type: 'text', placeholder: '🤖' },
  { key: 'content', label: 'Isi Artikel (paragraf)', type: 'content' },
];

const SOCIAL_FIELDS: FieldDef[] = [
  { key: 'name', label: 'Nama Platform', type: 'text', required: true },
  { key: 'handle', label: 'Handle/Username', type: 'text', required: true },
  { key: 'url', label: 'URL Lengkap', type: 'text', required: true },
  { key: 'color', label: 'Warna (hex)', type: 'text', placeholder: '#0A66C2' },
  { key: 'iconSvg', label: 'SVG Ikon (opsional)', type: 'textarea' },
  { key: 'logoUrl', label: 'Logo URL (opsional)', type: 'text' },
];

// ============================================================
// Konfigurasi tab — endpoint API + field definitions
// ============================================================

interface TabConfig {
  key: string;
  label: string;
  endpoint: string;      // Path API (mis. /education)
  fields: FieldDef[];
  titleKey: string;       // Properti yang ditampilkan sebagai judul item
  subtitleKey?: string;   // Properti yang ditampilkan sebagai subjudul
}

const TABS: TabConfig[] = [
  { key: 'education', label: 'Education', endpoint: '/education', fields: EDUCATION_FIELDS, titleKey: 'title', subtitleKey: 'major' },
  { key: 'experience', label: 'Experience', endpoint: '/experience', fields: EXPERIENCE_FIELDS, titleKey: 'title', subtitleKey: 'organization' },
  { key: 'skills', label: 'Skills', endpoint: '/skills', fields: SKILL_FIELDS, titleKey: 'name', subtitleKey: 'category' },
  { key: 'projects', label: 'Projects', endpoint: '/projects', fields: PROJECT_FIELDS, titleKey: 'title', subtitleKey: 'category' },
  { key: 'achievements', label: 'Achievement', endpoint: '/achievements', fields: ACHIEVEMENT_FIELDS, titleKey: 'title', subtitleKey: 'organizer' },
  { key: 'blog', label: 'Blog', endpoint: '/blog', fields: BLOG_FIELDS, titleKey: 'title', subtitleKey: 'slug' },
  { key: 'socials', label: 'Social', endpoint: '/socials', fields: SOCIAL_FIELDS, titleKey: 'name', subtitleKey: 'handle' },
];

// ============================================================
// Tipe item generik
// ============================================================
type Item = Record<string, unknown> & { id: string };

// ============================================================
// Komponen utama Admin
// ============================================================

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab aktif
  const [activeTab, setActiveTab] = useState(0);

  // Data per tab
  const [items, setItems] = useState<Item[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  // Form modal
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);

  // API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

  // Cek sessionStorage saat mount
  useEffect(() => {
    const stored = sessionStorage.getItem('admin_key');
    if (stored) {
      setAdminKey(stored);
      setLoggedIn(true);
    }
  }, []);

  // Helper untuk mengambil konfigurasi tab aktif
  const tab = TABS[activeTab];

  // Fetch data dari API
  const fetchItems = useCallback(async () => {
    if (!apiUrl || !tab) return;
    setLoadingList(true);
    try {
      const res = await fetch(`${apiUrl}${tab.endpoint}`);
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch {
      // Gagal fetch — biarkan list kosong
    } finally {
      setLoadingList(false);
    }
  }, [apiUrl, tab]);

  // Fetch ulang saat tab berubah atau login berhasil
  useEffect(() => {
    if (loggedIn) fetchItems();
  }, [loggedIn, activeTab, fetchItems]);

  // --- Login ---
  const handleLogin = async () => {
    setLoginError('');
    if (!loginInput.trim()) {
      setLoginError('Masukkan ADMIN_KEY');
      return;
    }
    if (!apiUrl) {
      setLoginError('NEXT_PUBLIC_API_URL belum diatur');
      return;
    }

    // Verifikasi key dengan mencoba request yang butuh auth
    try {
      const res = await fetch(`${apiUrl}/education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': loginInput.trim(),
        },
        body: JSON.stringify({}),
      });

      // 401 = key salah, 400 = key benar tapi body salah (berarti auth lolos)
      if (res.status === 401) {
        setLoginError('ADMIN_KEY salah');
        return;
      }

      // Key valid (bisa 400 karena body kosong, atau 200)
      sessionStorage.setItem('admin_key', loginInput.trim());
      setAdminKey(loginInput.trim());
      setLoggedIn(true);
    } catch {
      setLoginError('Tidak bisa terhubung ke API');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_key');
    setAdminKey('');
    setLoggedIn(false);
    setLoginInput('');
  };

  // --- CRUD Operations ---
  const handleCreate = async (data: Record<string, unknown>) => {
    const res = await fetch(`${apiUrl}${tab.endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as Record<string, string>).message || `Error ${res.status}`);
    }
    setShowForm(false);
    setEditItem(null);
    await fetchItems();
  };

  const handleUpdate = async (data: Record<string, unknown>) => {
    if (!editItem) return;
    const res = await fetch(`${apiUrl}${tab.endpoint}/${editItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as Record<string, string>).message || `Error ${res.status}`);
    }
    setShowForm(false);
    setEditItem(null);
    await fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini?')) return;
    try {
      await fetch(`${apiUrl}${tab.endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });
      await fetchItems();
    } catch {
      alert('Gagal menghapus');
    }
  };

  // --- Render Login ---
  if (!loggedIn) {
    return (
      <div className="adm">
        <div className="adm-login">
          <h1>♠ Admin Panel</h1>
          <p style={{ color: '#a89f93' }}>Masukkan ADMIN_KEY untuk melanjutkan</p>

          <input
            type="password"
            placeholder="ADMIN_KEY"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
          />

          {loginError && <p className="adm-err">{loginError}</p>}

          <button type="button" className="adm-btn p" onClick={handleLogin}>
            Masuk
          </button>
        </div>
      </div>
    );
  }

  // --- Render Dashboard ---
  return (
    <div className="adm">
      {/* Top bar */}
      <div className="adm-topbar">
        <h1>♠ Admin Panel <span>Musyami Portfolio</span></h1>
        <button type="button" className="adm-btn" onClick={handleLogout}>
          Keluar
        </button>
      </div>

      {/* Tabs */}
      <div className="adm-tabs">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            className={i === activeTab ? 'act' : ''}
            onClick={() => { setActiveTab(i); setShowForm(false); setEditItem(null); }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="adm-toolbar">
        <span style={{ color: '#a89f93', fontSize: '0.85rem' }}>
          {loadingList ? 'Memuat...' : `${items.length} item`}
        </span>
        <button
          type="button"
          className="adm-btn p"
          onClick={() => { setEditItem(null); setShowForm(true); }}
        >
          + Tambah {tab.label}
        </button>
      </div>

      {/* Daftar item */}
      <div className="adm-list">
        {items.map((item) => (
          <div className="adm-item" key={item.id}>
            <div className="adm-item-info">
              <h3>{String(item[tab.titleKey] || item.id)}</h3>
              {tab.subtitleKey && item[tab.subtitleKey] ? (
                <p>{String(item[tab.subtitleKey])}</p>
              ) : null}
            </div>
            <div className="adm-item-actions">
              <button
                type="button"
                className="adm-btn"
                onClick={() => { setEditItem(item); setShowForm(true); }}
              >
                Edit
              </button>
              <button
                type="button"
                className="adm-btn d"
                onClick={() => handleDelete(item.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}

        {!loadingList && items.length === 0 && (
          <p style={{ color: '#a89f93', textAlign: 'center', padding: '32px 0' }}>
            Belum ada data. Klik &quot;+ Tambah&quot; untuk menambahkan.
          </p>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <AdminGenericForm
          title={editItem ? `Edit ${tab.label}` : `Tambah ${tab.label}`}
          fields={tab.fields}
          initialData={editItem ? (editItem as Record<string, unknown>) : undefined}
          onSubmit={editItem ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditItem(null); }}
          apiUrl={apiUrl}
          adminKey={adminKey}
        />
      )}
    </div>
  );
}
