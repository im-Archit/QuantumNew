"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface ChatbotContextType {
  isOpen: boolean
  messages: ChatMessage[]
  openChat: () => void
  closeChat: () => void
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider")
  }
  return context
}

interface ChatbotProviderProps {
  children: ReactNode
}

export default function ChatbotProvider({ children }: ChatbotProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm QuantumAssist, your medical AI assistant. How can I help you today?",
    },
  ])

  const openChat = () => setIsOpen(true)
  const closeChat = () => setIsOpen(false)

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const clearMessages = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm QuantumAssist, your medical AI assistant. How can I help you today?",
      },
    ])
  }

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        messages,
        openChat,
        closeChat,
        addMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}

