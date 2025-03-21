"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useInView, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export default function HeroSection() {
  const { isSignedIn } = useUser()
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.8 },
    },
  }

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 hero-pattern relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Early Disease Detection <span className="gradient-text">Saves Lives</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            QuantumDiagnose uses advanced AI to screen for heart disease, kidney disease, liver disease, and diabetes
            with unprecedented accuracy, helping you take control of your health before symptoms appear.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={isSignedIn ? "/dashboard" : "#diseases"}>
              <Button size="lg" className="gap-2">
                Start Screening <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={statsVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { disease: "Kidney", accuracy: "100%" },
              { disease: "Liver", accuracy: "99.64%" },
              { disease: "Heart", accuracy: "86.72%" },
              { disease: "Diabetes", accuracy: "77.08%" },
            ].map((item) => (
              <div
                key={item.disease}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-slate-100"
              >
                <h3 className="text-sm text-muted-foreground font-medium">{item.disease} Disease</h3>
                <p className="text-2xl md:text-3xl font-bold gradient-text">{item.accuracy}</p>
                <p className="text-xs text-muted-foreground">Accuracy Rate</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Abstract background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
    </section>
  )
}

