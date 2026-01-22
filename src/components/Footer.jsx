import Container from "./Container";

export default function Footer() {
    const socialLinks = [
        { name: "GitHub", url: "https://github.com/yourusername", icon: "🔗" },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/yourusername",
            icon: "💼"
        },
        { name: "Twitter", url: "https://twitter.com/yourusername", icon: "🐦" }
    ];

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
            <Container>
                <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} YourName. Built with React
                        + Appwrite
                    </p>

                    <div className="flex gap-4">
                        {socialLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label={link.name}
                            >
                                {link.icon} {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
