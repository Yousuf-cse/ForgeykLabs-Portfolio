"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number | "some" | "all";
}

export const ScrollReveal = ({
  children,
  variant,
  delay = 0,
  className = "",
  once = true,
  amount = 0.3,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount,
    margin: "-100px", // Trigger animation slightly before element comes into view
  });

  const defaultVariant: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant || defaultVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};
