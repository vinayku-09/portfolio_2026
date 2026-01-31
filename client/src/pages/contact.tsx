import { ContactForm } from "@/components/sections/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="pt-8"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8">
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">CONNECT</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            I'm currently available for freelance work and full-time positions. 
            If you have a project that needs some creative cyberpunk energy, let's talk.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">EMAIL CHANNEL</h3>
                <p className="text-muted-foreground font-mono">vinaysingh6916@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-all duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">BASE LOCATION</h3>
                <p className="text-muted-foreground font-mono">Kalyan, Mumbai, India</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">VOICE LINK</h3>
                <p className="text-muted-foreground font-mono">+91 9819086916</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}