"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-[#090D16]/60 border-t border-slate-800">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title matching the Upgrade Dashboard Screenshot */}
        <div className="mb-14">
          <h2 className="font-semibold text-3xl sm:text-5xl text-white tracking-tight">
            You are on the <span className="text-emerald-400 font-bold">Free</span> plan
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-xl mx-auto font-normal">
            Upgrade your workspace to unlock unlimited meetings, real-time AI copilot Q&A, and advanced team seats.
          </p>
        </div>

        {/* 3 Cards Container matching the Upgrade Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch text-left">
          {/* CARD 1: STARTER ($9/month) */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all">
            <div>
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-2xl text-slate-900">Starter</h3>
                </div>
                <div className="flex items-baseline shrink-0">
                  <span className="text-3xl font-extrabold text-slate-900">$9</span>
                  <span className="text-sm text-slate-500 font-normal">/month</span>
                </div>
              </div>

              <div className="py-2">
                <div className="h-[1px] bg-slate-200 w-full mb-6" />
              </div>

              <Link href="/upgrade" className="block mb-6">
                <button className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-semibold rounded-lg text-sm transition-colors text-center shadow-sm">
                  Upgrade
                </button>
              </Link>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">FEATURES</p>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>20 meetings/month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>AI Summaries</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Meeting Q&A (Chat)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Video Calls</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Meeting History</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 2: PRO ($19/month - Highlighted Dark Emerald Card) */}
          <div className="bg-gradient-to-br from-[#093C23] to-[#051B16] text-white rounded-2xl p-6 border-2 border-emerald-500 shadow-2xl shadow-emerald-950/80 flex flex-col justify-between transform md:-translate-y-1 relative">
            <div>
              <div className="flex items-end justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-2xl text-white">Pro</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#F5B797] text-slate-950">
                    Popular
                  </span>
                </div>
                <div className="flex items-baseline shrink-0">
                  <span className="text-3xl font-extrabold text-white">$19</span>
                  <span className="text-sm text-emerald-200/80 font-normal">/month</span>
                </div>
              </div>

              <div className="py-2">
                <div className="h-[1px] bg-emerald-800/40 w-full mb-6" />
              </div>

              <Link href="/upgrade" className="block mb-6">
                <button className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-colors text-center shadow-md">
                  Upgrade
                </button>
              </Link>

              <div className="space-y-3">
                <p className="text-xs font-bold text-emerald-200 uppercase tracking-wider">FEATURES</p>
                <ul className="space-y-2.5 text-sm text-emerald-100">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-slate-950 fill-white shrink-0" />
                    <span>Unlimited Meetings</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-slate-950 fill-white shrink-0" />
                    <span>Video Calls</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-slate-950 fill-white shrink-0" />
                    <span>AI Summaries</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-slate-950 fill-white shrink-0" />
                    <span>Meeting Q&A (Chat)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-slate-950 fill-white shrink-0" />
                    <span>Meeting History</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-slate-950 fill-white shrink-0" />
                    <span>Priority Support</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-slate-950 fill-white shrink-0" />
                    <span>Early Access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 3: BUSINESS ($49/month) */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all">
            <div>
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-2xl text-slate-900">Business</h3>
                </div>
                <div className="flex items-baseline shrink-0">
                  <span className="text-3xl font-extrabold text-slate-900">$49</span>
                  <span className="text-sm text-slate-500 font-normal">/month</span>
                </div>
              </div>

              <div className="py-2">
                <div className="h-[1px] bg-slate-200 w-full mb-6" />
              </div>

              <Link href="/upgrade" className="block mb-6">
                <button className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-semibold rounded-lg text-sm transition-colors text-center shadow-sm">
                  Upgrade
                </button>
              </Link>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">FEATURES</p>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Unlimited Meetings</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Team seats up to 10 members</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Meeting History</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Video Calls</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Meeting Q&A (Chat)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>AI Summaries</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Early Access</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    <span>Dedicated Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
