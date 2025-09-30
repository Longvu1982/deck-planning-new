"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "@/components/ui/chart"

interface User {
  id: string
  name: string
  vote: string | null
  isHost: boolean
  color: string
  isSpectator?: boolean
}

interface VoteChartProps {
  users: User[]
}

export function VoteChart({ users }: VoteChartProps) {
  // Define a colorful palette for the chart bars
  const colorPalette = [
    { from: "#8b5cf6", to: "#6d28d9" }, // Purple
    { from: "#06b6d4", to: "#0891b2" }, // Cyan
    { from: "#10b981", to: "#059669" }, // Emerald
    { from: "#f59e0b", to: "#d97706" }, // Amber
    { from: "#ef4444", to: "#dc2626" }, // Red
    { from: "#ec4899", to: "#db2777" }, // Pink
    { from: "#3b82f6", to: "#2563eb" }, // Blue
    { from: "#84cc16", to: "#65a30d" }, // Lime
  ]

  // Process the vote data for the chart
  const chartData = useMemo(() => {
    // Count votes
    const voteCounts: Record<string, number> = {}

    users
      .filter((user) => !user.isSpectator && user.vote !== null)
      .forEach((user) => {
        if (user.vote) {
          voteCounts[user.vote] = (voteCounts[user.vote] || 0) + 1
        }
      })

    // Sort by vote value (numeric first, then special values)
    const sortedVotes = Object.entries(voteCounts).sort((a, b) => {
      const aNum = Number.parseInt(a[0])
      const bNum = Number.parseInt(b[0])

      if (isNaN(aNum) && isNaN(bNum)) return 0
      if (isNaN(aNum)) return 1
      if (isNaN(bNum)) return -1
      return aNum - bNum
    })

    // Format data for the chart
    return sortedVotes.map(([vote, count], index) => ({
      value: vote,
      count: count,
      percentage: Math.round((count / users.filter((u) => !u.isSpectator && u.vote !== null).length) * 100),
      colorIndex: index % colorPalette.length,
    }))
  }, [users])

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const colorIndex = payload[0].payload.colorIndex
      const { from, to } = colorPalette[colorIndex]

      return (
        <div className="backdrop-blur-md bg-white/80 border border-white/50 shadow-md rounded-lg p-2 text-sm">
          <div className="font-medium text-slate-700 mb-1 flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ background: `linear-gradient(to bottom right, ${from}, ${to})` }}
            />
            <span>{`Value: ${payload[0].payload.value}`}</span>
          </div>
          <p className="text-slate-600">{`Votes: ${payload[0].value}`}</p>
          <p className="text-slate-600">{`${payload[0].payload.percentage}% of total`}</p>
        </div>
      )
    }
    return null
  }

  // If no votes, show a message
  if (chartData.length === 0) {
    return <div className="flex items-center justify-center h-40 text-slate-500">No votes to display</div>
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="value" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <motion.rect
                key={`bar-${index}`}
                initial={{ y: 300, height: 0 }}
                animate={{ y: 0, height: undefined }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.2,
                }}
                fill={`url(#barGradient-${entry.colorIndex})`}
              />
            ))}
          </Bar>
          {/* Gradients for bars */}
          <defs>
            {colorPalette.map((color, index) => (
              <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color.from} />
                <stop offset="100%" stopColor={color.to} />
              </linearGradient>
            ))}
          </defs>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap justify-center mt-4 gap-x-4 gap-y-2">
        {chartData.map((item, index) => {
          const colorIndex = item.colorIndex
          const { from, to } = colorPalette[colorIndex]

          return (
            <div key={index} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: `linear-gradient(to bottom right, ${from}, ${to})` }}
              />
              <span className="text-xs text-slate-600">
                {item.value}: {item.count} vote{item.count !== 1 ? "s" : ""} ({item.percentage}%)
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
