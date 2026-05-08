import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "./SectionWrapper";

export function HeroSection() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-background via-background to-muted/30">
      <div className="mx-auto max-w-3xl text-center space-y-8">
        {/* Badge */}
        <Badge>🚀 AI Spend Visibility, Instantly</Badge>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Your AI stack is probably{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            overkill
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          ShadowStack helps startups uncover wasted AI spending across ChatGPT, Claude, Cursor, and more. Find hidden costs. Optimize subscriptions. Save thousands annually.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Start Your Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/40 bg-background hover:bg-muted transition-colors"
          >
            See How It Works
          </Link>
        </div>

        {/* Trust Text */}
        <p className="text-sm text-muted-foreground">
          No credit card required. Audit results in 5 minutes.
        </p>

        {/* Dashboard Mock */}
        <div className="mt-16 rounded-lg border border-border/40 bg-card p-1 shadow-2xl shadow-indigo-500/20">
          <div className="rounded-lg bg-muted/50 p-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="inline-flex rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-3 text-white mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <p className="text-muted-foreground">
                Premium dashboard preview<br />coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
