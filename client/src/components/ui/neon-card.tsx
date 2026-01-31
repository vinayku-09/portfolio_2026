import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function NeonCard({ children, className, delay = 0 }: NeonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm p-6",
        "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]",
        "transition-all duration-300 group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
