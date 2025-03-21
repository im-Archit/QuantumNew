"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Activity, Droplet, Scale } from "lucide-react"

// Mock data for demonstration
const healthMetrics = [
  {
    name: "Blood Pressure",
    value: "120/80",
    status: "normal",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    name: "Heart Rate",
    value: "72 bpm",
    status: "normal",
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    name: "Blood Glucose",
    value: "95 mg/dL",
    status: "normal",
    icon: Droplet,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "BMI",
    value: "23.4",
    status: "normal",
    icon: Scale,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
]

export default function HealthMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthMetrics.map((metric) => (
            <div key={metric.name} className="flex items-center gap-4 p-3 rounded-lg border">
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">{metric.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{metric.value}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600">{metric.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">Last updated: March 7, 2025</p>
        </div>
      </CardContent>
    </Card>
  )
}

