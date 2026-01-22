// Type definitions for the portfolio app
export interface TechStack {
    id: number;
    name: string;
    icon: string;
    progress: number;
    category: string;
    color: string;
}

export interface InsertTechStack {
    name: string;
    icon: string;
    progress: number;
    category: string;
    color: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    imageUrl: string;
    featured: boolean;
    publishedAt: string;
}

export interface InsertBlogPost {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    imageUrl: string;
    featured: boolean;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    technologies: string[];
    features: string[];
    liveUrl: string;
    githubUrl: string;
    imageUrl: string;
    featured: boolean;
}

export interface InsertProject {
    title: string;
    description: string;
    category: string;
    technologies: string[];
    features: string[];
    liveUrl: string;
    githubUrl: string;
    imageUrl: string;
    featured: boolean;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export interface InsertContactMessage {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Validation schemas
export const insertContactMessageSchema = {
    parse: (data: any) => {
        if (!data.name || !data.email || !data.message) {
            throw new Error("Missing required fields");
        }
        return data as InsertContactMessage;
    }
};
