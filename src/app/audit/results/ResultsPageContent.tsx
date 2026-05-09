/**
 * Results page client component
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getAuditResults } from "@/lib/audit/storage";
import { AuditResult } from "@/lib/audit/types";
import { ResultsHeader } from "@/components/audit/ResultsHeader";
import { AuditSummaryCard } from "@/components/audit/AuditSummaryCard";
import { RecommendationBreakdown } from "@/components/audit/RecommendationBreakdown";
import { InsightsSection } from "@/components/audit/InsightsSection";
import { ResultsCTA } from "@/components/audit/ResultsCTA";

export function ResultsPageContent() {
  const router = useRouter();
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const results = getAuditResults();
    if (!results) {
      // No results found, redirect back to form
      router.push("/audit");
      return;
    }

    setResult(results);
    setIsLoading(false);
  }, [router]);

  if (isLoading || !result) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <ResultsHeader />

      {/* Summary Card */}
      <AuditSummaryCard result={result} />

      {/* Recommendations Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Optimization Recommendations
        </h2>
        <RecommendationBreakdown result={result} />
      </div>

      {/* Insights Section */}
      {result.insights.length > 0 && <InsightsSection result={result} />}

      {/* CTA Section */}
      <ResultsCTA result={result} />
    </div>
  );
}
