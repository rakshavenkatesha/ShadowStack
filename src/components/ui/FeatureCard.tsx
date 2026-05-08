import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border/40 bg-card p-6 transition-all hover:border-border hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative space-y-4">
        <div className="inline-flex rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3 text-indigo-500">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
