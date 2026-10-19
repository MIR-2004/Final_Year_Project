import { SparklesIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";

export const ProcessingState = () => {
    return (
        <div className="bg-white rounded-lg border px-6 py-12 flex flex-col items-center justify-center text-center gap-y-6">
            <div className="relative">
                <Image src="/completed.svg" alt="Completed" width={200} height={200} className="opacity-90" />
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground size-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <SparklesIcon className="size-5" />
                </div>
            </div>

            <div className="flex flex-col gap-y-2 max-w-md">
                <h3 className="text-xl font-semibold text-gray-900">
                    Generating Meeting Summary
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    The meeting has ended. Meet-AI is transcribing the audio and generating your summary. This page will update automatically as soon as it is ready.
                </p>
            </div>

            <div className="flex items-center gap-x-2.5 bg-blue-50/80 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-medium">
                <Loader2Icon className="size-3.5 animate-spin text-blue-600" />
                <span>Processing transcript & generating summary...</span>
            </div>
        </div>
    );
};