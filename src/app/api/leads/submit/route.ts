/**
 * API Route: POST /api/leads/submit
 * Handles lead capture form submissions
 */

import { NextRequest, NextResponse } from "next/server";
import { saveLead, emailExistsAsLead } from "@/lib/db/leads";
import {
  checkRateLimit,
  isSuspiciousSubmission,
} from "@/lib/abuse-protection";
import { leadCaptureSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate payload
    const parsed = leadCaptureSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    const { email, companyName, role } = parsed.data;

    // Rate limiting check
    if (!checkRateLimit(email, 3, 86400)) {
      // 3 submissions per 24 hours
      return NextResponse.json(
        { error: "Too many submissions from this email. Please try again tomorrow." },
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
      // Don't reveal that it's spam detection
      return NextResponse.json(
        { error: "Submission could not be processed" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const exists = await emailExistsAsLead(email);
    if (exists) {
      return NextResponse.json(
        {
          success: true,
          message: "Lead already captured",
        },
        { status: 200 }
      );
    }

    // Save lead
    const leadId = await saveLead({
      email,
      companyName: companyName || undefined,
      role: role || undefined,
    });

    if (!leadId) {
      return NextResponse.json(
        { error: "Failed to save lead information" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId,
    });
  } catch (error) {
    console.error("Error in lead submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
