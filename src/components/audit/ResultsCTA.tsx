/**
 * ResultsCTA - Call-to-action section for results page
 */

import Link from "next/link";
import { AuditResult } from "@/lib/audit/types";
import { ArrowRight, Calendar } from "lucide-react";

export interface ResultsCTAProps {
  result: AuditResult;
}

export function ResultsCTA({ result }: ResultsCTAProps) {
  const highSavings = result.totalMonthlyIncreaseSavings >= 500;

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-12">
      <div className="max-w-2xl space-y-6">
        {highSavings ? (
          <>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                You could save ${result.totalMonthlyIncreaseSavings.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })} every month
              </h2>
              <p className="text-lg text-muted-foreground">
                That's ${result.totalAnnualSavings.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })} per year. Let's make it happen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Schedule Consultation
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Our team will help you implement these changes safely without disrupting your workflows.
            </p>
          </>
        ) : (
          <>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Want to explore further optimizations?
              </h2>
              <p className="text-muted-foreground">
                Our team can help identify additional opportunities and custom strategies for your unique setup.
              </p>
            </div>

            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Get Expert Guidance
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
