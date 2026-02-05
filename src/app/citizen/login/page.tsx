"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { authApi } from "@/services/api";
import LoginLayout from "@/components/login-template";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CitizenLoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const abhaId = (document.getElementById("abha") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        try {
            const data = await authApi.citizenLogin(abhaId, password);
            login(data.user, data.token, 'citizen');
            router.push("/citizen/dashboard");
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginLayout>
            <div className={cn("flex flex-col gap-6")}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Citizen Login</CardTitle>
                        <CardDescription>
                            Enter your ABHA Health ID to access records
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="abha">ABHA ID</Label>
                                    <Input
                                        id="abha"
                                        placeholder="12-3456-7890-0000"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" required />
                                </div>
                                {error && <div className="text-sm text-red-500">{error}</div>}
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Verifying..." : "Login"}
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/">Back to Home</Link>
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </LoginLayout>
    );
}
