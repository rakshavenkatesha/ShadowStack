import { CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";

export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Connect Your Tools",
      description:
        "Link your ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and OpenAI API accounts to ShadowStack.",
    },
    {
      number: "2",
      title: "Analyze Your Spending",
      description:
        "Our AI engine analyzes your usage patterns and spending across all connected tools in real-time.",
    },
    {
      number: "3",
      title: "Get Optimization Insights",
      description:
        "Receive actionable recommendations on consolidating tools, downgrading plans, and removing unused seats.",
    },
  ];

  return (
    <SectionWrapper className="border-b border-border/40">
      <div id="how-it-works" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How ShadowStack{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to audit your AI stack and start saving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connecting line */}
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              )}

              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-muted-foreground mt-2">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
