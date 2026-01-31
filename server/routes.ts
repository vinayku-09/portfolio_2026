import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Projects
    const projectsData = [
      { title: "AI Mock Interview", description: "An intelligent platform for simulating job interviews with AI-driven feedback." },
      { title: "LifeVault", description: "A secure digital vault for managing personal legacy and important life documents." },
      { title: "Mentor Mitra", description: "A mentorship platform connecting students with industry professionals." },
      { title: "Cybersecurity Project 1", description: "Advanced threat detection and vulnerability assessment tool." },
      { title: "Cybersecurity Project 2", description: "Encrypted communication protocol for secure data exchange." }
    ];

    for (const p of projectsData) {
      await storage.createProject({
        ...p,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        projectUrl: "#",
        repoUrl: "#",
        techStack: ["React", "Node.js", "AI"],
        featured: true
      });
    }

    // Skills
    const skillsData = [
      // Languages
      { name: "Java", category: "Programming Languages", proficiency: 90 },
      { name: "JavaScript", category: "Programming Languages", proficiency: 85 },
      { name: "TypeScript", category: "Programming Languages", proficiency: 80 },
      { name: "Python", category: "Programming Languages", proficiency: 75 },
      // Web
      { name: "HTML/CSS", category: "Web Technologies", proficiency: 95 },
      { name: "React.js", category: "Web Technologies", proficiency: 90 },
      { name: "Next.js", category: "Web Technologies", proficiency: 85 },
      { name: "Node.js", category: "Web Technologies", proficiency: 85 },
      { name: "Tailwind CSS", category: "Web Technologies", proficiency: 90 },
      // App
      { name: "Flutter", category: "App Technologies", proficiency: 70 },
      { name: "Firebase", category: "App Technologies", proficiency: 75 },
      // Databases
      { name: "PostgreSQL", category: "Databases & Cloud", proficiency: 85 },
      { name: "MongoDB", category: "Databases & Cloud", proficiency: 80 },
      { name: "AWS", category: "Databases & Cloud", proficiency: 70 },
      { name: "Docker", category: "Databases & Cloud", proficiency: 75 },
      // Tools
      { name: "Git", category: "Developer Tools", proficiency: 90 },
      { name: "Postman", category: "Developer Tools", proficiency: 85 },
      // Testing
      { name: "Playwright", category: "Testing Tools", proficiency: 80 },
      { name: "Selenium", category: "Testing Tools", proficiency: 75 },
      // Concepts
      { name: "DSA", category: "Core Concepts", proficiency: 85 },
      { name: "OOP", category: "Core Concepts", proficiency: 90 },
    ];
    
    for (const skill of skillsData) {
      await storage.createSkill(skill);
    }

    // Experience (Keeping placeholders as no specific update was provided for exp content, but updating for persona)
    await storage.createExperience({
      role: "Software Developer Intern",
      company: "Tech Solutions",
      duration: "2024 - Present",
      description: "Working on full-stack web applications and improving system performance."
    });

    // Education
    const educationData = [
      {
        degree: "Bachelor of Engineering – Computer Science & Engineering",
        institute: "Lokmanya Tilak College of Engineering, Navi Mumbai",
        year: "2023 – 2027",
      },
      {
        degree: "HSC – Higher Secondary Education (Science)",
        institute: "Presidency Junior College, Ulhasnagar",
        year: "2021 – 2023",
      },
      {
        degree: "SSC – Secondary School Certificate",
        institute: "Sai English High School, Kalyan",
        year: "2020 – 2021",
      }
    ];

    for (const edu of educationData) {
      await storage.createEducation(edu);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  seedDatabase().catch(console.error);

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

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
