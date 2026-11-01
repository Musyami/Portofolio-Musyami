import { FastifyInstance } from 'fastify';
import fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { verifyAdminKey } from '../plugins/auth.js';
import { uploadResponseSchema, errorResponseSchema } from '../schemas/index.js';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // Maksimal 2 Megabyte

export default async function uploadRoutes(fastify: FastifyInstance) {
  const uploadDir = process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'uploads');

  // Pastikan folder upload ada
  await fs.mkdir(uploadDir, { recursive: true });

  fastify.post(
    '/uploads',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Uploads'],
        summary: 'Unggah file gambar (Admin, Max 2MB: JPG/PNG/WebP/SVG)',
        security: [{ AdminKeyAuth: [] }],
        consumes: ['multipart/form-data'],
        response: {
          201: uploadResponseSchema,
          400: errorResponseSchema(400, 'Format file atau ukuran tidak valid'),
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const data = await request.file();

      if (!data) {
        return reply.status(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Tidak ada berkas file yang diunggah',
        });
      }

      // Validasi tipe berkas
      if (!ALLOWED_MIME_TYPES.includes(data.mimetype)) {
        return reply.status(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Tipe file tidak didukung. Hanya diperbolehkan jpg, png, webp, dan svg',
        });
      }

      // Generate nama file unik
      const ext = path.extname(data.filename) || '.png';
      const cleanName = path.basename(data.filename, ext).replace(/[^a-zA-Z0-9_-]/g, '');
      const uniqueFilename = `${Date.now()}-${cleanName}${ext}`;
      const targetFilePath = path.join(uploadDir, uniqueFilename);

      // Tulis file ke disk
      let fileSize = 0;
      data.file.on('data', (chunk) => {
        fileSize += chunk.length;
        if (fileSize > MAX_FILE_SIZE) {
          data.file.destroy(new Error('LIMIT_FILE_SIZE'));
        }
      });

      try {
        await pipeline(data.file, createWriteStream(targetFilePath));
      } catch (err: any) {
        // Hapus file parsial jika gagal atau melebihi limit
        await fs.unlink(targetFilePath).catch(() => {});

        if (err.message === 'LIMIT_FILE_SIZE' || data.file.truncated) {
          return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Ukuran file melebihi batas maksimal 2MB',
          });
        }
        throw err;
      }

      return reply.status(201).send({
        success: true,
        url: `/uploads/${uniqueFilename}`,
        filename: uniqueFilename,
        size: fileSize,
      });
    }
  );
}
