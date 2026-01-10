import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, users, sessions, accounts, verifications } from "@repo/db";

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
    trustedOrigins: ["http://localhost:3000"],
    baseURL: "http://localhost:4000/api/auth",
    advanced: {
        crossSubDomainCookies: {
            enabled: false // Both on localhost, no subdomain needed
        },
        defaultCookieAttributes: {
            sameSite: "lax",
            secure: false, // localhost doesn't use HTTPS
            httpOnly: true,
            path: "/"
        }
    }
});

