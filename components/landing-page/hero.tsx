"use client";

import Image from "next/image"
import ContactFormButton from "./contact-form-button"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import {motion} from "framer-motion"
import { staggerContainer, fadeInUp, scaleIn} from "@/lib/animations"

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Background effect - covers entire section, receives all clicks */}
      <motion.div 
      initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.2 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center z-0 opacity-30">
        <BackgroundRippleEffect rows={11} cols={50} cellSize={56} />
      </motion.div>
      
      {/* Content container - pointer-events-none on container, but enabled on interactive elements */}
      <motion.div
       variants={staggerContainer}
        initial="hidden"
        animate="visible"
      className="relative z-10 flex min-h-0 md:min-h-screen w-full flex-col items-center justify-center px-4 md:px-8 py-16 md:py-0 pointer-events-none">
        {/* Text content - centered */}
        <div className="w-full max-w-4xl text-center">
          <motion.h1 
          variants={fadeInUp}
          className="text-black dark:text-white text-4xl md:text-5xl lg:text-7xl font-medium leading-tight">
            Your Business
            <motion.span 
            variants={scaleIn}
            className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Website</motion.span>
            Partner
          </motion.h1>
          <motion.p 
          variants={fadeInUp}
          className="my-6 text-sm md:text-base lg:text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
           We build high quality, scalable websites including client portals, 
           marketplaces, and custom web applications with fully hand-crafted code and no shortcuts
          </motion.p>
          <motion.div 
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 pointer-events-auto">
            <ContactFormButton />
            <a href="#services" className="btn-secondary text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 px-6 py-3 rounded-lg">
              Learn more
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

