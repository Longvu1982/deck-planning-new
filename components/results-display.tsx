"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface User {
  id: string
  name: string
  vote: string | null
  isHost: boolean
}

interface ResultsDisplayProps {
  users: User[]
}

export function ResultsDisplay({ users }: ResultsDisplayProps) {
  const results = useMemo(() => {
    // Count votes
    const voteCounts: Record<string, number> = {}
    let totalNumericVotes = 0
    let numericVoteCount = 0

    users.forEach((user) => {
      if (user.vote) {
        voteCounts[user.vote] = (voteCounts[user.vote] || 0) + 1

        // Calculate average for numeric votes
        const numericVote = Number.parseInt(user.vote)
        if (!isNaN(numericVote)) {
          totalNumericVotes += numericVote
          numericVoteCount++
        }
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

    const average = numericVoteCount > 0 ? Math.round((totalNumericVotes / numericVoteCount) * 10) / 10 : null

    return {
      voteCounts: sortedVotes,
      average,
      totalVotes: users.filter((u) => u.vote).length,
      maxVoteCount: Math.max(...Object.values(voteCounts)),
    }
  }, [users])

  return (
    <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between text-slate-700">
          <span>Results</span>
          {results.average !== null && (
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600 font-bold">
              Average: {results.average}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {results.voteCounts.map(([vote, count]) => (
            <div key={vote} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">{vote}</span>
                <span className="text-slate-500">
                  {count} vote{count !== 1 ? "s" : ""} ({Math.round((count / results.totalVotes) * 100)}%)
                </span>
              </div>
              <Progress
                value={(count / results.maxVoteCount) * 100}
                className="h-2 bg-white/30"
                indicatorClassName="bg-gradient-to-r from-purple-600 to-cyan-600"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
