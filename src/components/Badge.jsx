export default function Badge({ children, variant = "default" }) {
    const variants = {
        default:
            "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
        primary:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        success:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        warning:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    };

    return (
        <span
            className={`
      inline-block px-3 py-1 rounded-full text-xs font-medium
      ${variants[variant]}
    `}
        >
            {children}
        </span>
    );
}
