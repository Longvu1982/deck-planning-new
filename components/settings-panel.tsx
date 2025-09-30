"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, MessageSquare, Clock, Eye } from "lucide-react";

interface User {
  id: string;
  name: string;
  vote: string | null;
  isHost: boolean;
  color: string;
  isSpectator: boolean;
}

interface SettingsProps {
  settings: {
    enableSpectators: boolean;
    showChat: boolean;
    autoReveal: boolean;
    timerEnabled: boolean;
    timerDuration: number;
  };
  users: User[];
  isHost: boolean;
  onUpdateSettings: (newSettings: Partial<SettingsProps["settings"]>) => void;
  onClose: () => void;
  onToggleSpectator: (userId: string) => void;
}

export function SettingsPanel({
  settings,
  onUpdateSettings,
  onClose,
  users,
  onToggleSpectator,
  isHost,
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed sm:absolute inset-4 sm:inset-auto sm:right-0 sm:top-24 z-50 sm:w-full sm:max-w-md backdrop-blur-md bg-white/60 border border-white/50 shadow-xl rounded-xl p-4 overflow-auto max-h-[90vh] sm:max-h-[600px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
          Session Settings
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X size={16} />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-white/40">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="timer">Timer</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-700 flex items-center gap-2">
                <MessageSquare size={16} />
                Show Chat
              </Label>
              <p className="text-xs text-slate-500">
                Enable chat during the session
              </p>
            </div>
            <Switch
              checked={settings.showChat}
              onCheckedChange={(checked) =>
                onUpdateSettings({ showChat: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-700 flex items-center gap-2">
                <Eye size={16} />
                Enable Spectators
              </Label>
              <p className="text-xs text-slate-500">
                Allow users to observe without voting
              </p>
            </div>
            <Switch
              checked={settings.enableSpectators}
              onCheckedChange={(checked) =>
                onUpdateSettings({ enableSpectators: checked })
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="participants" className="space-y-4">
          <div className="text-sm text-slate-500 mb-2">
            {settings.enableSpectators
              ? "Toggle users between voter and spectator mode"
              : "Enable spectator mode in General settings to manage participants"}
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-lg bg-white/40 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Avatar className="h-8 w-8 border border-white/50 flex-shrink-0">
                    <AvatarFallback className={user.color}>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-slate-700 truncate">{user.name}</span>
                  {user.isHost && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-amber-100/50 text-amber-800 border-amber-200 flex-shrink-0"
                    >
                      Host
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {user.isSpectator ? (
                    <Badge
                      variant="outline"
                      className="bg-slate-100/50 text-slate-700 hidden sm:inline-flex"
                    >
                      Spectator
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-emerald-100/50 text-emerald-700 hidden sm:inline-flex"
                    >
                      Voter
                    </Badge>
                  )}

                  {settings.enableSpectators && (
                    <Switch
                      checked={!user.isSpectator}
                      onCheckedChange={() => onToggleSpectator(user.id)}
                      disabled={
                        !settings.enableSpectators || (user.isHost && !isHost)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timer" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-700 flex items-center gap-2">
                <Clock size={16} />
                Enable Timer
              </Label>
              <p className="text-xs text-slate-500">
                Set a time limit for voting
              </p>
            </div>
            <Switch
              checked={settings.timerEnabled}
              onCheckedChange={(checked) =>
                onUpdateSettings({ timerEnabled: checked })
              }
            />
          </div>

          {settings.timerEnabled && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-slate-700">
                  Timer Duration: {settings.timerDuration} seconds
                </Label>
              </div>
              <Slider
                value={[settings.timerDuration]}
                min={5}
                max={120}
                step={5}
                onValueChange={(value) =>
                  onUpdateSettings({ timerDuration: value[0] })
                }
                className="py-4"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>5s</span>
                <span>60s</span>
                <span>120s</span>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
