import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, Crown } from "lucide-react"

interface User {
  id: string
  name: string
  vote: string | null
  isHost: boolean
}

interface UserListProps {
  users: User[]
  revealed: boolean
}

export function UserList({ users, revealed }: UserListProps) {
  return (
    <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-700">Team Members</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-white/50">
          {users.map((user) => (
            <li key={user.id} className="flex items-center justify-between p-4 hover:bg-white/30 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="border border-white/50">
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-cyan-100 text-slate-700">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center gap-1 text-slate-700">
                    {user.name}
                    {user.isHost && <Crown size={14} className="text-amber-500" />}
                  </div>
                </div>
              </div>
              <div>
                {user.vote ? (
                  revealed ? (
                    <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 border-0">{user.vote}</Badge>
                  ) : (
                    <Badge variant="outline" className="backdrop-blur-sm bg-white/40 border-white/50">
                      <Check size={14} />
                    </Badge>
                  )
                ) : (
                  <Badge variant="outline" className="backdrop-blur-sm bg-white/40 border-white/50 text-slate-400">
                    Waiting
                  </Badge>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
