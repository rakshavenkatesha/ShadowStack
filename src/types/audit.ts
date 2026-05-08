/**
 * Core types for the AI Spend Audit system
 */

export type AITool = 
  | "chatgpt"
  | "claude"
  | "cursor"
  | "github-copilot"
  | "gemini"
  | "openai-api"
  | "anthropic-api"
  | "windsurf";

export type PlanType = "free" | "pro" | "team" | "enterprise" | "custom";

export type UseCaseType = "coding" | "writing" | "research" | "mixed" | "data-analysis";

export interface ToolEntry {
  id: string;
  tool: AITool;
  plan: PlanType;
  monthlySpend: number;
  seats: number;
}

export interface AuditFormData {
  teamSize: number;
  primaryUseCase: UseCaseType;
  tools: ToolEntry[];
}

export interface ToolConfig {
  id: AITool;
  label: string;
  description: string;
  icon: string;
}

export interface PlanConfig {
  id: PlanType;
  label: string;
  description?: string;
}

export interface UseCaseConfig {
  id: UseCaseType;
  label: string;
  description: string;
}
