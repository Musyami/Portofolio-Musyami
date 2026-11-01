import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '../app.js';

describe('Musyami REST API Integration Tests', () => {
  let app: FastifyInstance;
  const adminHeaders = {
    'x-admin-key': process.env.ADMIN_KEY || 'musyami-secret-key-2026',
  };

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  // 1. Healthcheck
  it('GET /health mengembalikan status 200 ok', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
  });

  // 2. Swagger Docs
  it('GET /docs mengembalikan status 200 untuk Swagger UI', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/docs/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
  });

  // 3. Projects - GET Sukses
  it('GET /projects mengembalikan list proyek dari seed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects',
    });

    expect(response.statusCode).toBe(200);
    const projects = response.json();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty('id');
    expect(projects[0]).toHaveProperty('title');
  });

  // 4. Test Error 404: Entitas tidak ditemukan
  it('GET /projects/:id mengembalikan 404 jika ID tidak ditemukan', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/projects/prj-tidak-ada-999',
    });

    expect(response.statusCode).toBe(404);
    const body = response.json();
    expect(body.error).toBe('Not Found');
    expect(body.message).toContain('tidak ditemukan');
  });

  it('GET /skills/:id mengembalikan 404 jika ID tidak ada', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/skills/skl-tidak-ada-999',
    });

    expect(response.statusCode).toBe(404);
    const body = response.json();
    expect(body.error).toBe('Not Found');
  });

  // 5. Test Error 401: POST tanpa admin key
  it('POST /projects mengembalikan 401 jika x-admin-key tidak disertakan', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/projects',
      payload: {
        title: 'Proyek Rahasia',
      },
    });

    expect(response.statusCode).toBe(401);
    const body = response.json();
    expect(body.error).toBe('Unauthorized');
  });

  // 6. Test Error 400: Validasi Schema gagal (kurang field required)
  it('POST /projects mengembalikan 400 jika payload tidak valid', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/projects',
      headers: adminHeaders,
      payload: {
        // Hilang: description, tags, category, caseStudy
        title: 'P',
      },
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body.error).toBe('Bad Request');
    expect(body.message).toBeDefined();
  });

  // 7. Test Error 400 pada Form Kontak (format email salah)
  it('POST /contact mengembalikan 400 jika format email salah', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/contact',
      payload: {
        name: 'Budi',
        email: 'bukan-email-valid',
        message: 'Halo Rasya',
      },
    });

    expect(response.statusCode).toBe(400);
    const body = response.json();
    expect(body.error).toBe('Bad Request');
  });

  // 8. CRUD Lengkap Skill (POST -> GET -> PUT -> DELETE)
  it('Mendukung siklus CRUD lengkap pada resource skills dengan admin key', async () => {
    // CREATE
    const createRes = await app.inject({
      method: 'POST',
      url: '/skills',
      headers: adminHeaders,
      payload: {
        name: 'Rust Lang',
        description: 'Sistem memori aman',
        level: 45,
        category: 'Bahasa Pemrograman',
        suit: '♠',
      },
    });
    expect(createRes.statusCode).toBe(201);
    const created = createRes.json();
    expect(created.id).toBeDefined();
    expect(created.name).toBe('Rust Lang');

    // READ
    const getRes = await app.inject({
      method: 'GET',
      url: `/skills/${created.id}`,
    });
    expect(getRes.statusCode).toBe(200);
    expect(getRes.json().name).toBe('Rust Lang');

    // UPDATE
    const updateRes = await app.inject({
      method: 'PUT',
      url: `/skills/${created.id}`,
      headers: adminHeaders,
      payload: {
        level: 60,
      },
    });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.json().level).toBe(60);

    // DELETE
    const deleteRes = await app.inject({
      method: 'DELETE',
      url: `/skills/${created.id}`,
      headers: adminHeaders,
    });
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.json().success).toBe(true);

    // VERIFY DELETED (404)
    const verifyRes = await app.inject({
      method: 'GET',
      url: `/skills/${created.id}`,
    });
    expect(verifyRes.statusCode).toBe(404);
  });

  // 9. Contact - Valid submission & Honeypot
  it('POST /contact sukses dengan data valid', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/contact',
      payload: {
        name: 'Rasya Penguji',
        email: 'penguji@example.com',
        message: 'Halo, saya tertarik dengan portofolio kamu!',
      },
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.success).toBe(true);
  });

  it('POST /contact menangani honeypot bot secara aman tanpa error', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/contact',
      payload: {
        name: 'Spam Bot',
        email: 'bot@spam.com',
        message: 'Spam spam spam',
        honeypot: 'http://spam-link.com',
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().success).toBe(true);
  });

  // 10. Verifikasi endpoint GET untuk section lainnya
  it('GET /education, /experience, /achievements, /blog, /socials, /profile berjalan normal', async () => {
    const [edu, exp, achv, blog, soc, prof] = await Promise.all([
      app.inject({ method: 'GET', url: '/education' }),
      app.inject({ method: 'GET', url: '/experience' }),
      app.inject({ method: 'GET', url: '/achievements' }),
      app.inject({ method: 'GET', url: '/blog' }),
      app.inject({ method: 'GET', url: '/socials' }),
      app.inject({ method: 'GET', url: '/profile' }),
    ]);

    expect(edu.statusCode).toBe(200);
    expect(exp.statusCode).toBe(200);
    expect(achv.statusCode).toBe(200);
    expect(blog.statusCode).toBe(200);
    expect(soc.statusCode).toBe(200);
    expect(prof.statusCode).toBe(200);
  });
});
