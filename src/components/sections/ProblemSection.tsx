import { AlertCircle, Zap, Users, TrendingDown } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionWrapper } from "./SectionWrapper";

export function ProblemSection() {
  const problems = [
    {
      icon: AlertCircle,
      title: "Duplicate Subscriptions",
      description:
        "Multiple team members paying for overlapping AI tools. No visibility into who uses what.",
    },
    {
      icon: Zap,
      title: "Expensive Plans",
      description:
        "Locked into premium tiers for usage you don't need. Paying for features you never use.",
    },
    {
      icon: Users,
      title: "Unused Seats",
      description:
        "Paying for users who rarely access the platform. Wasted budget on inactive accounts.",
    },
    {
      icon: TrendingDown,
      title: "Overlapping Tools",
      description:
        "ChatGPT AND Claude AND Copilot. Your startup is essentially running 3 subscriptions for the same work.",
    },
  ];

  return (
    <SectionWrapper className="border-b border-border/40">
      <div id="problems" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            AI spending without{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              visibility
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your startup is losing money on AI tools. ShadowStack uncovers the waste you don't know exists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <FeatureCard
              key={i}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
