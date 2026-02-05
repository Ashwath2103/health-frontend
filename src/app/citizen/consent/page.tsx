"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/dashboard-layout";
import { UserCheck, UserX, Clock } from "lucide-react";

export default function ConsentManagerPage() {
    const [consents, setConsents] = useState([
        { id: 1, doctor: "Dr. Sarah Smith", hospital: "Apollo Hospital", granted: "2024-01-15", expires: "2024-07-15", active: true },
        { id: 2, doctor: "Dr. John Doe", hospital: "Max Healthcare", granted: "2024-02-01", expires: "2024-08-01", active: true },
        { id: 3, doctor: "Dr. Emily Brown", hospital: "Fortis", granted: "2023-12-10", expires: "2024-06-10", active: false },
    ]);

    const toggleConsent = (id: number) => {
        setConsents(consents.map(c => c.id === id ? { ...c, active: !c.active } : c));
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Consent Manager</h1>
                        <p className="text-muted-foreground">Control who can access your medical records</p>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2">
                        {consents.filter(c => c.active).length} Active Consents
                    </Badge>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5" />
                            Granted Access
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Hospital</TableHead>
                                    <TableHead>Granted On</TableHead>
                                    <TableHead>Expires On</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {consents.map((consent) => (
                                    <TableRow key={consent.id}>
                                        <TableCell className="font-medium">{consent.doctor}</TableCell>
                                        <TableCell>{consent.hospital}</TableCell>
                                        <TableCell>{consent.granted}</TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            {consent.expires}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={consent.active ? "default" : "secondary"}>
                                                {consent.active ? "Active" : "Revoked"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Switch
                                                    checked={consent.active}
                                                    onCheckedChange={() => toggleConsent(consent.id)}
                                                />
                                                <span className="text-sm text-muted-foreground">
                                                    {consent.active ? "Revoke" : "Grant"}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
