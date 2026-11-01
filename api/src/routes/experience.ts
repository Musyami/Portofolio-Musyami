import { FastifyInstance } from 'fastify';
import { getAll, getById, createItem, updateItem, deleteItem } from '../lib/db.js';
import { verifyAdminKey } from '../plugins/auth.js';
import {
  experienceSchema,
  createExperienceBodySchema,
  idParamSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { Experience } from '../types/index.js';

export default async function experienceRoutes(fastify: FastifyInstance) {
  // GET /experience
  fastify.get(
    '/experience',
    {
      schema: {
        tags: ['Experience'],
        summary: 'Ambil semua pengalaman',
        response: {
          200: {
            type: 'array',
            items: experienceSchema,
          },
        },
      },
    },
    async (_request, reply) => {
      const exp = await getAll<Experience>('experience');
      return reply.send(exp);
    }
  );

  // GET /experience/:id
  fastify.get<{ Params: { id: string } }>(
    '/experience/:id',
    {
      schema: {
        tags: ['Experience'],
        summary: 'Ambil pengalaman berdasarkan ID',
        params: idParamSchema,
        response: {
          200: experienceSchema,
          404: errorResponseSchema(404, 'Experience tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const exp = await getById<Experience>('experience', id);
      if (!exp) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Pengalaman dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(exp);
    }
  );

  // POST /experience (Admin)
  fastify.post<{ Body: Partial<Experience> }>(
    '/experience',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Experience'],
        summary: 'Tambah pengalaman baru (Admin)',
        security: [{ AdminKeyAuth: [] }],
        body: createExperienceBodySchema,
        response: {
          201: experienceSchema,
          400: errorResponseSchema(400, 'Validasi input gagal'),
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const newExp = await createItem<Partial<Experience>>('experience', request.body);
      return reply.status(201).send(newExp);
    }
  );

  // PUT /experience/:id (Admin)
  fastify.put<{ Params: { id: string }; Body: Partial<Experience> }>(
    '/experience/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Experience'],
        summary: 'Perbarui pengalaman (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        body: {
          type: 'object',
          properties: createExperienceBodySchema.properties,
        },
        response: {
          200: experienceSchema,
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Experience tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const updated = await updateItem<Experience>('experience', id, request.body);
      if (!updated) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Pengalaman dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(updated);
    }
  );

  // DELETE /experience/:id (Admin)
  fastify.delete<{ Params: { id: string } }>(
    '/experience/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Experience'],
        summary: 'Hapus pengalaman (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              message: { type: 'string', example: 'Pengalaman berhasil dihapus' },
            },
          },
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Experience tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const success = await deleteItem<Experience>('experience', id);
      if (!success) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Pengalaman dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send({
        success: true,
        message: `Pengalaman dengan ID "${id}" berhasil dihapus`,
      });
    }
  );
}
