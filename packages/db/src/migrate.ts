
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './db.js';

async function main() {
    console.log('Starting programmatic migration...');
    try {
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log('✅ Migrations completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
    process.exit(0);
}

main();
