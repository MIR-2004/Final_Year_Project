"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error details cleanly on server/client console
    console.error("[App Root Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-4 text-white">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/60 p-8 rounded-2xl border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
          <p className="text-sm text-slate-400">
            A server-side exception occurred while processing your request.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-slate-500 bg-slate-950/80 py-1.5 px-3 rounded-md inline-block border border-slate-800">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-600/20 transition-all"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-slate-300"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
