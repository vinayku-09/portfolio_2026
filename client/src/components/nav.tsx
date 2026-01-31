import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
// Added GraduationCap to the imports below
import { Menu, X, Code2, User, Layers, Send, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: User },
  { href: "/projects", label: "Projects", icon: Layers },
  { href: "/skills", label: "Skills", icon: Code2 },
  { href: "/education", label: "Education", icon: GraduationCap }, 
  { href: "/contact", label: "Contact", icon: Send },
];

export function Nav() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
          scrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/5" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-black font-bold font-display shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              &lt;/&gt;
            </div>
            <span className="font-display font-bold text-xl tracking-wider group-hover:text-primary transition-colors">
              Vinay<span className="text-primary">.DEV</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <div 
                  className={cn(
                    "px-4 py-2 rounded-md font-mono text-sm uppercase tracking-wide transition-all cursor-pointer relative overflow-hidden group",
                    location === link.href 
                      ? "text-primary bg-primary/10 border border-primary/20" 
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </span>
                  {location === link.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 z-0"
                    />
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <nav className="flex flex-col items-center space-y-8">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div 
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-3xl font-display font-bold tracking-widest uppercase cursor-pointer transition-all",
                      location === link.href ? "text-primary text-glow" : "text-muted-foreground hover:text-white"
                    )}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}