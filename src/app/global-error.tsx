"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Fatal Error]:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-4 text-white font-sans">
        <div className="max-w-md w-full text-center space-y-6 bg-slate-900/60 p-8 rounded-2xl border border-slate-800 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-bold tracking-tight">System Error</h2>
          <p className="text-sm text-slate-400">
            A critical exception occurred while loading the application interface.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-slate-500 bg-slate-950/80 py-1.5 px-3 rounded-md inline-block border border-slate-800">
              Digest: {error.digest}
            </p>
          )}
          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
