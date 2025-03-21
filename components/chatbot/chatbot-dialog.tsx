"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChatbot } from "./chatbot-provider"
import { cn } from "@/lib/utils"
import { useGeminiChat } from "@/hooks/use-gemini-chat"

export default function ChatbotDialog() {
  const { isOpen, closeChat, messages, addMessage } = useChatbot()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  const { sendMessage, isLoading } = useGeminiChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [isOpen, messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    addMessage(userMessage)
    setInput("")

    try {
      // Get response from Gemini
      const response = await sendMessage(input)

      // Add assistant message
      addMessage({
        role: "assistant",
        content: response,
      })
    } catch (error) {
      console.error("Error sending message to Gemini:", error)
      addMessage({
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 right-0 z-50 w-full sm:w-[400px] md:w-[450px] sm:right-6 sm:bottom-6"
        >
          <div className="flex flex-col h-[600px] sm:h-[500px] bg-white rounded-t-lg sm:rounded-lg shadow-xl border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h2 className="font-semibold">QuantumAssist</h2>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
                  onClick={toggleMinimize}
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
                  onClick={closeChat}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex gap-3 max-w-[85%]",
                          message.role === "assistant" ? "self-start" : "self-end ml-auto",
                        )}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "rounded-lg p-3",
                            message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground",
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 max-w-[85%] self-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="rounded-lg p-3 bg-muted">
                          <div className="flex space-x-2">
                            <div
                              className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            />
                            <div
                              className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            />
                            <div
                              className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick access buttons */}
                  <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                    {[
                      "How accurate is the screening?",
                      "What is heart disease?",
                      "How does the AI work?",
                      "Is my data private?",
                    ].map((q) => (
                      <button
                        key={q}
                        className="px-3 py-1 text-xs bg-muted rounded-full whitespace-nowrap hover:bg-muted/80 transition-colors"
                        onClick={() => {
                          setInput(q)
                          inputRef.current?.focus()
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSubmit} className="p-4 border-t">
                    <div className="flex gap-2">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="flex-1 resize-none border rounded-md p-2 h-10 max-h-32 focus:outline-none focus:ring-1 focus:ring-primary"
                        rows={1}
                      />
                      <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="h-10 w-10">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-center text-muted-foreground">
                      <p>Powered by Google Gemini • Not a substitute for medical advice</p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

