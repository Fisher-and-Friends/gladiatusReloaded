import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { getEnv } from './src/utils/env';
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: getEnv('TURSO_CONNECTION_URL', 'string'),
    authToken: getEnv('TURSO_AUTH_TOKEN', 'string'),
  },
});
