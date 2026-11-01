import { FastifyInstance } from 'fastify';
import { getAll, getById, createItem, updateItem, deleteItem } from '../lib/db.js';
import { verifyAdminKey } from '../plugins/auth.js';
import {
  achievementSchema,
  createAchievementBodySchema,
  idParamSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { Achievement } from '../types/index.js';

export default async function achievementRoutes(fastify: FastifyInstance) {
  // GET /achievements
  fastify.get(
    '/achievements',
    {
      schema: {
        tags: ['Achievements'],
        summary: 'Ambil semua data prestasi/penghargaan',
        response: {
          200: {
            type: 'array',
            items: achievementSchema,
          },
        },
      },
    },
    async (_request, reply) => {
      const achv = await getAll<Achievement>('achievements');
      return reply.send(achv);
    }
  );

  // GET /achievements/:id
  fastify.get<{ Params: { id: string } }>(
    '/achievements/:id',
    {
      schema: {
        tags: ['Achievements'],
        summary: 'Ambil prestasi berdasarkan ID',
        params: idParamSchema,
        response: {
          200: achievementSchema,
          404: errorResponseSchema(404, 'Prestasi tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const achv = await getById<Achievement>('achievements', id);
      if (!achv) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Prestasi dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(achv);
    }
  );

  // POST /achievements (Admin)
  fastify.post<{ Body: Partial<Achievement> }>(
    '/achievements',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Achievements'],
        summary: 'Tambah prestasi baru (Admin)',
        security: [{ AdminKeyAuth: [] }],
        body: createAchievementBodySchema,
        response: {
          201: achievementSchema,
          400: errorResponseSchema(400, 'Validasi input gagal'),
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const newAchv = await createItem<Partial<Achievement>>('achievements', request.body);
      return reply.status(201).send(newAchv);
    }
  );

  // PUT /achievements/:id (Admin)
  fastify.put<{ Params: { id: string }; Body: Partial<Achievement> }>(
    '/achievements/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Achievements'],
        summary: 'Perbarui data prestasi (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        body: {
          type: 'object',
          properties: createAchievementBodySchema.properties,
        },
        response: {
          200: achievementSchema,
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Prestasi tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const updated = await updateItem<Achievement>('achievements', id, request.body);
      if (!updated) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Prestasi dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(updated);
    }
  );

  // DELETE /achievements/:id (Admin)
  fastify.delete<{ Params: { id: string } }>(
    '/achievements/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Achievements'],
        summary: 'Hapus data prestasi (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              message: { type: 'string', example: 'Prestasi berhasil dihapus' },
            },
          },
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Prestasi tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const success = await deleteItem<Achievement>('achievements', id);
      if (!success) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Prestasi dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send({
        success: true,
        message: `Prestasi dengan ID "${id}" berhasil dihapus`,
      });
    }
  );
}
