import { z } from "zod";

// Contact Message Schema
export const insertContactMessageSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().optional().default(""),
    message: z.string().min(10, "Message must be at least 10 characters")
});

// Blog Post Schema
export const insertBlogPostSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().optional(),
    excerpt: z.string().optional().default(""),
    content: z.string().min(50, "Content must be at least 50 characters"),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.string().url().optional().or(z.literal("")),
    featured: z.boolean().default(false)
});

// Project Schema
export const insertProjectSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters"),
    category: z.string().min(1, "Category is required"),
    technologies: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional().or(z.literal("")),
    githubUrl: z.string().url().optional().or(z.literal("")),
    imageUrl: z.string().url().optional().or(z.literal("")),
    featured: z.boolean().default(false)
});

// Tech Stack Schema
export const insertTechStackSchema = z.object({
    name: z.string().min(1, "Name is required"),
    icon: z.string().optional().default(""),
    progress: z.number().min(0).max(100).default(0),
    category: z.string().min(1, "Category is required"),
    color: z.string().default("#4F46E5")
});
