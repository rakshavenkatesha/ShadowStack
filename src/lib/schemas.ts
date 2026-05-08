/**
 * Zod validation schemas for audit form data
 */

import { z } from "zod";

export const toolEntrySchema = z.object({
  id: z.string().min(1, "Tool ID is required"),
  tool: z.enum(
    ["chatgpt", "claude", "cursor", "github-copilot", "gemini", "openai-api", "anthropic-api", "windsurf"],
    {
      errorMap: () => ({ message: "Please select a valid AI tool" }),
    }
  ),
  plan: z.enum(["free", "pro", "team", "enterprise", "custom"], {
    errorMap: () => ({ message: "Please select a valid plan" }),
  }),
  monthlySpend: z.coerce
    .number({
      errorMap: () => ({ message: "Monthly spend must be a number" }),
    })
    .positive("Monthly spend must be greater than $0")
    .finite("Please enter a valid amount"),
  seats: z.coerce
    .number({
      errorMap: () => ({ message: "Seats must be a number" }),
    })
    .int("Seats must be a whole number")
    .min(1, "At least 1 seat is required"),
});

export const auditFormSchema = z.object({
  teamSize: z.coerce
    .number({
      errorMap: () => ({ message: "Team size must be a number" }),
    })
    .int("Team size must be a whole number")
    .min(1, "Team size must be at least 1 person")
    .max(10000, "Team size cannot exceed 10,000"),
  primaryUseCase: z.enum(
    ["coding", "writing", "research", "mixed", "data-analysis"],
    {
      errorMap: () => ({ message: "Please select a primary use case" }),
    }
  ),
  tools: z.array(toolEntrySchema).min(1, "Please add at least one AI tool"),
});

export type ToolEntry = z.infer<typeof toolEntrySchema>;
export type AuditFormData = z.infer<typeof auditFormSchema>;
