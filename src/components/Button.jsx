export default function Button({ children, variant = "primary", ...props }) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
    };

    return (
        <button className={`${baseStyles} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
}
