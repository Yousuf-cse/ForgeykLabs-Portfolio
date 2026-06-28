"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, scaleIn } from "@/lib/animations";

interface PortfolioFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function PortfolioFilters({
  activeFilter,
  setActiveFilter,
}: PortfolioFiltersProps) {
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Applications" },
    { id: "web3", label: "Web3 & Blockchain" },
    { id: "ai", label: "AI Solutions" },
    { id: "design", label: "UX/UI Design" },
    { id: "bubble", label: "Bubble Projects" },
    { id: "mobile", label: "Mobile Apps" },
  ];

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
        className="mb-8 flex flex-wrap gap-2"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            variants={scaleIn}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeFilter === filter.id
                ? "bg-[#7A7FEE] text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {filter.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
