"use client";

import { ChatPanel } from "@/components/chat-panel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ESelectionStatus, UserSelection } from "@/liveblocks.config";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, Crown, User } from "lucide-react";
import useLocalStorage from "use-local-storage";
import { Badge } from "./ui/badge";

const colorPack = [
  "bg-gradient-to-br from-purple-400 to-purple-600",
  "bg-gradient-to-br from-cyan-400 to-cyan-600",
  "bg-gradient-to-br from-emerald-400 to-emerald-600",
  "bg-gradient-to-br from-amber-400 to-amber-600",
  "bg-gradient-to-br from-rose-400 to-rose-600",
  "bg-gradient-to-br from-sky-400 to-sky-600",
  "bg-gradient-to-br from-indigo-400 to-indigo-600",
  "bg-gradient-to-br from-green-400 to-green-600",
  "bg-gradient-to-br from-slate-400 to-slate-600",
];

interface VirtualTableProps {
  users: UserSelection[];
  revealed: boolean;
  average: string | null;
  showChat?: boolean;
}

function SelectingAnimation() {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-600"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// Update the VirtualTable component to be more responsive
export function VirtualTable({
  users,
  revealed,
  average,
  showChat = false,
}: VirtualTableProps) {
  const [currentUserName] = useLocalStorage("currentUserName", "");

  // Calculate positions around the table
  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const x = Math.cos(angle) * 100;
    const y = Math.sin(angle) * 100;
    return { x, y };
  };


  return (
    <div className="w-full relative mb-20">
      {/* Make the container responsive but maintain aspect ratio */}
      <div className="aspect-square max-w-[500px] mx-auto">
        {/* Table */}
        <div className="absolute inset-[15%] flex items-center justify-center">
          <div
            className={cn(
              "w-full h-full backdrop-blur-md bg-white/40 border border-white/50 shadow-lg rounded-full"
            )}
          >
            {/* Average score in the middle */}
            {revealed && average && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600"
                >
                  {average}
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Users around the table */}
        {users.map((user, index) => {
          const position = getPosition(index, users.length);
          return (
            <div
              key={user.name}
              className="absolute transition-all"
              style={{
                left: `calc(50% + ${position.x * 0.42}%)`,
                top: `calc(50% + ${position.y * 0.42}%)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2 transition-all">
                {/* User avatar */}
                <div className="relative transition-all">
                  <Avatar
                    className={cn(
                      "h-10 w-10 sm:h-16 sm:w-16 border-2 border-white/50 shadow-lg"
                    )}
                  >
                    <AvatarFallback
                      className={cn(
                        "text-white",
                        colorPack[index % colorPack.length]
                      )}
                    >
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {user.host && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-0.5 sm:p-1 shadow-md">
                      <Crown size={10} className="sm:hidden text-white" />
                      <Crown size={14} className="hidden sm:block text-white" />
                    </span>
                  )}
                  {user.name === currentUserName && (
                    // <span className="absolute -top-1 -left-1 bg-amber-400 rounded-full p-0.5 sm:p-1 shadow-md">
                    //   <User size={10} className="sm:hidden text-white" />
                    // </span>
                    <Badge  className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-600 border-0 hover:opacity-90">
                      you
                    </Badge>
                  )}
                </div>

                {/* User name */}
                <div className="text-xs sm:text-sm font-medium text-slate-700 backdrop-blur-sm bg-white/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full truncate max-w-[80px] sm:max-w-[120px]">
                  {user.name}
                </div>

                {/* Card */}
                <AnimatePresence>
                  {(user.status === ESelectionStatus.SELECTING ||
                    user.status === ESelectionStatus.DONE) && (
                    <motion.div
                      initial={{ y: 20, opacity: 0, rotateY: 180 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        rotateY: revealed ? 0 : 180,
                        scale: 1,
                        transition: { delay: index * 0.1 },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: { delay: index * 0.1 },
                      }}
                      className="w-8 h-12 sm:w-12 sm:h-16 rounded-lg flex items-center justify-center font-bold shadow-md relative"
                    >
                      <div className="absolute inset-0 backface-hidden">
                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center overflow-hidden">
                          {revealed && user.value != null && (
                            <motion.div
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                              }}
                              transition={{
                                delay: index * 0.1 + 0.2,
                                type: "spring",
                                stiffness: 200,
                              }}
                              className="relative"
                            >
                              <motion.div
                                className="absolute inset-0 blur-sm bg-white/30 rounded-full"
                                animate={{
                                  scale: [1.2, 1.5, 1.2],
                                  opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "reverse",
                                }}
                              />
                              <div className="relative text-white text-base sm:text-lg font-bold drop-shadow-md">
                                {user.value}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "absolute inset-0 backface-hidden",
                          revealed && "hidden"
                        )}
                        style={{ transform: "rotateY(180deg)" }}
                      >
                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                          {user.status === ESelectionStatus.SELECTING ? (
                            <SelectingAnimation />
                          ) : (
                            <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                              <CheckIcon
                                size={30}
                                className="text-green-600 font-bold"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat panel - make it responsive */}
      {showChat && (
        <div className="mt-6 sm:mt-0 sm:absolute sm:-right-4 sm:top-1/2 sm:-translate-y-1/2 w-full sm:w-64">
          <ChatPanel />
        </div>
      )}
    </div>
  );
}
