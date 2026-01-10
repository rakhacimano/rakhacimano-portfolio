import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
// @ts-ignore
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || '';
console.log(`[DB] Connection String length: ${connectionString.length}`);

const client = postgres(connectionString, {
    ssl: { rejectUnauthorized: false },
    prepare: false, // Required for Supabase Transaction connection pooler (port 6543)
});

export const db = drizzle(client, { schema });

