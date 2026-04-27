"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CallControls, SpeakerLayout, PaginatedGridLayout } from "@stream-io/video-react-sdk";
import { LayoutGrid, User, Copy, Check } from "lucide-react";
import { OpenAIChatbox } from "./openai-chatbox";

interface Props {
    onLeave: () => void;
    meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
    const [layout, setLayout] = useState<"grid" | "speaker">("grid");
    const [copied, setCopied] = useState(false);

    const onCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col justify-between p-4 h-full text-white relative gap-4">
            <div className="bg-[#101213] rounded-full p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center justify-between p-1 bg-white/10 rounded-full w-fit">
                        <Image src="/logo.svg" width={22} height={22} alt="Logo" />
                    </Link>
                    <h4 className="text-base font-medium">
                        {meetingName}
                    </h4>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onCopyLink}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-full text-sm"
                    >
                        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                        {copied ? "Copied" : "Copy Link"}
                    </button>
                    <div className="flex bg-white/10 rounded-full p-1">
                        <button
                            onClick={() => setLayout("grid")}
                            className={`p-1.5 rounded-full transition ${layout === "grid" ? "bg-white/20" : "hover:bg-white/10"}`}
                        >
                            <LayoutGrid className="size-4" />
                        </button>
                        <button
                            onClick={() => setLayout("speaker")}
                            className={`p-1.5 rounded-full transition ${layout === "speaker" ? "bg-white/20" : "hover:bg-white/10"}`}
                        >
                            <User className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full relative overflow-hidden">
                {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}
            </div>
            
            <div className="bg-[#101213] rounded-full px-4 flex justify-center">
                <CallControls onLeave={onLeave} />
            </div>
            
            {/* OpenAI Chatbox */}
            <OpenAIChatbox />
        </div>
    );
}