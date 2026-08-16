"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const HomeFooter: React.FC = () => {
  return (
    <footer className="bg-[#060911] text-slate-400 border-t border-slate-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-left">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" height={32} width={32} alt="Meet.AI" />
            <span className="text-2xl font-bold tracking-tight text-white">
              Meet<span className="text-emerald-400">.AI</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            The next-generation AI video conferencing & meeting intelligence platform built for modern high-velocity SaaS teams.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>All Systems Operational</span>
          </div>
        </div>

        {/* Product Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <a href="#features" className="hover:text-emerald-400 transition-colors">
                AI Copilot
              </a>
            </li>
            <li>
              <a href="#demo" className="hover:text-emerald-400 transition-colors">
                Live Transcription
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                Auto Summaries
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                Pricing Plans
              </a>
            </li>
          </ul>
        </div>

        {/* Solutions Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Solutions</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link href="/meetings" className="hover:text-emerald-400 transition-colors">
                Product Teams
              </Link>
            </li>
            <li>
              <Link href="/meetings" className="hover:text-emerald-400 transition-colors">
                Engineering Syncs
              </Link>
            </li>
            <li>
              <Link href="/meetings" className="hover:text-emerald-400 transition-colors">
                Sales & Client Calls
              </Link>
            </li>
            <li>
              <Link href="/upgrade" className="hover:text-emerald-400 transition-colors">
                Enterprise Security
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Security */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal & Security</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">
                Privacy Policy
              </span>
            </li>
            <li>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">
                Terms of Service
              </span>
            </li>
            <li>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">
                SOC 2 Compliance
              </span>
            </li>
            <li>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">
                Security Overview
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Meet.AI Inc. All rights reserved.</p>
        <div className="flex items-center space-x-6">
          <span>Crafted with AI & Precision</span>
        </div>
      </div>
    </footer>
  );
};
