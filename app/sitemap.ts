import { MetadataRoute } from 'next'
import { fetchPortfolioData } from '@/utils/csv-parser'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://forgeyklabs.com'
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
  
  // Dynamic portfolio project routes
  try {
    const projects = await fetchPortfolioData()
    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${encodeURIComponent(project.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
    
    return [...routes, ...projectRoutes]
  } catch (error) {
    console.error('Error generating sitemap projects:', error)
    return routes
  }
}
