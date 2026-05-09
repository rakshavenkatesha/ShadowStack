/**
 * SavingsHighlightCard - Individual insight card
 */

import { AuditInsight } from "@/lib/audit/types";
import { TrendingDown, Zap, AlertCircle } from "lucide-react";

export interface SavingsHighlightCardProps {
  insight: AuditInsight;
}

const INSIGHT_ICONS: Record<string, React.ReactNode> = {
  "duplicate-tools": <Zap className="h-5 w-5" />,
  "seat-inefficiency": <AlertCircle className="h-5 w-5" />,
  "expensive-plan": <TrendingDown className="h-5 w-5" />,
  "consolidation-opportunity": <Zap className="h-5 w-5" />,
};

const INSIGHT_COLORS: Record<string, string> = {
  "duplicate-tools":
    "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200",
  "seat-inefficiency":
    "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900 text-orange-900 dark:text-orange-200",
  "expensive-plan":
    "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200",
  "consolidation-opportunity":
    "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900 text-purple-900 dark:text-purple-200",
};

export function SavingsHighlightCard({ insight }: SavingsHighlightCardProps) {
  const color = INSIGHT_COLORS[insight.type];

  return (
    <div className={`rounded-lg border p-4 ${color}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{INSIGHT_ICONS[insight.type]}</div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{insight.title}</h4>
          <p className="text-sm opacity-90 mb-2">{insight.description}</p>
          <p className="text-xs font-medium">
            Potential impact: $
            {insight.impact.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            /month
          </p>
        </div>
      </div>
    </div>
  );
}
