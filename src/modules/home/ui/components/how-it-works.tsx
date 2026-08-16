"use client";

import React from "react";
import { Video, Bot, Sparkles, CheckCircle2 } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: Video,
      title: "Launch HD Call in 1-Click",
      description:
        "Create an instant video room or join via your browser. Share the link with team members — no downloads or plugins required.",
    },
    {
      step: "02",
      icon: Bot,
      title: "AI Copilot Listens & Transcribes",
      description:
        "Meet.AI listens to live conversation context, transcribes in real-time, and provides on-demand answers to team questions.",
    },
    {
      step: "03",
      icon: Sparkles,
      title: "Instant Summaries & Workspace Sync",
      description:
        "Post-meeting structured summaries, action items, and key decisions are generated automatically and synced to Notion or Slack.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070A12] border-y border-slate-800">
      <div className="max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Setup</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Meet.AI Powers Your Workflows
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            From instant room creation to automated post-meeting documentation in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative rounded-2xl bg-slate-900/80 p-8 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-slate-700 font-mono">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero setup time required</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
