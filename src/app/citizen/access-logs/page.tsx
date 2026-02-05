"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard-layout";
import { Eye, FileText, Clock } from "lucide-react";

export default function AccessLogsPage() {
    const logs = [
        { id: 1, doctor: "Dr. Sarah Smith", hospital: "Apollo Hospital", action: "Viewed Medical History", timestamp: "2024-02-05 10:30 AM", recordType: "Blood Test" },
        { id: 2, doctor: "Dr. John Doe", hospital: "Max Healthcare", action: "Added Prescription", timestamp: "2024-02-04 03:15 PM", recordType: "Prescription" },
        { id: 3, doctor: "Dr. Emily Brown", hospital: "Fortis", action: "Viewed X-Ray", timestamp: "2024-02-03 11:00 AM", recordType: "Imaging" },
        { id: 4, doctor: "Dr. Sarah Smith", hospital: "Apollo Hospital", action: "Updated Diagnosis", timestamp: "2024-02-02 09:45 AM", recordType: "Diagnosis" },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Access Logs</h1>
                        <p className="text-muted-foreground">Track who accessed your medical records</p>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2">
                        {logs.length} Total Accesses
                    </Badge>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Recent Access Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Hospital</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Record Type</TableHead>
                                    <TableHead>Timestamp</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-medium">{log.doctor}</TableCell>
                                        <TableCell>{log.hospital}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-blue-500" />
                                                {log.action}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{log.recordType}</Badge>
                                        </TableCell>
                                        <TableCell className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            {log.timestamp}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                    <CardContent className="pt-6">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            🔒 All access is logged on the blockchain for transparency and security. You can revoke access anytime from the Consent Manager.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
