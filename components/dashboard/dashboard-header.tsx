import type { User } from "@clerk/nextjs/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Bell } from "lucide-react"

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const firstName = user.firstName || "User"

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {firstName}</h1>
          <p className="text-muted-foreground">Manage your health screenings and track your results</p>
        </div>
        <Link href="#diseases">
          <Button className="gap-2">
            New Screening <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 p-2 rounded-full">
              <Bell className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium">Complete Your Health Profile</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Adding more health information will improve your screening accuracy.
              </p>
              <Link href="/profile">
                <Button variant="link" className="h-auto p-0 text-primary">
                  Update Profile
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

