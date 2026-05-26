import { openai } from "@/lib/openai";
import { SYSTEM_AGENT_INSTRUCTIONS } from "@/constants";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const aiService = {
  async generateSummary(transcriptWithSpeakers: unknown[]): Promise<string> {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: SYSTEM_AGENT_INSTRUCTIONS,
        },
        {
          role: "user",
          content: "Summarize the following transcript: " + JSON.stringify(transcriptWithSpeakers),
        },
      ],
      temperature: 0.5,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content ?? "No summary generated.";
  },

  async answerMeetingQuestion(
    summary: string,
    previousMessages: ChatCompletionMessageParam[],
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: instructions },
        ...previousMessages,
        { role: "user", content: question },
      ],
    });

    return completion.choices[0]?.message?.content ?? "No response could be generated.";
  }
};
