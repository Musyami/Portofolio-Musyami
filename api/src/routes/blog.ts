import { FastifyInstance } from 'fastify';
import { getAll, readCollection, createItem, updateItem, deleteItem } from '../lib/db.js';
import { verifyAdminKey } from '../plugins/auth.js';
import {
  blogPostSchema,
  createBlogPostBodySchema,
  idParamSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { BlogPost } from '../types/index.js';

export default async function blogRoutes(fastify: FastifyInstance) {
  // GET /blog
  fastify.get(
    '/blog',
    {
      schema: {
        tags: ['Blog'],
        summary: 'Ambil semua artikel blog',
        response: {
          200: {
            type: 'array',
            items: blogPostSchema,
          },
        },
      },
    },
    async (_request, reply) => {
      const posts = await getAll<BlogPost>('blog');
      return reply.send(posts);
    }
  );

  // GET /blog/:id - Bisa dicari dengan ID (mis. blg-1) maupun SLUG
  fastify.get<{ Params: { id: string } }>(
    '/blog/:id',
    {
      schema: {
        tags: ['Blog'],
        summary: 'Ambil artikel blog berdasarkan ID atau Slug',
        params: idParamSchema,
        response: {
          200: blogPostSchema,
          404: errorResponseSchema(404, 'Artikel blog tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const posts = await readCollection<BlogPost>('blog');
      const post = posts.find((p) => p.id === id || p.slug === id);
      if (!post) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Artikel blog dengan identifier "${id}" tidak ditemukan`,
        });
      }
      return reply.send(post);
    }
  );

  // POST /blog (Admin)
  fastify.post<{ Body: Partial<BlogPost> }>(
    '/blog',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Blog'],
        summary: 'Tambah artikel blog baru (Admin)',
        security: [{ AdminKeyAuth: [] }],
        body: createBlogPostBodySchema,
        response: {
          201: blogPostSchema,
          400: errorResponseSchema(400, 'Validasi input gagal'),
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const body = request.body;
      // Generate slug otomatis jika tidak disertakan
      const slug =
        body.slug ||
        (body.title || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

      const newPost = await createItem<Partial<BlogPost>>('blog', {
        ...body,
        slug,
      });
      return reply.status(201).send(newPost);
    }
  );

  // PUT /blog/:id (Admin)
  fastify.put<{ Params: { id: string }; Body: Partial<BlogPost> }>(
    '/blog/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Blog'],
        summary: 'Perbarui artikel blog (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        body: {
          type: 'object',
          properties: createBlogPostBodySchema.properties,
        },
        response: {
          200: blogPostSchema,
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Artikel blog tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const updated = await updateItem<BlogPost>('blog', id, request.body);
      if (!updated) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Artikel blog dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send(updated);
    }
  );

  // DELETE /blog/:id (Admin)
  fastify.delete<{ Params: { id: string } }>(
    '/blog/:id',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Blog'],
        summary: 'Hapus artikel blog (Admin)',
        security: [{ AdminKeyAuth: [] }],
        params: idParamSchema,
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              message: { type: 'string', example: 'Artikel blog berhasil dihapus' },
            },
          },
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
          404: errorResponseSchema(404, 'Artikel blog tidak ditemukan'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const success = await deleteItem<BlogPost>('blog', id);
      if (!success) {
        return reply.status(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Artikel blog dengan ID "${id}" tidak ditemukan`,
        });
      }
      return reply.send({
        success: true,
        message: `Artikel blog dengan ID "${id}" berhasil dihapus`,
      });
    }
  );
}
