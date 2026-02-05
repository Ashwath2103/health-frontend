"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DashboardLayout from "@/components/dashboard-layout";
import { Search, UserPlus, QrCode, Video } from "lucide-react";
import { fetcher } from "@/services/api";
import { useAuthStore } from "@/store/auth";

export default function PatientSearchPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [starting, setStarting] = useState<number | null>(null);

    const handleSearch = () => {
        // Mock search results
        if (searchQuery) {
            setSearchResults([
                { id: 1, name: "John Doe", abhaId: "12-3456-7890-0000", age: 45, lastVisit: "2024-02-01", status: "Active" },
                { id: 2, name: "Jane Smith", abhaId: "12-3456-7890-0001", age: 32, lastVisit: "2024-01-28", status: "Active" },
            ]);
        }
    };

    const startVideoCall = async (patient: any) => {
        setStarting(patient.id);
        try {
            const data = await fetcher('/meeting/create', {
                method: 'POST',
                body: JSON.stringify({
                    patientId: patient.id,
                    patientName: patient.name,
                    doctorName: user?.name || "Doctor"
                })
            });

            // Redirect to consultation room
            router.push(`/consultation?room=${data.roomName}&name=${user?.name || "Doctor"}`);
        } catch (error) {
            alert("Failed to start video call");
        } finally {
            setStarting(null);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Patient Search</h1>
                    <p className="text-muted-foreground">Find and request access to patient records</p>
                </div>

                <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-200">
                    <CardHeader>
                        <CardTitle>Search Patient</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <Input
                                placeholder="Enter Patient ABHA ID or Name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="max-w-md"
                            />
                            <Button onClick={handleSearch} className="gap-2">
                                <Search className="h-4 w-4" />
                                Search
                            </Button>
                            <Button variant="secondary" className="gap-2">
                                <QrCode className="h-4 w-4" />
                                Scan QR
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {searchResults.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Search Results</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {searchResults.map((patient) => (
                                <div
                                    key={patient.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback>{patient.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">{patient.name}</h3>
                                            <p className="text-sm text-muted-foreground">ABHA ID: {patient.abhaId}</p>
                                            <div className="flex gap-2 mt-1">
                                                <Badge variant="outline">Age: {patient.age}</Badge>
                                                <Badge variant="outline">Last Visit: {patient.lastVisit}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => startVideoCall(patient)}
                                            disabled={starting === patient.id}
                                            className="gap-2 bg-green-600 hover:bg-green-700"
                                        >
                                            <Video className="h-4 w-4" />
                                            {starting === patient.id ? "Starting..." : "Start Video Call"}
                                        </Button>
                                        <Button variant="outline" className="gap-2">
                                            <UserPlus className="h-4 w-4" />
                                            Request Access
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {searchQuery && searchResults.length === 0 && (
                    <Card className="border-dashed">
                        <CardContent className="py-12 text-center text-muted-foreground">
                            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No patients found. Try searching with ABHA ID or name.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
