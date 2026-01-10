
import { db } from './db.js';
import { sql } from 'drizzle-orm';

async function testConfig() {
    console.log('Testing DB Access...');
    try {
        const res = await db.execute(sql`select version()`);
        console.log('✅ Success!', res);
    } catch (e) {
        console.error('❌ Failed:', e);
    }
}

testConfig();
