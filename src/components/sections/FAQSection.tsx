"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs = [
    {
      id: "faq-1",
      question: "How long does an audit take?",
      answer:
        "Most audits complete in 5-10 minutes. We analyze your tool usage patterns and generate recommendations instantly. The more data you have, the more accurate our insights.",
    },
    {
      id: "faq-2",
      question: "Is my data safe?",
      answer:
        "Absolutely. Your data never leaves your secure workspace. We use enterprise-grade encryption and never store your credentials or sensitive information. We're SOC 2 compliant.",
    },
    {
      id: "faq-3",
      question: "Which AI tools do you support?",
      answer:
        "We currently audit ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and OpenAI API usage. We're constantly adding more tools. Reach out if you need a specific integration.",
    },
    {
      id: "faq-4",
      question: "Can I share audit results with my team?",
      answer:
        "Yes! Generate secure, shareable links for your audit results. Control who can view, comment on, and act on recommendations. Perfect for cross-team collaboration.",
    },
    {
      id: "faq-5",
      question: "Do you offer team subscriptions?",
      answer:
        "We're currently focused on individual audits. Team features and bulk discounts are coming soon. Contact our team for enterprise pricing.",
    },
    {
      id: "faq-6",
      question: "What if I need custom integrations?",
      answer:
        "We work with startups and enterprises on custom integrations. Email hello@shadowstack.io to discuss your specific needs.",
    },
  ];

  return (
    <SectionWrapper className="border-b border-border/40">
      <div id="faq" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Questions{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              answered
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about ShadowStack audits.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-border/40 rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openId === faq.id && (
                <div className="px-6 py-4 border-t border-border/40 bg-muted/30">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
