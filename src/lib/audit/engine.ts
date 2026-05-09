/**
 * Main audit engine orchestration
 */

import { AuditFormData, ToolEntry } from "@/lib/schemas";
import { AuditResult, AuditInsight } from "./types";
import { recommendTool } from "./rules";
import { calculateTotalMonthlySpend } from "./calculator";
import { TOOL_ALTERNATIVES } from "./constants";

// Tool name mapping
const TOOL_NAMES: Record<string, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  cursor: "Cursor",
  "github-copilot": "GitHub Copilot",
  gemini: "Gemini",
  "openai-api": "OpenAI API",
  "anthropic-api": "Anthropic API",
  windsurf: "Windsurf",
};

/**
 * Generate insights from recommendations
 */
const generateInsights = (
  formData: AuditFormData,
  totalCurrentSpend: number
): AuditInsight[] => {
  const insights: AuditInsight[] = [];

  // Check for duplicate tools
  const toolCounts: Record<string, number> = {};
  const alternativeGroups: Record<string, ToolEntry[]> = {};

  formData.tools.forEach((tool) => {
    toolCounts[tool.tool] = (toolCounts[tool.tool] || 0) + 1;

    // Group by alternatives
    const category =
      Object.keys(TOOL_ALTERNATIVES).find((alt) =>
        TOOL_ALTERNATIVES[alt].includes(tool.tool)
      ) || tool.tool;

    if (!alternativeGroups[category]) {
      alternativeGroups[category] = [];
    }
    alternativeGroups[category].push(tool);
  });

  // Find consolidation opportunities
  Object.entries(alternativeGroups).forEach(([category, tools]) => {
    if (tools.length > 1) {
      const totalSpend = tools.reduce(
        (sum, t) => sum + parseFloat(t.monthlySpend.toString()),
        0
      );
      insights.push({
        type: "consolidation-opportunity",
        title: `${tools.length} Similar Tools Used`,
        description: `You're using ${tools.map((t) => TOOL_NAMES[t.tool]).join(" and ")}. Consolidating could reduce complexity and cost.`,
        impact: totalSpend * 0.3, // 30% potential savings
      });
    }
  });

  // Check for seat inefficiency
  const totalSeats = formData.tools.reduce((sum, t) => sum + t.seats, 0);
  const expectedTotalSeats = formData.teamSize * 0.5; // Average ~50% adoption

  if (totalSeats > expectedTotalSeats * 1.3) {
    const wastedSpend = (totalCurrentSpend / totalSeats) * (totalSeats - expectedTotalSeats);
    insights.push({
      type: "seat-inefficiency",
      title: "Over-Purchased Seats",
      description: `Your team has ${totalSeats} total seats across AI tools, but likely only needs ~${Math.ceil(expectedTotalSeats)}. You may be over-provisioned.`,
      impact: wastedSpend,
    });
  }

  return insights;
};

/**
 * Determine overspending severity
 */
const calculateSeverity = (
  savings: number,
  totalSpend: number
): "critical" | "high" | "moderate" | "low" | "optimal" => {
  const savingsRatio = savings / totalSpend;

  if (savingsRatio >= 0.4) return "critical"; // 40%+ potential savings = overspending
  if (savingsRatio >= 0.25) return "high"; // 25%+ savings
  if (savingsRatio >= 0.15) return "moderate"; // 15%+ savings
  if (savingsRatio >= 0.05) return "low"; // 5%+ savings
  return "optimal";
};

/**
 * Calculate optimization score (0-100)
 */
const calculateOptimizationScore = (
  savings: number,
  totalSpend: number
): number => {
  // Start with 100 (perfect)
  // Deduct based on wasted spending ratio
  const wasteRatio = savings / totalSpend;
  const score = 100 - wasteRatio * 100;
  return Math.max(0, Math.min(100, Math.round(score)));
};

/**
 * Run complete audit
 */
export const runAudit = (formData: AuditFormData): AuditResult => {
  const currentMonthlySpend = calculateTotalMonthlySpend(formData.tools);

  // Generate recommendations for each tool
  const recommendations = formData.tools
    .map((tool) =>
      recommendTool(
        tool,
        TOOL_NAMES[tool.tool] || tool.tool,
        formData.teamSize,
        formData.primaryUseCase,
        formData.tools
      )
    )
    .sort((a, b) => {
      // Sort by savings potential
      return (
        b.estimatedSavingsPerMonth - a.estimatedSavingsPerMonth
      );
    });

  // Calculate total potential savings
  const totalMonthlySavings = recommendations.reduce(
    (sum, rec) => sum + rec.estimatedSavingsPerMonth,
    0
  );

  // Generate insights
  const insights = generateInsights(formData, currentMonthlySpend);

  // Calculate metrics
  const optimizationScore = calculateOptimizationScore(
    totalMonthlySavings,
    currentMonthlySpend
  );

  const severity = calculateSeverity(
    totalMonthlySavings,
    currentMonthlySpend
  );

  const highPriorityCount = recommendations.filter(
    (r) => r.priority === "high"
  ).length;

  return {
    teamSize: formData.teamSize,
    primaryUseCase: formData.primaryUseCase,
    toolCount: formData.tools.length,
    totalCurrentMonthlySpend: Math.round(currentMonthlySpend * 100) / 100,
    totalRecommendedMonthlySpend: Math.round(
      (currentMonthlySpend - totalMonthlySavings) * 100
    ) / 100,
    totalMonthlyIncreaseSavings: Math.round(totalMonthlySavings * 100) / 100,
    totalAnnualSavings: Math.round(totalMonthlySavings * 12 * 100) / 100,
    optimizationScore,
    overspendingSeverity: severity,
    recommendations,
    insights,
    auditedAt: new Date().toISOString(),
    recommendationCount: recommendations.length,
    highPriorityCount,
  };
}
