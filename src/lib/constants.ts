/**
 * Configuration constants for AI tools, plans, and use cases
 */

import { ToolConfig, PlanConfig, UseCaseConfig } from "@/types/audit";

export const AI_TOOLS: ToolConfig[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    description: "OpenAI's conversational AI",
    icon: "sparkles",
  },
  {
    id: "claude",
    label: "Claude",
    description: "Anthropic's AI assistant",
    icon: "brain",
  },
  {
    id: "cursor",
    label: "Cursor",
    description: "AI-powered code editor",
    icon: "code",
  },
  {
    id: "github-copilot",
    label: "GitHub Copilot",
    description: "AI coding assistant",
    icon: "github",
  },
  {
    id: "gemini",
    label: "Gemini",
    description: "Google's AI model",
    icon: "zap",
  },
  {
    id: "openai-api",
    label: "OpenAI API",
    description: "Direct API access",
    icon: "cpu",
  },
  {
    id: "anthropic-api",
    label: "Anthropic API",
    description: "Claude API access",
    icon: "server",
  },
  {
    id: "windsurf",
    label: "Windsurf",
    description: "Codeium's AI editor",
    icon: "wind",
  },
];

export const PLAN_TYPES: PlanConfig[] = [
  {
    id: "free",
    label: "Free",
    description: "Free tier",
  },
  {
    id: "pro",
    label: "Pro",
    description: "Professional plan",
  },
  {
    id: "team",
    label: "Team",
    description: "Team plan",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    description: "Enterprise plan",
  },
  {
    id: "custom",
    label: "Custom",
    description: "Custom pricing",
  },
];

export const USE_CASES: UseCaseConfig[] = [
  {
    id: "coding",
    label: "Coding & Development",
    description: "Building and debugging applications",
  },
  {
    id: "writing",
    label: "Content Writing",
    description: "Creating blog posts, emails, and content",
  },
  {
    id: "research",
    label: "Research & Learning",
    description: "Researching topics and learning new skills",
  },
  {
    id: "data-analysis",
    label: "Data Analysis",
    description: "Analyzing data and generating insights",
  },
  {
    id: "mixed",
    label: "Mixed Usage",
    description: "Combination of multiple use cases",
  },
];

// Helper to get tool by ID
export const getToolById = (id: string) =>
  AI_TOOLS.find((tool) => tool.id === id);

// Helper to get plan by ID
export const getPlanById = (id: string) =>
  PLAN_TYPES.find((plan) => plan.id === id);

// Helper to get use case by ID
export const getUseCaseById = (id: string) =>
  USE_CASES.find((useCase) => useCase.id === id);
