
import { db } from './db';
import { sql } from 'drizzle-orm';
import dns from 'dns';

// DNS hack removed

async function verifyTables() {
    console.log('Attempting to connect to DB after DNS tweak...');
    try {
        const result = await db.execute(sql`SELECT version();`);
        console.log('Connection successful:', result);

        const tables = await db.execute(sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public';
        `);
        console.log('Tables found:', tables);
    } catch (error: any) {
        console.error('CONNECTION ERROR:', {
            message: error.message,
            code: error.code,
            details: error
        });
    }
    process.exit(0);
}

verifyTables();
