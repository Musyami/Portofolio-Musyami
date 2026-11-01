import { FastifyInstance } from 'fastify';
import nodemailer from 'nodemailer';
import { readCollection, writeCollection } from '../lib/db.js';
import {
  contactBodySchema,
  contactResponseSchema,
  errorResponseSchema,
} from '../schemas/index.js';
import { ContactMessage } from '../types/index.js';

interface ContactBody {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export default async function contactRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ContactBody }>(
    '/contact',
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '1 minute',
        },
      },
      schema: {
        tags: ['Contact'],
        summary: 'Kirim pesan kontak (The Joker Card)',
        description: 'Menyimpan pesan ke messages.json dan mengirim notifikasi email via SMTP jika dikonfigurasi.',
        body: contactBodySchema,
        response: {
          200: contactResponseSchema,
          400: errorResponseSchema(400, 'Validasi nama, email, atau pesan tidak sesuai'),
        },
      },
    },
    async (request, reply) => {
      const { name, email, message, honeypot } = request.body;

      // Proteksi Bot: Jika kolom honeypot terisi, abaikan diam-diam
      if (honeypot && honeypot.trim() !== '') {
        request.log.warn({ ip: request.ip }, 'Spam bot terdeteksi via honeypot');
        return reply.send({
          success: true,
          message: 'Pesan berhasil dikirim dan tersimpan.',
        });
      }

      // Simpan ke messages.json
      const messages = await readCollection<ContactMessage>('messages');
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
        ip: request.ip,
      };
      messages.push(newMessage);
      await writeCollection('messages', messages);

      // Pengiriman email via Nodemailer (Opsional jika SMTP dikonfigurasi)
      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const mailTo = process.env.MAIL_TO || 'musyami.20@gmail.com';

      if (smtpHost && smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          await transporter.sendMail({
            from: `"Musyami Portfolio" <${smtpUser}>`,
            to: mailTo,
            replyTo: email,
            subject: `♠ Pesan Baru dari ${name} - Musyami Portfolio`,
            text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
            html: `
              <h3>Pesan Baru dari Portofolio Musyami</h3>
              <p><b>Nama:</b> ${name}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Pesan:</b></p>
              <p style="white-space: pre-wrap; background: #f4f4f4; padding: 12px; border-radius: 6px;">${message}</p>
            `,
          });
          request.log.info({ email, name }, 'Notifikasi email berhasil terkirim via SMTP');
        } catch (emailErr) {
          // Tetap sukses dan catat error ke log
          request.log.error(emailErr, 'Gagal mengirim email notifikasi kontak via SMTP');
        }
      } else {
        request.log.info('SMTP tidak dikonfigurasi, pesan hanya disimpan ke messages.json');
      }

      return reply.send({
        success: true,
        message: 'Pesan berhasil dikirim dan tersimpan.',
      });
    }
  );
}
