"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

const faqs = [
  {
    id: 1,
    question: "What can I expect when we work together?",
    answer:
      "We start with a discovery call to understand your needs, then provide a detailed proposal with timeline and cost estimates. Once approved, we begin development with regular updates and feedback sessions.",
  },
  {
    id: 2,
    question: "How long do projects take to build?",
    answer:
      "Project timelines vary based on complexity. Simple websites might take 2-4 weeks, while complex platforms can take 3-6 months. We provide detailed timelines during the proposal phase.",
  },
  {
    id: 3,
    question: "What tools do you use to build?",
    answer:
      "We use modern frameworks like React, Next.js, and Node.js, along with AI tools and cloud services. Our stack is tailored to each project's specific requirements.",
  },
  {
    id: 4,
    question: "How do you manage payments?",
    answer:
      "We typically work with a 50% upfront deposit and the remaining 50% upon project completion. For larger projects, we may establish milestone-based payment schedules.",
  },
  {
    id: 5,
    question: "Can you manage my app's technical support with users?",
    answer:
      "Yes, we offer ongoing technical support and maintenance packages. These can include user support, bug fixes, feature updates, and performance monitoring.",
  },
];

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
  });

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="my-20 flex justify-center" ref={sectionRef}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="p-8 md:p-10 shadow-lg max-w-4xl w-full"
      >
        <div className="text-center mb-8">
          <motion.h2
            variants={fadeInUp}
            className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight"
          >
            Frequently Asked
            <motion.span
              variants={fadeInUp}
              className="block text-[#7A7FEE] dark:text-[#7A7FEE]"
            >
              Questions
            </motion.span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-700 dark:text-gray-300 mx-auto max-w-2xl"
          >
            Have questions about our services? Find answers to the most common
            questions and learn how our team can enhance your creative process.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={fadeInUp}
              className="border-b pb-4 border-gray-300 dark:border-gray-700"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform flex-shrink-0 ml-4 ${
                    openItem === faq.id ? "rotate-180 text-[#7A7FEE]" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openItem === faq.id && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    className="mt-2 text-gray-700 dark:text-gray-300"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
