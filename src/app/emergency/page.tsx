"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Siren, Volume2, ShieldCheck, Activity } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function EmergencyAccessPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [speaking, setSpeaking] = useState(false);

    // Mock Data - In real app, fetch using the token
    const patientData = {
        name: "John Doe",
        bloodGroup: "O+",
        allergies: ["Penicillin", "Peanuts"],
        conditions: ["Asthma", "Hypertension"],
        emergencyContact: "+91 98765 43210 (Wife)",
        lastVitals: "BP: 120/80 • HR: 72"
    };

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            setSpeaking(true);
            const text = `Emergency Alert. Patient Name: ${patientData.name}. Blood Group: ${patientData.bloodGroup}. Critical Allergies: ${patientData.allergies.join(", ")}. Chronic Conditions: ${patientData.conditions.join(", ")}.`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Text-to-speech not supported in this browser.");
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
                <Card className="max-w-md w-full border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-600 flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6" /> Access Denied
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-muted-foreground">Invalid or missing emergency token.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-red-50 dark:bg-red-950/20 p-6 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full space-y-6">

                {/* Header Badge */}
                <div className="flex justify-center">
                    <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-pulse flex items-center gap-2">
                        <Siren className="h-5 w-5" /> EMERGENCY MEDICAL ID
                    </div>
                </div>

                <Card className="border-red-400 border-2 shadow-xl overflow-hidden">
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 border-b border-red-200 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{patientData.name}</h1>
                            <p className="text-sm text-red-700 font-medium flex items-center gap-1">
                                <Activity className="h-4 w-4" /> Vitals Stable (Updated 2h ago)
                            </p>
                        </div>
                        <Button onClick={handleSpeak} disabled={speaking} size="lg" className="bg-red-600 hover:bg-red-700 text-white gap-2 shadow-md">
                            <Volume2 className={speaking ? "animate-ping" : ""} />
                            {speaking ? "Speaking..." : "Listen"}
                        </Button>
                    </div>

                    <CardContent className="p-6 space-y-6">
                        {/* Critical Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-red-500 shadow-sm">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Blood Group</p>
                                <p className="text-4xl font-black text-gray-800 dark:text-white mt-1">{patientData.bloodGroup}</p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-orange-500 shadow-sm">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Allergies</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {patientData.allergies.map(a => (
                                        <Badge key={a} variant="destructive" className="text-sm px-2 py-1">{a}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Chronic Conditions</p>
                            <div className="p-4 bg-gray-100 dark:bg-slate-800 rounded-lg">
                                <p className="font-medium text-lg">{patientData.conditions.join(", ")}</p>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="text-xs text-green-700 uppercase font-bold">Emergency Contact</p>
                                <p className="font-bold text-lg text-green-900">{patientData.emergencyContact}</p>
                            </div>
                            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                                Call Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Secure Access Mode</AlertTitle>
                    <AlertDescription>
                        This page is accessed via a time-limited token. Medical history requires additonal biometric auth.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
