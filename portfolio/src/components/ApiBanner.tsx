/**
 * Banner kecil yang muncul jika API tidak terhubung.
 * Ditampilkan di atas halaman sebagai notifikasi.
 */
'use client';

import { useEffect, useState } from 'react';

export default function ApiBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Cek apakah API bisa dihubungi dari sisi client
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setShow(true);
      return;
    }

    fetch(`${apiUrl}/health`, { signal: AbortSignal.timeout(4000) })
      .then((res) => {
        if (!res.ok) setShow(true);
      })
      .catch(() => setShow(true));
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      style={{
        background: 'rgba(26, 24, 22, 0.85)',
        color: '#c9a84c',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '0.82rem',
        fontFamily: 'var(--font-inter), sans-serif',
        borderBottom: '1px solid rgba(201, 168, 76, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 9999,
      }}
    >
      ⚠ API tidak terhubung — menampilkan data cadangan.
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label="Tutup banner"
        style={{
          marginLeft: 12,
          background: 'none',
          border: 'none',
          color: '#c9a84c',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        ✕
      </button>
    </div>
  );
}
