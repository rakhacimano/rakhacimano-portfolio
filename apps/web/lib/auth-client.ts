import { createAuthClient } from "better-auth/react";

// Use relative URL for same-origin API calls
export const authClient = createAuthClient({
    baseURL: "/api/auth",
    fetchOptions: {
        credentials: "include"
    }
});
