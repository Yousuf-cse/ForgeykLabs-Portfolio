import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import "@/components/landing-page/styles.css"
import { Suspense } from "react"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://forgeyklabs.com"),
  title: {
    default: "Forgeyk Labs - Premium Hand-Coded Business Websites",
    template: "%s | Forgeyk Labs"
  },
  description:
    "We build high-quality, scalable, and fully hand-coded websites for businesses. From client portals to marketplaces, we craft every line of code with precision and zero shortcuts.",
  keywords: [
    "Forgeyk Labs",
    "Forgeyk",
    "Web Development Agency",
    "Custom Web Applications",
    "Software Development",
    "Next.js Development",
    "Tailwind CSS",
    "React Agency",
    "Client Portals",
    "Multi-vendor Marketplaces",
    "Hand-coded Websites",
    "Premium Web Design",
    "Vibrant CSS Animations",
    "SaaS Development"
  ],
  authors: [{ name: "Forgeyk Labs", url: "https://forgeyklabs.com" }],
  creator: "Forgeyk Labs",
  publisher: "Forgeyk Labs",
  icons: {
    icon: [{ url: "/logo/forgeyk-labs-logo-topbar-light.png", type: "image/png" }],
    apple: [{ url: "/logo/forgeyk-labs-logo-topbar-light.png" }],
  },
  openGraph: {
    title: "Forgeyk Labs - Premium Hand-Coded Business Websites",
    description: "We build high-quality, scalable, and fully hand-coded websites, SaaS apps, client portals, and marketplaces with precision and zero shortcuts.",
    url: "https://forgeyklabs.com",
    siteName: "Forgeyk Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo-dark-text.png",
        width: 1200,
        height: 630,
        alt: "Forgeyk Labs - Premium Hand-Coded Business Websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgeyk Labs - Premium Hand-Coded Business Websites",
    description: "We build high-quality, scalable, and fully hand-coded websites, SaaS apps, client portals, and marketplaces with precision and zero shortcuts.",
    images: ["/logo-dark-text.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
