import { useEffect, useState } from "react";

export function useIntersectionObserver(ref, options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const { threshold = 0.1, rootMargin = "0px" } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [ref, threshold, rootMargin]);

    return isIntersecting;
}
