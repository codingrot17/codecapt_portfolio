export default function Input({
    label,
    error,
    type = "text",
    className = "",
    ...props
}) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
          px-4 py-2 rounded-lg
          border ${
              error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
          }
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors
        `}
                {...props}
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}
