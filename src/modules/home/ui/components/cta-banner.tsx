"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-[#092B1D] to-slate-900 p-8 sm:p-14 border border-emerald-500/40 shadow-2xl shadow-emerald-950/40 overflow-hidden text-center">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>Instant Setup • No Credit Card Required</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Supercharge Your Team&apos;s Virtual Meetings?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Join over 10,000+ forward-thinking product, engineering, and growth teams using Meet.AI to save hours every week.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/meetings">
              <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-base shadow-xl shadow-emerald-950/80 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <Link href="/upgrade">
              <button className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2">
                <span>View Pro Pricing</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
