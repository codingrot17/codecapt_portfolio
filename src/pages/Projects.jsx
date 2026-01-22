import Container from "../components/Container";
import Card from "../components/Card";
import Badge from "../components/Badge";

export default function Projects() {
    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description:
                "Full-stack shopping platform with cart, payments, and admin dashboard",
            tech: ["React", "Appwrite", "Stripe"],
            status: "In Progress"
        },
        {
            id: 2,
            title: "Task Manager App",
            description:
                "Real-time collaborative task management with drag-and-drop",
            tech: ["React", "Appwrite", "Tailwind"],
            status: "Completed"
        }
    ];

    return (
        <Container className="py-16">
            <h1 className="text-4xl font-bold mb-4">My Projects</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-12">
                A collection of full-stack applications I've built
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {projects.map(project => (
                    <Card key={project.id} hover>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-2xl font-bold">
                                    {project.title}
                                </h3>
                                <Badge
                                    variant={
                                        project.status === "Completed"
                                            ? "success"
                                            : "warning"
                                    }
                                >
                                    {project.status}
                                </Badge>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(tech => (
                                    <Badge key={tech} variant="primary">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Container>
    );
}
