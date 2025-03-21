"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { loadStripe } from "@stripe/stripe-js"
import { useToast } from "@/components/ui/use-toast"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const donationOptions = [
  { amount: 5, label: "$5" },
  { amount: 10, label: "$10" },
  { amount: 25, label: "$25" },
  { amount: 50, label: "$50" },
  { amount: 100, label: "$100" },
  { amount: 250, label: "$250" },
]

export default function ContributionSection() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDonation = async (amount: number) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })

        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="donate" className="py-16 md:py-24 gradient-bg text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Heart className="h-12 w-12 mx-auto mb-6 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Research</h2>
            <p className="mb-8 text-white/90">
              Your contribution helps us improve our disease screening models and make early detection accessible to
              more people around the world.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {donationOptions.map((option) => (
                <Button
                  key={option.amount}
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                  onClick={() => handleDonation(option.amount)}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <p className="text-sm text-white/80">
              All donations are tax-deductible. You will receive a receipt for your records.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

