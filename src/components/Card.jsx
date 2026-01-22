export default function Card({ children, className = '', hover = false }) {
  const hoverEffect = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-lg shadow-md 
      border border-gray-200 dark:border-gray-700
      ${hoverEffect}
      ${className}
    `}>
      {children}
    </div>
  );
}