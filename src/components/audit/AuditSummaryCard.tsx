/**
 * AuditSummaryCard - Main summary of audit results
 */

import { AuditResult } from "@/lib/audit/types";
import { TrendingDown, AlertCircle } from "lucide-react";

export interface AuditSummaryCardProps {
  result: AuditResult;
}

const SEVERITY_CONFIG = {
  critical: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-900",
  },
  high: {
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-900",
  },
  moderate: {
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-900",
  },
  low: {
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-900",
  },
  optimal: {
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-900",
  },
};

export function AuditSummaryCard({ result }: AuditSummaryCardProps) {
  const config = SEVERITY_CONFIG[result.overspendingSeverity];

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-8`}>
      <div className="space-y-6">
        {/* Main Savings Summary */}
        <div>
          <div className="flex items-baseline gap-4 mb-2">
            <div className="text-5xl font-bold text-foreground">
              ${result.totalMonthlyIncreaseSavings.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
            <span className="text-muted-foreground">/month</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              ${result.totalAnnualSavings.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}/year
            </p>
          </div>
        </div>

        {/* Status and Score */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Overspending Status */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              STATUS
            </p>
            <div className={`flex items-center gap-2 ${config.color}`}>
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium capitalize">
                {result.overspendingSeverity === "optimal"
                  ? "Optimized"
                  : `${result.overspendingSeverity} overspending`}
              </span>
            </div>
          </div>

          {/* Optimization Score */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              OPTIMIZATION SCORE
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {result.optimizationScore}
              </span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
        </div>

        {/* Current vs Recommended Spend */}
        <div className="border-t border-current opacity-10 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                CURRENT SPEND
              </p>
              <p className="text-lg font-semibold text-foreground">
                ${result.totalCurrentMonthlySpend.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {result.toolCount} tools
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                OPTIMIZED SPEND
              </p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                ${result.totalRecommendedMonthlySpend.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {(
                  ((result.totalCurrentMonthlySpend -
                    result.totalRecommendedMonthlySpend) /
                    result.totalCurrentMonthlySpend) *
                  100
                ).toFixed(0)}
                % reduction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
