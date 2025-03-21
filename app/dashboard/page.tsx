
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import ScreeningHistory from "@/components/dashboard/screening-history"
import HealthMetrics from "@/components/dashboard/health-metrics"
import RecommendedScreenings from "@/components/dashboard/recommended-screenings"
import ChatbotButton from "@/components/chatbot/chatbot-button"
import { Suspense } from "react"

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <DashboardHeader user={user} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <RecommendedScreenings />
              <ScreeningHistory />
            </div>
            <div className="space-y-6">
              <HealthMetrics />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatbotButton />
      </Suspense>
    </div>
  )
}


// import { redirect } from "next/navigation"
// import { currentUser } from "@clerk/nextjs"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import DashboardHeader from "@/components/dashboard/dashboard-header"
// import ScreeningHistory from "@/components/dashboard/screening-history"
// import HealthMetrics from "@/components/dashboard/health-metrics"
// import RecommendedScreenings from "@/components/dashboard/recommended-screenings"
// import ChatbotButton from "@/components/chatbot/chatbot-button"
// import { Suspense } from "react"

// export default async function DashboardPage() {
//   const user = await currentUser()

//   if (!user) {
//     redirect("/")
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-24 pb-16">
//         <div className="container mx-auto px-4">
//           <DashboardHeader user={user} />

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
//             <div className="lg:col-span-2 space-y-6">
//               <RecommendedScreenings />
//               <ScreeningHistory />
//             </div>
//             <div className="space-y-6">
//               <HealthMetrics />
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//       <Suspense fallback={null}>
//         <ChatbotButton />
//       </Suspense>
//     </div>
//   )
// }

