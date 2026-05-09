/**
 * Audit engine constants - pricing data for all tools and plans
 */

export interface ToolPricingTier {
  free?: number;
  pro?: number;
  team?: number;
  enterprise?: number;
  custom?: number;
}

/**
 * Monthly pricing for each AI tool by plan
 * Realistic SaaS pricing models
 */
export const TOOL_PRICING: Record<string, ToolPricingTier> = {
  chatgpt: {
    free: 0,
    pro: 20,
    team: 30,
    enterprise: 150,
  },
  claude: {
    free: 0,
    pro: 20,
    team: 30,
    enterprise: 150,
  },
  cursor: {
    free: 0,
    pro: 20,
    team: 25,
    enterprise: 120,
  },
  "github-copilot": {
    free: 0,
    pro: 10,
    team: 39,
    enterprise: 188,
  },
  gemini: {
    free: 0,
    pro: 20,
    team: 30,
    enterprise: 150,
  },
  "openai-api": {
    free: 0,
    pro: 0, // Usage-based, assume minimum
    team: 0,
    enterprise: 0, // Custom pricing
    custom: 0,
  },
  "anthropic-api": {
    free: 0,
    pro: 0, // Usage-based
    team: 0,
    enterprise: 0,
    custom: 0,
  },
  windsurf: {
    free: 0,
    pro: 15,
    team: 20,
    enterprise: 100,
  },
};

/**
 * Get monthly price for a tool/plan combination
 */
export const getMonthlyPrice = (tool: string, plan: string): number => {
  return TOOL_PRICING[tool]?.[plan as keyof ToolPricingTier] ?? 0;
};

/**
 * Alternative tools by category
 * Used for consolidation recommendations
 */
export const TOOL_ALTERNATIVES: Record<string, string[]> = {
  chatgpt: ["claude", "gemini"],
  claude: ["chatgpt", "gemini"],
  gemini: ["chatgpt", "claude"],
  cursor: ["github-copilot", "windsurf"],
  "github-copilot": ["cursor", "windsurf"],
  windsurf: ["cursor", "github-copilot"],
};

/**
 * Seat per person ratios for different team sizes
 */
export const EXPECTED_SEAT_RATIO = {
  small: 0.8, // Teams < 10: expect ~80% of team has each tool
  medium: 0.5, // Teams 10-50: expect ~50% per tool
  large: 0.3, // Teams 50-200: expect ~30% per tool
  enterprise: 0.2, // Teams > 200: expect ~20% per tool
};

export const getExpectedSeats = (teamSize: number, tool: string): number => {
  let ratio: number;
  if (teamSize < 10) ratio = EXPECTED_SEAT_RATIO.small;
  else if (teamSize < 50) ratio = EXPECTED_SEAT_RATIO.medium;
  else if (teamSize < 200) ratio = EXPECTED_SEAT_RATIO.large;
  else ratio = EXPECTED_SEAT_RATIO.enterprise;

  return Math.ceil(teamSize * ratio);
};

/**
 * Per-seat cost for team plans
 */
export const TEAM_PLAN_SEAT_COST: Record<string, number> = {
  chatgpt: 30 / 5, // Assume team plan covers ~5 seats
  claude: 30 / 5,
  cursor: 25 / 4,
  "github-copilot": 39 / 3,
  gemini: 30 / 5,
  windsurf: 20 / 4,
};
