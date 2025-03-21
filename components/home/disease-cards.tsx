"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SignInButton, useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Heart, BabyIcon as Kidney, Activity, Droplet, Lock, ArrowRight } from "lucide-react"

const diseases = [
  {
    id: "heart",
    name: "Heart Disease",
    description: "Screen for cardiovascular conditions using clinical and lifestyle data.",
    accuracy: "86.72%",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
    url: "https://heartdisease-byarchit.streamlit.app",
  },
  {
    id: "kidney",
    name: "Kidney Disease",
    description: "Detect chronic kidney disease through blood and urine markers.",
    accuracy: "100%",
    icon: Kidney,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    url: "https://kidney-byarchit.streamlit.app",
  },
  {
    id: "liver",
    name: "Liver Disease",
    description: "Identify liver disorders using enzyme levels and patient data.",
    accuracy: "99.64%",
    icon: Activity,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    url: "https://liverdiseaseprediction-byarchit.streamlit.app",
  },
  {
    id: "diabetes",
    name: "Diabetes",
    description: "Assess diabetes risk based on glucose levels and health factors.",
    accuracy: "77.08%",
    icon: Droplet,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    url: "https://diabetesprediction-byarchit.streamlit.app",
  },
]

export default function DiseaseCards() {
  const { isSignedIn } = useUser()
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const handleCardClick = (id: string) => {
    if (!isSignedIn) {
      setActiveModal(id)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <section id="diseases" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Disease Screening</h2>
          <p className="text-muted-foreground">
            Our platform offers screening for four major diseases with high accuracy rates. Select a disease to begin
            the screening process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diseases.map((disease, index) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full border ${disease.borderColor} transition-all duration-300 hover:shadow-md ${!isSignedIn ? "cursor-pointer" : ""}`}
                onClick={() => !isSignedIn && handleCardClick(disease.id)}
              >
                <CardHeader className={`${disease.bgColor} rounded-t-lg`}>
                  <div className="flex justify-between items-start">
                    <disease.icon className={`h-8 w-8 ${disease.color}`} />
                    {!isSignedIn && <Lock className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <CardTitle className="mt-2">{disease.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{disease.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Accuracy:</span>
                    <span className="text-sm font-bold gradient-text">{disease.accuracy}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  {isSignedIn ? (
                    <Link href={`/screening/${disease.id}`} className="w-full">
                      <Button className="w-full gap-2">
                        Start Screening <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => handleCardClick(disease.id)}>
                      Sign in to Access
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Auth Modal */}
        {activeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Authentication Required</h3>
                <p className="text-muted-foreground">
                  Please sign in to access {diseases.find((d) => d.id === activeModal)?.name} screening.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <SignInButton mode="modal" redirectUrl={`/screening/${activeModal}`}>
                  <Button className="w-full">Sign In</Button>
                </SignInButton>
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

