import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuditFormPage } from "./AuditFormPage";

export const metadata = {
  title: "AI Spend Audit | ShadowStack",
  description: "Audit your AI tool spending and identify hidden costs across your team",
};

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              AI Spend Audit
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your AI tool usage and spending. We'll analyze your
              expenses and identify optimization opportunities.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <AuditFormPage />
          </div>

          {/* Info Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="mb-2 text-2xl">🔍</div>
              <h3 className="font-semibold text-foreground">Comprehensive Scan</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We analyze all your AI tool subscriptions and usage patterns
              </p>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="mb-2 text-2xl">💰</div>
              <h3 className="font-semibold text-foreground">Cost Analysis</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Identify redundant tools and negotiate better pricing with vendors
              </p>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="mb-2 text-2xl">📊</div>
              <h3 className="font-semibold text-foreground">Actionable Insights</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get specific recommendations to reduce your AI spend by up to 40%
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
