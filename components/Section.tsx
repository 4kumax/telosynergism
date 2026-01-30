"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, className, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn("py-16 md:py-24", className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
