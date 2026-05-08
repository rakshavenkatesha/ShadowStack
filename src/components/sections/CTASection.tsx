import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";

export function CTASection() {
  return (
    <SectionWrapper className="border-b border-border/40">
      <div id="cta" className="relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-br from-card via-card to-muted/20 p-8 sm:p-12 lg:p-16">
        {/* Gradient blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

        <div className="relative space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to audit your AI stack?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join startups saving thousands on AI subscriptions. Get your audit results in 5 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/30"
            >
              Start Your Free Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/40 bg-background hover:bg-muted transition-colors"
            >
              Schedule a Demo
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required. Instant results. Privacy guaranteed.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
