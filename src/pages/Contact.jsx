import { useState } from "react";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Message sent! (This will connect to Appwrite Functions later)");
    };

    return (
        <Container className="py-16">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-12">
                    Have a project in mind? Let's talk!
                </p>

                <Card>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <Input
                            label="Name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }
                            required
                        />

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Message
                            </label>
                            <textarea
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                                placeholder="Your message..."
                                value={formData.message}
                                onChange={e =>
                                    setFormData({
                                        ...formData,
                                        message: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </Card>
            </div>
        </Container>
    );
}
