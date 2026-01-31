import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { HolographicSphere } from "@/components/ui/holographic-sphere";
import { GlitchText } from "@/components/ui/glitch-text";
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM ONLINE
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight leading-none">
            <GlitchText text="VINAY KUMAR" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SINGH</span>
          </h1>

          <div className="text-xl md:text-2xl font-mono text-muted-foreground mb-8 h-8">
            <span>I am a </span>
            <span className="text-primary font-bold">
              <Typewriter
                words={['Software Developer', 'Full Stack Developer', 'Java & Web Developer', 'Problem Solver']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </div>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
            Crafting immersive digital experiences with modern web technologies. 
            Bridging the gap between creative design and robust engineering.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/projects">
              <button className="px-8 py-3 rounded-lg bg-primary text-black font-bold font-display tracking-wide hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center gap-2">
                VIEW PROJECTS <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <button className="px-8 py-3 rounded-lg border border-white/20 hover:bg-white/5 font-display tracking-wide transition-all flex items-center gap-2 backdrop-blur-sm">
              DOWNLOAD CV <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-6 text-muted-foreground">
            <a href="https://github.com/vinayku-09" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-all"><Github className="w-6 h-6" /></a>
            <a href="https://www.linkedin.com/in/vinay-kumar-singh-735a9729b/" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-all"><Linkedin className="w-6 h-6" /></a>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-primary/70">TEL:</span>
              <span className="text-white">9819086916</span>
            </div>
          </div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center lg:justify-end relative z-0"
        >
          <HolographicSphere />
        </motion.div>
      </div>
    </section>
  );
}
