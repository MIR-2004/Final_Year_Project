import "server-only";

import { GoogleGenAI } from "@google/genai";

let _gemini: GoogleGenAI | null = null;

export function getGemini(): GoogleGenAI {
  if (!_gemini) {
    _gemini = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }
  return _gemini;
}

export const gemini = new Proxy({} as GoogleGenAI, {
  get(_target, prop) {
    return getGemini()[prop as keyof GoogleGenAI];
  },
});
