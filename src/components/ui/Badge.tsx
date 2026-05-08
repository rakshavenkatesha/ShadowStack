interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
}

export function Badge({ children, variant = "primary" }: BadgeProps) {
  const variants = {
    primary: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    secondary: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
