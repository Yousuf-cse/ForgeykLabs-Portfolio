"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which logo to show based on theme
  const logoSrc =
    mounted && resolvedTheme === "dark" ? "/logo-dark-transparent.png" : "/logo-light-transparent.png";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.5,
  });

  return (
    <footer
      className="container py-8 border-t border-gray-200 dark:border-gray-800"
      ref={sectionRef}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center text-center"
      >
        <Link href="/" className="flex items-center justify-center mb-4">
          {mounted ? (
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt="ForgeYk Labs Logo"
              width={200}
              height={50}
              className="h-12 w-auto"
            />
            // <motion.h1 variants={fadeInUp} className="text-2xl">
            //   {" "}
            //   Forgeyk Labs{" "}
            // </motion.h1>
          ) : (
            <div className="h-12 w-[200px]" />
          )}
        </Link>
        <motion.p
          variants={fadeInUp}
          className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8"
        >
          Your AI-first development partner building high-quality, scalable
          platforms.
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          © {new Date().getFullYear()} Forgeyk Labs. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
}
