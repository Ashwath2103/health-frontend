"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LiveKitRoom, VideoConference, RoomAudioRenderer } from "@livekit/components-react";
import { fetcher } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, Check, Share2 } from "lucide-react";

export default function ConsultationPage() {
    const searchParams = useSearchParams();
    const roomName = searchParams.get("room");
    const participantName = searchParams.get("name") || "Participant";

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const shareableUrl = typeof window !== 'undefined' ? window.location.href : '';

    useEffect(() => {
        const joinRoom = async () => {
            try {
                const data = await fetcher('/meeting/join', {
                    method: 'POST',
                    body: JSON.stringify({ roomName, participantName })
                });
                setToken(data.token);
            } catch (error) {
                console.error("Failed to join meeting:", error);
            } finally {
                setLoading(false);
            }
        };

        if (roomName) {
            joinRoom();
        }
    }, [roomName, participantName]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomName || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
                <Card className="w-96 shadow-2xl border-2 border-blue-200">
                    <CardContent className="pt-6 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900 animate-ping"></div>
                            </div>
                            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600 relative z-10" />
                        </div>
                        <h2 className="text-xl font-semibold mt-4">Joining Consultation...</h2>
                        <p className="text-muted-foreground mt-2">Connecting to secure video room</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-slate-900 dark:to-red-950">
                <Card className="w-96 shadow-2xl border-2 border-red-200">
                    <CardContent className="pt-6 text-center">
                        <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h2 className="text-xl font-semibold text-red-600">Connection Failed</h2>
                        <p className="text-muted-foreground mt-2">Unable to join the consultation room</p>
                        <Button onClick={() => window.location.reload()} className="mt-4">
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-950 relative">
            {/* Share Room ID Bar */}
            <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Share2 className="h-6 w-6" />
                            <div>
                                <div className="font-semibold text-lg">Share Room ID with Patient</div>
                                <div className="text-sm text-white/80">Patient can join using "Video Consultation" in sidebar</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/20 rounded-lg px-6 py-3 backdrop-blur">
                            <div className="text-right">
                                <div className="text-xs text-white/80 uppercase tracking-wide">Room ID</div>
                                <div className="font-mono text-xl font-bold">{roomName}</div>
                            </div>
                            <Button
                                size="lg"
                                variant="ghost"
                                onClick={copyToClipboard}
                                className="text-white hover:bg-white/20 border-2 border-white/40"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-5 w-5 mr-2" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-5 w-5 mr-2" />
                                        Copy Room ID
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Conference */}
            <div className="h-full pt-20">
                <LiveKitRoom
                    video={true}
                    audio={true}
                    token={token}
                    serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || "wss://shashanth-p0wt6o3q.livekit.cloud"}
                    data-lk-theme="default"
                    style={{ height: '100%' }}
                    className="livekit-room"
                >
                    <VideoConference />
                    <RoomAudioRenderer />
                </LiveKitRoom>
            </div>
        </div>
    );
}
