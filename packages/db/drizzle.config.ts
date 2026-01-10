// @ts-ignore
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

import dns from 'dns';
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
    // Ignore error if setServers fails
}

export default defineConfig({
    schema: './src/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
    },
});
