"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { fetcher } from "@/services/api";

export default function DoctorDashboard() {
    const [symptoms, setSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [generatedNote, setGeneratedNote] = useState("");
    const [generating, setGenerating] = useState(false);

    const handleGenerateNote = async () => {
        if (!symptoms || !diagnosis) {
            alert("Please fill in at least symptoms and diagnosis");
            return;
        }

        setGenerating(true);
        try {
            const data = await fetcher('/ai/generate-note', {
                method: 'POST',
                body: JSON.stringify({
                    symptoms,
                    diagnosis,
                    treatment,
                    patientHistory: "Not provided"
                })
            });
            setGeneratedNote(data.note);
        } catch (error) {
            alert("Failed to generate note");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8 w-full">
                {/* AI Clinical Note Generator */}
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2 border-purple-200 dark:border-purple-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                            <Sparkles className="h-5 w-5" />
                            AI Clinical Note Generator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="symptoms">Symptoms</Label>
                                <Textarea
                                    id="symptoms"
                                    placeholder="e.g., Fever, headache, cough..."
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="diagnosis">Diagnosis</Label>
                                <Textarea
                                    id="diagnosis"
                                    placeholder="e.g., Viral Fever"
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="treatment">Treatment Plan</Label>
                            <Textarea
                                id="treatment"
                                placeholder="e.g., Rest, fluids, paracetamol..."
                                value={treatment}
                                onChange={(e) => setTreatment(e.target.value)}
                                rows={2}
                            />
                        </div>
                        <Button
                            onClick={handleGenerateNote}
                            disabled={generating}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                            {generating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating AI Note...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Clinical Note
                                </>
                            )}
                        </Button>

                        {generatedNote && (
                            <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-lg border">
                                <h3 className="font-semibold mb-2">Generated Clinical Note:</h3>
                                <pre className="whitespace-pre-wrap text-sm">{generatedNote}</pre>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Search Section */}
                <Card className="bg-blue-50/50 dark:bg-slate-900/50 border-dashed border-2">
                    <CardHeader>
                        <CardTitle>Access Patient Records</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Input placeholder="Enter Patient ABHA ID to request access..." className="max-w-md" />
                        <Button className="gap-2">
                            Request Access
                        </Button>
                        <Button variant="secondary">Scan QR</Button>
                    </CardContent>
                </Card>

                {/* Recent Patients */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Recent Consultations</h2>
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient Name</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Last Visit</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">John Doe</TableCell>
                                    <TableCell>Viral Fever</TableCell>
                                    <TableCell>Today, 10:30 AM</TableCell>
                                    <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Admitted</Badge></TableCell>
                                    <TableCell className="text-right"><Button size="sm" variant="ghost">View Details</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Jane Smith</TableCell>
                                    <TableCell>Regular Checkup</TableCell>
                                    <TableCell>Yesterday</TableCell>
                                    <TableCell><Badge variant="outline">Discharged</Badge></TableCell>
                                    <TableCell className="text-right"><Button size="sm" variant="ghost">View Details</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
