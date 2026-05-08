/**
 * localStorage utilities for persisting audit form state
 */

import { AuditFormData } from "@/types/audit";

const STORAGE_KEY = "shadowstack_audit_form";

/**
 * Save audit form data to localStorage
 */
export const saveAuditFormData = (data: AuditFormData): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save audit form data:", error);
  }
};

/**
 * Retrieve audit form data from localStorage
 */
export const getAuditFormData = (): AuditFormData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuditFormData;
  } catch (error) {
    console.error("Failed to retrieve audit form data:", error);
    return null;
  }
};

/**
 * Clear audit form data from localStorage
 */
export const clearAuditFormData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear audit form data:", error);
  }
};

/**
 * Check if form data exists in localStorage
 */
export const hasAuditFormData = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch (error) {
    console.error("Failed to check audit form data:", error);
    return false;
  }
};
