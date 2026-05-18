export default function Badge({
  children,
  variant = "default",
  className = "",
}) {
  const variants = {
    default:
      "bg-ink/10 text-ink backdrop-blur-sm",
    primary: "bg-accent/10 text-accent backdrop-blur-sm",
    accent: "bg-accent/10 text-accent backdrop-blur-sm",
    tag: "bg-ink/5 text-ink-mid backdrop-blur-sm border border-ink/10",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
