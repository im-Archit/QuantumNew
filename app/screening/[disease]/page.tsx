import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScreeningForm from "@/components/screening/screening-form"
import ChatbotButton from "@/components/chatbot/chatbot-button"
import { Suspense } from "react"

interface ScreeningPageProps {
  params: {
    disease: string
  }
}

export default async function ScreeningPage({ params }: ScreeningPageProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/")
  }

  const validDiseases = ["heart", "kidney", "liver", "diabetes"]

  if (!validDiseases.includes(params.disease)) {
    redirect("/dashboard")
  }

  const diseaseInfo = {
    heart: {
      name: "Heart Disease",
      description: "Screen for cardiovascular conditions using clinical and lifestyle data.",
      accuracy: "86.72%",
      url: "https://heartdisease-byarchit.streamlit.app",
    },
    kidney: {
      name: "Kidney Disease",
      description: "Detect chronic kidney disease through blood and urine markers.",
      accuracy: "100%",
      url: "https://kidney-byarchit.streamlit.app",
    },
    liver: {
      name: "Liver Disease",
      description: "Identify liver disorders using enzyme levels and patient data.",
      accuracy: "99.64%",
      url: "https://liverdiseaseprediction-byarchit.streamlit.app",
    },
    diabetes: {
      name: "Diabetes",
      description: "Assess diabetes risk based on glucose levels and health factors.",
      accuracy: "77.08%",
      url: "https://diabetesprediction-byarchit.streamlit.app",
    },
  }

  const disease = diseaseInfo[params.disease as keyof typeof diseaseInfo]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{disease.name} Screening</h1>
              <p className="text-muted-foreground mb-1">{disease.description}</p>
              <p className="text-sm">
                <span className="font-medium">Model Accuracy:</span>{" "}
                <span className="text-primary font-semibold">{disease.accuracy}</span>
              </p>
            </div>

            <ScreeningForm disease={params.disease} streamlitUrl={disease.url} />
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
// import { currentUser } from "@clerk/nextjs/server"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import ScreeningForm from "@/components/screening/screening-form"
// import ChatbotButton from "@/components/chatbot/chatbot-button"
// import { Suspense } from "react"

// interface ScreeningPageProps {
//   params: {
//     disease: string
//   }
// }

// export default async function ScreeningPage({ params }: ScreeningPageProps) {
//   const user = await currentUser()

//   if (!user) {
//     redirect("/")
//   }

//   const validDiseases = ["heart", "kidney", "liver", "diabetes"]

//   if (!validDiseases.includes(params.disease)) {
//     redirect("/dashboard")
//   }

//   const diseaseInfo = {
//     heart: {
//       name: "Heart Disease",
//       description: "Screen for cardiovascular conditions using clinical and lifestyle data.",
//       accuracy: "86.72%",
//       url: "https://heartdisease-byarchit.streamlit.app",
//     },
//     kidney: {
//       name: "Kidney Disease",
//       description: "Detect chronic kidney disease through blood and urine markers.",
//       accuracy: "100%",
//       url: "https://kidney-byarchit.streamlit.app",
//     },
//     liver: {
//       name: "Liver Disease",
//       description: "Identify liver disorders using enzyme levels and patient data.",
//       accuracy: "99.64%",
//       url: "https://liverdiseaseprediction-byarchit.streamlit.app",
//     },
//     diabetes: {
//       name: "Diabetes",
//       description: "Assess diabetes risk based on glucose levels and health factors.",
//       accuracy: "77.08%",
//       url: "https://diabetesprediction-byarchit.streamlit.app",
//     },
//   }

//   const disease = diseaseInfo[params.disease as keyof typeof diseaseInfo]

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-24 pb-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold mb-2">{disease.name} Screening</h1>
//               <p className="text-muted-foreground mb-1">{disease.description}</p>
//               <p className="text-sm">
//                 <span className="font-medium">Model Accuracy:</span>{" "}
//                 <span className="text-primary font-semibold">{disease.accuracy}</span>
//               </p>
//             </div>

//             <ScreeningForm disease={params.disease} streamlitUrl={disease.url} />
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

