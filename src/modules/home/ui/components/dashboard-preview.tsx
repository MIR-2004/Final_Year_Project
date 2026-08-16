"use client";

import React, { useState } from "react";
import {
  Video,
  Users,
  Star,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  FileText,
  BarChart3,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "copilot" | "summary" | "analytics">("dashboard");

  return (
    <div id="demo" className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6">
      {/* Container Frame with Crisp Obsidian Styling */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950 p-2 sm:p-3 border border-slate-700/60 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl">
        {/* Browser Top Navigation / Tab Selector Header */}
        <div className="bg-[#0F172A] rounded-t-xl px-4 py-3 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">https://</span>meet-ai.app/dashboard
            </div>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium text-slate-400 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "dashboard"
                  ? "bg-emerald-600 text-white font-semibold shadow-sm"
                  : "hover:text-white hover:bg-slate-800"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Dashboard View</span>
            </button>

            <button
              onClick={() => setActiveTab("copilot")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "copilot"
                  ? "bg-emerald-600 text-white font-semibold shadow-sm"
                  : "hover:text-white hover:bg-slate-800"
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-emerald-300" />
              <span>Live AI Copilot</span>
            </button>

            <button
              onClick={() => setActiveTab("summary")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "summary"
                  ? "bg-emerald-600 text-white font-semibold shadow-sm"
                  : "hover:text-white hover:bg-slate-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Auto Summary</span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "analytics"
                  ? "bg-emerald-600 text-white font-semibold shadow-sm"
                  : "hover:text-white hover:bg-slate-800"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Insights</span>
            </button>
          </div>
        </div>

        {/* Dashboard Shell Body */}
        <div className="bg-[#F8FAFC] rounded-b-xl overflow-hidden min-h-[520px] flex flex-col md:flex-row text-slate-800 shadow-inner">
          {/* Left Dark Forest Green Sidebar (Matching Dashboard Screenshot Exactly) */}
          <div className="w-full md:w-64 bg-[#082218] text-white p-4 flex flex-col justify-between border-r border-emerald-950/40 shrink-0">
            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-2.5 pb-4 border-b border-emerald-900/50">
                <Image src="/logo.svg" height={32} width={32} alt="Meet.AI" />
                <span className="text-xl font-bold tracking-tight text-white">Meet.AI</span>
              </div>

              {/* Sidebar Menu Section 1 */}
              <div className="mt-6 space-y-1">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-900/40 border border-emerald-700/50 text-white text-sm font-medium shadow-sm">
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>My Meetings</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-200/70 hover:text-white hover:bg-emerald-900/20 text-sm font-medium transition-colors cursor-pointer">
                  <Users className="w-4 h-4" />
                  <span>Other Meetings</span>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-emerald-900/50" />

              {/* Sidebar Menu Section 2 */}
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-200/70 hover:text-white hover:bg-emerald-900/20 text-sm font-medium transition-colors cursor-pointer">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>Upgrade</span>
                </div>
              </div>
            </div>

            {/* Sidebar Footer Elements */}
            <div className="space-y-4 pt-6 border-t border-emerald-900/50">
              {/* Free Trial Progress Box */}
              <div className="bg-[#051811] p-3.5 rounded-xl border border-emerald-900/60 text-xs">
                <div className="flex items-center justify-between text-emerald-200 font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    Free Trial
                  </span>
                  <span className="text-emerald-400">1/5 Meetings</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden mb-3">
                  <div className="w-1/5 h-full bg-emerald-500 rounded-full" />
                </div>
                <button className="w-full py-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/60 border border-emerald-700/40 text-emerald-100 font-medium text-xs transition-colors">
                  Upgrade
                </button>
              </div>

              {/* User Profile Footer */}
              <div className="flex items-center gap-3 bg-[#051811] p-2.5 rounded-xl border border-emerald-900/60">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  MA
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-semibold text-white truncate">Mir Saif Ali</p>
                  <p className="text-[10px] text-emerald-300/70 truncate">mir.saif.ali2004@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Dashboard Canvas (Light theme matching screenshot) */}
          <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] flex flex-col justify-between overflow-x-auto">
            {activeTab === "dashboard" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Top Action Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      readOnly
                      value=""
                      placeholder="Search"
                      className="w-full pl-9 pr-12 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
                      ⌘ K
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg shadow-sm transition-colors">
                      Join Meeting
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span>New Meeting</span>
                    </button>
                  </div>
                </div>

                {/* Section Title */}
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">My Meetings</h3>
                </div>

                {/* Filter Controls Bar */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      readOnly
                      placeholder="Filter by name"
                      className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 placeholder-slate-400 shadow-sm"
                    />
                  </div>
                  <button className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium flex items-center gap-2 shadow-sm">
                    <span>Status</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                {/* Main Meetings List Card (Recreating the user screenshot's card) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-all">
                  <div className="space-y-1">
                    <span className="text-base font-bold text-slate-900 block">New</span>
                    <span className="text-xs text-slate-500 block">Aug 16, 2026</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      MA
                    </div>
                    <span className="text-sm font-semibold text-slate-800">Mir Saif Ali</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Completed
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      18 Seconds
                    </span>
                  </div>
                </div>

                {/* Pagination indicator */}
                <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-medium">
                  <span>Page 1 of 1</span>
                  <div className="flex items-center gap-2">
                    <button disabled className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-400 cursor-not-allowed">
                      Previous
                    </button>
                    <button disabled className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-400 cursor-not-allowed">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Live AI Copilot */}
            {activeTab === "copilot" && (
              <div className="space-y-4 text-left animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-slate-900">Live Meeting Copilot Active</span>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                    Real-Time Audio Stream
                  </span>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3 font-sans shadow-md border border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      AI
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-emerald-400 font-semibold">Meet.AI Copilot • 10:42 AM</p>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        &quot;Based on the current discussion regarding Q3 marketing budgets, Sarah proposed allocating \$45K for enterprise search campaigns, which represents a 20% increase over Q2.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Suggested In-Call Action</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors">
                      ✨ Draft follow-up email to marketing team
                    </button>
                    <button className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-colors">
                      📌 Add \$45K budget item to Jira roadmap
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Auto Summary */}
            {activeTab === "summary" && (
              <div className="space-y-4 text-left animate-in fade-in duration-300">
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Sprint Sync & AI Roadmap Summary</h4>
                      <p className="text-xs text-slate-500">Generated automatically in 2.4 seconds post-call</p>
                    </div>
                    <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors">
                      Export to Notion / Slack
                    </button>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <div>
                      <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-1">Key Decisions</span>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        <li>Approved new real-time WebRTC audio pipeline architecture.</li>
                        <li>Migrated authentication provider to Better Auth with Polar billing integration.</li>
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-1">Assigned Action Items</span>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                          <span className="font-medium text-slate-800">Deploy landing page update to Vercel</span>
                          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">@Mir Saif Ali</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Analytics */}
            {activeTab === "analytics" && (
              <div className="space-y-4 text-left animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold">Hours Saved This Month</p>
                    <p className="text-2xl font-extrabold text-emerald-600 mt-1">24.5 hrs</p>
                    <span className="text-[11px] text-emerald-700 font-medium">↑ 18% vs last month</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold">Action Items Resolved</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">94.2%</p>
                    <span className="text-[11px] text-slate-500 font-medium">48 tasks tracked</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold">Meeting Efficiency Index</p>
                    <p className="text-2xl font-extrabold text-indigo-600 mt-1">9.4 / 10</p>
                    <span className="text-[11px] text-indigo-700 font-medium">Top 5% SaaS Teams</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Callout in Preview Canvas */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Live workspace data synchronized in real-time.
              </span>
              <Link href="/meetings" className="text-emerald-700 font-semibold hover:underline flex items-center gap-1">
                Explore Full Dashboard <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
