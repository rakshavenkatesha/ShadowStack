import { StatCard } from "@/components/ui/StatCard";
import { SectionWrapper } from "./SectionWrapper";

export function StatsSection() {
  const stats = [
    {
      value: "32%",
      label: "Average reduction in AI spend",
    },
    {
      value: "5min",
      label: "Time to complete your audit",
    },
    {
      value: "$12K",
      label: "Average annual savings per company",
    },
    {
      value: "100%",
      label: "Private and secure audits",
    },
  ];

  return (
    <SectionWrapper className="border-b border-border/40">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Numbers that speak for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              themselves
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what other startups are achieving with ShadowStack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
