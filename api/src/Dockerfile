# =============================================================================
# Dockerfile multi-stage untuk Musyami API (Fastify + TypeScript)
# Stage 1 (builder): install semua dependency dan compile TypeScript
# Stage 2 (runner):  hanya production dependency + hasil build
# =============================================================================

# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Salin file dependency dulu (supaya layer ini ter-cache)
COPY package.json package-lock.json ./

# Install semua dependency (termasuk devDependencies untuk tsc)
RUN npm ci

# Salin seluruh source code
COPY tsconfig.json ./
COPY src/ ./src/

# Compile TypeScript ke dist/
RUN npm run build

# Salin file seed JSON ke dist/seeds/ karena tsc tidak menyalinnya
RUN cp -r src/seeds dist/seeds


# --- Stage 2: Runtime ---
FROM node:20-alpine AS runner

# Label metadata
LABEL maintainer="Musyami" \
      description="Musyami Portfolio REST API"

WORKDIR /app

# Install wget untuk healthcheck (sudah ada di alpine, tapi pastikan)
RUN apk add --no-cache wget

# Salin file dependency
COPY package.json package-lock.json ./

# Install hanya production dependency
RUN npm ci --omit=dev && npm cache clean --force

# Salin hasil build dari stage builder
COPY --from=builder /app/dist ./dist

# Buat folder data dan uploads, set kepemilikan ke user non-root
RUN mkdir -p /app/data /app/uploads && \
    chown -R node:node /app/data /app/uploads /app/dist

# Gunakan user non-root bawaan Alpine (uid 1000)
USER node

# Port default (bisa di-override lewat env)
ENV PORT=3001
EXPOSE ${PORT}

# Healthcheck: cek endpoint /health setiap 30 detik
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/health || exit 1

# Jalankan server
CMD ["node", "dist/index.js"]
