
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './packages/db/src/schema'; // Adjusted path
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/api/.env' });

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined');
    process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });

const check = async () => {
    try {
        const users = await db.select().from(schema.users);
        console.log('Users count:', users.length);
        console.log('Sample User:', users[0]);

        const projects = await db.select().from(schema.projects);
        console.log('Projects count:', projects.length);
        console.log('Sample Project:', projects[0]?.title);

        const blogs = await db.select().from(schema.blogs);
        console.log('Blogs count:', blogs.length);
        console.log('Sample Blog:', blogs[0]?.title);

        const sessions = await db.select().from(schema.sessions);
        console.log('Sessions count:', sessions.length);
        console.log('Latest Session:', sessions[sessions.length - 1]);

        const accounts = await db.select().from(schema.accounts);
        console.log('Accounts count:', accounts.length);

    } catch (err) {
        console.error('Error querying DB:', err);
    } finally {
        process.exit(0);
    }
};

check();
