import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <div className={`relative inline-block ${className} group`}>
      <motion.span
        className="relative z-10 block"
        initial={{ x: 0 }}
        whileHover={{ x: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {text}
      </motion.span>
      <span 
        className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none"
        aria-hidden="true"
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none delay-75"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
}
