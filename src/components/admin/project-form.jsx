import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, X } from "lucide-react";

const projectCategories = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "desktop-application", label: "Desktop Application" },
    { value: "api-development", label: "API Development" },
    { value: "data-science", label: "Data Science" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "game-development", label: "Game Development" },
    { value: "other", label: "Other" }
];

export function ProjectForm({ project, onClose }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        category: project?.category || "web-development",
        technologies: project?.technologies || [],
        features: project?.features || [],
        liveUrl: project?.liveUrl || "",
        githubUrl: project?.githubUrl || "",
        imageUrl: project?.imageUrl || "",
        featured: project?.featured || false
    });

    const [newTechnology, setNewTechnology] = useState("");
    const [newFeature, setNewFeature] = useState("");

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: data => apiRequest("POST", "/api/projects", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
            toast({
                title: "Success",
                description: "Project created successfully"
            });
            setOpen(false);
            onClose?.();
            setFormData({
                title: "",
                description: "",
                category: "web-development",
                technologies: [],
                features: [],
                liveUrl: "",
                githubUrl: "",
                imageUrl: "",
                featured: false
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to create project",
                variant: "destructive"
            });
        }
    });

    const updateMutation = useMutation({
        mutationFn: data =>
            apiRequest("PUT", `/api/projects/${project?.id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
            toast({
                title: "Success",
                description: "Project updated successfully"
            });
            setOpen(false);
            onClose?.();
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to update project",
                variant: "destructive"
            });
        }
    });

    const handleSubmit = e => {
        e.preventDefault();
        project
            ? updateMutation.mutate(formData)
            : createMutation.mutate(formData);
    };

    const addTechnology = () => {
        const tech = newTechnology.trim();
        if (tech && !formData.technologies.includes(tech)) {
            setFormData({
                ...formData,
                technologies: [...formData.technologies, tech]
            });
            setNewTechnology("");
        }
    };

    const removeTechnology = tech => {
        setFormData({
            ...formData,
            technologies: formData.technologies.filter(t => t !== tech)
        });
    };

    const addFeature = () => {
        const feature = newFeature.trim();
        if (feature && !formData.features.includes(feature)) {
            setFormData({
                ...formData,
                features: [...formData.features, feature]
            });
            setNewFeature("");
        }
    };

    const removeFeature = feature => {
        setFormData({
            ...formData,
            features: formData.features.filter(f => f !== feature)
        });
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {project ? (
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-slate-800 border-slate-700">
                <DialogHeader>
                    <DialogTitle className="text-white">
                        {project ? "Edit Project" : "Add New Project"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value
                                })
                            }
                            className="bg-slate-700 border-slate-600 text-white"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-white">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            rows={4}
                            value={formData.description}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                            className="bg-slate-700 border-slate-600 text-white"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label className="text-white">Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={value =>
                                setFormData({ ...formData, category: value })
                            }
                        >
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-700 border-slate-600">
                                {projectCategories.map(c => (
                                    <SelectItem key={c.value} value={c.value}>
                                        {c.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Featured */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="featured"
                            checked={formData.featured}
                            onCheckedChange={checked =>
                                setFormData({
                                    ...formData,
                                    featured: Boolean(checked)
                                })
                            }
                        />
                        <Label htmlFor="featured" className="text-white">
                            Featured project
                        </Label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading
                                ? "Saving..."
                                : project
                                ? "Update"
                                : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function ProjectFormTrigger() {
    return <ProjectForm />;
}
