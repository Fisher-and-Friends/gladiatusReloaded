import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { getEnv } from '../utils/env';

const client = createClient({
  url: getEnv('TURSO_CONNECTION_URL', 'string'),
  authToken: getEnv('TURSO_AUTH_TOKEN', 'string'),
});

export const db = drizzle(client);
