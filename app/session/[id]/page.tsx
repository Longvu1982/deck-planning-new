"use client";

import { PlanningCard } from "@/components/planning-card";
import { SettingsPanel } from "@/components/settings-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { VirtualTable } from "@/components/virtual-table";
import { VoteChart } from "@/components/vote-chart";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowUp,
  RotateCcw,
  Settings,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CARD_VALUES = ["1", "2", "3", "5", "8", "13", "3", "5", "8", "13"];

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [isHost, setIsHost] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [tableShape, setTableShape] = useState<"round" | "square">("round");
  const [showSettings, setShowSettings] = useState(false);
  const [open, setOpen] = useState(false);
  // App settings
  const [settings, setSettings] = useState({
    enableSpectators: false,
    showChat: true,
    autoReveal: false,
    timerEnabled: false,
    timerDuration: 30,
  });

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "You (Host)",
      vote: null,
      isHost: true,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      isSpectator: false,
    },
    {
      id: "2",
      name: "Alice",
      vote: "3",
      isHost: false,
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      isSpectator: false,
    },
    {
      id: "3",
      name: "Bob",
      vote: "5",
      isHost: false,
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      isSpectator: false,
    },
    {
      id: "4",
      name: "Charlie",
      vote: "8",
      isHost: false,
      color: "bg-gradient-to-br from-amber-400 to-amber-600",
      isSpectator: false,
    },
    {
      id: "5",
      name: "Diana",
      vote: "?",
      isHost: false,
      color: "bg-gradient-to-br from-rose-400 to-rose-600",
      isSpectator: false,
    },
  ]);

  // Update your vote in the users array
  useEffect(() => {
    if (selectedCard) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === "1" ? { ...user, vote: selectedCard } : user
        )
      );
    }
  }, [selectedCard]);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleReset = () => {
    setRevealed(false);
    setSelectedCard(null);
    setUsers((prev) => prev.map((user) => ({ ...user, vote: null })));
  };

  const toggleTableShape = () => {
    setTableShape((prev) => (prev === "round" ? "square" : "round"));
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleSpectatorMode = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, isSpectator: !user.isSpectator, vote: null }
          : user
      )
    );
  };

  // Calculate average of numeric votes
  const calculateAverage = () => {
    const numericVotes = users
      .filter((user) => !user.isSpectator) // Exclude spectators
      .map((user) => user.vote)
      .filter((vote) => vote !== null && vote !== "?")
      .map((vote) => Number.parseInt(vote as string))
      .filter((vote) => !isNaN(vote));

    if (numericVotes.length === 0) return null;

    const sum = numericVotes.reduce((acc, val) => acc + val, 0);
    return (sum / numericVotes.length).toFixed(1);
  };

  const average = revealed ? calculateAverage() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 backdrop-blur-sm bg-white/30 p-4 rounded-xl border border-white/50 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
              Planning Session: {sessionId}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Select a card to estimate the current story
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <Badge
              variant="outline"
              className="flex items-center gap-1 bg-white/40 backdrop-blur-sm border-white/50"
            >
              <Users size={14} />
              {users.length} Members
            </Badge>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 bg-white/40 backdrop-blur-sm border-white/50 hover:bg-white/60"
                onClick={toggleTableShape}
              >
                <RotateCcw size={14} className="hidden sm:inline" />
                {tableShape === "round" ? "Square" : "Round"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className={`gap-1 ${
                  showSettings ? "bg-white/60" : "bg-white/40"
                } backdrop-blur-sm border-white/50 hover:bg-white/60`}
                onClick={toggleSettings}
              >
                <Settings size={14} />
                <span className="hidden sm:inline">Settings</span>
              </Button>

              {isHost && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 bg-white/40 backdrop-blur-sm border-white/50 hover:bg-white/60"
                  onClick={() => setIsHost(false)}
                >
                  <ArrowLeftRight size={14} className="hidden sm:inline" />
                  Switch Role
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
            settings={settings}
            onUpdateSettings={updateSettings}
            onClose={toggleSettings}
            users={users}
            onToggleSpectator={toggleSpectatorMode}
            isHost={isHost}
          />
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="relative">
            <VirtualTable
              users={users}
              revealed={revealed}
              shape={tableShape}
              average={average}
              showChat={settings.showChat}
            />
          </div>

          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg rounded-xl p-4 sm:p-6"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-slate-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
                  Vote Distribution
                </span>
                {average && (
                  <span className="text-base sm:text-lg px-3 py-1 rounded-full backdrop-blur-sm bg-white/50 border border-white/50 shadow-sm">
                    Average:{" "}
                    <span className="font-bold text-purple-600">{average}</span>
                  </span>
                )}
              </h2>
              <VoteChart users={users} />
            </motion.div>
          )}
          <HoverCard
            openDelay={0}
            closeDelay={100}
            open={open}
            onOpenChange={setOpen}
          >
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "gap-1 bg-white/40 backdrop-blur-sm border-white/50 hover:bg-white/60 mx-auto px-6 py-4 sticky bottom-0 shadow-md",
                  open ? "animate-none" : "animate-pulse"
                )}
              >
                <ArrowUp />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent asChild>
              <div className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg rounded-xl p-4 sm:p-6 container w-[60vw]">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-700">
                  Your Cards
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 sm:gap-2">
                  {CARD_VALUES.map((value) => (
                    <PlanningCard
                      key={value}
                      value={value}
                      selected={selectedCard === value}
                      onClick={() => setSelectedCard(value)}
                      disabled={
                        revealed || users.find((u) => u.id === "1")?.isSpectator
                      }
                    />
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {/* <div className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg rounded-xl p-4 sm:p-6 sticky bottom-0">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-700">
              Your Cards
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 sm:gap-2">
              {CARD_VALUES.map((value) => (
                <PlanningCard
                  key={value}
                  value={value}
                  selected={selectedCard === value}
                  onClick={() => setSelectedCard(value)}
                  disabled={
                    revealed || users.find((u) => u.id === "1")?.isSpectator
                  }
                />
              ))}
            </div>
          </div> */}

          {isHost && (
            <div className="flex gap-3">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90"
                size="lg"
                onClick={handleReveal}
                disabled={revealed}
              >
                Reveal Cards
              </Button>
              {revealed && (
                <Button
                  variant="outline"
                  className="w-full border-white/50 backdrop-blur-sm bg-white/40 hover:bg-white/60 text-slate-700"
                  size="lg"
                  onClick={handleReset}
                >
                  Start New Round
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
