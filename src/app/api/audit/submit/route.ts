/**
 * API Route: POST /api/audit/submit
 * Handles audit submission, AI summary generation, and email sending
 * Server action for persisting audit data and generating summaries
 */

import { NextRequest, NextResponse } from "next/server";
import { generateAuditSummary } from "@/lib/services/openai";
import { sendAuditConfirmationEmail } from "@/lib/services/resend";
import { saveAudit } from "@/lib/db/audits";
import {
  checkRateLimit,
  isSuspiciousSubmission,
} from "@/lib/abuse-protection";
import { auditSubmissionSchema } from "@/lib/validation";
import { getAuditResults } from "@/lib/audit/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate payload
    const parsed = auditSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission data" },
        { status: 400 }
      );
    }

    const { email, companyName, role } = parsed.data;

    // Rate limiting check
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Abuse protection
    if (
      isSuspiciousSubmission({
        email,
        companyName,
        role,
        honeypot: body.website,
      })
    ) {
      // Don't reveal that it's spam detection - just say it failed
      return NextResponse.json(
        { error: "Submission could not be processed" },
        { status: 400 }
      );
    }

    // Get audit result from client-side storage (passed via request)
    // In production, you'd have the audit ID and fetch from DB
    const auditResult = getAuditResults();
    if (!auditResult) {
      return NextResponse.json(
        { error: "Audit data not found" },
        { status: 400 }
      );
    }

    // Generate AI summary
    const aiSummary = await generateAuditSummary(auditResult);

    // Save to database
    const auditId = await saveAudit({
      email,
      companyName,
      role,
      result: auditResult,
      aiSummary,
    });

    if (!auditId) {
      return NextResponse.json(
        { error: "Failed to save audit data" },
        { status: 500 }
      );
    }

    // Send confirmation email
    await sendAuditConfirmationEmail({
      email,
      companyName,
      result: auditResult,
      summary: aiSummary,
    });

    return NextResponse.json({
      success: true,
      auditId,
      summary: aiSummary,
    });
  } catch (error) {
    console.error("Error in audit submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
