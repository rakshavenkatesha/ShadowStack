/**
 * Supabase client setup
 * Singleton pattern for server and client operations
 */

import { createClient } from "@supabase/supabase-js";

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

if (!supabaseServiceKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
}

/**
 * Service role client for server-side operations
 * Use this for database mutations that require elevated permissions
 */
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Anonymous/public client for client-side operations
 * Use this in the browser or for public operations
 */
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database operations type helper
 */
export type AuditRow = {
  id: string;
  email: string;
  company_name: string | null;
  role: string | null;
  team_size: number;
  primary_use_case: string;
  total_current_monthly_spend: number;
  total_recommended_monthly_spend: number;
  estimated_monthly_savings: number;
  estimated_annual_savings: number;
  optimization_score: number;
  severity: string;
  ai_summary: string | null;
  tools_data: unknown;
  recommendations_data: unknown;
  insights_data: unknown;
  created_at: string;
  updated_at: string;
};

export type LeadRow = {
  id: string;
  email: string;
  company_name: string | null;
  role: string | null;
  audit_id: string | null;
  contacted: boolean;
  created_at: string;
  updated_at: string;
};
