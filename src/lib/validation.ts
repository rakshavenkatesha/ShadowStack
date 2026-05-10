/**
 * Zod validation schemas for lead capture and API payloads
 */

import { z } from "zod";

/**
 * Lead capture form schema
 * Used for validation in lead capture form
 */
export const leadCaptureSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  companyName: z
    .string()
    .max(255, "Company name is too long")
    .optional()
    .or(z.literal("")),
  role: z
    .string()
    .max(255, "Role is too long")
    .optional()
    .or(z.literal("")),
  // Abuse prevention: honeypot field
  website: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || val === "",
      "Invalid submission"
    ),
});

export type LeadCaptureFormData = z.infer<typeof leadCaptureSchema>;

/**
 * Audit submission API payload schema
 */
export const auditSubmissionSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  companyName: z.string().max(255, "Company name is too long").optional(),
  role: z.string().max(255, "Role is too long").optional(),
  // This will contain the full audit result
  auditResultId: z.string().uuid("Invalid audit ID").optional(),
  // Honeypot
  website: z.string().optional().refine((val) => !val, "Invalid submission"),
});

export type AuditSubmissionPayload = z.infer<typeof auditSubmissionSchema>;
