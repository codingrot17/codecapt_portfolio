import Container from "../components/Container";
import Card from "../components/Card";

export default function Blog() {
    const posts = [
        {
            id: 1,
            title: "Building a Portfolio with React and Appwrite",
            excerpt:
                "Learn how to create a full-stack portfolio from scratch...",
            date: "2026-01-15",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Mastering Tailwind CSS",
            excerpt:
                "Tips and tricks for building responsive UIs efficiently...",
            date: "2026-01-10",
            readTime: "8 min read"
        }
    ];

    return (
        <Container className="py-16">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-12">
                Thoughts on web development, algorithms, and more
            </p>

            <div className="space-y-6">
                {posts.map(post => (
                    <Card key={post.id} hover>
                        <div className="p-6">
                            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 hover:text-blue-600 cursor-pointer">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {post.excerpt}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </Container>
    );
}
