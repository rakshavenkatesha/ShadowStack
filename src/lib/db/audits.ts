/**
 * Database helpers for audit operations
 * Server-side functions for persisting audit data
 */

import { supabaseServer, AuditRow } from "@/lib/services/supabase";
import { AuditResult } from "@/lib/audit/types";

/**
 * Save audit to database
 * Returns audit ID or null if failed
 */
export async function saveAudit(props: {
  email: string;
  companyName?: string;
  role?: string;
  result: AuditResult;
  aiSummary: string;
}): Promise<string | null> {
  try {
    const { data, error } = await supabaseServer.from("audits").insert([
      {
        email: props.email,
        company_name: props.companyName || null,
        role: props.role || null,
        team_size: props.result.teamSize,
        primary_use_case: props.result.primaryUseCase,
        total_current_monthly_spend: props.result.totalCurrentMonthlySpend,
        total_recommended_monthly_spend:
          props.result.totalRecommendedMonthlySpend,
        estimated_monthly_savings: props.result.estimatedMonthlySavings,
        estimated_annual_savings: props.result.estimatedAnnualSavings,
        optimization_score: props.result.optimizationScore,
        severity: props.result.severity,
        ai_summary: props.aiSummary,
        tools_data: props.result.tools,
        recommendations_data: props.result.recommendations,
        insights_data: props.result.insights,
      },
    ]);

    if (error) {
      console.error("Error saving audit:", error);
      return null;
    }

    // Return first inserted ID
    if (data && data.length > 0) {
      return (data[0] as AuditRow).id;
    }

    return null;
  } catch (error) {
    console.error("Error saving audit:", error);
    return null;
  }
}

/**
 * Get audit by ID
 */
export async function getAuditById(auditId: string): Promise<AuditRow | null> {
  try {
    const { data, error } = await supabaseServer
      .from("audits")
      .select("*")
      .eq("id", auditId)
      .single();

    if (error) {
      console.error("Error fetching audit:", error);
      return null;
    }

    return data as AuditRow;
  } catch (error) {
    console.error("Error fetching audit:", error);
    return null;
  }
}

/**
 * Get all audits for an email
 */
export async function getAuditsByEmail(email: string): Promise<AuditRow[]> {
  try {
    const { data, error } = await supabaseServer
      .from("audits")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching audits:", error);
      return [];
    }

    return (data || []) as AuditRow[];
  } catch (error) {
    console.error("Error fetching audits:", error);
    return [];
  }
}

/**
 * Check if email has existing audit
 */
export async function hasExistingAudit(email: string): Promise<boolean> {
  try {
    const { count, error } = await supabaseServer
      .from("audits")
      .select("*", { count: "exact", head: true })
      .eq("email", email);

    if (error) {
      console.error("Error checking existing audit:", error);
      return false;
    }

    return (count || 0) > 0;
  } catch (error) {
    console.error("Error checking existing audit:", error);
    return false;
  }
}
