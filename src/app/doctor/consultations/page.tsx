"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DashboardLayout from "@/components/dashboard-layout";
import { FileText, Calendar, TrendingUp } from "lucide-react";

export default function ConsultationsPage() {
    const consultations = [
        { id: 1, patient: "John Doe", abhaId: "12-3456-7890-0000", condition: "Viral Fever", date: "2024-02-05", time: "10:30 AM", status: "Completed", followUp: "2024-02-12" },
        { id: 2, patient: "Jane Smith", abhaId: "12-3456-7890-0001", condition: "Regular Checkup", date: "2024-02-04", time: "03:15 PM", status: "Completed", followUp: null },
        { id: 3, patient: "Robert Johnson", abhaId: "12-3456-7890-0002", condition: "Hypertension", date: "2024-02-03", time: "11:00 AM", status: "Follow-up Required", followUp: "2024-02-10" },
        { id: 4, patient: "Emily Davis", abhaId: "12-3456-7890-0003", condition: "Diabetes Management", date: "2024-02-02", time: "09:45 AM", status: "Completed", followUp: "2024-03-02" },
    ];

    const stats = [
        { label: "Total Consultations", value: "24", icon: FileText, color: "text-blue-600" },
        { label: "This Week", value: "8", icon: Calendar, color: "text-green-600" },
        { label: "Follow-ups Pending", value: "3", icon: TrendingUp, color: "text-orange-600" },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Recent Consultations</h1>
                    <p className="text-muted-foreground">View and manage your patient consultations</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, idx) => (
                        <Card key={idx}>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                                    </div>
                                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Consultation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>ABHA ID</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Follow-up</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {consultations.map((consultation) => (
                                    <TableRow key={consultation.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{consultation.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{consultation.patient}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{consultation.abhaId}</TableCell>
                                        <TableCell>{consultation.condition}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{consultation.date}</div>
                                                <div className="text-muted-foreground">{consultation.time}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={consultation.status === "Completed" ? "default" : "secondary"}>
                                                {consultation.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {consultation.followUp ? (
                                                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                                    {consultation.followUp}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground text-sm">None</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="ghost">View Details</Button>
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
