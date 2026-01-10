import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let _db: PostgresJsDatabase<typeof schema> | null = null;

export function getDb(): PostgresJsDatabase<typeof schema> {
    if (!_db) {
        const connectionString = process.env.DATABASE_URL;

        if (!connectionString) {
            throw new Error('DATABASE_URL is missing in environment variables');
        }

        const client = postgres(connectionString, {
            ssl: { rejectUnauthorized: false },
            prepare: false, // Required for Supabase Transaction connection pooler (port 6543)
        });

        _db = drizzle(client, { schema });
    }
    return _db;
}

// Re-export for backwards compatibility (lazily initialized)
export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
    get(_, prop) {
        return (getDb() as any)[prop];
    }
});
