/**
 * Database helpers for lead operations
 * Server-side functions for persisting lead data
 */

import { supabaseServer, LeadRow } from "@/lib/services/supabase";

/**
 * Save lead to database
 * Returns lead ID or null if failed
 */
export async function saveLead(props: {
  email: string;
  companyName?: string;
  role?: string;
  auditId?: string;
}): Promise<string | null> {
  try {
    const { data, error } = await supabaseServer.from("leads").insert([
      {
        email: props.email,
        company_name: props.companyName || null,
        role: props.role || null,
        audit_id: props.auditId || null,
      },
    ]);

    if (error) {
      console.error("Error saving lead:", error);
      return null;
    }

    // Return first inserted ID
    if (data && data.length > 0) {
      return (data[0] as LeadRow).id;
    }

    return null;
  } catch (error) {
    console.error("Error saving lead:", error);
    return null;
  }
}

/**
 * Check if email already exists as a lead
 */
export async function emailExistsAsLead(email: string): Promise<boolean> {
  try {
    const { count, error } = await supabaseServer
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("email", email);

    if (error) {
      console.error("Error checking existing lead:", error);
      return false;
    }

    return (count || 0) > 0;
  } catch (error) {
    console.error("Error checking existing lead:", error);
    return false;
  }
}

/**
 * Get lead by email
 */
export async function getLeadByEmail(email: string): Promise<LeadRow | null> {
  try {
    const { data, error } = await supabaseServer
      .from("leads")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found, which is expected
      console.error("Error fetching lead:", error);
      return null;
    }

    return (data || null) as LeadRow | null;
  } catch (error) {
    console.error("Error fetching lead:", error);
    return null;
  }
}

/**
 * Get lead by ID
 */
export async function getLeadById(leadId: string): Promise<LeadRow | null> {
  try {
    const { data, error } = await supabaseServer
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (error) {
      console.error("Error fetching lead:", error);
      return null;
    }

    return data as LeadRow;
  } catch (error) {
    console.error("Error fetching lead:", error);
    return null;
  }
}

/**
 * Update lead as contacted
 */
export async function updateLeadAsContacted(leadId: string): Promise<boolean> {
  try {
    const { error } = await supabaseServer
      .from("leads")
      .update({ contacted: true })
      .eq("id", leadId);

    if (error) {
      console.error("Error updating lead:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating lead:", error);
    return false;
  }
}
