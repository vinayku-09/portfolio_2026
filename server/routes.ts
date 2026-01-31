import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Projects
    await storage.createProject({
      title: "Neon City Visualizer",
      description: "A real-time 3D rendering engine for procedural cyberpunk city generation using Three.js and WebGL.",
      imageUrl: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80",
      projectUrl: "#",
      repoUrl: "#",
      techStack: ["Three.js", "React", "WebGL", "GLSL"],
      featured: true
    });
    
    await storage.createProject({
      title: "AI Neural Interface",
      description: "Brain-computer interface simulation dashboard visualizing neural network activity in real-time.",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80",
      projectUrl: "#",
      repoUrl: "#",
      techStack: ["Python", "TensorFlow", "WebSocket", "D3.js"],
      featured: true
    });
    
    await storage.createProject({
      title: "CyberSec Guardian",
      description: "Advanced network traffic analysis tool with holographic data visualization for threat detection.",
      imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80",
      projectUrl: "#",
      repoUrl: "#",
      techStack: ["Rust", "Tauri", "React", "GraphQL"],
      featured: true
    });

    // Skills
    const skills = [
      { name: "TypeScript", category: "Languages", proficiency: 95 },
      { name: "Rust", category: "Languages", proficiency: 80 },
      { name: "Python", category: "Languages", proficiency: 90 },
      { name: "React / Next.js", category: "Web", proficiency: 95 },
      { name: "WebGL / Three.js", category: "Web", proficiency: 85 },
      { name: "Node.js", category: "Backend", proficiency: 90 },
      { name: "PostgreSQL", category: "Backend", proficiency: 85 },
      { name: "Docker", category: "Tools", proficiency: 80 },
      { name: "AWS", category: "Tools", proficiency: 75 },
    ];
    
    for (const skill of skills) {
      await storage.createSkill(skill);
    }

    // Experience
    await storage.createExperience({
      role: "Senior Systems Architect",
      company: "Nexus Corp",
      duration: "2023 - Present",
      description: "Leading the development of next-gen neural interface protocols and securing quantum network infrastructure."
    });

    await storage.createExperience({
      role: "Full Stack Engineer",
      company: "CyberSystems Ltd",
      duration: "2020 - 2023",
      description: "Developed immersive 3D web applications and optimized high-frequency trading algorithms."
    });

    // Education
    await storage.createEducation({
      degree: "M.S. Computer Science",
      institute: "Tech University of Tomorrow",
      year: "2020"
    });
    
    await storage.createEducation({
      degree: "B.S. Artificial Intelligence",
      institute: "Global Cyber Institute",
      year: "2018"
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  seedDatabase().catch(console.error);

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Experience
  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  // Education
  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
