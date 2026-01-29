import { Client, Databases, ID, Query } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export const COLLECTIONS = {
    PROJECTS: "projects",
    BLOG_POSTS: "blog_posts",
    TECH_STACKS: "tech_stacks",
    CONTACT_MESSAGES: "contact_messages",
    CATEGORIES: "categories" // New collection
};

// Pagination helper
const DEFAULT_PAGE_SIZE = 9; // 3x3 grid looks good

// ==================== CATEGORIES ====================
export const categoryService = {
    async list(type = null) {
        try {
            const queries = [Query.orderAsc("name")];

            // Filter by type if provided (project, blog, tech)
            if (type) {
                queries.push(Query.equal("type", type));
            }

            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CATEGORIES,
                queries
            );
            return response.documents;
        } catch (error) {
            console.error("Error listing categories:", error);
            throw error;
        }
    },

    async create(data) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.CATEGORIES,
                ID.unique(),
                {
                    name: data.name,
                    slug:
                        data.slug ||
                        data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    type: data.type, // 'project', 'blog', or 'tech'
                    description: data.description || ""
                }
            );
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    },

    async delete(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.CATEGORIES,
                id
            );
        } catch (error) {
            console.error("Error deleting category:", error);
            throw error;
        }
    }
};

// ==================== PROJECTS ====================
export const projectService = {
    async list(options = {}) {
        const {
            page = 1,
            limit = DEFAULT_PAGE_SIZE,
            category = null,
            featured = null
        } = options;

        try {
            const queries = [
                Query.orderDesc("$createdAt"),
                Query.limit(limit),
                Query.offset((page - 1) * limit)
            ];

            if (category && category !== "all") {
                queries.push(Query.equal("category", category));
            }

            if (featured !== null) {
                queries.push(Query.equal("featured", featured));
            }

            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                queries
            );

            // Get total count for pagination
            const totalQueries =
                category && category !== "all"
                    ? [Query.equal("category", category)]
                    : [];

            const totalResponse = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                totalQueries
            );

            return {
                documents: response.documents.map(doc => ({
                    ...doc,
                    technologies: doc.technologies
                        ? doc.technologies.split(",").map(t => t.trim())
                        : [],
                    features: doc.features
                        ? doc.features.split(",").map(f => f.trim())
                        : [],
                    imageUrl: doc.imageUrl || "",
                    liveUrl: doc.liveUrl || "",
                    githubUrl: doc.githubUrl || "",
                    featured: doc.featured || false
                })),
                total: totalResponse.total,
                page,
                limit,
                totalPages: Math.ceil(totalResponse.total / limit)
            };
        } catch (error) {
            console.error("Error listing projects:", error);
            throw error;
        }
    },

    async get(id) {
        try {
            const doc = await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                id
            );

            return {
                ...doc,
                technologies: doc.technologies
                    ? doc.technologies.split(",").map(t => t.trim())
                    : [],
                features: doc.features
                    ? doc.features.split(",").map(f => f.trim())
                    : [],
                imageUrl: doc.imageUrl || "",
                liveUrl: doc.liveUrl || "",
                githubUrl: doc.githubUrl || "",
                featured: doc.featured || false
            };
        } catch (error) {
            console.error("Error getting project:", error);
            throw error;
        }
    },

    async create(data) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                ID.unique(),
                {
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    technologies: Array.isArray(data.technologies)
                        ? data.technologies.join(", ")
                        : data.technologies || "",
                    features: Array.isArray(data.features)
                        ? data.features.join(", ")
                        : data.features || "",
                    liveUrl: data.liveUrl || "",
                    githubUrl: data.githubUrl || "",
                    imageUrl: data.imageUrl || "",
                    featured: data.featured || false
                }
            );
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    },

    async update(id, data) {
        try {
            const updateData = { ...data };

            if (data.technologies && Array.isArray(data.technologies)) {
                updateData.technologies = data.technologies.join(", ");
            }
            if (data.features && Array.isArray(data.features)) {
                updateData.features = data.features.join(", ");
            }

            return await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                id,
                updateData
            );
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    },

    async delete(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.PROJECTS,
                id
            );
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    }
};

