"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the Meet.AI Copilot work during live video meetings?",
      a: "Meet.AI streams real-time WebRTC audio during your meeting, transcribes speech with ultra-high precision, and understands conversation context. Participants can ask questions to the AI assistant in the sidebar or view automated insights generated on the fly.",
    },
    {
      q: "Is our team audio and meeting conversation data kept private?",
      a: "Yes, security and privacy are fundamental to Meet.AI. All streams are encrypted in transit (TLS 1.3) and at rest (AES-256). We adhere to strict zero-data-retention policies for AI model training so your proprietary company data stays confidential.",
    },
    {
      q: "Can team members or clients join without installing software?",
      a: "Absolutely! Meet.AI operates entirely within standard modern web browsers on desktop and mobile. No plugins, downloads, or software installations are needed.",
    },
    {
      q: "What is included in the Free Trial plan?",
      a: "The Free Trial plan grants access to full HD video conferencing, up to 5 meetings per month, live AI transcription, and basic automated meeting summaries with zero credit card required.",
    },
    {
      q: "Can I export meeting summaries to Notion, Slack, or Jira?",
      a: "Yes, automated summaries are formatted in clean standard Markdown and can be easily copied or exported to Notion, Slack, Google Docs, or Jira with a single click.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Got Questions? We Have Answers.
        </h2>
        <p className="mt-4 text-base text-slate-300">
          Everything you need to know about Meet.AI product capabilities & enterprise security.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
