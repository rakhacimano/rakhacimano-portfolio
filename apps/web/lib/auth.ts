import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, users, sessions, accounts, verifications } from "@repo/db";

// Determine base URL based on environment
const getBaseURL = () => {
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}/api/auth`;
    }
    return process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`
        : "http://localhost:3000/api/auth";
};

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: users,
            session: sessions,
            account: accounts,
            verification: verifications
        }
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        requireEmailVerification: false,
        minPasswordLength: 8,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                input: false
            }
        }
    },
    trustedOrigins: [
        "http://localhost:3000",
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
        process.env.NEXT_PUBLIC_APP_URL || "",
    ].filter(Boolean),
    baseURL: getBaseURL(),
    advanced: {
        crossSubDomainCookies: {
            enabled: false
        },
        defaultCookieAttributes: {
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            path: "/"
        }
    },
    // Fallback secret for build time only
    secret: process.env.BETTER_AUTH_SECRET || "build-secret-123",
});
