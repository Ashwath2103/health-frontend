"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/dashboard-layout";
import { Video, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function JoinConsultationPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [roomName, setRoomName] = useState("");
    const [joining, setJoining] = useState(false);

    const handleJoin = () => {
        if (!roomName.trim()) {
            alert("Please enter a room number");
            return;
        }

        setJoining(true);
        // Redirect to consultation room
        router.push(`/consultation?room=${roomName}&name=${user?.name || "Patient"}`);
    };

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6 pt-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Video Consultation</h1>
                    <p className="text-muted-foreground mt-2">Join a consultation with your doctor</p>
                </div>

                <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-2 border-green-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Video className="h-6 w-6 text-green-600" />
                            Join Consultation Room
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="roomNumber">Room Number</Label>
                            <Input
                                id="roomNumber"
                                placeholder="Enter the room number provided by your doctor..."
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
                                className="text-lg"
                            />
                            <p className="text-sm text-muted-foreground">
                                Your doctor will provide you with a room number to join the consultation
                            </p>
                        </div>

                        <Button
                            onClick={handleJoin}
                            disabled={joining || !roomName.trim()}
                            className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                        >
                            {joining ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Joining...
                                </>
                            ) : (
                                <>
                                    <Video className="mr-2 h-5 w-5" />
                                    Join Video Consultation
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2">How to join:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                            <li>Your doctor will send you a room number via SMS or app notification</li>
                            <li>Enter the room number in the field above</li>
                            <li>Click "Join Video Consultation"</li>
                            <li>Allow camera and microphone access when prompted</li>
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
