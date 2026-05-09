/**
 * RecommendationBreakdown - Section showing all recommendations
 */

import { AuditResult } from "@/lib/audit/types";
import { RecommendationCard } from "./RecommendationCard";

export interface RecommendationBreakdownProps {
  result: AuditResult;
}

export function RecommendationBreakdown({
  result,
}: RecommendationBreakdownProps) {
  if (result.recommendations.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center">
        <p className="text-lg font-semibold text-foreground mb-2">
          No optimizations needed
        </p>
        <p className="text-muted-foreground">
          Your AI tool spending is already well-optimized for your team!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {result.recommendations.map((rec, idx) => (
        <RecommendationCard key={rec.toolId || idx} recommendation={rec} />
      ))}
    </div>
  );
}
