/**
 * Type definitions for audit engine
 */

import { AuditFormData, ToolEntry } from "@/lib/schemas";

export type RecommendationAction =
  | "downgrade"
  | "consolidate"
  | "reduce-seats"
  | "optimize-plan"
  | "monitor"
  | "no-change";

export interface ToolRecommendation {
  toolId: string;
  toolName: string;
  currentPlan: string;
  currentSpend: number;
  currentSeats: number;
  action: RecommendationAction;
  recommendedPlan?: string;
  recommendedAlternative?: string;
  recommendedSeats?: number;
  estimatedSavingsPerMonth: number;
  estimatedSavingsPerYear: number;
  reasoning: string;
  priority: "high" | "medium" | "low";
}

export interface AuditInsight {
  type:
    | "duplicate-tools"
    | "seat-inefficiency"
    | "expensive-plan"
    | "consolidation-opportunity";
  title: string;
  description: string;
  impact: number; // potential savings in dollars
}

export interface AuditResult {
  // Input summary
  teamSize: number;
  primaryUseCase: string;
  toolCount: number;

  // Financial summary
  totalCurrentMonthlySpend: number;
  totalRecommendedMonthlySpend: number;
  totalMonthlyIncreaseSavings: number;
  totalAnnualSavings: number;

  // Scoring
  optimizationScore: number; // 0-100
  overspendingSeverity: "critical" | "high" | "moderate" | "low" | "optimal";

  // Recommendations
  recommendations: ToolRecommendation[];
  insights: AuditInsight[];

  // Metadata
  auditedAt: string;
  recommendationCount: number;
  highPriorityCount: number;
}

export interface SavingsOpportunity {
  category: string;
  savings: number;
  count: number;
}
