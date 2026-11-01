import { FastifyInstance } from 'fastify';
import { getAll, getById, createItem, updateItem, deleteItem } from '../lib/db.js';
import { verifyAdminKey } from '../plugins/auth.js';
import {
  educationSchema,
  createEducationBodySchema,
  idParamSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { Education } from '../types/index.js';

export default async function educationRoutes(fastify: FastifyInstance) {
  // GET /education
  fastify.get(
    '/education',
    {
      schema: {
        tags: ['Education'],
        summary: 'Ambil semua riwayat pendidikan',
        response: {
          200: {
            type: 'array',
            items: educationSchema,
          },
        },
      },
    },
    async (_request, reply) => {
      const edu = await getAll<Education>('education');
      return reply.send(edu);
    }
  );

  // GET /education/:id
  fastify.get<{ Params: { id: string } }>(
    '/education/:id',
    {
      schema: {
        tags: ['Education'],
        summary: 'Ambil pendidikan berdasarkan ID',
        params: idParamSchema,
        response: {
          200: educationSchema,
          404: errorResponseSchema(404, 'Education tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const edu = await getById<Education>('education', id);
      if (!edu) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Pendidikan dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(edu);
    }
  );

  // POST /education (Admin)
  fastify.post<{ Body: Partial<Education> }>(
    '/education',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Education'],
        summary: 'Tambah pendidikan baru (Admin)',
        security: [{ AdminKeyAuth: [] }],
        body: createEducationBodySchema,
        response: {
          201: educationSchema,
          400: errorResponseSchema(400, 'Validasi input gagal'),
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const newEdu = await createItem<Partial<Education>>('education', request.body);
      return reply.status(201).send(newEdu);
    }
  );

  // PUT /education/:id (Admin)
  fastify.put<{ Params: { id: string }; Body: Partial<Education> }>(
    '/education/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Education'],
        summary: 'Perbarui data pendidikan (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        body: {
          type: 'object',
          properties: createEducationBodySchema.properties,
        },
        response: {
          200: educationSchema,
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Education tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const updated = await updateItem<Education>('education', id, request.body);
      if (!updated) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Pendidikan dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(updated);
    }
  );

  // DELETE /education/:id (Admin)
  fastify.delete<{ Params: { id: string } }>(
    '/education/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Education'],
        summary: 'Hapus data pendidikan (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              message: { type: 'string', example: 'Pendidikan berhasil dihapus' },
            },
          },
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Education tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const success = await deleteItem<Education>('education', id);
      if (!success) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Pendidikan dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send({
        success: true,
        message: `Pendidikan dengan ID "${id}" berhasil dihapus`,
      });
    }
  );
}
