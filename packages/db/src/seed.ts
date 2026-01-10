
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config({ path: 'apps/api/.env' });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });

const main = async () => {
    console.log('Seeding database...');

    // Helper to create slug
    const createSlug = (str: string) => str.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    // Dummy Author (create a user if none exists)
    const existingUser = await db.query.users.findFirst();
    let authorId = existingUser?.id;

    if (!authorId) {
        console.log('Creating dummy author...');
        const [newUser] = await db.insert(schema.users).values({
            id: 'dummy-author-id',
            name: 'Rakha Putra',
            email: 'rakha@example.com',
            role: 'admin',
            image: 'https://cdn.usegalileo.ai/sdxl10/24854558-8869-4556-9fc2-628a86071060.png'
        }).returning();
        authorId = newUser.id;
    }

    // Projects Data
    const projectsData = [
        {
            title: "Finance Dashboard",
            description: "A comprehensive financial analytics platform providing real-time insights for enterprise clients.",
            content: "<h2>Overview</h2><p>This project involved creating a high-performance dashboard...</p>",
            role: "Lead Designer",
            tags: ["Next.js", "Tailwind", "D3.js"],
            demoUrl: "https://example.com/demo",
            repoUrl: "https://github.com/rakha/finance",
            coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
            published: true
        },
        {
            title: "E-Commerce Mobile App",
            description: "A seamless shopping experience designed for fashion enthusiasts with AI-powered recommendations.",
            content: "<h2>The Challenge</h2><p>Building a mobile-first experience...</p>",
            role: "UX Researcher",
            tags: ["React Native", "Node.js"],
            demoUrl: "https://example.com/app",
            repoUrl: "https://github.com/rakha/shop-app",
            coverImage: "https://images.unsplash.com/photo-1523206485973-455b6e73f961?q=80&w=2070&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1523206485973-455b6e73f961?q=80&w=500&auto=format&fit=crop",
            published: true
        },
        {
            title: "SaaS Marketing Site",
            description: "High-conversion landing pages for a B2B SaaS product helping remote teams collaborate.",
            content: "<h2>Result</h2><p>Increased conversion by 40%...</p>",
            role: "Frontend Dev",
            tags: ["Webflow", "GSAP"],
            demoUrl: "https://example.com/saas",
            repoUrl: "https://github.com/rakha/saas-landing",
            coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
            published: true
        },
        {
            title: "Healthcare Portal",
            description: "Patient management system focusing on accessibility and secure data handling.",
            content: "<h2>Security</h2><p>Compliance with HIPAA...</p>",
            role: "Full Stack",
            tags: ["Vue.js", "Firebase"],
            demoUrl: "https://example.com/health",
            repoUrl: "https://github.com/rakha/health-portal",
            coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2028&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=500&auto=format&fit=crop",
            published: true
        }
    ];

    console.log('Inserting projects...');
    for (const p of projectsData) {
        await db.insert(schema.projects).values({
            ...p,
            slug: createSlug(p.title),
            images: [p.coverImage]
        }).onConflictDoNothing();
    }

    // Blogs Data
    const blogsData = [
        {
            title: "The Future of UI Design",
            excerpt: "Exploring the trends that will shape user interfaces in the coming decade, from spatial computing to AI.",
            content: "<p>User interface design is evolving rapidly...</p>",
            category: "Design",
            coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
            readingTime: "5 min read",
            published: true
        },
        {
            title: "Moving from React to Svelte",
            excerpt: "My journey transitioning frameworks and why simplicity often wins in modern web development.",
            content: "<p>React has been the king for a long time...</p>",
            category: "Tech",
            coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop",
            readingTime: "8 min read",
            published: true
        },
        {
            title: "Work-Life Balance for Devs",
            excerpt: "Tips and strategies for maintaining mental health while keeping up with the fast-paced tech industry.",
            content: "<p>Burnout is real...</p>",
            category: "Career",
            coverImage: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?q=80&w=2070&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?q=80&w=500&auto=format&fit=crop",
            readingTime: "4 min read",
            published: true
        },
        {
            title: "Minimalism in 2024",
            excerpt: "Why minimal design is making a comeback and how to implement it effectively without losing character.",
            content: "<p>Less is more...</p>",
            category: "Design",
            coverImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2047&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=500&auto=format&fit=crop",
            readingTime: "6 min read",
            published: true
        }
    ];

    console.log('Inserting blogs...');
    for (const b of blogsData) {
        await db.insert(schema.blogs).values({
            ...b,
            slug: createSlug(b.title),
            authorId: authorId
        }).onConflictDoNothing();
    }

    console.log('Seeding complete!');
    process.exit(0);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
