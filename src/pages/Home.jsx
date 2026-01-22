import Container from "../components/Container";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Full-Stack Developer
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Building clean, efficient web applications with
                            React, Appwrite, and modern tools. Focused on
                            minimalist design and scalable architecture.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="primary">View Projects</Button>
                            <Button variant="secondary">Contact Me</Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Featured Projects Preview */}
            <section className="py-16">
                <Container>
                    <h2 className="text-3xl font-bold mb-8">
                        Featured Projects
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <Card key={i} hover>
                                <div className="p-6">
                                    <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-4"></div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Project {i}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        A brief description of this amazing
                                        project.
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
}
