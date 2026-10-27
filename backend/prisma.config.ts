import { config } from 'dotenv'
import type { PrismaConfig } from 'prisma/config'

// Configuration du CLI Prisma (generate, migrate). Depuis Prisma 7, le CLI ne lit plus .env tout seul. Seul un import
// de type vient de prisma/config : dans les images, le CLI est installé à part (/opt/prisma) et ce fichier doit se
// charger sans lui.
// Same files as src/config/env.ts: backend/.env, then the root .env
config({ path: ['.env', '../.env'], quiet: true })

export default {
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // Without DATABASE_URL, the local dev database, the same default as src/config/env.ts
  datasource: { url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/genealogy' },
} satisfies PrismaConfig
