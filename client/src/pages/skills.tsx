import { motion } from "framer-motion";
import { useSkills } from "@/hooks/use-portfolio";
import { Cpu, Server, Layout, Wrench, Code } from "lucide-react";

export default function Skills() {
  const { data: skills, isLoading } = useSkills();

  /**
   * These keys must exactly match the 'category' strings defined in 
   * the seedDatabase function in server/routes.ts
   */
  const categories = {
    "Programming Languages": { icon: Cpu, label: "Languages & Core", color: "text-primary" },
    "Web Technologies": { icon: Layout, label: "Frontend Architecture", color: "text-secondary" },
    "Databases & Cloud": { icon: Server, label: "Backend Systems", color: "text-blue-400" },
    "Developer Tools": { icon: Wrench, label: "DevOps & Tools", color: "text-green-400" },
    "Core Concepts": { icon: Code, label: "Computer Science Core", color: "text-orange-400" }
  };

  const getGroupedSkills = () => {
    if (!skills) return {};
    const grouped: Record<string, typeof skills> = {};
    skills.forEach(skill => {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push(skill);
    });
    return grouped;
  };

  const groupedSkills = getGroupedSkills();

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
          TECHNICAL <span className="text-secondary">CAPABILITIES</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Proficiency levels in various development vectors and system protocols.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="text-center text-primary font-mono animate-pulse">ANALYZING SKILL MATRIX...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(categories).map(([key, category], index) => {
            const categorySkills = groupedSkills[key] || [];
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-lg bg-white/5 ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">{category.label}</h2>
                </div>

                <div className="space-y-6">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="flex justify-between mb-2 font-mono text-sm">
                        <span className="text-white group-hover:text-primary transition-colors">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${
                            key === 'Web Technologies' ? 'bg-secondary shadow-[0_0_10px_rgba(188,19,254,0.5)]' : 
                            key === 'Programming Languages' ? 'bg-primary shadow-[0_0_10px_rgba(0,243,255,0.5)]' :
                            'bg-white/70'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}