/**
 * RecommendationCard - Individual tool recommendation
 */

import { ToolRecommendation } from "@/lib/audit/types";
import { AlertCircle, TrendingDown, CheckCircle2, Zap } from "lucide-react";

export interface RecommendationCardProps {
  recommendation: ToolRecommendation;
}

const ACTION_ICONS: Record<string, React.ReactNode> = {
  downgrade: <TrendingDown className="h-5 w-5" />,
  consolidate: <Zap className="h-5 w-5" />,
  "reduce-seats": <AlertCircle className="h-5 w-5" />,
  "optimize-plan": <TrendingDown className="h-5 w-5" />,
  monitor: <AlertCircle className="h-5 w-5" />,
  "no-change": <CheckCircle2 className="h-5 w-5" />,
};

const ACTION_LABELS: Record<string, string> = {
  downgrade: "Downgrade Plan",
  consolidate: "Consolidate Tools",
  "reduce-seats": "Reduce Seats",
  "optimize-plan": "Optimize Plan",
  monitor: "Monitor Usage",
  "no-change": "Optimized",
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900",
  medium:
    "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900",
  low: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900",
};

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const priorityColor = PRIORITY_COLORS[recommendation.priority];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {recommendation.toolName}
          </h3>
          <p className="text-sm text-muted-foreground capitalize">
            {recommendation.currentPlan} plan · {recommendation.currentSeats}{" "}
            seat{recommendation.currentSeats !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Priority Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${priorityColor}`}
        >
          {ACTION_ICONS[recommendation.action]}
          <span>{ACTION_LABELS[recommendation.action]}</span>
        </div>
      </div>

      {/* Spending Info */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6 p-4 bg-muted/50 rounded-lg">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">
            CURRENT SPEND
          </p>
          <p className="text-lg font-semibold text-foreground">
            ${recommendation.currentSpend.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">/month</p>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">
            MONTHLY SAVINGS
          </p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            ${recommendation.estimatedSavingsPerMonth.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">/month</p>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">
            ANNUAL SAVINGS
          </p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            ${recommendation.estimatedSavingsPerYear.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">/year</p>
        </div>
      </div>

      {/* Reasoning */}
      <p className="text-sm text-foreground leading-relaxed">
        {recommendation.reasoning}
      </p>

      {/* Suggested Changes */}
      {(recommendation.recommendedPlan ||
        recommendation.recommendedSeats ||
        recommendation.recommendedAlternative) && (
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          {recommendation.recommendedPlan && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Recommended plan:</span>{" "}
              <span className="capitalize">{recommendation.recommendedPlan}</span>
            </p>
          )}
          {recommendation.recommendedSeats && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Recommended seats:</span>{" "}
              {recommendation.recommendedSeats}
            </p>
          )}
          {recommendation.recommendedAlternative && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Alternative:</span>{" "}
              {recommendation.recommendedAlternative}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
