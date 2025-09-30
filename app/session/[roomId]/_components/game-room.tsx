"use client";

import { SettingsPanel } from "@/components/settings-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { VirtualTable } from "@/components/virtual-table";
import { EState, UserSelection } from "@/liveblocks.config";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useLocalStorage from "use-local-storage";

const maxCardValue = 6;
export default function SessionPage() {
  const [currentUserName] = useLocalStorage("currentUserName", "");
  const roomInfo = useStorage((state) => state.roomInfo);
  const users = useStorage((state) => state.selections);
  const gameState = useStorage((state) => state.gameState);

  const [isHost, setIsHost] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    enableSpectators: false,
    autoReveal: false,
    timerEnabled: false,
    timerDuration: 30,
  });

  const currentSelected = users?.find(
    (item) => item.name === currentUserName
  )?.value;

  const userIndex = users.findIndex((item) => item.name === currentUserName);

  const onSelect = useMutation(
    ({ storage }, value: number) => {
      if (gameState.state === EState.REVEALED) return;
      const currentUserSelect = storage.get("selections").get(userIndex);
      currentUserSelect?.set(
        "value",
        currentUserSelect?.get("value") === value ? null : value
      );
    },
    [gameState, userIndex]
  );

  const handleReveal = useMutation(({ storage }) => {
    const gameStateStorage = storage.get("gameState");
    gameStateStorage.set("state", EState.REVEALED);
  }, []);

  const handleReset = useMutation(({ storage }) => {
    const gameStateStorage = storage.get("gameState");
    gameStateStorage.set("state", EState.PENDING);

    const selections = storage.get("selections");
    selections.forEach((item) => item.set("value", null));
  }, []);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Calculate average of numeric votes
  const calculateAverage = () => {
    const numericVotes = users
      .map((user) => user.value ?? 0)
      .filter((vote) => !isNaN(vote));

    if (numericVotes.length === 0) return null;

    const sum = numericVotes.reduce((acc, val) => acc + val, 0);
    return (sum / numericVotes.length).toFixed(1);
  };

  const average =
    gameState.state === EState.REVEALED ? calculateAverage() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 backdrop-blur-sm bg-white/30 p-4 rounded-xl border border-white/50 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
              Planning Session: {roomInfo.name}
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
                className={`gap-1 ${
                  showSettings ? "bg-white/60" : "bg-white/40"
                } backdrop-blur-sm border-white/50 hover:bg-white/60`}
                onClick={toggleSettings}
              >
                <Settings size={14} />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className={
                "backdrop-blur-sm border-white/50 bg-white/40 hover:bg-white/60"
              }
            >
              <Link href="/">
                <div className="flex gap-1 items-center">
                  <Home size={14} />
                  <span className="hidden sm:inline">Home</span>
                </div>
              </Link>
            </Button>
          </div>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
            settings={settings}
            onUpdateSettings={updateSettings}
            onClose={toggleSettings}
            isHost={isHost}
          />
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="relative">
            <VirtualTable
              users={users as UserSelection[]}
              revealed={gameState.state === EState.REVEALED}
              average={average}
            />
          </div>

          {/* Slider Label */}
          <div className="flex justify-between">
            {Array(maxCardValue + 1)
              .fill(null)
              .map((_, i) => (
                <span key={i}>{i}</span>
              ))}
          </div>

          <Slider
            defaultValue={[0]}
            max={maxCardValue}
            step={0.5}
            className=""
            value={[currentSelected ?? 0]}
            onValueChange={(value) => onSelect(value[0])}
          />

          {isHost && (
            <div className="flex gap-3">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90"
                size="lg"
                onClick={handleReveal}
                disabled={gameState.state === EState.REVEALED}
              >
                Reveal Cards
              </Button>
              {gameState.state === EState.REVEALED && (
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
