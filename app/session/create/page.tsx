"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateSessionPage() {
  const router = useRouter();
  const [sessionName, setSessionName] = useState("");

  const handleCreateSession = () => {
    // Generate a random session ID
    const sessionId = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/session/${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
              Create Planning Session
            </CardTitle>
            <CardDescription className="text-slate-600">
              Set up a new planning poker session for your team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-name" className="text-slate-700">
                Session Name
              </Label>
              <Input
                id="session-name"
                placeholder="Sprint Planning"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="bg-white/50 border-white/50 backdrop-blur-sm focus:bg-white/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-700">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="What are you estimating today?"
                rows={3}
                className="bg-white/50 border-white/50 backdrop-blur-sm focus:bg-white/70"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90"
              onClick={handleCreateSession}
              // disabled={!sessionName.trim()}
            >
              Create Session
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
