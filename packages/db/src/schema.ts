import { pgTable, text, timestamp, uuid, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: text("id").primaryKey(), // Changed from uuid to text for better-auth compatibility
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false),
    image: text("image"),
    role: text("role").$type<"admin" | "user">().default("user"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("session", {
    id: text("id").primaryKey(),
    token: text("token"), // Made nullable - better-auth may not always provide token
    expiresAt: timestamp("expires_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const accounts = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull().references(() => users.id),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const verifications = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogs = pgTable("blogs", {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(), // HTML content from WYSIWYG
    coverImage: text("cover_image"),
    thumbnail: text("thumbnail"),
    authorId: text("author_id").references(() => users.id),
    category: text("category"), // Added category field
    published: boolean("published").default(false),
    tags: jsonb("tags").$type<string[]>(),
    readingTime: text("reading_time"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description"),
    content: text("content"), // Scrollytelling content or rich text
    coverImage: text("cover_image"),
    thumbnail: text("thumbnail"),
    images: jsonb("images").$type<string[]>(), // Gallery images
    techStack: jsonb("tech_stack").$type<string[]>(),
    repoUrl: text("repo_url"),
    demoUrl: text("demo_url"),
    published: boolean("published").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relations for Drizzle relational queries
export const usersRelations = relations(users, ({ many }) => ({
    blogs: many(blogs),
    sessions: many(sessions),
    accounts: many(accounts),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
    author: one(users, {
        fields: [blogs.authorId],
        references: [users.id],
    }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

