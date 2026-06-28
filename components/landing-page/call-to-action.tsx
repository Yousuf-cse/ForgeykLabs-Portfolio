"use client"

import { useRef } from "react"
import ContactFormButton from "./contact-form-button"
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

export default function CallToAction() {
  const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
      once: true,
      amount: 0.05,
    });

  return (
    <section id="contact" className="my-20 flex justify-center" ref={sectionRef}>
      <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"} className="relative overflow-hidden max-w-6xl w-full">
        <div className="p-8 md:p-10 lg:p-12 flex flex-col items-center text-center">
          {/* Text content - centered */}
          <div className="z-10 max-w-2xl">
            <motion.h2 variants={fadeInUp} className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
              Your Next Digital Move <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">Starts</span> Here
            </motion.h2>
            <motion.p variants={fadeInUp} className="my-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
              Have an idea or a problem that needs solving?
            </motion.p>
            <motion.p variants={fadeInUp} className="mb-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
              Let's chat. We'll help you explore the best approach, map out a plan, and see if we're the right fit.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center">
              <ContactFormButton />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}