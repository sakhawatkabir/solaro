export default function Badge({
  children,
  variant = "default",
  className = "",
}) {
  const variants = {
    default:
      "bg-black/10 dark:bg-white/10 text-black dark:text-white backdrop-blur-sm",
    primary: "bg-primary/20 text-primary backdrop-blur-sm",
    tag: "bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 backdrop-blur-sm border border-black/10 dark:border-white/10",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
