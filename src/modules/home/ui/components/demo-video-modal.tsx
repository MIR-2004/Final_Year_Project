"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Sparkles } from "lucide-react";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
}

function getYouTubeVideoId(urlOrId: string): string {
  if (!urlOrId) return "MquMAuLHhBU";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = urlOrId.match(regExp);
  return match && match[2].length === 11 ? match[2] : urlOrId;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({
  isOpen,
  onClose,
  videoId = "MquMAuLHhBU",
}) => {
  const cleanId = getYouTubeVideoId(videoId);
  const embedUrl = `https://www.youtube.com/embed/${cleanId}?autoplay=1&rel=0`;
  const watchUrl = `https://www.youtube.com/watch?v=${cleanId}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[92vw] bg-slate-900/95 border border-emerald-500/30 text-white p-4 sm:p-6 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl rounded-2xl overflow-hidden">
        <DialogHeader className="mb-3 flex flex-col gap-1 text-left">
          <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            Meet-AI - AI-Powered Video Conferencing Platform
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-sm">
            Watch how Meet-AI elevates your meetings with real-time AI assistance & insights.
          </DialogDescription>
        </DialogHeader>

        {/* 16:9 Aspect Ratio Video Container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-inner">
          {isOpen && (
            <iframe
              src={embedUrl}
              title="Meet-AI - AI-Powered video conferencing platform"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        {/* Footer action bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            Experience the future of AI-powered virtual meetings.
          </p>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 group"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
