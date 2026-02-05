"use client"

import * as React from "react"
import {
    Activity,
    Calendar,
    FileText,
    History,
    LayoutDashboard,
    Settings,
    User,
    Stethoscope,
    HeartPulse,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/auth"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, role } = useAuthStore()

    // Dynamic Navigation based on Role
    const navMain = role === 'citizen' ? [
        {
            title: "My Health",
            url: "/citizen/dashboard",
            icon: HeartPulse,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/citizen/dashboard",
                },
                {
                    title: "Medical History",
                    url: "/citizen/dashboard",
                },
                {
                    title: "Emergency Profile",
                    url: "/citizen/dashboard",
                },
            ],
        },
        {
            title: "Video Consultation",
            url: "/citizen/join-consultation",
            icon: Activity,
            items: [
                { title: "Join Consultation", url: "/citizen/join-consultation" }
            ]
        },
        {
            title: "Share Access",
            url: "/citizen/consent",
            icon: User,
            items: [
                { title: "Consent Manager", url: "/citizen/consent" },
                { title: "Access Logs", url: "/citizen/access-logs" }
            ]
        }
    ] : [
        {
            title: "Doctor Portal",
            url: "/doctor/dashboard",
            icon: Stethoscope,
            isActive: true,
            items: [
                {
                    title: "AI Note Generator",
                    url: "/doctor/dashboard",
                },
                {
                    title: "Patient Search",
                    url: "/doctor/patient-search",
                },
                {
                    title: "Recent Consultations",
                    url: "/doctor/consultations",
                },
            ],
        },
    ];

    const userData = {
        name: user?.name || "User",
        email: role === 'citizen' ? (user?.abha_id || "ABHA ID") : (user?.license_id || "License ID"),
        avatar: "/avatars/shadcn.jpg",
    };

    const teams = [
        {
            name: "HealthShare",
            logo: Activity,
            plan: role === 'citizen' ? "Citizen App" : "Doctor Portal"
        }
    ]

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
