"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  const heroPhrases = [
    "Autonomous AI Copilot for Every Call",
    "Instant Automated Meeting Summaries",
    "Real-Time Live Transcription & Q&A",
    "Automated Action Items & Workspace Sync",
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % heroPhrases.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [heroPhrases.length]);

  return (
    <section className="relative z-10 pt-16 pb-10 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Targeted Subtle Radial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-lg">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Introducing Meet.AI 2.0</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-normal">Next-Gen Video & AI Copilot</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          Turn Every Meeting into <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent drop-shadow-sm">
            Actionable Intelligence
          </span>
        </h1>

        {/* Subtitle Cycler */}
        <div className="mb-10 max-w-2xl mx-auto min-h-[2.5em] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhrase}
              className="text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {heroPhrases[currentPhrase]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link href="/meetings" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-base shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2.5 group">
              <span>Start Free Meeting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-emerald-500/50 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-center space-x-3 backdrop-blur-md shadow-md group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 ml-0.5" />
            </div>
            <span>Watch 2-Min Demo</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Free Forever Plan</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Instant Browser Access</span>
          </div>
        </div>
      </div>
    </section>
  );
};
