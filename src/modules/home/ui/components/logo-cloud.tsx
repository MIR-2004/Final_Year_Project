"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export const LogoCloud: React.FC = () => {
  const logos = [
    { name: "ACME Corp", label: "ACME" },
    { name: "Vercel Scale", label: "VERCEL" },
    { name: "Linear Flow", label: "LINEAR" },
    { name: "Stripe Sync", label: "STRIPE" },
    { name: "Supabase Cloud", label: "SUPABASE" },
    { name: "Snowflake Enterprise", label: "SNOWFLAKE" },
  ];

  return (
    <div className="w-full py-12 border-y border-slate-800 bg-[#0B0F17]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mb-8">
          Powering meetings for 10,000+ high-growth product, engineering, & sales teams worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-80">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 text-slate-400 font-mono font-bold text-lg hover:text-emerald-400 transition-colors tracking-widest cursor-default"
            >
              <Sparkles className="w-4 h-4 text-emerald-500/60" />
              <span>{logo.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
