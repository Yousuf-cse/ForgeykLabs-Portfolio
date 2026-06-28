import { fetchPortfolioData } from "@/utils/csv-parser"
import PortfolioDetailPage from "@/components/portfolio/portfolio-detail"
import { notFound } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

interface PortfolioDetailProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PortfolioDetailProps, parent: ResolvingMetadata): Promise<Metadata> {
  const portfolioData = await fetchPortfolioData()
  const project = portfolioData.find((item) => item.slug === params.slug)

  if (!project) {
    return {
      title: "Project Not Found | Forgeyk Labs",
      description: "The requested project could not be found.",
    }
  }

  const cleanTitle = `${project.title} - Case Study`;
  const cleanDescription = `${project.shortDescription}. Read the full case study on how Forgeyk Labs designed and engineered this professional solution.`;

  return {
    title: cleanTitle,
    description: cleanDescription,
    openGraph: {
      title: `${cleanTitle} | Forgeyk Labs Portfolio`,
      description: cleanDescription,
      url: `https://forgeyklabs.com/portfolio/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.mainImage || "/logo-dark-text.png",
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanTitle} | Forgeyk Labs Portfolio`,
      description: cleanDescription,
      images: [project.mainImage || "/logo-dark-text.png"],
    },
  }
}

export default async function PortfolioDetail({ params }: PortfolioDetailProps) {
  const portfolioData = await fetchPortfolioData()
  const project = portfolioData.find((item) => item.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <PortfolioDetailPage project={project} />
}

export async function generateStaticParams() {
  const portfolioData = await fetchPortfolioData()

  return portfolioData.map((item) => ({
    slug: item.slug,
  }))
}
