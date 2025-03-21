"use client"

import { useState, useCallback } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

export function useGeminiChat() {
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (message: string): Promise<string> => {
    setIsLoading(true)

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

      // Create a chat session
      const model = genAI.getGenerativeModel({
        model: process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-pro",
        systemInstruction: `You are QuantumAssist, an AI medical assistant for the QuantumDiagnose platform. 
        
        About QuantumDiagnose:
        - It's a platform for screening heart disease, kidney disease, liver disease, and diabetes
        - The accuracy rates are: 100% for kidney, 99.64% for liver, 86.72% for heart, 77.08% for diabetes
        - The platform uses machine learning models to predict disease risk
        
        Your role:
        - Provide helpful, accurate information about the diseases covered by the platform
        - Explain how the screening process works
        - Answer questions about the research and technology
        - Provide general health information
        
        Important guidelines:
        - Always clarify you are an AI assistant, not a doctor
        - Include a disclaimer when providing health information
        - Be conversational, empathetic, and professional
        - Keep responses concise (under 150 words when possible)
        - If you don't know something, say so rather than making up information
        - Never provide specific medical advice or diagnosis
        - Refer users to healthcare professionals for personal medical concerns
        
        Remember: You are representing QuantumDiagnose, so maintain a helpful, professional tone.`,
      })

      const chat = model.startChat({
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      })

      const result = await chat.sendMessage(message)
      const response = result.response.text()

      return response
    } catch (error) {
      console.error("Error with Gemini API:", error)
      return "I'm sorry, I encountered an error. Please try again later."
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { sendMessage, isLoading }
}

