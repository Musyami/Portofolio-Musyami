import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import path from 'node:path';
import fs from 'node:fs/promises';
import dotenv from 'dotenv';

import { initDb } from './lib/db.js';
import healthRoutes from './routes/health.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import educationRoutes from './routes/education.js';
import experienceRoutes from './routes/experience.js';
import achievementRoutes from './routes/achievements.js';
import blogRoutes from './routes/blog.js';
import socialRoutes from './routes/socials.js';
import profileRoutes from './routes/profile.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/uploads.js';

// Load environment variables
dotenv.config();

export async function buildApp(opts = {}): Promise<FastifyInstance> {
  // Inisialisasi folder data & seed data JSON
  await initDb();

  const fastify = Fastify({
    ajv: {
      customOptions: {
        strict: false,
      },
    },
    logger: process.env.NODE_ENV === 'test' ? false : {
      level: process.env.LOG_LEVEL || 'info',
    },
    ...opts,
  });

  // 1. CORS
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  await fastify.register(cors, {
    origin: corsOrigin.includes(',') ? corsOrigin.split(',').map((s) => s.trim()) : corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-admin-key'],
  });

  // 2. Rate Limit (untuk proteksi endpoint publik seperti /contact)
  await fastify.register(rateLimit, {
    global: false,
  });

  // 3. Multipart Upload
  await fastify.register(multipart, {
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB
    },
  });

  // 4. File Statis Upload
  const uploadDir = process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });
  await fastify.register(fastifyStatic, {
    root: uploadDir,
    prefix: '/uploads/',
    decorateReply: false,
  });

  // 5. Swagger / OpenAPI Documentation
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Musyami Portfolio REST API',
        description: 'REST API backend untuk portofolio interaktif tema kartu remi Musyami (Task 4 Part C).',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3001}`,
          description: 'Development Server',
        },
      ],
      components: {
        securitySchemes: {
          AdminKeyAuth: {
            type: 'apiKey',
            name: 'x-admin-key',
            in: 'header',
            description: 'Kunci otorisasi admin untuk operasi POST, PUT, dan DELETE.',
          },
        },
      },
    },
  });

  // Swagger UI di rute /docs
  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  // Penanganan Error Standar
  fastify.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: error.message,
      });
    }

    if (error.statusCode) {
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        error: error.name || 'Error',
        message: error.message,
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Terjadi kesalahan internal pada server',
    });
  });

  // Register seluruh rute API
  await fastify.register(healthRoutes);
  await fastify.register(projectRoutes);
  await fastify.register(skillRoutes);
  await fastify.register(educationRoutes);
  await fastify.register(experienceRoutes);
  await fastify.register(achievementRoutes);
  await fastify.register(blogRoutes);
  await fastify.register(socialRoutes);
  await fastify.register(profileRoutes);
  await fastify.register(contactRoutes);
  await fastify.register(uploadRoutes);

  return fastify;
}
