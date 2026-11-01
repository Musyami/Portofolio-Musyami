import { FastifyInstance } from 'fastify';
import { getAll, getById, createItem, updateItem, deleteItem } from '../lib/db.js';
import { verifyAdminKey } from '../plugins/auth.js';
import {
  socialSchema,
  createSocialBodySchema,
  idParamSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { Social } from '../types/index.js';

export default async function socialRoutes(fastify: FastifyInstance) {
  // GET /socials
  fastify.get(
    '/socials',
    {
      schema: {
        tags: ['Socials'],
        summary: 'Ambil semua akun media sosial',
        response: {
          200: {
            type: 'array',
            items: socialSchema,
          },
        },
      },
    },
    async (_request, reply) => {
      const socials = await getAll<Social>('socials');
      return reply.send(socials);
    }
  );

  // GET /socials/:id
  fastify.get<{ Params: { id: string } }>(
    '/socials/:id',
    {
      schema: {
        tags: ['Socials'],
        summary: 'Ambil akun media sosial berdasarkan ID',
        params: idParamSchema,
        response: {
          200: socialSchema,
          404: errorResponseSchema(404, 'Akun sosial tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const social = await getById<Social>('socials', id);
      if (!social) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Media sosial dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(social);
    }
  );

  // POST /socials (Admin)
  fastify.post<{ Body: Partial<Social> }>(
    '/socials',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Socials'],
        summary: 'Tambah akun media sosial baru (Admin)',
        security: [{ AdminKeyAuth: [] }],
        body: createSocialBodySchema,
        response: {
          201: socialSchema,
          400: errorResponseSchema(400, 'Validasi input gagal'),
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const newSocial = await createItem<Partial<Social>>('socials', request.body);
      return reply.status(201).send(newSocial);
    }
  );

  // PUT /socials/:id (Admin)
  fastify.put<{ Params: { id: string }; Body: Partial<Social> }>(
    '/socials/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Socials'],
        summary: 'Perbarui akun media sosial (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        body: {
          type: 'object',
          properties: createSocialBodySchema.properties,
        },
        response: {
          200: socialSchema,
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Media sosial tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const updated = await updateItem<Social>('socials', id, request.body);
      if (!updated) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Media sosial dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(updated);
    }
  );

  // DELETE /socials/:id (Admin)
  fastify.delete<{ Params: { id: string } }>(
    '/socials/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Socials'],
        summary: 'Hapus akun media sosial (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              message: { type: 'string', example: 'Media sosial berhasil dihapus' },
            },
          },
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Media sosial tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const success = await deleteItem<Social>('socials', id);
      if (!success) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Media sosial dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send({
        success: true,
        message: `Media sosial dengan ID "${id}" berhasil dihapus`,
      });
    }
  );
}
