import PortfolioPage from "@/components/portfolio/portfolio-page"
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Portfolio",
  description:
    "Explore our showcase of premium, hand-coded websites, SaaS solutions, and web applications developed by Forgeyk Labs. See how we help businesses grow smarter.",
  openGraph: {
    title: "Portfolio | Forgeyk Labs",
    description: "Explore our showcase of premium, hand-coded websites, SaaS solutions, and web applications developed by Forgeyk Labs.",
    url: "https://forgeyklabs.com/portfolio",
    type: "website",
    images: [
      {
        url: "/logo-dark-text.png",
        width: 1200,
        height: 630,
        alt: "Forgeyk Labs Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Forgeyk Labs",
    description: "Explore our showcase of premium, hand-coded websites, SaaS solutions, and web applications developed by Forgeyk Labs.",
    images: ["/logo-dark-text.png"],
  },
}

export default async function Portfolio() {
  const portfolioData = await fetchPortfolioData()

  return <PortfolioPage initialData={portfolioData} />
}
