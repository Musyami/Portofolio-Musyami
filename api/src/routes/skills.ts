import { FastifyInstance } from 'fastify';
import { getAll, getById, createItem, updateItem, deleteItem } from '../lib/db.js';
import { verifyAdminKey } from '../plugins/auth.js';
import {
  skillSchema,
  createSkillBodySchema,
  idParamSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { Skill } from '../types/index.js';

export default async function skillRoutes(fastify: FastifyInstance) {
  // GET /skills
  fastify.get(
    '/skills',
    {
      schema: {
        tags: ['Skills'],
        summary: 'Ambil semua data keterampilan',
        description: 'Mengembalikan daftar seluruh keahlian kartu remi.',
        response: {
          200: {
            type: 'array',
            items: skillSchema,
          },
        },
      },
    },
    async (_request, reply) => {
      const skills = await getAll<Skill>('skills');
      return reply.send(skills);
    }
  );

  // GET /skills/:id
  fastify.get<{ Params: { id: string } }>(
    '/skills/:id',
    {
      schema: {
        tags: ['Skills'],
        summary: 'Ambil skill berdasarkan ID',
        params: idParamSchema,
        response: {
          200: skillSchema,
          404: errorResponseSchema(404, 'Skill tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const skill = await getById<Skill>('skills', id);
      if (!skill) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Skill dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(skill);
    }
  );

  // POST /skills (Admin)
  fastify.post<{ Body: Partial<Skill> }>(
    '/skills',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Skills'],
        summary: 'Tambah skill baru (Admin)',
        security: [{ AdminKeyAuth: [] }],
        body: createSkillBodySchema,
        response: {
          201: skillSchema,
          400: errorResponseSchema(400, 'Validasi input gagal'),
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const newSkill = await createItem<Partial<Skill>>('skills', request.body);
      return reply.status(201).send(newSkill);
    }
  );

  // PUT /skills/:id (Admin)
  fastify.put<{ Params: { id: string }; Body: Partial<Skill> }>(
    '/skills/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Skills'],
        summary: 'Perbarui skill (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        body: {
          type: 'object',
          properties: createSkillBodySchema.properties,
        },
        response: {
          200: skillSchema,
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Skill tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const updated = await updateItem<Skill>('skills', id, request.body);
      if (!updated) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Skill dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(updated);
    }
  );

  // DELETE /skills/:id (Admin)
  fastify.delete<{ Params: { id: string } }>(
    '/skills/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Skills'],
        summary: 'Hapus skill (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              message: { type: 'string', example: 'Skill berhasil dihapus' },
            },
          },
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Skill tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const success = await deleteItem<Skill>('skills', id);
      if (!success) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Skill dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send({
        success: true,
        message: `Skill dengan ID "${id}" berhasil dihapus`,
      });
    }
  );
}
