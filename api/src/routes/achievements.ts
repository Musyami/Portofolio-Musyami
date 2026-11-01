import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Middleware untuk memverifikasi header `x-admin-key`.
 * Menolak dengan status 401 jika header tidak sesuai dengan env ADMIN_KEY.
 */
export async function verifyAdminKey(request: FastifyRequest, reply: FastifyReply) {
  const adminKey = process.env.ADMIN_KEY || 'musyami-secret-key-2026';
  const providedKey = request.headers['x-admin-key'];

  if (!providedKey || providedKey !== adminKey) {
    return reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Kunci admin tidak valid atau tidak disertakan pada header x-admin-key',
    });
  }
}
