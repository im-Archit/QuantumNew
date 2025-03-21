"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Activity } from "lucide-react"

const recommendedScreenings = [
  {
    id: "heart",
    name: "Heart Disease",
    description: "Recommended based on your age and family history",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: "liver",
    name: "Liver Disease",
    description: "Recommended for annual checkup",
    icon: Activity,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
]

export default function RecommendedScreenings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recommended Screenings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedScreenings.map((screening) => (
            <div
              key={screening.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-start gap-3 mb-3 sm:mb-0">
                <div className={`p-2 rounded-full ${screening.bgColor}`}>
                  <screening.icon className={`h-5 w-5 ${screening.color}`} />
                </div>
                <div>
                  <h3 className="font-medium">{screening.name}</h3>
                  <p className="text-sm text-muted-foreground">{screening.description}</p>
                </div>
              </div>
              <Link href={`/screening/${screening.id}`}>
                <Button size="sm">Start Screening</Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

