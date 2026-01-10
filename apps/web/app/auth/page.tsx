"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function AuthPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Create a timeout promise
        const timeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Request timeout - server took too long to respond")), 15000);
        });

        try {
            console.log("Starting auth request...", { isSignUp, email, name });

            if (isSignUp) {
                const authPromise = authClient.signUp.email({
                    email,
                    password,
                    name,
                    callbackURL: "/admin"
                });

                // Race between auth request and timeout
                const res = await Promise.race([authPromise, timeout]) as Awaited<typeof authPromise>;
                console.log("SignUp Response:", res);

                if (res.error) {
                    throw new Error(res.error.message || "Failed to create account");
                }

                toast.success("Account created successfully!", {
                    description: "Please sign in with your new account."
                });
                // Switch to login form instead of redirecting
                setIsSignUp(false);
                setPassword(""); // Clear password for security
            } else {
                const authPromise = authClient.signIn.email({
                    email,
                    password,
                    callbackURL: "/admin"
                });

                const res = await Promise.race([authPromise, timeout]) as Awaited<typeof authPromise>;
                console.log("SignIn Response:", res);

                if (res.error) {
                    throw new Error(res.error.message || "Invalid email or password");
                }

                toast.success("Welcome back!", {
                    description: "Redirecting to admin panel..."
                });

                // Small delay to let the session cookie settle before navigation
                await new Promise(resolve => setTimeout(resolve, 500));
                router.replace('/admin');
            }
        } catch (error: unknown) {
            console.error("Auth error caught:", error);

            let errorMessage = "Something went wrong. Please try again.";
            let isDuplicateAccount = false;

            if (error instanceof Error) {
                const msg = error.message.toLowerCase();
                if (msg.includes("timeout")) {
                    errorMessage = "Connection timeout. Please check if the server is running and try again.";
                } else if (msg.includes("fetch")) {
                    errorMessage = "Cannot connect to server. Please make sure the API is running on port 4000.";
                } else if (msg.includes("credentials") || msg.includes("password") || msg.includes("invalid")) {
                    errorMessage = "Invalid email or password. Please check your credentials.";
                } else if (msg.includes("exists") || msg.includes("duplicate") || msg.includes("already") || msg.includes("user with")) {
                    errorMessage = "An account with this email already exists. Please sign in instead.";
                    isDuplicateAccount = true;
                } else {
                    errorMessage = error.message;
                }
            }

            if (isDuplicateAccount) {
                toast.warning("Account Already Exists", {
                    description: errorMessage,
                    duration: 5000
                });
                // Switch to login form for convenience
                setIsSignUp(false);
                setPassword("");
            } else {
                toast.error("Authentication Failed", {
                    description: errorMessage,
                    duration: 5000
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wide">
                    <ArrowLeft size={16} />
                    Back to Portfolio
                </Link>

                <div className="bg-dark/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-black mb-2">{isSignUp ? "Create Admin Account" : "Admin Access"}</h1>
                        <p className="text-gray-400 text-sm">
                            {isSignUp ? "Register to manage your portfolio" : "Sign in to manage your portfolio content"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium text-white placeholder-gray-600"
                                    placeholder="Your Name"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium text-white placeholder-gray-600"
                                placeholder="name@example.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium text-white placeholder-gray-600"
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {isSignUp && (
                                <p className="text-xs text-gray-600 mt-1">Minimum 8 characters</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary text-dark font-black rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    {isSignUp ? "Creating Account..." : "Signing In..."}
                                </>
                            ) : (
                                isSignUp ? "Create Account" : "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-sm text-gray-500 hover:text-white font-medium transition-colors"
                            disabled={loading}
                        >
                            {isSignUp ? "Already have an account? Sign in" : "Need an account? Create one"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
