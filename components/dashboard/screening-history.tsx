"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, ArrowUpDown } from "lucide-react"

// Mock data for demonstration
const mockScreenings = [
  {
    id: "scr-001",
    disease: "Heart Disease",
    date: "2023-12-15",
    result: "Low Risk",
    score: 0.23,
    status: "completed",
  },
  {
    id: "scr-002",
    disease: "Diabetes",
    date: "2023-11-28",
    result: "Medium Risk",
    score: 0.58,
    status: "completed",
  },
  {
    id: "scr-003",
    disease: "Kidney Disease",
    date: "2023-10-05",
    result: "Low Risk",
    score: 0.12,
    status: "completed",
  },
]

export default function ScreeningHistory() {
  const [screenings] = useState(mockScreenings)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const sortedScreenings = [...screenings].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getRiskColor = (result: string) => {
    switch (result) {
      case "Low Risk":
        return "text-green-600 bg-green-50"
      case "Medium Risk":
        return "text-amber-600 bg-amber-50"
      case "High Risk":
        return "text-red-600 bg-red-50"
      default:
        return "text-slate-600 bg-slate-50"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Screening History</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1" onClick={toggleSortOrder}>
          <Calendar className="h-4 w-4" />
          Sort by Date
          <ArrowUpDown className="h-3 w-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        {screenings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No screening history available yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Complete your first screening to see results here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedScreenings.map((screening) => (
              <div
                key={screening.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-start gap-3 mb-3 sm:mb-0">
                  <div className="bg-slate-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{screening.disease}</h3>
                    <p className="text-sm text-muted-foreground">{formatDate(screening.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(screening.result)}`}>
                    {screening.result}
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

