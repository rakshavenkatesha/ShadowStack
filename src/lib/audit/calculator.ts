/**
 * Savings calculation utilities
 */

import { ToolEntry } from "@/lib/schemas";
import { getMonthlyPrice, getExpectedSeats } from "./constants";

/**
 * Calculate actual spend for a tool entry
 */
export const calculateToolSpend = (tool: ToolEntry): number => {
  const basePrice = getMonthlyPrice(tool.tool, tool.plan);

  // If it's an API, use custom spend value
  if (tool.tool.includes("api")) {
    return tool.monthlySpend;
  }

  // For regular plans, multiply by seats if per-seat pricing
  if (tool.plan === "team" || tool.plan === "enterprise") {
    // These are often seat-based
    return basePrice + (tool.seats - 1) * 10; // rough estimate
  }

  // For pro/free, it's per user
  return basePrice * tool.seats;
};

/**
 * Calculate total monthly spend
 */
export const calculateTotalMonthlySpend = (tools: ToolEntry[]): number => {
  return tools.reduce((sum, tool) => sum + calculateToolSpend(tool), 0);
};

/**
 * Calculate wasted seat spend
 */
export const calculateWastedSeats = (
  tool: ToolEntry,
  teamSize: number
): number => {
  const expectedSeats = getExpectedSeats(teamSize, tool.tool);
  const wastedSeats = Math.max(0, tool.seats - expectedSeats);

  const pricePerSeat = calculateToolSpend(tool) / Math.max(1, tool.seats);
  return wastedSeats * pricePerSeat;
};

/**
 * Calculate optimization potential for downgrade
 */
export const calculateDowngradeSavings = (
  tool: ToolEntry,
  newPlan: string
): number => {
  const currentSpend = calculateToolSpend(tool);
  const newBasePrice = getMonthlyPrice(tool.tool, newPlan);

  // Estimate new spend based on new plan
  let newSpend: number;

  if (tool.tool.includes("api")) {
    // APIs - assume 20% reduction in custom spend
    newSpend = tool.monthlySpend * 0.8;
  } else if (newPlan === "team" || newPlan === "enterprise") {
    newSpend = newBasePrice + (tool.seats - 1) * 10;
  } else {
    newSpend = newBasePrice * tool.seats;
  }

  return Math.max(0, currentSpend - newSpend);
};

/**
 * Calculate annual savings from monthly savings
 */
export const calculateAnnualSavings = (monthlySavings: number): number => {
  return monthlySavings * 12;
};
