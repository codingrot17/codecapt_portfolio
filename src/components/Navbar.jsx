import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Button from "./Button";

export default function Navbar({ toggleDarkMode, isDark }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <Container>
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold">
                        YourName<span className="text-blue-600">.</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? "☀️" : "🌙"}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={toggleDarkMode}
                            className="mt-2 w-full text-left py-2 text-gray-600 dark:text-gray-300"
                        >
                            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                        </button>
                    </div>
                )}
            </Container>
        </nav>
    );
}
