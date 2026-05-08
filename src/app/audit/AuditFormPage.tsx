/**
 * AuditFormPage - Client component wrapper for the audit form
 */

"use client";

import { AuditForm } from "@/components/forms/AuditForm";

export function AuditFormPage() {
  const handleSuccess = (data: any) => {
    console.log("Form submitted:", data);
    // TODO: Redirect to results page after audit engine is ready
  };

  const handleError = (error: Error) => {
    console.error("Form error:", error);
  };

  return (
    <AuditForm onSuccess={handleSuccess} onError={handleError} />
  );
}
