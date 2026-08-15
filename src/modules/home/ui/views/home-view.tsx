"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Video,
  Brain,
  Zap,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Sparkles,
  Shield,
  Lock,
  Bot,
  ChevronDown,
  Check,
  Globe,
  FileText,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DemoVideoModal } from "../components/demo-video-modal";

export const HomeView = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeTab, setActiveTab] = useState<"copilot" | "transcript" | "summary" | "analytics">("copilot");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Intersection Observers for smooth scroll-triggered animations
  const [pricingInView, setPricingInView] = useState(false);
  const pricingRef = React.useRef<HTMLDivElement>(null);

  const [statsInView, setStatsInView] = useState(false);
  const statsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ref = pricingRef.current;
    if (!ref) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setPricingInView(true);
          }, 400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ref = statsRef.current;
    if (!ref) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  // Features data
  const features = [
    {
      icon: Brain,
      badge: "AI Intelligence",
      title: "Context-Aware AI Assistant",
      description:
        "Meet-AI listens during your video calls, understands discussion context, and provides instant answers & relevant insights live.",
    },
    {
      icon: Video,
      badge: "HD Streaming",
      title: "Crystal-Clear Video Conferencing",
      description:
        "High-definition video & audio built on enterprise WebRTC infrastructure for smooth, lag-free global collaboration.",
    },
    {
      icon: MessageSquare,
      badge: "Real-Time Chat",
      title: "Interactive In-Call AI Chat",
      description:
        "Ask questions to the AI copilot quietly during meetings without interrupting speaker flow.",
    },
    {
      icon: FileText,
      badge: "Auto Notes",
      title: "Automated Meeting Summaries",
      description:
        "Instantly generate structured markdown summaries, action items, and timestamped decision points after every call.",
    },
    {
      icon: Shield,
      badge: "Security First",
      title: "Enterprise Grade Privacy",
      description:
        "Bank-level encryption, SOC-2 readiness, and strict zero-data-retention for complete confidentiality.",
    },
    {
      icon: BarChart3,
      badge: "Analytics",
      title: "Deep Team Insights",
      description:
        "Track meeting productivity, speaker talk time, sentiment analysis, and action item completion metrics.",
    },
  ];

  // How it works steps
  const steps = [
    {
      step: "01",
      title: "Launch HD Meeting",
      description:
        "Create an instant video room with a single click. Share the secure link with your team — no downloads or extensions required.",
      icon: Video,
    },
    {
      step: "02",
      title: "Meet-AI Copilot Joins",
      description:
        "Your intelligent AI copilot listens, transcribes in real-time, and assists participants with instant context & answers.",
      icon: Bot,
    },
    {
      step: "03",
      title: "Instant AI Summaries",
      description:
        "Receive clean markdown summaries, highlighted key takeaways, and assigned action items automatically formatted.",
      icon: Sparkles,
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Product",
      company: "TechCorp",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      text: "Meet-AI transformed how our product team operates. We save 5+ hours every week on meeting notes and action item tracking.",
    },
    {
      name: "David Rodriguez",
      role: "CEO & Co-founder",
      company: "StartupX",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      text: "An absolute game-changer for distributed teams. The real-time AI copilot gives us instant answers without breaking conversation flow.",
    },
    {
      name: "Emily Watson",
      role: "Head of Engineering",
      company: "CloudCraft",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      text: "The accuracy of the automated transcripts and structured meeting notes is astounding. I can't imagine running sprint reviews without it.",
    },
  ];

  // FAQ Items
  const faqs = [
    {
      q: "How does the Meet-AI Copilot work during live meetings?",
      a: "Meet-AI streams live audio during your meeting, transcribes speech with high precision, and understands the context. Participants can ask questions to the AI assistant in the sidebar or view automated insights generated on the fly.",
    },
    {
      q: "Is my meeting audio and conversation data kept private?",
      a: "Yes, security and privacy are our top priorities. All streams are encrypted in transit and at rest. We adhere to zero-data-retention policies for AI model training to ensure your sensitive business data stays confidential.",
    },
    {
      q: "Can team members join without installing software?",
      a: "Yes! Meet-AI works entirely in the web browser on desktop and mobile. No plugins, downloads, or software installations are needed.",
    },
    {
      q: "What is included in the Free plan?",
      a: "The Free plan gives you access to full HD video conferencing, up to 45-minute meetings, live AI transcription, and basic automated meeting summaries.",
    },
    {
      q: "Can I export meeting summaries to my workspace?",
      a: "Yes, automated summaries are formatted in standard Markdown and can be easily copied or exported to Notion, Slack, Google Docs, or Jira with a single click.",
    },
  ];

  // Animated hero subtitle phrases
  const heroPhrases = [
    "Smarter, AI-Powered Meetings.",
    "Real-Time Contextual Copilot.",
    "Instant Automated Summaries.",
    "Effortless Team Collaboration."
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % heroPhrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [heroPhrases.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Background dynamic ambient glow & grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] transition-all duration-700 opacity-60"
          style={{
            left: `${mousePosition.x * 0.02 + 40}%`,
            top: `${mousePosition.y * 0.02 + 15}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Glassmorphic Sticky Header */}
      <nav
        className={`sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 transition-all duration-700 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Image src="/logo.svg" height={26} width={26} alt="Meet.AI" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Meet<span className="text-emerald-400">.AI</span></span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#security" className="hover:text-emerald-400 transition-colors">Security</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/meetings">
              <button className="hidden sm:inline-flex text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/meetings">
              <button className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-slate-950 font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <span>Start Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Release Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-8 backdrop-blur-md shadow-xl transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Introducing Autonomous AI Meeting Copilot</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 hover:text-emerald-300 flex items-center gap-1 cursor-pointer">
              See what&apos;s new <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.08] transition-all duration-1000 delay-100 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Virtual Meetings with <br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
              Real-Time AI Magic
            </span>
          </h1>

          {/* Subtitle Cycler */}
          <div className="mb-10 max-w-2xl mx-auto min-h-[3em] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhrase}
                className="text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                {heroPhrases[currentPhrase]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Primary & Secondary Action CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Link href="/meetings">
              <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-bold px-8 py-4 rounded-full text-lg shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group">
                <span>Start Free Meeting</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <button
              onClick={() => setIsDemoOpen(true)}
              className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800/90 text-white border border-emerald-500/40 hover:border-emerald-400 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur-md hover:shadow-lg hover:shadow-emerald-500/10 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 ml-0.5" />
              </div>
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Free forever tier available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Setup in under 10 seconds</span>
            </div>
          </div>
        </div>

        {/* Interactive SaaS Product Mockup Showcase */}
        <div className="max-w-6xl mx-auto mt-16 relative">
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/15 via-white/5 to-emerald-500/10 border border-white/15 shadow-2xl shadow-emerald-950/80 backdrop-blur-2xl">
            {/* Window Top Header Bar */}
            <div className="bg-slate-900/90 rounded-t-xl px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs text-slate-400 font-mono hidden sm:inline-block">meet-ai.app/room/product-sprint-review</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 rounded-lg p-1 border border-white/10 text-xs text-slate-300">
                <button
                  onClick={() => setActiveTab("copilot")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === "copilot"
                      ? "bg-emerald-500 text-slate-950 font-semibold"
                      : "hover:text-white"
                  }`}
                >
                  AI Copilot
                </button>
                <button
                  onClick={() => setActiveTab("transcript")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === "transcript"
                      ? "bg-emerald-500 text-slate-950 font-semibold"
                      : "hover:text-white"
                  }`}
                >
                  Live Transcript
                </button>
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === "summary"
                      ? "bg-emerald-500 text-slate-950 font-semibold"
                      : "hover:text-white"
                  }`}
                >
                  Auto Summary
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === "analytics"
                      ? "bg-emerald-500 text-slate-950 font-semibold"
                      : "hover:text-white"
                  }`}
                >
                  Insights
                </button>
              </div>
            </div>

            {/* Mockup Body Content */}
            <div className="bg-slate-950/90 rounded-b-xl p-4 sm:p-6 min-h-[380px] grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Video Screen */}
              <div className="lg:col-span-2 bg-slate-900/80 rounded-xl border border-white/10 p-4 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-semibold text-white">Q3 Product Roadmap Sync</span>
                  </div>
                  <span className="text-emerald-400 font-mono">00:24:18 • HD 1080p</span>
                </div>

                {/* Video Grid Participants */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="relative bg-slate-800/90 rounded-lg h-32 flex items-center justify-center overflow-hidden border border-white/10 group">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-lg">
                      SC
                    </div>
                    <span className="absolute bottom-2 left-2 text-[11px] bg-slate-950/80 px-2 py-0.5 rounded text-slate-200">Sarah Chen (Host)</span>
                  </div>
                  <div className="relative bg-slate-800/90 rounded-lg h-32 flex items-center justify-center overflow-hidden border border-white/10">
                    <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 font-bold text-lg">
                      DR
                    </div>
                    <span className="absolute bottom-2 left-2 text-[11px] bg-slate-950/80 px-2 py-0.5 rounded text-slate-200">David Rodriguez</span>
                  </div>
                </div>

                {/* Video Toolbar */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <div className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white cursor-pointer"><Video className="w-4 h-4" /></div>
                  <div className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white cursor-pointer"><MessageSquare className="w-4 h-4" /></div>
                  <div className="p-2.5 rounded-full bg-emerald-500 text-slate-950 font-semibold px-4 text-xs flex items-center gap-1.5"><Bot className="w-4 h-4" /> Copilot Active</div>
                </div>
              </div>

              {/* Sidebar Panel based on selected tab */}
              <div className="bg-slate-900/90 rounded-xl border border-white/10 p-4 flex flex-col justify-between text-left">
                {activeTab === "copilot" && (
                  <div className="flex flex-col h-full justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Copilot Assistant
                      </div>
                      <div className="bg-slate-950/80 p-3 rounded-lg border border-white/10 text-xs text-slate-300 mb-3">
                        <p className="font-semibold text-emerald-300 mb-1">User Question:</p>
                        <p className="italic">&quot;What were the key takeaways from last week&apos;s sprint?&quot;</p>
                      </div>
                      <div className="bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30 text-xs text-slate-200 space-y-1">
                        <p className="font-semibold text-emerald-400 flex items-center gap-1">
                          <Bot className="w-3.5 h-3.5" /> Meet-AI:
                        </p>
                        <p>1. Reduced latency by 35% using Stream WebRTC.</p>
                        <p>2. Finalized Polar subscription workflow.</p>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 border-t border-white/10 pt-2 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      Instant response • Zero delay
                    </div>
                  </div>
                )}

                {activeTab === "transcript" && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] mb-2">
                      <span>LIVE TRANSCRIPTION</span>
                      <span className="text-emerald-400">AUTO-SCROLLING</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-slate-950/60 p-2 rounded border border-white/5">
                        <span className="text-emerald-400 font-semibold">Sarah (00:24:02):</span>
                        <p className="text-slate-300 mt-0.5">Let&apos;s finalize the Q3 product release timeline today.</p>
                      </div>
                      <div className="bg-slate-950/60 p-2 rounded border border-white/5">
                        <span className="text-teal-400 font-semibold">David (00:24:12):</span>
                        <p className="text-slate-300 mt-0.5">Agreed, the new video copilot feature looks ready for deployment.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "summary" && (
                  <div className="space-y-3 text-xs">
                    <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> Markdown Summary Preview
                    </div>
                    <div className="bg-slate-950/80 p-3 rounded-lg border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
                      <p className="text-emerald-300 font-bold">### Overview</p>
                      <p>Team reviewed Q3 roadmap and finalized AI copilot deployment.</p>
                      <p className="text-emerald-300 font-bold mt-2">### Action Items</p>
                      <p>• [x] Deploy AI copilot release build</p>
                      <p>• [ ] Notify enterprise customers</p>
                    </div>
                  </div>
                )}

                {activeTab === "analytics" && (
                  <div className="space-y-3 text-xs">
                    <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" /> Meeting Metrics
                    </div>
                    <div className="space-y-2">
                      <div className="bg-slate-950/60 p-2.5 rounded border border-white/10">
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Speaker Balance:</span>
                          <span className="text-emerald-400 font-semibold">52% / 48%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                          <div className="w-[52%] bg-emerald-500 h-full" />
                          <div className="w-[48%] bg-teal-500 h-full" />
                        </div>
                      </div>
                      <div className="bg-slate-950/60 p-2.5 rounded border border-white/10">
                        <div className="flex justify-between text-slate-300">
                          <span>Engagement Score:</span>
                          <span className="text-emerald-400 font-semibold">96 / 100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Partner Logos */}
      <section className="relative z-10 py-12 border-y border-white/10 bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
            Empowering productive meetings for tech teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {["TechCorp", "StartupX", "NextScale", "QuantumAI", "CloudCraft"].map((company) => (
              <span key={company} className="text-xl sm:text-2xl font-bold tracking-tight text-slate-300 hover:text-emerald-400 transition-colors">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Simple Workflow
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              How Meet-AI Works
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Three effortless steps to transform unproductive meetings into structured, actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-slate-900/60 rounded-3xl p-8 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 relative group"
                >
                  <span className="text-6xl font-black text-slate-800 group-hover:text-emerald-500/20 transition-colors absolute top-6 right-6">
                    {item.step}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-slate-950 font-bold mb-6 shadow-lg shadow-emerald-500/20">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Features Grid */}
      <section id="features" className="relative z-10 py-24 px-6 bg-slate-900/30 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Platform Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              Everything You Need for Smarter Meetings
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Designed from the ground up for engineering, product, and leadership teams who value clarity and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group bg-slate-900/80 rounded-3xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/60 cursor-pointer ${
                    activeFeature === index ? "ring-2 ring-emerald-400/60" : ""
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security & Data Privacy Section */}
      <section id="security" className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 rounded-3xl p-8 sm:p-12 border border-emerald-500/30 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Shield className="w-4 h-4" />
                Enterprise Security & Privacy
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight">
                Bank-Grade Protection & Zero Data Retention
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Your video calls and transcripts remain strictly yours. Meet-AI operates under stringent zero-retention policies — we never use your meeting content to train public AI models.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /> End-to-End Encrypted
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> SOC-2 Ready Standard
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" /> GDPR Compliant
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
              <Lock className="w-10 h-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats counter section */}
      <section className="relative z-10 py-16 px-6 border-y border-white/10 bg-slate-900/40">
        <div
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center transition-all duration-1000 ${
            statsInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="p-6">
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-2">
              <AnimatedNumber value={statsInView ? 80000 : 0} suffix="+" duration={1.2} delay={0} />
            </div>
            <div className="text-slate-300 font-medium text-sm">Meetings Enhanced Worldwide</div>
          </div>
          <div className="p-6">
            <div className="text-4xl sm:text-5xl font-extrabold text-green-400 mb-2">
              <AnimatedNumber value={statsInView ? 98 : 0} suffix="%" duration={1.2} delay={0.3} />
            </div>
            <div className="text-slate-300 font-medium text-sm">User Satisfaction Rating</div>
          </div>
          <div className="p-6">
            <div className="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-2">
              <AnimatedNumber value={statsInView ? 24 : 0} suffix="/7" duration={1.2} delay={0.6} />
            </div>
            <div className="text-slate-300 font-medium text-sm">Autonomous AI Copilot Uptime</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Customer Reviews
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              Loved by Tech Leaders & Teams
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              See how modern teams build better products with Meet-AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-slate-900/60 rounded-3xl p-8 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                    &quot;{t.text}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-300 border border-emerald-400/30">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role} at {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6 bg-slate-900/30 border-t border-white/10" ref={pricingRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Flexible Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              Simple Plans for Teams of Any Size
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Start free and scale effortlessly. Transparent pricing with zero hidden fees.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1000 ${
              pricingInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Free / Basic Plan */}
            <div className="bg-slate-900/80 rounded-3xl p-8 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                  <p className="text-slate-400 text-xs mb-4">For individuals & small project trials</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold">$0</span>
                    <span className="text-slate-400 ml-2 text-sm">/forever</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-300 text-left border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited standard video calls</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic AI meeting summaries</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 45 min per session</li>
                </ul>
              </div>
              <Link href="/meetings" className="mt-8">
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-full text-sm transition-colors">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Pro Yearly - Best Value Plan */}
            <div className="bg-gradient-to-b from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl p-8 border-2 border-emerald-400 shadow-2xl shadow-emerald-500/20 relative flex flex-col justify-between transform md:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg">
                Best Value
              </div>
              <div>
                <div className="text-left mb-6 pt-2">
                  <h3 className="text-2xl font-bold text-emerald-300 mb-2">Pro Annual</h3>
                  <p className="text-slate-300 text-xs mb-4">For growing engineering & product teams</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-white">$259</span>
                    <span className="text-slate-400 ml-2 text-sm">/year</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium block mt-1">Save $89/yr (includes 2 months free)</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-200 text-left border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited meeting length</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full Real-Time AI Copilot</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Automated Markdown summaries</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Speaker transcript export</li>
                </ul>
              </div>
              <Link href="/upgrade" className="mt-8">
                <button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-bold py-3.5 rounded-full text-sm shadow-lg shadow-emerald-500/25 transition-all">
                  Upgrade to Pro
                </button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-900/80 rounded-3xl p-8 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <p className="text-slate-400 text-xs mb-4">Custom security, SSO & dedicated support</p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold">$999</span>
                    <span className="text-slate-400 ml-2 text-sm">/year</span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-300 text-left border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> All Pro features included</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom AI model fine-tuning</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated Discord & SLA Support</li>
                </ul>
              </div>
              <Link href="/upgrade" className="mt-8">
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-full text-sm transition-colors">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Questions & Answers
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to know about Meet-AI.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 rounded-2xl border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between font-semibold text-lg text-white hover:text-emerald-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action CTA Banner */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 border border-emerald-500/40 text-center shadow-2xl shadow-emerald-950 overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
                Ready to Supercharge Your Meetings?
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
                Join thousands of productive teams already saving hours every week with Meet-AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/meetings">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-bold px-10 py-4 rounded-full text-lg shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2">
                    <span>Get Started Free</span>
                    <Zap className="w-5 h-5" />
                  </button>
                </Link>
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800 text-white border border-emerald-500/40 px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-white/10 bg-slate-950 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2 space-y-4 text-left">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" height={28} width={28} alt="Meet.AI" />
              <span className="text-xl font-bold text-white tracking-tight">Meet.AI</span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The AI-Powered video conferencing platform designed for modern product, engineering, and remote teams.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 w-max">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </div>
          </div>

          <div className="text-left space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">AI Copilot</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Real-Time Transcription</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Automated Notes</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div className="text-left space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setIsDemoOpen(true)} className="hover:text-emerald-400 transition-colors cursor-pointer">Product Demo Video</button></li>
              <li><a href="#security" className="hover:text-emerald-400 transition-colors">Security Whitepaper</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Help & Documentation</a></li>
            </ul>
          </div>

          <div className="text-left space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-500">About Us</span></li>
              <li><span className="text-slate-500">Privacy Policy</span></li>
              <li><span className="text-slate-500">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Meet-AI Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Making meetings smarter, one conversation at a time.</p>
        </div>
      </footer>

      {/* YouTube Demo Video Pop-Up Modal */}
      <DemoVideoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
};

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, suffix = "", duration = 1, delay = 0 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = 0;
    let startTime: number | undefined;
    const step = (timestamp: number) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setDisplay(Math.floor(progress * (value - start) + start));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };
    const timeout = setTimeout(() => {
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [value, delay, duration]);

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};
