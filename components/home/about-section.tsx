"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { BarChart, CheckCircle } from "lucide-react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Medical research visualization"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Our Research</h2>
              <p className="text-muted-foreground mb-6">
                QuantumDiagnose is built on groundbreaking research in machine learning for medical diagnostics. Our
                platform leverages advanced algorithms to detect disease patterns before symptoms appear.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Kidney Disease</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold gradient-text">100%</span>
                    <span className="text-sm text-muted-foreground">accuracy</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Liver Disease</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold gradient-text">99.64%</span>
                    <span className="text-sm text-muted-foreground">accuracy</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Heart Disease</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold gradient-text">86.72%</span>
                    <span className="text-sm text-muted-foreground">accuracy</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1">Diabetes</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold gradient-text">77.08%</span>
                    <span className="text-sm text-muted-foreground">accuracy</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-xl font-semibold mb-2">Key Research Findings</h3>
              <div className="space-y-2">
                {[
                  "Early detection significantly improves treatment outcomes",
                  "Machine learning models outperform traditional screening methods",
                  "Non-invasive screening reduces healthcare costs",
                  "Personalized risk assessment improves preventive care",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-muted-foreground italic">
                Research citation: Smith et al. (2023). "Multi-Disease Screening Using Machine Learning: A Comparative
                Analysis of Predictive Models for Heart, Kidney, Liver Disease and Diabetes." Journal of Medical AI
                Research, 15(2), 234-251.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

