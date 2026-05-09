/**
 * Business rules for audit recommendations
 */

import { ToolEntry } from "@/lib/schemas";
import {
  calculateToolSpend,
  calculateWastedSeats,
  calculateDowngradeSavings,
} from "./calculator";
import { getExpectedSeats, TOOL_ALTERNATIVES } from "./constants";
import { ToolRecommendation, RecommendationAction } from "./types";

/**
 * Determine recommendation priority based on savings
 */
export const calculatePriority = (
  savings: number
): "high" | "medium" | "low" => {
  if (savings >= 50) return "high";
  if (savings >= 20) return "medium";
  return "low";
};

/**
 * Check if seats are likely unused
 */
export const hasUnusedSeats = (
  tool: ToolEntry,
  teamSize: number
): { unused: number; ratio: number } => {
  const expectedSeats = getExpectedSeats(teamSize, tool.tool);
  const unusedSeats = Math.max(0, tool.seats - expectedSeats);
  const unusedRatio = tool.seats > 0 ? unusedSeats / tool.seats : 0;

  return { unused: unusedSeats, ratio: unusedRatio };
};

/**
 * Check if tool plan is overly expensive for team size
 */
export const isExpensivePlan = (
  tool: ToolEntry,
  teamSize: number
): boolean => {
  // For very small teams, expensive plans are overkill
  if (teamSize < 5 && (tool.plan === "team" || tool.plan === "enterprise")) {
    return true;
  }

  // For small-medium teams, enterprise is rarely needed
  if (teamSize < 50 && tool.plan === "enterprise") {
    return true;
  }

  return false;
};

/**
 * Generate recommendation for a tool
 */
export const recommendTool = (
  tool: ToolEntry,
  toolName: string,
  teamSize: number,
  useCase: string,
  allTools: ToolEntry[]
): ToolRecommendation => {
  const currentSpend = calculateToolSpend(tool);
  let action: RecommendationAction = "no-change";
  let savings = 0;
  let recommendedPlan: string | undefined;
  let recommendedAlternative: string | undefined;
  let recommendedSeats: number | undefined;
  let reasoning = "Spending appears optimal for your team size.";
  let priority: "high" | "medium" | "low" = "low";

  // Rule 1: Check for unused seats
  const { unused, ratio } = hasUnusedSeats(tool, teamSize);
  if (ratio > 0.3 && unused >= 2) {
    action = "reduce-seats";
    const wastedCost = calculateWastedSeats(tool, teamSize);
    savings = wastedCost;
    recommendedSeats = Math.ceil(getExpectedSeats(teamSize, tool.tool));
    reasoning = `You're paying for ~${unused} unused seats. Reducing to ${recommendedSeats} seats would save $${savings.toFixed(0)}/month.`;
    priority = calculatePriority(savings);
  }

  // Rule 2: Check for expensive plan for team size
  else if (isExpensivePlan(tool, teamSize)) {
    const suggestedPlan = teamSize < 5 ? "pro" : "team";
    const suggestedSavings = calculateDowngradeSavings(tool, suggestedPlan);

    if (suggestedSavings > 5) {
      action = "downgrade";
      savings = suggestedSavings;
      recommendedPlan = suggestedPlan;
      reasoning = `${tool.plan} plan is expensive for a ${teamSize}-person team. Downgrading to ${suggestedPlan} would save $${savings.toFixed(0)}/month.`;
      priority = calculatePriority(savings);
    }
  }

  // Rule 3: Check for tool overlap/consolidation
  else if (
    allTools.some(
      (other) =>
        other.tool !== tool.tool &&
        TOOL_ALTERNATIVES[tool.tool]?.includes(other.tool)
    )
  ) {
    // Similar tools exist - flag for potential consolidation
    const alternativeCount = allTools.filter(
      (other) =>
        other.tool !== tool.tool &&
        TOOL_ALTERNATIVES[tool.tool]?.includes(other.tool)
    ).length;

    if (alternativeCount > 0) {
      action = "consolidate";
      // Estimate 50% savings from consolidation
      savings = currentSpend * 0.5;
      reasoning = `You're using ${alternativeCount} similar tool(s). Consolidating could save $${savings.toFixed(0)}/month.`;
      priority = "medium";
    }
  }

  // Rule 4: Monitor high API spend
  else if (tool.tool.includes("api") && currentSpend > 100) {
    action = "monitor";
    reasoning = `Your ${toolName} API spend is $${currentSpend.toFixed(0)}/month. Monitor usage to ensure it aligns with needs.`;
    priority = "medium";
  }

  return {
    toolId: tool.id,
    toolName,
    currentPlan: tool.plan,
    currentSpend: Math.round(currentSpend * 100) / 100,
    currentSeats: tool.seats,
    action,
    recommendedPlan,
    recommendedAlternative,
    recommendedSeats,
    estimatedSavingsPerMonth: Math.round(savings * 100) / 100,
    estimatedSavingsPerYear: Math.round(savings * 12 * 100) / 100,
    reasoning,
    priority,
  };
};
