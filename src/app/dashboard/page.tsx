"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            animate(gridRef.current.children, {
                scale: [0.9, 1],
                opacity: [0, 1],
                delay: stagger(150), // Stagger the animation
                duration: 600,
                easing: "easeOutCubic",
            });
        }
    }, []);

    const stats = [
        { title: "Heart Rate", value: "72 bpm", color: "text-red-500" },
        { title: "Steps", value: "8,432", color: "text-blue-500" },
        { title: "Sleep", value: "7h 12m", color: "text-purple-500" },
        { title: "Calories", value: "1,240 kcal", color: "text-orange-500" },
    ];

    return (
        <div className="min-h-screen bg-muted/20 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Your Dashboard</h1>
                    <Link href="/">
                        <Button variant="outline">Sign Out</Button>
                    </Link>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    {stat.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`text-4xl font-bold ${stat.color}`}>
                                    {stat.value}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
