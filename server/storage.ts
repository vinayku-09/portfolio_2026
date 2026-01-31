import { 
  projects, skills, experience, education, contactMessages,
  type Project, type InsertProject,
  type Skill, type InsertSkill,
  type Experience, type InsertExperience,
  type Education, type InsertEducation,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  getExperience(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  getEducation(): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [exp] = await db.insert(experience).values(insertExperience).returning();
    return exp;
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const [edu] = await db.insert(education).values(insertEducation).returning();
    return edu;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
