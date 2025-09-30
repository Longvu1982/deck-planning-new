"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  sender: string
  content: string
  color: string
  timestamp: Date
}

export function ChatPanel() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Alice",
      content: "I think this story is pretty straightforward",
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      sender: "Bob",
      content: "I'm not sure about the edge cases though",
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: "3",
      sender: "You",
      content: "Good point, let's discuss after voting",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: message,
        color: "bg-gradient-to-br from-purple-400 to-purple-600",
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="backdrop-blur-md bg-white/60 border border-white/50 shadow-lg rounded-xl h-[300px] sm:h-[400px] flex flex-col"
    >
      <div className="p-2 sm:p-3 border-b border-white/50">
        <h3 className="font-medium text-slate-700">Team Chat</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 sm:space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.sender === "You" ? "justify-end" : "justify-start")}>
            <div className="flex gap-1 sm:gap-2 max-w-[85%]">
              {msg.sender !== "You" && (
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border border-white/50">
                  <AvatarFallback className={msg.color}>{msg.sender.charAt(0)}</AvatarFallback>
                </Avatar>
              )}

              <div>
                <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                  {msg.sender !== "You" && <span className="text-xs font-medium text-slate-700">{msg.sender}</span>}
                  <span className="text-xs text-slate-500">{formatTime(msg.timestamp)}</span>
                </div>

                <div
                  className={cn(
                    "rounded-lg p-1.5 sm:p-2 text-xs sm:text-sm",
                    msg.sender === "You"
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                      : "bg-white/50 text-slate-700",
                  )}
                >
                  {msg.content}
                </div>
              </div>

              {msg.sender === "You" && (
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border border-white/50">
                  <AvatarFallback className={msg.color}>{msg.sender.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 sm:p-3 border-t border-white/50">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
        >
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white/50 border-white/50 text-sm"
          />
          <Button type="submit" size="icon" className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white h-9 w-9">
            <Send size={16} />
          </Button>
        </form>
      </div>
    </motion.div>
  )
}
