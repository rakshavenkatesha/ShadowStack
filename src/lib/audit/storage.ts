/**
 * Audit results storage and retrieval
 */

import { AuditResult } from "@/lib/audit/types";

const RESULTS_STORAGE_KEY = "shadowstack_audit_results";

/**
 * Save audit results
 */
export const saveAuditResults = (results: AuditResult): void => {
  try {
    const serialized = JSON.stringify(results);
    localStorage.setItem(RESULTS_STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save audit results:", error);
  }
};

/**
 * Get audit results
 */
export const getAuditResults = (): AuditResult | null => {
  try {
    const stored = localStorage.getItem(RESULTS_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuditResult;
  } catch (error) {
    console.error("Failed to retrieve audit results:", error);
    return null;
  }
};

/**
 * Clear audit results
 */
export const clearAuditResults = (): void => {
  try {
    localStorage.removeItem(RESULTS_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear audit results:", error);
  }
};

/**
 * Check if results exist
 */
export const hasAuditResults = (): boolean => {
  try {
    return localStorage.getItem(RESULTS_STORAGE_KEY) !== null;
  } catch (error) {
    console.error("Failed to check audit results:", error);
    return false;
  }
};
