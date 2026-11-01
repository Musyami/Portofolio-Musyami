import { FastifyInstance } from 'fastify';
import { getAll, getById, createItem, updateItem, deleteItem } from '../lib/db.js';
import { verifyAdminKey } from '../plugins/auth.js';
import {
  projectSchema,
  createProjectBodySchema,
  idParamSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { Project } from '../types/index.js';

export default async function projectRoutes(fastify: FastifyInstance) {
  // GET /projects - Ambil semua proyek
  fastify.get(
    '/projects',
    {
      schema: {
        tags: ['Projects'],
        summary: 'Ambil semua data proyek',
        description: 'Mengembalikan daftar semua proyek kartu portofolio.',
        response: {
          200: {
            type: 'array',
            items: projectSchema,
          },
        },
      },
    },
    async (_request, reply) => {
      const projects = await getAll<Project>('projects');
      return reply.send(projects);
    }
  );

  // GET /projects/:id - Ambil satu proyek berdasarkan ID
  fastify.get<{ Params: { id: string } }>(
    '/projects/:id',
    {
      schema: {
        tags: ['Projects'],
        summary: 'Ambil proyek berdasarkan ID',
        params: idParamSchema,
        response: {
          200: projectSchema,
          404: errorResponseSchema(404, 'Project dengan ID prj-999 tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const project = await getById<Project>('projects', id);
      if (!project) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Project dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(project);
    }
  );

  // POST /projects - Buat proyek baru (Perlu Admin Key)
  fastify.post<{ Body: Partial<Project> }>(
    '/projects',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Projects'],
        summary: 'Tambah proyek baru (Admin)',
        security: [{ AdminKeyAuth: [] }],
        body: createProjectBodySchema,
        response: {
          201: projectSchema,
          400: errorResponseSchema(400, 'Validasi input gagal'),
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const newProject = await createItem<Partial<Project>>('projects', request.body);
      return reply.status(201).send(newProject);
    }
  );

  // PUT /projects/:id - Perbarui proyek (Perlu Admin Key)
  fastify.put<{ Params: { id: string }; Body: Partial<Project> }>(
    '/projects/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Projects'],
        summary: 'Perbarui proyek (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        body: {
          type: 'object',
          properties: createProjectBodySchema.properties,
        },
        response: {
          200: projectSchema,
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Project tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const updated = await updateItem<Project>('projects', id, request.body);
      if (!updated) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Project dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(updated);
    }
  );

  // DELETE /projects/:id - Hapus proyek (Perlu Admin Key)
  fastify.delete<{ Params: { id: string } }>(
    '/projects/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Projects'],
        summary: 'Hapus proyek (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              message: { type: 'string', example: 'Project berhasil dihapus' },
            },
          },
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Project tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const success = await deleteItem<Project>('projects', id);
      if (!success) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Project dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send({
        success: true,
        message: `Project dengan ID "${id}" berhasil dihapus`,
      });
    }
  );
}
