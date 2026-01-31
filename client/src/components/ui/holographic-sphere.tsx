import { motion } from "framer-motion";

export function HolographicSphere() {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
      {/* Core Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
      
      {/* Rotating Rings */}
      <motion.div 
        animate={{ rotateZ: 360, rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full border border-primary/30 rounded-full border-dashed"
      />
      
      <motion.div 
        animate={{ rotateZ: -360, rotateX: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] border border-secondary/30 rounded-full border-dotted"
      />
      
      <motion.div 
        animate={{ rotateZ: 360, rotateY: -180 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[60%] h-[60%] border-2 border-primary/20 rounded-full"
      />

      {/* Center Grid/Wireframe representation */}
      <div className="absolute w-[40%] h-[40%] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-white/10 shadow-[0_0_30px_rgba(0,243,255,0.3)] flex items-center justify-center">
        <div className="w-full h-[1px] bg-primary/40 absolute top-1/2 left-0" />
        <div className="h-full w-[1px] bg-primary/40 absolute left-1/2 top-0" />
      </div>
    </div>
  );
}
