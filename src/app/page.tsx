"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current.children, {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: stagger(100),
        duration: 800,
        easing: "easeOutExpo",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div ref={containerRef} className="max-w-4xl w-full text-center space-y-12">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            HealthShare
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            A secure, interoperable health record system connecting Citizens and Doctors during emergencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Citizen Card */}
          <Card className="hover:shadow-xl transition-shadow border-blue-100 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Citizen App</CardTitle>
              <CardDescription>
                Store your records, manage consent, and access emergency info.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/citizen/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Enter as Citizen</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Doctor Card */}
          <Card className="hover:shadow-xl transition-shadow border-green-100 dark:border-green-900">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Doctor Portal</CardTitle>
              <CardDescription>
                Access patient history, view reports, and provide better care.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/doctor/login">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950">
                  Enter as Doctor
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
