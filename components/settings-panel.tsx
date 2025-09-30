"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Clock, Eye, X } from "lucide-react";
import { useState } from "react";

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
    autoReveal: boolean;
    timerEnabled: boolean;
    timerDuration: number;
  };
  isHost: boolean;
  onUpdateSettings: (newSettings: Partial<SettingsProps["settings"]>) => void;
  onClose: () => void;
}

export function SettingsPanel({
  settings,
  onUpdateSettings,
  onClose,
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed sm:absolute inset-4 sm:inset-auto sm:right-0 sm:top-24 z-50 sm:w-full sm:max-w-[380px] backdrop-blur-md bg-white/60 border border-white/50 shadow-xl rounded-xl p-4 overflow-auto max-h-[90vh] sm:max-h-[600px]"
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
        <TabsList className="grid grid-cols-2 mb-4 bg-white/40">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="timer">Timer</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
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
