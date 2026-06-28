"use client";
import { useState, useRef, useEffect } from "react";
import { fetchPortfolioData, getProjectImage } from "@/utils/csv-parser";
import type { PortfolioItem } from "@/utils/csv-parser";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { staggerContainer, scaleIn } from "@/lib/animations";
import { ArrowUpRight, Lock } from "lucide-react";
import ProjectPopup from "./project-popup";
import { useTheme } from "next-themes";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioMasonryGridFinal({
  items,
}: PortfolioGridProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openProjectPopup = (project: PortfolioItem) => {
    setSelectedProject(project);
  };

  const closeProjectPopup = () => {
    setSelectedProject(null);
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
  });

  return (
    <div ref={sectionRef}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item) => (
          <motion.div
            key={item.slug}
            variants={scaleIn}
            className="card overflow-hidden rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg h-full cursor-pointer"
            onClick={() => openProjectPopup(item)}
          >
            <div className="block h-full flex flex-col">
              <div className="relative overflow-hidden">
                {item.isConfidential ? (
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-250 dark:border-gray-800">
                    <Image
                      src={getProjectImage(item, mounted ? resolvedTheme : undefined)}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 bg-amber-500/20 backdrop-blur-sm border border-amber-500/35 rounded-full text-[10px] font-semibold text-amber-500 dark:text-amber-400 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        🔒 NDA
                      </span>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={getProjectImage(item, mounted ? resolvedTheme : undefined)}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                )}
                {item.categories && item.categories.length > 1 && (
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                      {item.categories[1].charAt(0).toUpperCase() +
                        item.categories[1].slice(1)}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-950 dark:text-white text-lg mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                  {item.shortDescription}
                </p>
                <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium mt-auto group">
                  {item.isConfidential ? "View Details" : "View Project"}{" "}
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Popup */}
      <ProjectPopup project={selectedProject} onClose={closeProjectPopup} />
    </div>
  );
}
