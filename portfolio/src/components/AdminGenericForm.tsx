/**
 * Komponen form generik untuk admin CRUD.
 * Mendukung field: text, textarea, number, date, select, image upload,
 * array of strings (bullets/tags), dan array of objects (buttons).
 */
'use client';

import { useState, useRef } from 'react';

// --- Definisi tipe field ---
export interface FieldDef {
  key: string;        // Nama property di objek data
  label: string;      // Label tampilan
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'image' | 'tags' | 'bullets' | 'buttons' | 'content';
  required?: boolean;
  placeholder?: string;
  options?: string[]; // Untuk type 'select'
  min?: number;
  max?: number;
}

interface AdminGenericFormProps {
  title: string;
  fields: FieldDef[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
  apiUrl: string;       // URL dasar API (untuk upload gambar)
  adminKey: string;     // Admin key untuk auth
}

export default function AdminGenericForm({
  title,
  fields,
  initialData,
  onSubmit,
  onCancel,
  apiUrl,
  adminKey,
}: AdminGenericFormProps) {
  // Inisialisasi state form dari initialData atau default kosong
  const [form, setForm] = useState<Record<string, unknown>>(() => {
    const init: Record<string, unknown> = {};
    for (const f of fields) {
      if (initialData && initialData[f.key] !== undefined) {
        init[f.key] = initialData[f.key];
      } else {
        // Default per tipe
        switch (f.type) {
          case 'number': init[f.key] = f.min ?? 0; break;
          case 'tags':
          case 'bullets':
          case 'content': init[f.key] = []; break;
          case 'buttons': init[f.key] = []; break;
          default: init[f.key] = '';
        }
      }
    }
    return init;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Update satu field
  const set = (key: string, val: unknown) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  // Handler submit
  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  // Upload gambar ke API
  const uploadImage = async (file: File, fieldKey: string) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${apiUrl}/uploads`, {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: formData,
      });
      if (!res.ok) throw new Error('Gagal mengunggah gambar');
      const data = await res.json();
      set(fieldKey, data.url || data.filename);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gagal mengunggah');
    }
  };

  // --- Render per tipe field ---
  const renderField = (f: FieldDef) => {
    const val = form[f.key];

    switch (f.type) {
      case 'text':
      case 'date':
        return (
          <div className="adm-field" key={f.key}>
            <label>{f.label}{f.required && ' *'}</label>
            <input
              type={f.type === 'date' ? 'date' : 'text'}
              value={(val as string) || ''}
              placeholder={f.placeholder}
              required={f.required}
              onChange={(e) => set(f.key, e.target.value)}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="adm-field" key={f.key}>
            <label>{f.label}{f.required && ' *'}</label>
            <textarea
              value={(val as string) || ''}
              placeholder={f.placeholder}
              required={f.required}
              onChange={(e) => set(f.key, e.target.value)}
            />
          </div>
        );

      case 'number':
        return (
          <div className="adm-field" key={f.key}>
            <label>{f.label}{f.required && ' *'}</label>
            <input
              type="number"
              value={(val as number) ?? 0}
              min={f.min}
              max={f.max}
              onChange={(e) => set(f.key, Number(e.target.value))}
            />
          </div>
        );

      case 'select':
        return (
          <div className="adm-field" key={f.key}>
            <label>{f.label}</label>
            <select
              value={(val as string) || ''}
              onChange={(e) => set(f.key, e.target.value)}
            >
              <option value="">-- Pilih --</option>
              {f.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        );

      case 'image':
        return (
          <div className="adm-field" key={f.key}>
            <label>{f.label}</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, f.key);
              }}
            />
            {typeof val === 'string' && val.length > 0 ? (
              <img
                className="adm-img-preview"
                src={val.startsWith('http') ? val : `${apiUrl}/uploads/${val}`}
                alt="Preview"
              />
            ) : null}
          </div>
        );

      case 'tags': {
        // Array string dipisah koma
        const arr = Array.isArray(val) ? val as string[] : [];
        return (
          <div className="adm-field" key={f.key}>
            <label>{f.label} (pisahkan dengan koma)</label>
            <input
              type="text"
              value={arr.join(', ')}
              placeholder={f.placeholder || 'contoh: React, TypeScript'}
              onChange={(e) => {
                set(f.key, e.target.value.split(',').map((s) => s.trim()).filter(Boolean));
              }}
            />
          </div>
        );
      }

      case 'bullets':
      case 'content': {
        // Array string — satu per baris
        const items = Array.isArray(val) ? val as string[] : [];
        return (
          <div className="adm-field" key={f.key}>
            <label>{f.label} (satu per baris)</label>
            <textarea
              value={items.join('\n')}
              placeholder={f.placeholder || 'Satu item per baris'}
              rows={4}
              onChange={(e) => {
                set(f.key, e.target.value.split('\n').filter((s) => s.trim().length > 0));
              }}
            />
          </div>
        );
      }

      case 'buttons': {
        // Array {label, url}
        const btns = Array.isArray(val) ? (val as Array<{ label: string; url: string }>) : [];
        return (
          <div className="adm-field" key={f.key}>
            <label>{f.label}</label>
            <div className="adm-btns-list">
              {btns.map((btn, i) => (
                <div className="adm-btns-row" key={i}>
                  <input
                    type="text"
                    value={btn.label}
                    placeholder="Label (mis. Lihat di GitHub)"
                    onChange={(e) => {
                      const newBtns = [...btns];
                      newBtns[i] = { ...newBtns[i], label: e.target.value };
                      set(f.key, newBtns);
                    }}
                  />
                  <input
                    type="text"
                    value={btn.url}
                    placeholder="URL"
                    onChange={(e) => {
                      const newBtns = [...btns];
                      newBtns[i] = { ...newBtns[i], url: e.target.value };
                      set(f.key, newBtns);
                    }}
                  />
                  <button
                    type="button"
                    className="adm-btn d"
                    onClick={() => {
                      set(f.key, btns.filter((_, j) => j !== i));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="adm-btn"
              onClick={() => set(f.key, [...btns, { label: '', url: '' }])}
            >
              + Tambah Tombol
            </button>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="adm-modal-overlay" onClick={onCancel}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

        {error && <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{error}</p>}

        {fields.map(renderField)}

        <div className="adm-modal-footer">
          <button type="button" className="adm-btn" onClick={onCancel} disabled={loading}>
            Batal
          </button>
          <button type="button" className="adm-btn p" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
}
