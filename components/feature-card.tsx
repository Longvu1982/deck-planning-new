import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="h-12 w-12 rounded-full bg-white/70 flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  )
}
