"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import PortfolioMasonryGridFinal from "./portfolio-masonry-grid-final";
import PortfolioFilters from "./portfolio-filters";
import type { PortfolioItem } from "@/utils/csv-parser";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import ProblemWhy from "./problem-why";
import Testimonials from "./testimonials";

interface PortfolioPageProps {
  initialData: PortfolioItem[];
}

export default function PortfolioPage({ initialData }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  // Add a loading state to prevent layout shifts
  useEffect(() => {
    // Simulate loading of images
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredItems =
    activeFilter === "all"
      ? initialData
      : initialData.filter((item) => item.categories?.includes(activeFilter));

  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]" ref={sectionRef}>
      <Header />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container pt-8 pb-20"
      >
        <div className="mb-12 flex flex-col items-center justify-end">
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-medium text-black dark:text-white mb-4"
          >
            Our <span className="text-[#7A7FEE]">Portfolio</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-700 dark:text-gray-300 max-w-2xl text-center"
          >
            Discover the platforms and digital solutions we've crafted. From
            custom web platforms to scalable digital products, our work is built
            to help businesses operate smoother and grow with confidence.
          </motion.p>
        </div>

        {/* Projects filters + grid */}
        <PortfolioFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 h-80"
              ></div>
            ))}
          </div>
        ) : (
          <PortfolioMasonryGridFinal items={filteredItems} />
        )}
      </motion.div>
      <Footer />
    </main>
  );
}
