/**
 * InsightsSection - Key insights from audit
 */

import { AuditResult } from "@/lib/audit/types";
import { SavingsHighlightCard } from "./SavingsHighlightCard";

export interface InsightsSectionProps {
  result: AuditResult;
}

export function InsightsSection({ result }: InsightsSectionProps) {
  if (result.insights.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Key Insights</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {result.insights.map((insight, idx) => (
          <SavingsHighlightCard key={idx} insight={insight} />
        ))}
      </div>
    </div>
  );
}