// ==================== BLOG POSTS ====================
export const blogService = {
    async list(options = {}) {
        const {
            page = 1,
            limit = DEFAULT_PAGE_SIZE,
            category = null,
            featured = null
        } = options;

        try {
            const queries = [
                Query.orderDesc("$createdAt"),
                Query.limit(limit),
                Query.offset((page - 1) * limit)
            ];

            if (category && category !== "all") {
                queries.push(Query.equal("category", category));
            }

            if (featured !== null) {
                queries.push(Query.equal("featured", featured));
            }

            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.BLOG_POSTS,
                queries
            );

            const totalQueries =
                category && category !== "all"
                    ? [Query.equal("category", category)]
                    : [];

            const totalResponse = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.BLOG_POSTS,
                totalQueries
            );

            return {
                documents: response.documents,
                total: totalResponse.total,
                page,
                limit,
                totalPages: Math.ceil(totalResponse.total / limit)
            };
        } catch (error) {
            console.error("Error listing blog posts:", error);
            throw error;
        }
    },

    async get(id) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.BLOG_POSTS,
                id
            );
        } catch (error) {
            console.error("Error getting blog post:", error);
            throw error;
        }
    },

    async create(data) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.BLOG_POSTS,
                ID.unique(),
                {
                    title: data.title,
                    slug:
                        data.slug ||
                        data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    excerpt: data.excerpt || "",
                    content: data.content,
                    category: data.category,
                    imageUrl: data.imageUrl || "",
                    featured: data.featured || false
                }
            );
        } catch (error) {
            console.error("Error creating blog post:", error);
            throw error;
        }
    },

    async update(id, data) {
        try {
            return await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.BLOG_POSTS,
                id,
                data
            );
        } catch (error) {
            console.error("Error updating blog post:", error);
            throw error;
        }
    },

    async delete(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.BLOG_POSTS,
                id
            );
        } catch (error) {
            console.error("Error deleting blog post:", error);
            throw error;
        }
    }
};

// ==================== TECH STACKS ====================
export const techStackService = {
    async list(options = {}) {
        const {
            page = 1,
            limit = 100, // Usually show all tech stacks
            category = null
        } = options;

        try {
            const queries = [
                Query.orderAsc("category"),
                Query.limit(limit),
                Query.offset((page - 1) * limit)
            ];

            if (category && category !== "all") {
                queries.push(Query.equal("category", category));
            }

            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.TECH_STACKS,
                queries
            );

            const totalQueries =
                category && category !== "all"
                    ? [Query.equal("category", category)]
                    : [];

            const totalResponse = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.TECH_STACKS,
                totalQueries
            );

            return {
                documents: response.documents,
                total: totalResponse.total,
                page,
                limit,
                totalPages: Math.ceil(totalResponse.total / limit)
            };
        } catch (error) {
            console.error("Error listing tech stacks:", error);
            throw error;
        }
    },

    async get(id) {
        try {
            return await databases.getDocument(
                DATABASE_ID,
                COLLECTIONS.TECH_STACKS,
                id
            );
        } catch (error) {
            console.error("Error getting tech stack:", error);
            throw error;
        }
    },

    async create(data) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.TECH_STACKS,
                ID.unique(),
                {
                    name: data.name,
                    icon: data.icon || "", // Now expects URL
                    progress: data.progress || 0,
                    category: data.category,
                    color: data.color || "bg-blue-500/20",
                    documentationUrl: data.documentationUrl || ""
                }
            );
        } catch (error) {
            console.error("Error creating tech stack:", error);
            throw error;
        }
    },

    async update(id, data) {
        try {
            return await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.TECH_STACKS,
                id,
                data
            );
        } catch (error) {
            console.error("Error updating tech stack:", error);
            throw error;
        }
    },

    async delete(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.TECH_STACKS,
                id
            );
        } catch (error) {
            console.error("Error deleting tech stack:", error);
            throw error;
        }
    }
};

// ==================== CONTACT MESSAGES ====================
export const contactService = {
    async list(options = {}) {
        const { page = 1, limit = 20 } = options;

        try {
            const queries = [
                Query.orderDesc("$createdAt"),
                Query.limit(limit),
                Query.offset((page - 1) * limit)
            ];

            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                queries
            );

            const totalResponse = await databases.listDocuments(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES
            );

            return {
                documents: response.documents,
                total: totalResponse.total,
                page,
                limit,
                totalPages: Math.ceil(totalResponse.total / limit)
            };
        } catch (error) {
            console.error("Error listing contact messages:", error);
            throw error;
        }
    },

    async create(data) {
        try {
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                ID.unique(),
                {
                    name: data.name,
                    email: data.email,
                    subject: data.subject || "",
                    message: data.message,
                    isRead: false
                }
            );
        } catch (error) {
            console.error("Error creating contact message:", error);
            throw error;
        }
    },

    async markAsRead(id) {
        try {
            return await databases.updateDocument(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                id,
                {
                    isRead: true,
                    respondedAt: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error("Error marking message as read:", error);
            throw error;
        }
    },

    async delete(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTIONS.CONTACT_MESSAGES,
                id
            );
        } catch (error) {
            console.error("Error deleting contact message:", error);
            throw error;
        }
    }
};
