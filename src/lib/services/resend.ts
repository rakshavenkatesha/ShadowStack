/**
 * Email service using Resend
 * Handles transactional emails with proper error handling
 */

import { Resend } from "resend";
import { AuditResult } from "@/lib/audit/types";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.warn(
    "RESEND_API_KEY not configured. Email sending will not work."
  );
}

const resend = apiKey ? new Resend(apiKey) : null;

const APP_EMAIL = process.env.NEXT_PUBLIC_APP_EMAIL || "noreply@shadowstack.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://shadowstack.com";

/**
 * Email template for audit confirmation
 */
const auditConfirmationTemplate = (props: {
  email: string;
  companyName?: string;
  monthlySpend: number;
  monthlySavings: number;
  annualSavings: number;
  summaryText: string;
}): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: #f9fafb; padding: 40px 20px; border-radius: 0 0 8px 8px; }
    .highlight { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #667eea; }
    .metric { display: inline-block; width: 48%; margin-right: 4%; text-align: center; }
    .metric-value { font-size: 24px; font-weight: bold; color: #667eea; }
    .metric-label { font-size: 12px; color: #999; text-transform: uppercase; }
    .summary-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .cta { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0; }
    .footer { text-align: center; font-size: 12px; color: #999; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Audit Submitted</h1>
      <p>Your AI spending analysis is complete</p>
    </div>
    
    <div class="content">
      <p>Hi ${props.companyName ? props.companyName : "there"},</p>
      
      <p>Thank you for submitting your AI spending audit. We've analyzed your current tool usage and compiled a personalized optimization report.</p>
      
      <div class="highlight">
        <div class="metric">
          <div class="metric-value">$${props.monthlySpend.toFixed(0)}</div>
          <div class="metric-label">Current Monthly Spend</div>
        </div>
        <div class="metric">
          <div class="metric-value">$${props.monthlySavings.toFixed(0)}</div>
          <div class="metric-label">Potential Monthly Savings</div>
        </div>
      </div>
      
      <p><strong>Annual Savings Opportunity: $${props.annualSavings.toFixed(0)}</strong></p>
      
      <div class="summary-box">
        <h3 style="margin-top: 0;">Audit Summary</h3>
        <p>${props.summaryText}</p>
      </div>
      
      <p>Your detailed recommendations and analysis are available in the results dashboard. We'll be following up with additional optimization insights over the coming weeks.</p>
      
      <p>
        <a href="${APP_URL}/audit/results" class="cta">View Full Report</a>
      </p>
      
      <p style="font-size: 14px; color: #666;">
        Questions? We're here to help at support@shadowstack.com
      </p>
    </div>
    
    <div class="footer">
      <p>© 2025 ShadowStack. All rights reserved.</p>
      <p>
        <a href="${APP_URL}" style="color: #667eea; text-decoration: none;">Visit ShadowStack</a> •
        <a href="${APP_URL}/privacy" style="color: #667eea; text-decoration: none;">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Send audit confirmation email
 */
export async function sendAuditConfirmationEmail(props: {
  email: string;
  companyName?: string;
  result: AuditResult;
  summary: string;
}): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return false;
  }

  try {
    const html = auditConfirmationTemplate({
      email: props.email,
      companyName: props.companyName,
      monthlySpend: props.result.totalCurrentMonthlySpend,
      monthlySavings: props.result.estimatedMonthlySavings,
      annualSavings: props.result.estimatedAnnualSavings,
      summaryText: props.summary,
    });

    await resend.emails.send({
      from: APP_EMAIL,
      to: props.email,
      subject: "Your ShadowStack Audit Results — $" + Math.round(props.result.estimatedAnnualSavings) + " in Potential Savings",
      html,
    });

    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

/**
 * Check if email service is available
 */
export function isEmailServiceAvailable(): boolean {
  return !!resend;
}
