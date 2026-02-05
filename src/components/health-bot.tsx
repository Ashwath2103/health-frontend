"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetcher } from "@/services/api";

function AnimatedSphere({ thinking }: { thinking: boolean }) {
    const meshRef = useRef<any>(null);
    useFrame((state) => {
        if (meshRef.current) {
            // Rotate constantly
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;

            // Pulse speed when thinking
            const speed = thinking ? 3 : 1;
            meshRef.current.distort = 0.4 + Math.sin(state.clock.getElapsedTime() * speed) * 0.2;
        }
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2} ref={meshRef}>
            <MeshDistortMaterial
                color={thinking ? "#FF4081" : "#4299E1"}
                attach="material"
                distort={0.4}
                speed={thinking ? 4 : 1.5}
                roughness={0}
            />
        </Sphere>
    );
}

export function HealthBotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: "Hello! I am your AI Health Assistant. I have access to your records. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [thinking, setThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");
        setThinking(true);

        try {
            const data = await fetcher('/chat', {
                method: 'POST',
                body: JSON.stringify({ message: userMsg })
            });

            setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I am having trouble connecting to the medical network." }]);
        } finally {
            setThinking(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white p-0 relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-purple-500 to-transparent animate-pulse" />
                    <Bot className="h-8 w-8" />
                </Button>
            )}

            {isOpen && (
                <Card className="chat-window w-[350px] shadow-2xl border-2 border-blue-100 dark:border-blue-900 flex flex-col h-[500px] animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-3 flex flex-row items-center justify-between rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-yellow-300" />
                            <CardTitle className="text-md">AI Health Assistant</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    {/* 3JS Visualization Area */}
                    <div className="h-24 bg-slate-900 w-full relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Canvas>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[10, 10, 5]} intensity={1} />
                                <AnimatedSphere thinking={thinking} />
                            </Canvas>
                        </div>
                        <div className="absolute bottom-1 left-2 text-[10px] text-white/50">
                            {thinking ? "Analyzing Records..." : "Online"}
                        </div>
                    </div>

                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-[80%] rounded-lg p-3 text-sm",
                                    msg.role === 'user'
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white dark:bg-slate-800 border shadow-sm rounded-bl-none"
                                )}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </CardContent>

                    <div className="p-3 border-t bg-white dark:bg-slate-900 flex gap-2">
                        <Input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about your health..."
                            className="flex-1"
                        />
                        <Button size="icon" onClick={handleSend} disabled={thinking} className="bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
