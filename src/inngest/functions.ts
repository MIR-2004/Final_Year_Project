import { db } from "@/db";
import { meetings, user } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meettings/types";
import { eq, inArray } from "drizzle-orm";
import JSONL from "jsonl-parse-stringify";
import OpenAI from "openai";
import { SYSTEM_AGENT_ID, SYSTEM_AGENT_NAME, SYSTEM_AGENT_INSTRUCTIONS } from "@/constants";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const meetingsProcessing = inngest.createFunction(
  { id: "meetings/processing", triggers: [{ event: "meetings/processing" }] },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });

    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTranscriptItem>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id))
      ];
      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) => users.map((u) => ({ ...u })));

      // Include system agent as a possible speaker
      const speakers = [
        ...userSpeakers,
        { id: SYSTEM_AGENT_ID, name: SYSTEM_AGENT_NAME },
      ];

      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown"
            }
          }
        }

        return {
          ...item,
          user: {
            name: speaker.name
          }
        }
      })
    });

    const summary = await step.run("generate-summary", async () => {
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
    });

    await step.run("save-summary", async () => {
      await db.update(meetings).set({
        summary,
        status: "completed",
      })
        .where(eq(meetings.id, event.data.meetingId));
    });
  }
);