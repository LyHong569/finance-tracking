# Base image using official lightweight Bun on Alpine
FROM oven/bun:1-alpine AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json bun.lock* yarn.lock* ./
RUN bun install --frozen-lockfile || bun install

# Development stage (used for local containerized dev with hot-reload)
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV PORT=3001
EXPOSE 3001
CMD ["bun", "run", "--hot", "src/index.ts"]

# Production runner stage
FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

USER bun
CMD ["bun", "run", "src/index.ts"]
