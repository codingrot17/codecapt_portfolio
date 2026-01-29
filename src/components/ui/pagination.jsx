import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 w-10"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {startPage > 1 && (
                <>
                    <Button
                        variant="outline"
                        onClick={() => onPageChange(1)}
                        className="h-10 w-10"
                    >
                        1
                    </Button>
                    {startPage > 2 && <span className="px-2">...</span>}
                </>
            )}

            {pages.map(page => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => onPageChange(page)}
                    className={`h-10 w-10 ${
                        currentPage === page
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : ""
                    }`}
                >
                    {page}
                </Button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <span className="px-2">...</span>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => onPageChange(totalPages)}
                        className="h-10 w-10"
                    >
                        {totalPages}
                    </Button>
                </>
            )}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 w-10"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
