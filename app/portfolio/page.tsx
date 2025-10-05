import PortfolioPage from "@/components/portfolio/portfolio-page"
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | Forgeyk Labs",
  description:
    "forgeyk labs — We build high quality, scalable, and fully hand-coded websites for businesses. From client portals to marketplaces, we craft every line of code with precision and zero shortcuts",
}

export default async function Portfolio() {
  const portfolioData = await fetchPortfolioData()

  return <PortfolioPage initialData={portfolioData} />
}
