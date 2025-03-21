"use client"

import { useEffect, useState } from "react"
import { MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useChatbot } from "./chatbot-provider"
import ChatbotDialog from "./chatbot-dialog"

export default function ChatbotButton() {
  const { isOpen, openChat } = useChatbot()
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    // Show pulse animation after 30 seconds of inactivity
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPulse(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [isOpen])

  const handleClick = () => {
    setShowPulse(false)
    openChat()
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-lg flex items-center justify-center ${
              showPulse ? "animate-pulse-light" : ""
            }`}
            aria-label="Open chat assistant"
          >
            <MessageSquare className="h-6 w-6" />
            {showPulse && (
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-accent animate-bounce-light" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <ChatbotDialog />
    </>
  )
}

