/**
 * OpenAI service for generating AI-powered audit summaries
 * Handles API calls with graceful fallback on failure
 */

import { OpenAI } from "openai";
import { AuditResult } from "@/lib/audit/types";

// Validate API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn(
    "OPENAI_API_KEY not configured. AI summaries will use fallback."
  );
}

const client = apiKey ? new OpenAI({ apiKey }) : null;

/**
 * Prompt template for audit summary generation
 * Optimized for: conciseness, professionalism, startup tone
 */
const generateAuditSummaryPrompt = (result: AuditResult): string => {
  const savings = result.estimatedAnnualSavings;
  const topRecommendations = result.recommendations.slice(0, 2);
  
  return `You are a SaaS spending optimization consultant. Generate a brief, professional audit summary (80-120 words) for a startup based on this data:

Team Size: ${result.teamSize} people
Current Monthly Spend: $${result.totalCurrentMonthlySpend.toFixed(2)}
Potential Monthly Savings: $${result.estimatedMonthlySavings.toFixed(2)}
Annual Savings Opportunity: $${savings.toFixed(2)}
Top Issues: ${topRecommendations.map((r) => r.toolName).join(", ")}

Requirements:
- Startup/consultant tone (confident, actionable)
- Mention the highest savings opportunity
- Suggest 1-2 quick wins they could implement
- End with motivation about competitive advantage
- NO buzzwords or clichés
- NO markdown formatting, just plain text

Summary:`;
};

/**
 * Fallback summary when AI is unavailable
 * Deterministic, template-based summary
 */
const generateFallbackSummary = (result: AuditResult): string => {
  const savings = result.estimatedAnnualSavings;
  const monthlyReduction = result.estimatedMonthlySavings;
  const topRec = result.recommendations[0];

  return `Your audit revealed $${monthlyReduction.toFixed(2)}/month in potential savings—that's $${savings.toFixed(2)} annually. The biggest opportunity is optimizing ${topRec.toolName}: by ${topRec.action.replaceAll("-", " ")}, you could recapture significant budget. With ${result.teamSize} team members, rightsizing your AI tool stack could free up resources for product development. Consider starting with your highest-impact recommendation.`;
};

/**
 * Generate AI-powered audit summary
 * Falls back gracefully if API unavailable
 */
export async function generateAuditSummary(
  result: AuditResult
): Promise<string> {
  // Return fallback if no API key configured
  if (!client) {
    return generateFallbackSummary(result);
  }

  try {
    const prompt = generateAuditSummaryPrompt(result);

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 250,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract text from response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content in response");
    }

    // Clean up and return summary
    return content.trim();
  } catch (error) {
    // Log error for monitoring, but don't break the UX
    console.error("Failed to generate AI summary:", error);

    // Return deterministic fallback
    return generateFallbackSummary(result);
  }
}

/**
 * Check if AI service is available
 * Useful for conditional UI rendering
 */
export function isAIServiceAvailable(): boolean {
  return !!client;
}
