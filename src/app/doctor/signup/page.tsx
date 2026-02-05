"use client";

import { useState } from "react";
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
import LoginLayout from "@/components/login-template";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { authApi } from "@/services/api";
import { useAuthStore } from "@/store/auth";

export default function DoctorSignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const licenseId = formData.get("license") as string;
        const hospital = formData.get("hospital") as string;
        const password = formData.get("password") as string;

        try {
            const data = await authApi.doctorRegister({ name, licenseId, hospital, password });
            login(data.user, data.token, 'doctor');
            router.push("/doctor/dashboard");
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginLayout>
            <div className={cn("flex flex-col gap-6")}>
                <Card className="border-green-100 dark:border-green-900">
                    <CardHeader>
                        <CardTitle className="text-2xl text-green-700">Doctor Registration</CardTitle>
                        <CardDescription>
                            Verify credentials to join the network
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignup}>
                            <div className="flex flex-col gap-6">
                                {error && (
                                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
                                        {error}
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Dr. Sarah Smith"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="license">Medical License ID</Label>
                                    <Input
                                        id="license"
                                        name="license"
                                        placeholder="DOC-88219"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="hospital">Hospital/Clinic Name</Label>
                                    <Input
                                        id="hospital"
                                        name="hospital"
                                        placeholder="Apollo Hospital"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="password" type="password" required />
                                </div>
                                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                                    {loading ? "Verifying License..." : "Register"}
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/">Back to Home</Link>
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/doctor/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </LoginLayout>
    );
}
