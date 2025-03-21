"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ClipboardList, Brain, LineChart, Lightbulb } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Input Health Data",
    description: "Enter your health metrics, medical history, and lifestyle factors through our secure interface.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our advanced machine learning models analyze your data against patterns from thousands of clinical cases.",
  },
  {
    icon: LineChart,
    title: "Risk Assessment",
    description: "Receive a personalized risk assessment showing your likelihood of developing each disease.",
  },
  {
    icon: Lightbulb,
    title: "Recommendations",
    description: "Get actionable recommendations based on your results to improve your health outcomes.",
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Our platform uses a simple four-step process to provide you with accurate disease screening and personalized
            health recommendations.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary hidden md:block" />

          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white z-10 relative">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -inset-2 bg-white rounded-full shadow-sm border border-slate-100 -z-10" />
                  </div>
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

