import { defineConfig } from 'drizzle-kit';

import { env } from './src/common/utils/env-config';

export default defineConfig({
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
  schema: './src/common/databases/schema.ts',
});
