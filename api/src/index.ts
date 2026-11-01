import { buildApp } from './app.js';

async function main() {
  const app = await buildApp();
  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || '0.0.0.0';

  try {
    await app.listen({ port, host });
    console.log(`♠ Server Musyami API berjalan di: http://${host}:${port}`);
    console.log(`♦ Dokumentasi Swagger aktif di: http://${host}:${port}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
