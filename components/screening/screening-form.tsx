"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ScreeningFormProps {
  disease: string
  streamlitUrl: string
}

export default function ScreeningForm({ disease, streamlitUrl }: ScreeningFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Streamlit Integration</h2>
          <p className="text-muted-foreground">
            This screening tool is powered by Streamlit. Click the button below to open the screening tool.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
          <p className="text-center mb-4">The screening form will be loaded from Streamlit in a new tab.</p>
          <a href={streamlitUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" onClick={() => setIsLoading(true)} disabled={isLoading}>
              {isLoading ? "Loading..." : "Open Screening Tool"}
            </Button>
          </a>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>Note:</strong> The screening tool will open in a new tab. After completing the screening, you can
            return to this page to view your results.
          </p>
          <p>
            <strong>Privacy:</strong> Your health data is processed securely and is not stored unless you explicitly
            save your results.
          </p>
        </div>
      </Card>

      <div className="flex justify-between">
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

