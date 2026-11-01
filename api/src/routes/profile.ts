import { FastifyInstance } from 'fastify';
import { getSingle, saveSingle } from '../lib/db.js';
import { verifyAdminKey } from '../plugins/auth.js';
import {
  profileSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { Profile } from '../types/index.js';

export default async function profileRoutes(fastify: FastifyInstance) {
  // GET /profile
  fastify.get(
    '/profile',
    {
      schema: {
        tags: ['Profile'],
        summary: 'Ambil informasi profil pribadi',
        response: {
          200: profileSchema,
        },
      },
    },
    async (_request, reply) => {
      const profile = await getSingle<Profile>('profile');
      return reply.send(profile || {});
    }
  );

  // PUT /profile (Admin)
  fastify.put<{ Body: Partial<Profile> }>(
    '/profile',
    {
      preValidation: verifyAdminKey,
      schema: {
        tags: ['Profile'],
        summary: 'Perbarui data profil pribadi (Admin)',
        security: [{ AdminKeyAuth: [] }],
        body: {
          type: 'object',
          properties: profileSchema.properties,
        },
        response: {
          200: profileSchema,
          401: errorResponseSchema(401, 'Kunci admin tidak valid'),
        },
      },
    },
    async (request, reply) => {
      const existing = (await getSingle<Profile>('profile')) || ({} as Profile);
      const updated = await saveSingle<Profile>('profile', {
        ...existing,
        ...request.body,
      });
      return reply.send(updated);
    }
  );
}
