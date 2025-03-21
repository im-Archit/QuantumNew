import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/home/hero-section"
import DiseaseCards from "@/components/home/disease-cards"
import AboutSection from "@/components/home/about-section"
import HowItWorks from "@/components/home/how-it-works"
import ContributionSection from "@/components/home/contribution-section"
import TeamSection from "@/components/home/team-section"
import ChatbotButton from "@/components/chatbot/chatbot-button"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <DiseaseCards />
      <AboutSection />
      <HowItWorks />
      <ContributionSection />
      <TeamSection />
      <Footer />
      <Suspense fallback={null}>
        <ChatbotButton />
      </Suspense>
    </main>
  )
}

