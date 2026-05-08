import {
  Eye,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Share2,
  Shield,
} from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionWrapper } from "./SectionWrapper";

export function FeaturesSection() {
  const features = [
    {
      icon: Eye,
      title: "Real-time Spend Visibility",
      description:
        "See exactly how much you're spending on each AI tool, broken down by user and usage pattern.",
    },
    {
      icon: Lightbulb,
      title: "Optimization Insights",
      description:
        "Get AI-powered recommendations on consolidating tools and optimizing your subscription mix.",
    },
    {
      icon: TrendingUp,
      title: "Savings Recommendations",
      description:
        "Actionable insights on which subscriptions to downgrade, upgrade, or cancel.",
    },
    {
      icon: BarChart3,
      title: "Startup-Focused Reporting",
      description:
        "Reports built for early-stage teams. Clear, actionable, and easy to share with your CFO.",
    },
    {
      icon: Share2,
      title: "Shareable Audits",
      description:
        "Generate secure links to share audit results with stakeholders. Collaborate on cost optimization.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your data never leaves your secure workspace. No ads. No selling data. Privacy guaranteed.",
    },
  ];

  return (
    <SectionWrapper className="border-b border-border/40">
      <div id="features" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Powerful features for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              lean teams
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to audit, optimize, and manage your AI spending.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
