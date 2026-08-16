"use client";

import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Sarah Chen",
      role: "VP of Product",
      company: "TechCorp",
      avatar: "SC",
      avatarBg: "bg-emerald-600",
      rating: 5,
      quote:
        "Meet-AI transformed how our product organization operates. We save over 6 hours per engineer every week on meeting recap notes and action item tracking.",
    },
    {
      name: "David Rodriguez",
      role: "Founder & CEO",
      company: "ScaleFlow",
      avatar: "DR",
      avatarBg: "bg-teal-600",
      rating: 5,
      quote:
        "An absolute game-changer for distributed async teams. The live AI copilot gives us instant contextual answers without interrupting conversation momentum.",
    },
    {
      name: "Emily Watson",
      role: "Head of Engineering",
      company: "CloudCraft",
      avatar: "EW",
      avatarBg: "bg-indigo-600",
      rating: 5,
      quote:
        "The accuracy of the live transcripts and automated Markdown summaries is astounding. I can't imagine running sprint reviews or design syncs without it.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070A12] border-y border-slate-800">
      <div className="max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Loved by Teams Everywhere</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Leaders at High-Growth Companies
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            See how Meet.AI elevates team productivity and decision clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 p-8 border border-slate-800 hover:border-slate-700 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-8">
                  &quot;{rev.quote}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div
                  className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-sm`}
                >
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <p className="text-xs text-slate-400">
                    {rev.role} • {rev.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
