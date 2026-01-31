import { motion } from "framer-motion";
import { useProjects } from "@/hooks/use-portfolio";
import { NeonCard } from "@/components/ui/neon-card";
import { ExternalLink, Github, Code, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects?.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    // In a real app we'd extract all unique stacks and make dynamic filters
    // For now simple pass-through
    return matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          PROJECT <span className="text-primary">DATABASE</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mb-8">
          Archive of completed builds, experiments, and system architectures.
        </p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search database..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-black/50 border-white/10 focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['All', 'React', 'Node', 'TypeScript', 'UI/UX'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-mono border whitespace-nowrap transition-colors ${
                  filter === t.toLowerCase() 
                    ? 'bg-primary/20 border-primary text-primary' 
                    : 'bg-black/20 border-white/10 text-muted-foreground hover:text-white hover:border-white/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects?.map((project, index) => (
            <NeonCard key={project.id} delay={index * 0.05} className="h-full flex flex-col group">
              <div className="aspect-video w-full rounded-lg bg-black border border-white/10 mb-6 overflow-hidden relative group-hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <Code className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-black font-bold text-[10px] rounded flex items-center gap-1 shadow-[0_0_10px_rgba(0,243,255,0.4)]">
                    ★ FEATURED
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-display font-bold mb-2 text-white group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack?.map((tech, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex gap-4 pt-4 border-t border-white/10 mt-auto">
                {project.projectUrl && (
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" 
                    className="flex-1 py-2 rounded bg-primary/10 border border-primary/20 text-primary text-center font-bold text-sm hover:bg-primary hover:text-black transition-colors flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" /> DEMO
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" 
                    className="flex-1 py-2 rounded bg-white/5 border border-white/10 text-white text-center font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Github className="w-4 h-4" /> CODE
                  </a>
                )}
              </div>
            </NeonCard>
          ))}
        </div>
      )}
    </div>
  );
}
