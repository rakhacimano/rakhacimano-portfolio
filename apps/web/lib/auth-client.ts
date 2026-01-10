import { createAuthClient } from "better-auth/react";

// Use absolute URL for Better Auth
const baseURL = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`
    : typeof window !== "undefined"
        ? `${window.location.origin}/api/auth`
        : "http://localhost:3000/api/auth";

export const authClient = createAuthClient({
    baseURL,
    fetchOptions: {
        credentials: "include"
    }
});
