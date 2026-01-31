import { motion } from "framer-motion";
import { useEducation } from "@/hooks/use-portfolio";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export default function Education() {
  const { data: education, isLoading } = useEducation();

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
          ACADEMIC <span className="text-primary">TIMELINE</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Development history of core knowledge systems and academic certifications.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="text-center font-mono text-primary animate-pulse">
          RETRIEVING SCHOLASTIC RECORDS...
        </div>
      ) : (
        <div className="relative space-y-12">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          {education?.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-20"
            >
              {/* Glowing Node */}
              <div className="absolute left-[25px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_15px_rgba(0,243,255,0.8)] z-10" />
              
              <div className="bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:border-primary/40 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-mono text-primary/80">
                    <Calendar className="w-4 h-4" /> {edu.year}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{edu.institute}</span>
                </div>

                {edu.description && (
                  <div className="inline-block px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-sm">
                    {edu.description}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}