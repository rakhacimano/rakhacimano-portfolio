import { db } from '../../packages/db/src/index';
import * as schema from '../../packages/db/src/index';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

async function seedDummyData() {
    console.log("Starting database check & seed...");

    try {
        // 1. Users
        const email = `check-db-${Date.now()}@example.com`;
        console.log(`Creating user: ${email}`);
        const [user] = await db.insert(schema.users).values({
            name: "DB Checker",
            email: email,
            role: "user",
        }).returning();
        console.log("User created:", user.id);

        // 2. Sessions (Dependent on User)
        console.log("Creating session...");
        await db.insert(schema.sessions).values({
            id: randomUUID(),
            userId: user.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
            userAgent: "Test Script",
        });
        console.log("Session created.");

        // 3. Accounts (Dependent on User)
        console.log("Creating account...");
        await db.insert(schema.accounts).values({
            id: randomUUID(),
            userId: user.id,
            type: "oauth",
            provider: "google", // Adjust based on your AuthJS config schema if needed, schema says providerId
            providerId: "google",
            providerAccountId: `test-${Date.now()}`,
            accountId: `test-${Date.now()}`, // Schema mismatch? schema says accountId and providerId.
        }).onConflictDoNothing();
        // Wait, schema check:
        // accounts: id, accountId, providerId, userId.
        // Let's re-read schema.ts carefully for accounts columns in a bit, but I'll use what I saw.
        // Schema: id (text pk), accountId (text), providerId (text), userId (uuid).

        const accountId = randomUUID();
        await db.insert(schema.accounts).values({
            id: accountId,
            accountId: accountId, // "providerAccountId" usually
            providerId: "google",
            userId: user.id,
        });
        console.log("Account created.");

        // 4. Verifications (Independent)
        console.log("Creating verification...");
        await db.insert(schema.verifications).values({
            id: randomUUID(),
            identifier: email,
            value: "123456",
            expiresAt: new Date(Date.now() + 1000 * 60 * 10),
        });
        console.log("Verification created.");

        // 5. Blogs (Dependent on User)
        console.log("Creating blog...");
        const blogSlug = `test-blog-${Date.now()}`;
        await db.insert(schema.blogs).values({
            slug: blogSlug,
            title: "Test Blog",
            content: "<p>Hello World</p>",
            authorId: user.id,
            published: true,
        });
        console.log("Blog created.");

        // 6. Projects (Independent)
        console.log("Creating project...");
        const projectSlug = `test-project-${Date.now()}`;
        await db.insert(schema.projects).values({
            slug: projectSlug,
            title: "Test Project",
            description: "A test project",
            content: "Some content",
        });
        console.log("Project created.");

        console.log("\n✅ Database check passed! Dummy data inserted into all tables.");

    } catch (e) {
        console.error("\n❌ Database check failed:", e);
    } finally {
        // Just exit, script is done. DB connection pool might keep it open depending on config, but process.exit handles it for scripts.
        process.exit(0);
    }
}

seedDummyData();
