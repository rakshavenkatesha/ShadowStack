/**
 * ResultsHeader - Page header with navigation
 */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface ResultsHeaderProps {
  title?: string;
  description?: string;
}

export function ResultsHeader({
  title = "Your Audit Results",
  description = "Here's what we found and how you can save money.",
}: ResultsHeaderProps) {
  return (
    <div className="space-y-4 mb-8">
      <Link
        href="/audit"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to form
      </Link>

      <div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-2">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
}
