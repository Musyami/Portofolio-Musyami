/**
 * Konfigurasi Vitest untuk Musyami API.
 * File postcss.config.mjs kosong ada di folder ini untuk mencegah
 * Vite mencari config PostCSS di parent directory.
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Jalankan test dari folder src/__tests__
    include: ['src/__tests__/**/*.test.ts'],
  },
});
