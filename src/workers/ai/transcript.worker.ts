import JSONL from "jsonl-parse-stringify";
import { db } from "@/db";
import { user } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { StreamTranscriptItem } from "@/modules/meettings/types";
import { SYSTEM_AGENT_ID, SYSTEM_AGENT_NAME } from "@/constants";

export const transcriptWorker = {
  async parseAndEnrich(rawTranscriptText: string): Promise<unknown[]> {
    const transcript = JSONL.parse<StreamTranscriptItem>(rawTranscriptText);
    const speakerIds = [...new Set(transcript.map((item) => item.speaker_id))];

    if (speakerIds.length === 0) {
      return [];
    }

    const userSpeakers = await db
      .select()
      .from(user)
      .where(inArray(user.id, speakerIds))
      .then((users) => users.map((u) => ({ ...u })));

    const speakers = [
      ...userSpeakers,
      { id: SYSTEM_AGENT_ID, name: SYSTEM_AGENT_NAME },
    ];

    return transcript.map((item) => {
      const speaker = speakers.find((s) => s.id === item.speaker_id);
      return {
        ...item,
        user: {
          name: speaker ? speaker.name : "Unknown",
        },
      };
    });
  }
};
