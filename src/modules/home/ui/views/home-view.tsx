"use client";

import React, { useState } from "react";
import { HomeNavbar } from "@/modules/home/ui/components/home-navbar";
import { HeroSection } from "@/modules/home/ui/components/hero-section";
import { DashboardPreview } from "@/modules/home/ui/components/dashboard-preview";
import { LogoCloud } from "@/modules/home/ui/components/logo-cloud";
import { FeaturesGrid } from "@/modules/home/ui/components/features-grid";
import { HowItWorks } from "@/modules/home/ui/components/how-it-works";
import { PricingSection } from "@/modules/home/ui/components/pricing-section";
import { Testimonials } from "@/modules/home/ui/components/testimonials";
import { FaqSection } from "@/modules/home/ui/components/faq-section";
import { CtaBanner } from "@/modules/home/ui/components/cta-banner";
import { HomeFooter } from "@/modules/home/ui/components/home-footer";
import { DemoVideoModal } from "@/modules/home/ui/components/demo-video-modal";

export const HomeView = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Sticky Dark Obsidian SaaS Navbar */}
      <HomeNavbar onOpenDemo={() => setIsDemoOpen(true)} />

      {/* Hero Section */}
      <HeroSection onOpenDemo={() => setIsDemoOpen(true)} />

      {/* Interactive SaaS Dashboard Showcase */}
      <DashboardPreview />

      {/* Social Proof Logo Cloud */}
      <LogoCloud />

      {/* Core SaaS Features Grid */}
      <FeaturesGrid />

      {/* 3-Step Setup & How It Works */}
      <HowItWorks />

      {/* Customer Testimonials & Reviews */}
      <Testimonials />

      {/* Upgrade / Pricing Plans (Aligned with Dashboard Upgrade View) */}
      <PricingSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* High-Converting CTA Banner */}
      <CtaBanner />

      {/* SaaS Footer */}
      <HomeFooter />

      {/* Interactive Demo Video Modal */}
      <DemoVideoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
};
