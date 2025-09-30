"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Crown, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatPanel } from "@/components/chat-panel"

interface User {
  id: string
  name: string
  vote: string | null
  isHost: boolean
  color: string
  isSpectator?: boolean
}

interface VirtualTableProps {
  users: User[]
  revealed: boolean
  shape: "round" | "square"
  average: string | null
  showChat?: boolean
}

// Update the VirtualTable component to be more responsive
export function VirtualTable({ users, revealed, shape, average, showChat = false }: VirtualTableProps) {
  // Calculate positions around the table
  const getPosition = (index: number, total: number) => {
    if (shape === "round") {
      // For round table, position in a circle
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2 // Start from top
      const x = Math.cos(angle) * 100
      const y = Math.sin(angle) * 100
      return { x, y }
    } else {
      // For square table, position on the sides
      const sideLength = Math.ceil(total / 4) // How many users per side
      const side = Math.floor(index / sideLength) // Which side (0-3)
      const posInSide = index % sideLength // Position within the side
      const offset = 100 / sideLength // Spacing between users

      // Calculate position based on which side of the square
      switch (side) {
        case 0: // Top side
          return { x: -100 + (posInSide + 0.5) * offset * 2, y: -100 }
        case 1: // Right side
          return { x: 100, y: -100 + (posInSide + 0.5) * offset * 2 }
        case 2: // Bottom side
          return { x: 100 - (posInSide + 0.5) * offset * 2, y: 100 }
        case 3: // Left side
          return { x: -100, y: 100 - (posInSide + 0.5) * offset * 2 }
        default:
          return { x: 0, y: 0 }
      }
    }
  }

  return (
    <div className="w-full relative mb-8">
      {/* Make the container responsive but maintain aspect ratio */}
      <div className="aspect-square max-w-[600px] mx-auto">
        {/* Table */}
        <div className="absolute inset-[15%] flex items-center justify-center">
          <div
            className={cn(
              "w-full h-full backdrop-blur-md bg-white/40 border border-white/50 shadow-lg",
              shape === "round" ? "rounded-full" : "rounded-xl",
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
          const position = getPosition(index, users.length)

          return (
            <div
              key={user.id}
              className="absolute"
              style={{
                left: `calc(50% + ${position.x * 0.42}%)`,
                top: `calc(50% + ${position.y * 0.42}%)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                {/* User avatar */}
                <div className="relative">
                  <Avatar
                    className={cn(
                      "h-10 w-10 sm:h-16 sm:w-16 border-2 border-white/50 shadow-lg",
                      user.isSpectator && "opacity-70",
                    )}
                  >
                    <AvatarFallback className={cn("text-white", user.color)}>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.isHost && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-0.5 sm:p-1 shadow-md">
                      <Crown size={10} className="sm:hidden text-white" />
                      <Crown size={14} className="hidden sm:block text-white" />
                    </span>
                  )}
                  {user.isSpectator && (
                    <span className="absolute -bottom-1 -right-1 bg-slate-400 rounded-full p-0.5 sm:p-1 shadow-md">
                      <MessageSquare size={10} className="sm:hidden text-white" />
                      <MessageSquare size={14} className="hidden sm:block text-white" />
                    </span>
                  )}
                </div>

                {/* User name */}
                <div className="text-xs sm:text-sm font-medium text-slate-700 backdrop-blur-sm bg-white/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full truncate max-w-[80px] sm:max-w-[120px]">
                  {user.name}
                </div>

                {/* Card */}
                <AnimatePresence>
                  {user.vote && !user.isSpectator && (
                    <motion.div
                      initial={{ y: 20, opacity: 0, rotateY: 180 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        rotateY: revealed ? 0 : 180,
                        transition: { delay: index * 0.1 },
                      }}
                      className="w-8 h-12 sm:w-12 sm:h-16 rounded-lg flex items-center justify-center font-bold shadow-md relative"
                    >
                      <div className="absolute inset-0 backface-hidden">
                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center overflow-hidden">
                          {revealed && (
                            <motion.div
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                              }}
                              transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                              className="relative"
                            >
                              {/* Pulsing glow effect behind the number */}
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

                              {/* Card value with shadow for better readability */}
                              <div className="relative text-white text-base sm:text-2xl font-bold drop-shadow-md">
                                {user.vote}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(180deg)" }}>
                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                          <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/50 backdrop-blur-sm"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chat panel - make it responsive */}
      {showChat && (
        <div className="mt-6 sm:mt-0 sm:absolute sm:-right-4 sm:top-1/2 sm:-translate-y-1/2 w-full sm:w-64">
          <ChatPanel />
        </div>
      )}
    </div>
  )
}
