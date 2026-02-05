"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard-layout";
import { QRCodeSVG } from 'qrcode.react';
import { useAuthStore } from "@/store/auth";

// Mock data to be replaced by API
const mockMedicalHistory = [
    { id: 1, date: "2023-10-15", type: "Lab Report", doctor: "Dr. Smith", title: "Blood Test - CBC", url: "#", verified: true },
    { id: 2, date: "2023-09-02", type: "Prescription", doctor: "Dr. Ayesha", title: "Viral Fever Meds", url: "#", verified: true },
    { id: 3, date: "2023-05-20", type: "Scan", doctor: "City Diagnostics", title: "Chest X-Ray", url: "#", verified: true },
];

const activeConsents = [
    { id: 1, doctor: "Dr. Smith", hospital: "Apollo Hospital", expires: "2h remaining" },
];

export default function CitizenDashboard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [qrValue, setQrValue] = useState("");
    const user = useAuthStore((state) => state.user);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            animate(containerRef.current.children, {
                translateY: [10, 0],
                opacity: [0, 1],
                delay: stagger(100),
                duration: 500,
                easing: "easeOutQuad",
            });
        }
    }, []);

    const generateToken = () => {
        // Generate a URL that anyone with the app (or just a browser) can open
        // In prod, this would be your hosted domain
        const baseUrl = window.location.origin;
        const token = `ACCESS-${user?.id || 'demo'}-${Date.now()}`;
        const url = `${baseUrl}/emergency?token=${token}`;
        setQrValue(url);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setUploading(false);
        alert("Document uploaded secured on blockchain ledger!");
    };

    return (
        <DashboardLayout>
            <div ref={containerRef} className="space-y-6 max-w-5xl mx-auto w-full">
                <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
                    <CardHeader>
                        <CardTitle className="text-red-600 flex items-center gap-2">
                            ⚠️ Emergency Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase">Blood Group</p>
                            <p className="text-xl font-bold">O+</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase">Allergies</p>
                            <p className="font-medium">Penicillin, Peanuts</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase">Chronic Conditions</p>
                            <p className="font-medium">Asthma</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase">Emergency Contact</p>
                            <p className="font-medium">+91 98765 43210</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <Tabs defaultValue="history">
                            <TabsList>
                                <TabsTrigger value="history">Medical History</TabsTrigger>
                                <TabsTrigger value="consents">Active Consents</TabsTrigger>
                                <TabsTrigger value="upload">Upload Record</TabsTrigger>
                            </TabsList>
                            <TabsContent value="history" className="space-y-4 pt-4">
                                {mockMedicalHistory.map((item) => (
                                    <Card key={item.id}>
                                        <CardContent className="flex justify-between items-center p-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold">{item.title}</p>
                                                    {item.verified && (
                                                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-[10px]">
                                                            ✓ Verifiable on Ledger
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{item.type} • {item.doctor} • {item.date}</p>
                                            </div>
                                            <Button variant="outline" size="sm">View</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </TabsContent>
                            <TabsContent value="consents" className="space-y-4 pt-4">
                                {activeConsents.map((item) => (
                                    <Card key={item.id}>
                                        <CardContent className="flex justify-between items-center p-4">
                                            <div>
                                                <p className="font-semibold">{item.doctor}</p>
                                                <p className="text-sm text-muted-foreground">{item.hospital}</p>
                                            </div>
                                            <Badge variant="secondary" className="mr-2">{item.expires}</Badge>
                                            <Button variant="destructive" size="sm">Revoke</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </TabsContent>
                            <TabsContent value="upload" className="space-y-4 pt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Self-Upload Records</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleUpload} className="space-y-4">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="picture">Document (PDF/JPG)</Label>
                                                <Input id="picture" type="file" />
                                            </div>
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Label htmlFor="desc">Description</Label>
                                                <Input id="desc" placeholder="e.g. Vaccination Certificate" />
                                            </div>
                                            <Button type="submit" disabled={uploading}>
                                                {uploading ? "Hashing & Uploading..." : "Secure Upload"}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Share Access</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-white p-4 rounded-lg shadow-inner flex justify-center min-h-[160px] items-center">
                                    {qrValue ? (
                                        <QRCodeSVG value={qrValue} size={128} />
                                    ) : (
                                        <div className="text-muted-foreground text-sm text-center">
                                            Click generate to create a one-time access QR
                                        </div>
                                    )}
                                </div>
                                <Button className="w-full" onClick={generateToken}>
                                    {qrValue ? "Refresh Token" : "Generate Secure Token"}
                                </Button>
                                {qrValue && (
                                    <p className="text-xs text-center text-muted-foreground">
                                        Scan this code at the reception desk to grant temporary access.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
