"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Lock } from "lucide-react"
import ProjectPopup from "../portfolio/project-popup"
import { fetchPortfolioData, getProjectImage } from "@/utils/csv-parser"
import type { PortfolioItem } from "@/utils/csv-parser"
import { motion, useInView } from "framer-motion"
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import { useTheme } from "next-themes"



export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [showAllConfidential, setShowAllConfidential] = useState(false)

  const publicSectionRef = useRef(null)
  const isPublicInView = useInView(publicSectionRef, {
    once: true,
    amount: 0.08
  })

  const confSectionRef = useRef(null)
  const isConfInView = useInView(confSectionRef, {
    once: true,
    amount: 0.08
  })

  const trustSectionRef = useRef(null)
  const isTrustInView = useInView(trustSectionRef, {
    once: true,
    amount: 0.08
  })

  // Fetch portfolio data on component mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchPortfolioData()
        // Get all projects for filtering
        setProjects(data)
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const openProjectPopup = (project: PortfolioItem) => {
    setSelectedProject(project)
  }

  const closeProjectPopup = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-20 bg-gray-50/50 dark:bg-black/10">
      {/* 1. Public Projects Showcase */}
      <motion.div
        ref={publicSectionRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isPublicInView ? "visible" : "hidden"}
        className="container mx-auto px-4 mb-20"
      >
        <div className="w-full flex flex-col items-center text-center mb-12">
          <motion.h2 variants={fadeInUp} className="text-black dark:text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Explore Our
          </motion.h2>
          <motion.span variants={fadeInUp} className="block text-[#7A7FEE] dark:text-[#7A7FEE] mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">Latest Projects</motion.span>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            From AI-powered solutions to custom web platforms, we help businesses grow smarter. 
            Discover the websites, tools, and digital experiences we’ve crafted for our clients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="card overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))
            : projects.filter((p) => !p.isConfidential).slice(0, 3).map((project) => (
                <motion.div
                  key={project.slug}
                  variants={scaleIn}
                  className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => openProjectPopup(project)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={getProjectImage(project, mounted ? resolvedTheme : undefined)}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl font-semibold text-black dark:text-white">{project.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 mb-4">{project.shortDescription}</p>
                    <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                      View Project{" "}
                      <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        <motion.div variants={fadeInUp} className="flex justify-center mt-8">
          <Link id="view-all-projects-btn" href="/portfolio" className="btn-primary">
            View All Projects
          </Link>
        </motion.div>
      </motion.div>

      {/* 2. Confidential Client Work Section */}
      <motion.div
        ref={confSectionRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isConfInView ? "visible" : "hidden"}
        className="container mx-auto px-4 border-t border-gray-250 dark:border-gray-800 pt-20 mt-20"
      >
        <div className="w-full flex flex-col items-center text-center mb-12">
          <motion.h2 variants={fadeInUp} className="text-black dark:text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Confidential
          </motion.h2>
          <motion.span variants={fadeInUp} className="block text-[#7A7FEE] dark:text-[#7A7FEE] mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">Client Work</motion.span>
          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
            Some of our most impactful work is protected under client confidentiality agreements. 
            While we can't publicly showcase these products, we can share the type of solutions we've engineered.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.filter((p) => p.isConfidential).slice(0, showAllConfidential ? undefined : 3).map((project) => (
            <motion.div
              key={project.slug}
              variants={scaleIn}
              className="card overflow-hidden h-full flex flex-col group transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              onClick={() => openProjectPopup(project)}
            >
              {/* Cover Image representation */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
                <Image
                  src={getProjectImage(project, mounted ? resolvedTheme : undefined)}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />


                {project.categories && project.categories.length > 1 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white">
                      {project.categories[1].charAt(0).toUpperCase() + project.categories[1].slice(1)}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 bg-amber-500/20 backdrop-blur-sm border border-amber-500/35 rounded-full text-[10px] font-semibold text-amber-500 dark:text-amber-400 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    NDA
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-750 dark:text-gray-300 text-sm mt-1 mb-4 flex-grow line-clamp-3">
                  {project.shortDescription}
                </p>
                <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group mt-auto">
                  View Details{" "}
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.filter((p) => p.isConfidential).length > 3 && (
          <motion.div variants={fadeInUp} className="flex justify-center mt-12">
            <button
              id="toggle-confidential-projects-btn"
              onClick={() => setShowAllConfidential(!showAllConfidential)}
              className="btn-primary"
            >
              {showAllConfidential ? "Show Less Projects" : "Show More Projects"}
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* 3. Trust Section */}
      <motion.div
        ref={trustSectionRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isTrustInView ? "visible" : "hidden"}
        className="container mx-auto px-4 mt-24 pt-12 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="bg-gray-50 dark:bg-gray-900/10 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7A7FEE0c,transparent_50%)]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
            <div className="lg:col-span-3 text-left">
              <motion.h3 variants={fadeInUp} className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-4">
                Trusted with Confidential Products
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                We regularly partner with startups and businesses under strict confidentiality agreements. 
                While many engagements cannot be publicly showcased, every project reflects our commitment 
                to building scalable, production-ready software.
              </motion.p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-2 gap-6 md:gap-8">
              <motion.div
                variants={scaleIn}
                className="p-5 bg-white dark:bg-[#1a1b1c]/60 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="block text-3xl md:text-4xl font-bold text-[#7A7FEE]">7+</span>
                <span className="block text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1.5 font-medium">Projects Delivered</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="p-5 bg-white dark:bg-[#1a1b1c]/60 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="block text-3xl md:text-4xl font-bold text-[#7A7FEE]">4</span>
                <span className="block text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1.5 font-medium">Confidential Engagements</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="p-5 bg-white dark:bg-[#1a1b1c]/60 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="block text-xl md:text-2xl font-bold text-[#7A7FEE]">SaaS & Ent.</span>
                <span className="block text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1.5 font-medium">Solutions Focus</span>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="p-5 bg-white dark:bg-[#1a1b1c]/60 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="block text-xl md:text-2xl font-bold text-[#7A7FEE]">Full-Stack</span>
                <span className="block text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1.5 font-medium">Expertise</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Popup */}
      <ProjectPopup project={selectedProject} onClose={closeProjectPopup} />
    </section>
  )
}
