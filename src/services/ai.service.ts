import { gemini } from "@/lib/gemini";
import { SYSTEM_AGENT_INSTRUCTIONS } from "@/constants";

export const aiService = {
  async generateSummary(transcriptWithSpeakers: unknown[]): Promise<string> {
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: "Summarize the following transcript: " + JSON.stringify(transcriptWithSpeakers) }],
        },
      ],
      config: {
        systemInstruction: SYSTEM_AGENT_INSTRUCTIONS,
        temperature: 0.5,
        maxOutputTokens: 2000,
      },
    });

    return response.text ?? "No summary generated.";
  },

  async answerMeetingQuestion(
    summary: string,
    previousMessages: { role: "user" | "assistant"; content: string }[],
    question: string
  ): Promise<string> {
    const instructions = `
You are an AI assistant helping the user revisit a recently completed meeting.
Below is a summary of the meeting, generated from the transcript:

${summary}

The following are your behavioral guidelines as you assist the user:

${SYSTEM_AGENT_INSTRUCTIONS}

The user may ask questions about the meeting, request clarifications, or ask for follow-up actions.
Always base your responses on the meeting summary above.

You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.

If the summary does not contain enough information to answer a question, politely let the user know.

Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.
`.trim();

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...previousMessages.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
        { role: "user", parts: [{ text: question }] },
      ],
      config: {
        systemInstruction: instructions,
      },
    });

    return response.text ?? "No response could be generated.";
  }
};
