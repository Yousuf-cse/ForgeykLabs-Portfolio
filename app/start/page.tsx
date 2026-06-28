import Header from "@/components/landing-page/header"
import StartProject from "@/components/landing-page/start-project"
import Footer from "@/components/landing-page/footer"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Start Your Project",
  description: "Get started on your custom website or web application with Forgeyk Labs. Answer a few questions and schedule a direct consultation call with our team.",
  openGraph: {
    title: "Start Your Project | Forgeyk Labs",
    description: "Get started on your custom website or web application with Forgeyk Labs. Answer a few questions and schedule a direct consultation call with our team.",
    url: "https://forgeyklabs.com/start",
    type: "website",
    images: [
      {
        url: "/logo-dark-text.png",
        width: 1200,
        height: 630,
        alt: "Start Your Project with Forgeyk Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Your Project | Forgeyk Labs",
    description: "Get started on your custom website or web application with Forgeyk Labs. Answer a few questions and schedule a direct consultation call with our team.",
    images: ["/logo-dark-text.png"],
  },
}

export default function StartPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <StartProject />
      <Footer />
    </main>
  )
}
