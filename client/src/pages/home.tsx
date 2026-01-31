import { motion } from "framer-motion";
import { Hero } from "@/components/sections/hero";
import { NeonCard } from "@/components/ui/neon-card";
import { ContactForm } from "@/components/sections/contact-form";
import { useProjects, useSkills, useExperience } from "@/hooks/use-portfolio";
import { ExternalLink, Github, Linkedin, Code, Cpu, Globe, Database, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experience, isLoading: expLoading } = useExperience();

  // Show only first 3 featured items on home page
  const featuredProjects = projects?.filter(p => p.featured).slice(0, 3) || projects?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* --- SKILLS TICKER --- */}
      <div className="w-full bg-black/40 border-y border-white/5 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center font-mono text-sm text-muted-foreground mb-4">TECHNOLOGY STACK</p>
          {skillsLoading ? (
            <div className="flex justify-center gap-4">
              <div className="w-20 h-8 bg-white/5 rounded animate-pulse" />
              <div className="w-20 h-8 bg-white/5 rounded animate-pulse" />
              <div className="w-20 h-8 bg-white/5 rounded animate-pulse" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {skills?.slice(0, 8).map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary/50" />
                  <span className="font-display font-bold uppercase tracking-wider">{skill.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- FEATURED PROJECTS --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
              <span className="text-primary">01.</span> FEATURED WORKS
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Selected projects demonstrating capability in system architecture and interface design.
            </p>
          </div>
          <Link href="/projects">
            <span className="hidden md:flex items-center gap-2 text-primary font-mono text-sm hover:underline cursor-pointer">
              VIEW ALL DATABASE ENTRIES <ExternalLink className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {projectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <NeonCard key={project.id} delay={index * 0.1} className="h-full flex flex-col">
                <div className="aspect-video w-full rounded-lg bg-black border border-white/10 mb-6 overflow-hidden relative group-hover:border-primary/50 transition-colors">
                  {/* Digital noise overlay effect */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <Code className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Tech stack badges overlay */}
                  <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap">
                    {project.techStack?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 bg-black/80 text-primary border border-primary/20 rounded backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold mb-2 text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm flex-grow mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div className="flex gap-3">
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <span className="text-xs font-mono text-primary/70">ID: #{String(project.id).padStart(3, '0')}</span>
                </div>
              </NeonCard>
            ))}
          </div>
        )}
      </section>

      {/* --- EXPERIENCE PREVIEW --- */}
      <section className="py-24 bg-black/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
            <span className="text-secondary">02.</span> EXPERIENCE LOG
          </h2>

          <div className="space-y-8 relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent transform -translate-x-1/2 md:translate-x-0 ml-4 md:ml-0" />

            {expLoading ? (
              <div className="text-center text-muted-foreground font-mono">LOADING DATA...</div>
            ) : experience?.slice(0, 3).map((job, index) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-stretch pl-12 md:pl-0`}
              >
                <div className="flex-1 md:text-right">
                  {index % 2 === 0 && (
                    <div className="bg-black/40 border border-white/10 p-6 rounded-lg hover:border-primary/30 transition-colors">
                      <h4 className="text-primary font-display font-bold text-lg">{job.role}</h4>
                      <div className="text-white font-bold mb-2">{job.company}</div>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>
                  )}
                </div>

                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 top-6 md:top-8 w-3 h-3 bg-background border border-primary rounded-full transform -translate-x-1/2 shadow-[0_0_10px_rgba(0,243,255,0.5)] z-10" />

                <div className="flex-1">
                  {index % 2 !== 0 ? (
                    <div className="bg-black/40 border border-white/10 p-6 rounded-lg hover:border-primary/30 transition-colors">
                      <h4 className="text-primary font-display font-bold text-lg">{job.role}</h4>
                      <div className="text-white font-bold mb-2">{job.company}</div>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>
                  ) : (
                    <div className="hidden md:flex items-center h-full text-muted-foreground font-mono text-sm pl-4">
                      <Calendar className="w-4 h-4 mr-2" /> {job.duration}
                    </div>
                  )}
                </div>
                
                {/* Mobile Date fix */}
                <div className="md:hidden w-full pl-0 text-muted-foreground font-mono text-xs -mt-4 mb-4">
                   <Calendar className="w-3 h-3 inline mr-1" /> {job.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-primary">03.</span> INITIATE LINK
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Open to collaborative opportunities and technical discourse.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black text-center text-muted-foreground text-sm font-mono">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/vinayku-09" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:scale-110 transition-all"><Github className="w-5 h-5" /></a>
          <a href="https://www.linkedin.com/in/vinay-kumar-singh-735a9729b/" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:scale-110 transition-all"><Linkedin className="w-5 h-5" /></a>
        </div>
        <p>SYSTEM STATUS: ONLINE // © {new Date().getFullYear()} VINAY.DEV</p>
      </footer>
    </div>
  );
}
